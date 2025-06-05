// Advanced Search and Suggested Explorations
class AdvancedSearch {
    constructor(map, familyAddresses, historicalContext, notableFigures) {
        this.map = map;
        this.familyAddresses = familyAddresses;
        this.historicalContext = historicalContext;
        this.notableFigures = notableFigures;
        this.searchHistory = [];
        this.favorites = [];
        this.currentFilters = {};
        this.searchResults = [];
        
        this.init();
    }
    
    init() {
        this.createAdvancedSearchUI();
        this.loadUserPreferences();
        this.generateSuggestedExplorations();
    }
    
    createAdvancedSearchUI() {
        // Replace the simple search with advanced search
        const searchContainer = document.querySelector('.search-container');
        searchContainer.innerHTML = `
            <div class="advanced-search-wrapper">
                <div class="search-input-container">
                    <input type="text" id="advanced-search-input" placeholder="Search locations, people, or addresses...">
                    <button id="search-filters-btn" class="search-filters-btn">🔍</button>
                    <button id="advanced-search-btn" class="advanced-search-btn">Search</button>
                </div>
                <div id="search-suggestions" class="search-suggestions hidden"></div>
                <div id="search-filters" class="search-filters hidden">
                    <div class="filter-section">
                        <h4>Time Period</h4>
                        <div class="filter-group">
                            <div class="year-range-container">
                                <input type="range" id="year-start" min="1905" max="1950" value="1905" class="year-slider">
                                <input type="range" id="year-end" min="1905" max="1950" value="1950" class="year-slider">
                            </div>
                            <div class="year-labels">
                                <span id="year-start-label">1905</span>
                                <span>to</span>
                                <span id="year-end-label">1950</span>
                            </div>
                        </div>
                    </div>
                    <div class="filter-section">
                        <h4>Family Lines</h4>
                        <div class="filter-group">
                            <label><input type="checkbox" value="Coufal" checked> Coufal</label>
                            <label><input type="checkbox" value="McKee" checked> McKee</label>
                            <label><input type="checkbox" value="Beasley" checked> Beasley</label>
                            <label><input type="checkbox" value="Reckler" checked> Reckler</label>
                            <label><input type="checkbox" value="Krotman" checked> Krotman</label>
                        </div>
                    </div>
                    <div class="filter-section">
                        <h4>Location Types</h4>
                        <div class="filter-group">
                            <label><input type="checkbox" value="home" checked> Homes</label>
                            <label><input type="checkbox" value="business" checked> Businesses</label>
                            <label><input type="checkbox" value="school" checked> Schools</label>
                            <label><input type="checkbox" value="historical" checked> Historical Sites</label>
                        </div>
                    </div>
                    <div class="filter-section">
                        <h4>Boroughs</h4>
                        <div class="filter-group">
                            <label><input type="checkbox" value="Manhattan" checked> Manhattan</label>
                            <label><input type="checkbox" value="Brooklyn" checked> Brooklyn</label>
                            <label><input type="checkbox" value="Queens" checked> Queens</label>
                            <label><input type="checkbox" value="Bronx" checked> Bronx</label>
                        </div>
                    </div>
                    <div class="filter-actions">
                        <button id="apply-filters" class="apply-filters-btn">Apply Filters</button>
                        <button id="clear-filters" class="clear-filters-btn">Clear All</button>
                    </div>
                </div>
            </div>
        `;
        
        // Create suggested explorations panel
        const suggestionsPanel = document.createElement('div');
        suggestionsPanel.id = 'suggestions-panel';
        suggestionsPanel.className = 'suggestions-panel';
        suggestionsPanel.innerHTML = `
            <div class="suggestions-header">
                <h3>Suggested Explorations</h3>
                <button id="toggle-suggestions" class="toggle-suggestions">📍</button>
            </div>
            <div class="suggestions-content">
                <div id="suggested-tours" class="suggestion-category">
                    <h4>Guided Tours</h4>
                    <div class="suggestion-items"></div>
                </div>
                <div id="suggested-connections" class="suggestion-category">
                    <h4>Family Connections</h4>
                    <div class="suggestion-items"></div>
                </div>
                <div id="suggested-nearby" class="suggestion-category">
                    <h4>Nearby Locations</h4>
                    <div class="suggestion-items"></div>
                </div>
                <div id="search-history" class="suggestion-category">
                    <h4>Recent Searches</h4>
                    <div class="suggestion-items"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(suggestionsPanel);
        
        this.addSearchEventListeners();
    }
    
    addSearchEventListeners() {
        const searchInput = document.getElementById('advanced-search-input');
        const searchBtn = document.getElementById('advanced-search-btn');
        const filtersBtn = document.getElementById('search-filters-btn');
        const filtersPanel = document.getElementById('search-filters');
        const applyFiltersBtn = document.getElementById('apply-filters');
        const clearFiltersBtn = document.getElementById('clear-filters');
        const toggleSuggestionsBtn = document.getElementById('toggle-suggestions');
        const suggestionsPanel = document.getElementById('suggestions-panel');
        
        // Search input events
        searchInput.addEventListener('input', (e) => {
            this.showSearchSuggestions(e.target.value);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performAdvancedSearch(e.target.value);
            }
        });
        
        // Search button
        searchBtn.addEventListener('click', () => {
            this.performAdvancedSearch(searchInput.value);
        });
        
        // Filters toggle
        filtersBtn.addEventListener('click', () => {
            filtersPanel.classList.toggle('hidden');
        });
        
        // Filter actions
        applyFiltersBtn.addEventListener('click', () => {
            this.applyFilters();
        });
        
        clearFiltersBtn.addEventListener('click', () => {
            this.clearFilters();
        });
        
        // Suggestions panel toggle
        toggleSuggestionsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            suggestionsPanel.classList.toggle('collapsed');
        });
        
        // Make entire header clickable
        document.querySelector('.suggestions-header').addEventListener('click', () => {
            suggestionsPanel.classList.toggle('collapsed');
        });
        
        // Year range sliders
        const yearStartSlider = document.getElementById('year-start');
        const yearEndSlider = document.getElementById('year-end');
        
        yearStartSlider.addEventListener('input', (e) => {
            document.getElementById('year-start-label').textContent = e.target.value;
            // Ensure start is not greater than end
            if (parseInt(e.target.value) > parseInt(yearEndSlider.value)) {
                yearEndSlider.value = e.target.value;
                document.getElementById('year-end-label').textContent = e.target.value;
            }
        });
        
        yearEndSlider.addEventListener('input', (e) => {
            document.getElementById('year-end-label').textContent = e.target.value;
            // Ensure end is not less than start
            if (parseInt(e.target.value) < parseInt(yearStartSlider.value)) {
                yearStartSlider.value = e.target.value;
                document.getElementById('year-start-label').textContent = e.target.value;
            }
        });
        
        // Close filters when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                filtersPanel.classList.add('hidden');
                document.getElementById('search-suggestions').classList.add('hidden');
            }
        });
    }
    
    showSearchSuggestions(query) {
        if (query.length < 2) {
            document.getElementById('search-suggestions').classList.add('hidden');
            return;
        }
        
        const suggestions = this.generateSearchSuggestions(query);
        const suggestionsContainer = document.getElementById('search-suggestions');
        
        if (suggestions.length > 0) {
            suggestionsContainer.innerHTML = suggestions.map(suggestion => 
                `<div class="suggestion-item" onclick="advancedSearch.selectSuggestion('${suggestion.text}', '${suggestion.type}')">
                    <span class="suggestion-icon">${suggestion.icon}</span>
                    <span class="suggestion-text">${suggestion.text}</span>
                    <span class="suggestion-type">${suggestion.type}</span>
                </div>`
            ).join('');
            suggestionsContainer.classList.remove('hidden');
        } else {
            suggestionsContainer.classList.add('hidden');
        }
    }
    
    generateSearchSuggestions(query) {
        const suggestions = [];
        const lowerQuery = query.toLowerCase();
        
        // Family name suggestions
        const families = ['Coufal', 'McKee', 'Beasley', 'Reckler', 'Krotman'];
        families.forEach(family => {
            if (family.toLowerCase().includes(lowerQuery)) {
                suggestions.push({
                    text: family,
                    type: 'Family',
                    icon: '👨‍👩‍👧‍👦'
                });
            }
        });
        
        // Location suggestions
        [...this.familyAddresses, ...this.historicalContext].forEach(location => {
            if (location.name.toLowerCase().includes(lowerQuery) || 
                location.address.toLowerCase().includes(lowerQuery)) {
                suggestions.push({
                    text: location.name,
                    type: 'Location',
                    icon: '📍'
                });
            }
        });
        
        // Year suggestions
        const years = ['1900s', '1910s', '1920s', '1930s', '1940s'];
        years.forEach(year => {
            if (year.includes(lowerQuery)) {
                suggestions.push({
                    text: year,
                    type: 'Time Period',
                    icon: '📅'
                });
            }
        });
        
        // Borough suggestions
        const boroughs = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx'];
        boroughs.forEach(borough => {
            if (borough.toLowerCase().includes(lowerQuery)) {
                suggestions.push({
                    text: borough,
                    type: 'Borough',
                    icon: '🏙️'
                });
            }
        });
        
        return suggestions.slice(0, 8); // Limit to 8 suggestions
    }
    
    selectSuggestion(text, type) {
        document.getElementById('advanced-search-input').value = text;
        document.getElementById('search-suggestions').classList.add('hidden');
        this.performAdvancedSearch(text);
    }
    
    performAdvancedSearch(query) {
        if (!query.trim()) return;
        
        // Add to search history
        this.addToSearchHistory(query);
        
        // Get current filters
        const filters = this.getCurrentFilters();
        
        // Perform search
        const results = this.searchWithFilters(query, filters);
        
        // Display results
        this.displaySearchResults(results);
        
        // Update suggestions
        this.updateSuggestedExplorations(query, results);
    }
    
    getCurrentFilters() {
        const filters = {
            families: [],
            locationTypes: [],
            boroughs: [],
            yearRange: [1905, 1950]
        };
        
        // Family filters
        document.querySelectorAll('input[type="checkbox"][value="Coufal"], input[type="checkbox"][value="McKee"], input[type="checkbox"][value="Beasley"], input[type="checkbox"][value="Reckler"], input[type="checkbox"][value="Krotman"]').forEach(checkbox => {
            if (checkbox.checked) {
                filters.families.push(checkbox.value);
            }
        });
        
        // Location type filters
        document.querySelectorAll('input[type="checkbox"][value="home"], input[type="checkbox"][value="business"], input[type="checkbox"][value="school"], input[type="checkbox"][value="historical"]').forEach(checkbox => {
            if (checkbox.checked) {
                filters.locationTypes.push(checkbox.value);
            }
        });
        
        // Borough filters
        document.querySelectorAll('input[type="checkbox"][value="Manhattan"], input[type="checkbox"][value="Brooklyn"], input[type="checkbox"][value="Queens"], input[type="checkbox"][value="Bronx"]').forEach(checkbox => {
            if (checkbox.checked) {
                filters.boroughs.push(checkbox.value);
            }
        });
        
        // Year range
        const yearStartSlider = document.getElementById('year-start');
        const yearEndSlider = document.getElementById('year-end');
        if (yearStartSlider && yearEndSlider) {
            filters.yearRange = [parseInt(yearStartSlider.value), parseInt(yearEndSlider.value)];
        }
        
        return filters;
    }
    
    searchWithFilters(query, filters) {
        const allLocations = [
            ...this.familyAddresses.map(loc => ({...loc, type: 'family'})),
            ...this.historicalContext.map(loc => ({...loc, type: 'historical'})),
            ...(this.notableFigures || []).map(loc => ({...loc, type: 'notable'}))
        ];
        
        return allLocations.filter(location => {
            // Text search
            const matchesQuery = !query || 
                location.name.toLowerCase().includes(query.toLowerCase()) ||
                location.address.toLowerCase().includes(query.toLowerCase()) ||
                (location.details && location.details.toLowerCase().includes(query.toLowerCase())) ||
                (location.family && location.family.toLowerCase().includes(query.toLowerCase()));
            
            if (!matchesQuery) return false;
            
            // Family filter - only apply if some families are unchecked
            if (filters.families.length > 0 && filters.families.length < 5) {
                if (location.family && !filters.families.includes(location.family)) {
                    return false;
                }
                // For historical/notable locations without family, include them if historical is checked
                if (!location.family && location.type === 'historical' && !filters.locationTypes.includes('historical')) {
                    return false;
                }
            }
            
            // Location type filter - only apply if some types are unchecked
            if (filters.locationTypes.length > 0 && filters.locationTypes.length < 4) {
                let matchesType = false;
                
                if (location.type === 'family') {
                    // Determine if it's a home or business based on details
                    const isHome = location.details.toLowerCase().includes('home') || 
                                  location.details.toLowerCase().includes('lived') ||
                                  location.details.toLowerCase().includes('residence');
                    const isBusiness = location.details.toLowerCase().includes('bakery') || 
                                     location.details.toLowerCase().includes('business') ||
                                     location.details.toLowerCase().includes('dealer');
                    const isSchool = location.details.toLowerCase().includes('school') ||
                                   location.details.toLowerCase().includes('high school');
                    
                    if (isSchool && filters.locationTypes.includes('school')) matchesType = true;
                    else if (isBusiness && filters.locationTypes.includes('business')) matchesType = true;
                    else if (isHome && filters.locationTypes.includes('home')) matchesType = true;
                    else if (!isSchool && !isBusiness && filters.locationTypes.includes('home')) matchesType = true; // Default to home
                }
                
                if (location.type === 'historical' && filters.locationTypes.includes('historical')) {
                    matchesType = true;
                }
                
                if (!matchesType) return false;
            }
            
            // Borough filter - only apply if some boroughs are unchecked
            if (filters.boroughs.length > 0 && filters.boroughs.length < 4) {
                const locationBorough = this.extractBorough(location.address);
                if (locationBorough && !filters.boroughs.includes(locationBorough)) {
                    return false;
                }
            }
            
            // Year filter
            if (location.year && location.year !== 'Unknown') {
                const locationYear = parseInt(location.year.toString().split('-')[0]);
                if (locationYear < filters.yearRange[0] || locationYear > filters.yearRange[1]) {
                    return false;
                }
            }
            
            return true;
        });
    }
    
    extractBorough(address) {
        if (address.includes('Manhattan')) return 'Manhattan';
        if (address.includes('Brooklyn')) return 'Brooklyn';
        if (address.includes('Queens')) return 'Queens';
        if (address.includes('Bronx')) return 'Bronx';
        return null;
    }
    
    displaySearchResults(results) {
        this.searchResults = results;
        
        if (results.length === 0) {
            this.showNoResults();
            return;
        }
        
        // Clear previous search markers
        if (window.searchMarker) {
            window.searchMarker.setMap(null);
        }
        
        // Create bounds to fit all results
        const bounds = new google.maps.LatLngBounds();
        let markersCreated = 0;
        
        results.forEach((result, index) => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: result.address }, (geocodeResults, status) => {
                if (status === 'OK') {
                    const position = geocodeResults[0].geometry.location;
                    bounds.extend(position);
                    
                    // Create highlighted marker
                    const marker = new google.maps.Marker({
                        position: position,
                        map: this.map,
                        title: result.name,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: this.getResultColor(result),
                            fillOpacity: 0.9,
                            strokeWeight: 3,
                            strokeColor: '#FFFFFF',
                            scale: 12
                        }
                    });
                    
                    // Store marker for cleanup
                    if (!window.searchResultMarkers) {
                        window.searchResultMarkers = [];
                    }
                    window.searchResultMarkers.push(marker);
                    
                    markersCreated++;
                    
                    // Fit bounds when all markers are created
                    if (markersCreated === results.length) {
                        this.map.fitBounds(bounds, { padding: 50 });
                    }
                }
            });
        });
        
        // Show results summary
        this.showResultsSummary(results);
    }
    
    getResultColor(result) {
        if (result.type === 'family') {
            const familyColors = {
                'Coufal': '#e74c3c',
                'McKee': '#9b59b6',
                'Beasley': '#3498db',
                'Reckler': '#f1c40f',
                'Krotman': '#2ecc71'
            };
            return familyColors[result.family] || '#FF4500';
        } else if (result.type === 'historical') {
            return '#A0A0A0';
        } else {
            return '#303030';
        }
    }
    
    showResultsSummary(results) {
        // Create or update results summary
        let summaryPanel = document.getElementById('search-results-summary');
        if (!summaryPanel) {
            summaryPanel = document.createElement('div');
            summaryPanel.id = 'search-results-summary';
            summaryPanel.className = 'search-results-summary';
            document.body.appendChild(summaryPanel);
        }
        
        const familyCount = results.filter(r => r.type === 'family').length;
        const historicalCount = results.filter(r => r.type === 'historical').length;
        const notableCount = results.filter(r => r.type === 'notable').length;
        
        summaryPanel.innerHTML = `
            <div class="results-header">
                <h3>Search Results (${results.length})</h3>
                <button id="close-results" class="close-results">×</button>
            </div>
            <div class="results-breakdown">
                ${familyCount > 0 ? `<span class="result-count family">${familyCount} Family Locations</span>` : ''}
                ${historicalCount > 0 ? `<span class="result-count historical">${historicalCount} Historical Sites</span>` : ''}
                ${notableCount > 0 ? `<span class="result-count notable">${notableCount} Notable Figures</span>` : ''}
            </div>
            <div class="results-actions">
                <button id="clear-search-results" class="clear-results-btn">Clear Results</button>
                <button id="save-search" class="save-search-btn">Save Search</button>
            </div>
        `;
        
        summaryPanel.classList.remove('hidden');
        
        // Add event listeners
        document.getElementById('close-results').onclick = () => {
            summaryPanel.classList.add('hidden');
        };
        
        document.getElementById('clear-search-results').onclick = () => {
            this.clearSearchResults();
        };
        
        document.getElementById('save-search').onclick = () => {
            this.saveCurrentSearch();
        };
    }
    
    showNoResults() {
        let summaryPanel = document.getElementById('search-results-summary');
        if (!summaryPanel) {
            summaryPanel = document.createElement('div');
            summaryPanel.id = 'search-results-summary';
            summaryPanel.className = 'search-results-summary';
            document.body.appendChild(summaryPanel);
        }
        
        summaryPanel.innerHTML = `
            <div class="results-header">
                <h3>No Results Found</h3>
                <button id="close-results" class="close-results">×</button>
            </div>
            <div class="no-results-content">
                <p>Try adjusting your search terms or filters.</p>
                <div class="search-suggestions">
                    <h4>Suggestions:</h4>
                    <button class="suggestion-btn" onclick="advancedSearch.performAdvancedSearch('Coufal')">Search Coufal Family</button>
                    <button class="suggestion-btn" onclick="advancedSearch.performAdvancedSearch('1920s')">Explore 1920s</button>
                    <button class="suggestion-btn" onclick="advancedSearch.performAdvancedSearch('Manhattan')">Manhattan Locations</button>
                </div>
            </div>
        `;
        
        summaryPanel.classList.remove('hidden');
        
        document.getElementById('close-results').onclick = () => {
            summaryPanel.classList.add('hidden');
        };
    }
    
    clearSearchResults() {
        // Clear search result markers
        if (window.searchResultMarkers) {
            window.searchResultMarkers.forEach(marker => marker.setMap(null));
            window.searchResultMarkers = [];
        }
        
        // Hide results summary
        const summaryPanel = document.getElementById('search-results-summary');
        if (summaryPanel) {
            summaryPanel.classList.add('hidden');
        }
        
        // Clear search input
        document.getElementById('advanced-search-input').value = '';
        
        // Reset map view
        this.map.setCenter({lat: 40.7128, lng: -74.0060});
        this.map.setZoom(11);
    }
    
    generateSuggestedExplorations() {
        const tours = [
            {
                title: "Immigration Journey (1905-1920)",
                description: "Follow the early immigrant experience",
                icon: "🚢",
                action: 'immigration'
            },
            {
                title: "Family Business Stories",
                description: "Explore family businesses and trades",
                icon: "🏪",
                action: 'business'
            },
            {
                title: "Neighborhood Evolution",
                description: "See how neighborhoods changed over time",
                icon: "🏘️",
                action: 'neighborhoods'
            },
            {
                title: "Education & Growth",
                description: "Schools and educational milestones",
                icon: "🎓",
                action: 'education'
            }
        ];
        
        const connections = [
            {
                title: "Family Intersections",
                description: "Where family lines crossed paths",
                icon: "🤝",
                action: 'intersections'
            },
            {
                title: "Generational Moves",
                description: "How each generation moved through NYC",
                icon: "📍",
                action: 'generations'
            },
            {
                title: "Same Address, Different Times",
                description: "Locations used by multiple families",
                icon: "🏠",
                action: 'shared'
            }
        ];
        
        this.populateSuggestions('suggested-tours', tours);
        this.populateSuggestions('suggested-connections', connections);
        this.updateNearbyLocations();
        this.updateSearchHistory();
    }
    
    populateSuggestions(containerId, suggestions) {
        const container = document.querySelector(`#${containerId} .suggestion-items`);
        if (container) {
            container.innerHTML = suggestions.map(suggestion => `
                <div class="suggestion-item" onclick="advancedSearch.executeSuggestion('${suggestion.action}')">
                    <span class="suggestion-icon">${suggestion.icon}</span>
                    <div class="suggestion-content">
                        <h5>${suggestion.title}</h5>
                        <p>${suggestion.description}</p>
                    </div>
                </div>
            `).join('');
        }
    }
    
    executeSuggestion(action) {
        console.log('Executing suggestion:', action);
        
        switch(action) {
            case 'immigration':
                this.performAdvancedSearch('1905');
                this.showToast('Showing early immigration period (1905-1920)');
                break;
            case 'business':
                this.performAdvancedSearch('bakery dealer');
                this.showToast('Showing family businesses');
                break;
            case 'neighborhoods':
                this.performAdvancedSearch('Manhattan');
                this.showToast('Exploring Manhattan neighborhoods');
                break;
            case 'education':
                this.performAdvancedSearch('school');
                this.showToast('Showing educational locations');
                break;
            case 'intersections':
                this.showFamilyIntersections();
                break;
            case 'generations':
                this.showGenerationalMoves();
                break;
            case 'shared':
                this.showSharedLocations();
                break;
            default:
                console.log('Unknown suggestion action:', action);
        }
    }
    
    showFamilyIntersections() {
        // Find locations where different families lived in same neighborhoods
        const neighborhoods = {};
        this.familyAddresses.forEach(location => {
            const borough = this.extractBorough(location.address);
            if (borough) {
                if (!neighborhoods[borough]) neighborhoods[borough] = new Set();
                neighborhoods[borough].add(location.family);
            }
        });
        
        // Find boroughs with multiple families
        const intersections = Object.entries(neighborhoods)
            .filter(([borough, families]) => families.size > 1)
            .map(([borough, families]) => `${borough} (${Array.from(families).join(', ')})`);
        
        if (intersections.length > 0) {
            this.showToast(`Family intersections found in: ${intersections.join('; ')}`);
            this.performAdvancedSearch(Object.keys(neighborhoods)[0]); // Show first intersection
        } else {
            this.showToast('No family intersections found');
        }
    }
    
    showGenerationalMoves() {
        // Group by decades and show progression
        const decades = {};
        this.familyAddresses.forEach(location => {
            if (location.year && location.year !== 'Unknown') {
                const decade = Math.floor(parseInt(location.year.toString().split('-')[0]) / 10) * 10;
                if (!decades[decade]) decades[decade] = [];
                decades[decade].push(location);
            }
        });
        
        const sortedDecades = Object.keys(decades).sort();
        if (sortedDecades.length > 0) {
            this.showToast(`Showing generational progression: ${sortedDecades.map(d => d + 's').join(' → ')}`);
            this.performAdvancedSearch(sortedDecades[0] + 's');
        }
    }
    
    showSharedLocations() {
        // Find addresses or streets used by multiple families
        const addressCounts = {};
        this.familyAddresses.forEach(location => {
            const street = location.address.split(',')[0]; // Get street part
            if (!addressCounts[street]) addressCounts[street] = new Set();
            addressCounts[street].add(location.family);
        });
        
        const shared = Object.entries(addressCounts)
            .filter(([street, families]) => families.size > 1);
        
        if (shared.length > 0) {
            const sharedStreet = shared[0][0];
            this.showToast(`Found shared locations on ${sharedStreet}`);
            this.performAdvancedSearch(sharedStreet);
        } else {
            this.showToast('No shared locations found');
        }
    }
    
    showToast(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 1002;
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    
    addToSearchHistory(query) {
        // Add to beginning of array, remove duplicates, limit to 10
        this.searchHistory = [query, ...this.searchHistory.filter(item => item !== query)].slice(0, 10);
        this.saveUserPreferences();
        this.updateSearchHistory();
    }
    
    updateSearchHistory() {
        const container = document.querySelector('#search-history .suggestion-items');
        if (container && this.searchHistory.length > 0) {
            container.innerHTML = this.searchHistory.map(query => `
                <div class="suggestion-item" onclick="advancedSearch.performAdvancedSearch('${query}')">
                    <span class="suggestion-icon">🔍</span>
                    <div class="suggestion-content">
                        <h5>${query}</h5>
                    </div>
                </div>
            `).join('');
        }
    }
    
    saveUserPreferences() {
        const preferences = {
            searchHistory: this.searchHistory,
            favorites: this.favorites
        };
        localStorage.setItem('coufal-family-map-preferences', JSON.stringify(preferences));
    }
    
    loadUserPreferences() {
        const saved = localStorage.getItem('coufal-family-map-preferences');
        if (saved) {
            const preferences = JSON.parse(saved);
            this.searchHistory = preferences.searchHistory || [];
            this.favorites = preferences.favorites || [];
        }
    }
    
    applyFilters() {
        const query = document.getElementById('advanced-search-input').value;
        this.performAdvancedSearch(query);
        document.getElementById('search-filters').classList.add('hidden');
    }
    
    clearFilters() {
        // Reset all checkboxes
        document.querySelectorAll('#search-filters input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
        });
        
        // Reset year sliders
        const yearStartSlider = document.getElementById('year-start');
        const yearEndSlider = document.getElementById('year-end');
        if (yearStartSlider && yearEndSlider) {
            yearStartSlider.value = '1905';
            yearEndSlider.value = '1950';
            document.getElementById('year-start-label').textContent = '1905';
            document.getElementById('year-end-label').textContent = '1950';
        }
    }
    
    updateNearbyLocations() {
        // This would be implemented to show locations near the current map center
        // For now, we'll show a placeholder
        const container = document.querySelector('#suggested-nearby .suggestion-items');
        if (container) {
            container.innerHTML = `
                <div class="suggestion-item">
                    <span class="suggestion-icon">📍</span>
                    <div class="suggestion-content">
                        <h5>Explore Current Area</h5>
                        <p>Find family locations in the current map view</p>
                    </div>
                </div>
            `;
        }
    }
    
    updateSuggestedExplorations(query, results) {
        // Update suggestions based on search results
        // This would analyze the results and suggest related explorations
    }
}