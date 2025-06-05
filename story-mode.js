// Story Mode Implementation
class StoryMode {
    constructor(map, familyAddresses, historicalContext) {
        this.map = map;
        this.familyAddresses = familyAddresses;
        this.historicalContext = historicalContext;
        this.currentStoryIndex = 0;
        this.isStoryMode = false;
        this.storyMarkers = [];
        this.storyOverlay = null;
        this.autoPlayInterval = null;
        
        this.createStoryData();
        this.createStoryUI();
    }
    
    createStoryData() {
        // Combine and sort all locations by year for chronological story
        const allLocations = [
            ...this.familyAddresses.map(loc => ({...loc, type: 'family'})),
            ...this.historicalContext.map(loc => ({...loc, type: 'historical'}))
        ];
        
        // Sort by year and create story chapters
        this.storyData = allLocations
            .filter(loc => loc.year && loc.year !== 'Unknown')
            .sort((a, b) => {
                const yearA = parseInt(a.year.toString().split('-')[0]);
                const yearB = parseInt(b.year.toString().split('-')[0]);
                return yearA - yearB;
            })
            .map((loc, index) => ({
                ...loc,
                storyIndex: index,
                storyTitle: this.generateStoryTitle(loc),
                storyNarrative: this.generateStoryNarrative(loc)
            }));
        
        // Create story chapters by decade
        this.storyChapters = this.groupByDecade(this.storyData);
    }
    
    generateStoryTitle(location) {
        const year = parseInt(location.year.toString().split('-')[0]);
        const decade = Math.floor(year / 10) * 10;
        
        if (location.type === 'family') {
            return `${year}: ${location.name}`;
        } else {
            return `${year}: ${location.name} (Historical Context)`;
        }
    }
    
    generateStoryNarrative(location) {
        const year = parseInt(location.year.toString().split('-')[0]);
        let narrative = `In ${year}, `;
        
        if (location.type === 'family') {
            if (location.family === 'Coufal') {
                narrative += `the Coufal family was living at ${location.address}. `;
            } else {
                narrative += `the ${location.family} family was at ${location.address}. `;
            }
        } else {
            narrative += `the neighborhood was shaped by ${location.name}. `;
        }
        
        narrative += location.details;
        
        // Add historical context
        if (year >= 1905 && year <= 1915) {
            narrative += " This was during the great wave of immigration to New York City.";
        } else if (year >= 1920 && year <= 1930) {
            narrative += " The 1920s brought prosperity and growth to New York's immigrant communities.";
        } else if (year >= 1930 && year <= 1940) {
            narrative += " The Great Depression challenged families, but communities remained strong.";
        } else if (year >= 1940 && year <= 1950) {
            narrative += " Post-war America offered new opportunities for growth and movement.";
        }
        
        return narrative;
    }
    
    groupByDecade(storyData) {
        const chapters = {};
        storyData.forEach(item => {
            const year = parseInt(item.year.toString().split('-')[0]);
            const decade = Math.floor(year / 10) * 10;
            const decadeKey = `${decade}s`;
            
            if (!chapters[decadeKey]) {
                chapters[decadeKey] = {
                    title: `The ${decadeKey}: ${this.getDecadeTheme(decade)}`,
                    decade: decade,
                    locations: []
                };
            }
            chapters[decadeKey].locations.push(item);
        });
        
        return Object.values(chapters).sort((a, b) => a.decade - b.decade);
    }
    
    getDecadeTheme(decade) {
        const themes = {
            1900: "Arrival and Settlement",
            1910: "Building Communities", 
            1920: "Growth and Prosperity",
            1930: "Resilience Through Hard Times",
            1940: "War and New Beginnings"
        };
        return themes[decade] || "Family Journey";
    }
    
    createStoryUI() {
        // Create story mode button
        const storyButton = document.createElement('button');
        storyButton.id = 'story-mode-btn';
        storyButton.className = 'story-mode-button';
        storyButton.innerHTML = '📖 Story Mode';
        storyButton.onclick = () => this.toggleStoryMode();
        
        // Add to header
        const header = document.querySelector('.header');
        header.appendChild(storyButton);
        
        // Create story overlay
        this.createStoryOverlay();
    }
    
    createStoryOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'story-overlay';
        overlay.className = 'story-overlay hidden';
        overlay.innerHTML = `
            <div class="story-content">
                <div class="story-header">
                    <h2 id="story-title">Family Story</h2>
                    <div class="story-controls">
                        <button id="story-prev" class="story-nav-btn">←</button>
                        <span id="story-progress">1 / ${this.storyData.length}</span>
                        <button id="story-next" class="story-nav-btn">→</button>
                        <button id="story-autoplay" class="story-control-btn">⏯️</button>
                        <button id="story-close" class="story-control-btn">✕</button>
                    </div>
                </div>
                <div class="story-body">
                    <div id="story-narrative" class="story-narrative"></div>
                    <div id="story-image" class="story-image"></div>
                    <div class="story-location-info">
                        <strong id="story-location-name"></strong>
                        <p id="story-location-address"></p>
                    </div>
                </div>
                <div class="story-footer">
                    <div class="story-timeline">
                        <div id="story-timeline-progress" class="story-timeline-progress"></div>
                    </div>
                    <div class="story-chapters">
                        <select id="story-chapter-select">
                            <option value="">Jump to Chapter...</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.storyOverlay = overlay;
        
        // Populate chapter selector
        const chapterSelect = document.getElementById('story-chapter-select');
        this.storyChapters.forEach((chapter, index) => {
            const option = document.createElement('option');
            option.value = chapter.locations[0].storyIndex;
            option.textContent = chapter.title;
            chapterSelect.appendChild(option);
        });
        
        // Add event listeners
        this.addStoryEventListeners();
    }
    
    addStoryEventListeners() {
        document.getElementById('story-prev').onclick = () => this.previousStory();
        document.getElementById('story-next').onclick = () => this.nextStory();
        document.getElementById('story-autoplay').onclick = () => this.toggleAutoplay();
        document.getElementById('story-close').onclick = () => this.exitStoryMode();
        document.getElementById('story-chapter-select').onchange = (e) => {
            if (e.target.value) {
                this.goToStory(parseInt(e.target.value));
            }
        };
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isStoryMode) {
                switch(e.key) {
                    case 'ArrowLeft':
                        this.previousStory();
                        break;
                    case 'ArrowRight':
                    case ' ':
                        e.preventDefault();
                        this.nextStory();
                        break;
                    case 'Escape':
                        this.exitStoryMode();
                        break;
                }
            }
        });
    }
    
    toggleStoryMode() {
        if (this.isStoryMode) {
            this.exitStoryMode();
        } else {
            this.enterStoryMode();
        }
    }
    
    enterStoryMode() {
        this.isStoryMode = true;
        this.currentStoryIndex = 0;
        
        // Hide regular UI elements
        document.querySelector('.search-container').style.display = 'none';
        document.querySelector('.legend').style.display = 'none';
        document.querySelector('.family-tree-box').style.display = 'none';
        
        // Show story overlay
        this.storyOverlay.classList.remove('hidden');
        
        // Update button
        document.getElementById('story-mode-btn').innerHTML = '🗺️ Map Mode';
        document.getElementById('story-mode-btn').classList.add('active');
        
        // Start story
        this.showStory(0);
    }
    
    exitStoryMode() {
        this.isStoryMode = false;
        
        // Stop autoplay
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        
        // Show regular UI elements
        document.querySelector('.search-container').style.display = 'flex';
        document.querySelector('.legend').style.display = 'block';
        document.querySelector('.family-tree-box').style.display = 'block';
        
        // Hide story overlay
        this.storyOverlay.classList.add('hidden');
        
        // Update button
        document.getElementById('story-mode-btn').innerHTML = '📖 Story Mode';
        document.getElementById('story-mode-btn').classList.remove('active');
        
        // Clear story markers
        this.clearStoryMarkers();
    }
    
    showStory(index) {
        if (index < 0 || index >= this.storyData.length) return;
        
        this.currentStoryIndex = index;
        const story = this.storyData[index];
        
        // Update UI
        document.getElementById('story-title').textContent = story.storyTitle;
        document.getElementById('story-narrative').textContent = story.storyNarrative;
        document.getElementById('story-location-name').textContent = story.name;
        document.getElementById('story-location-address').textContent = story.address;
        document.getElementById('story-progress').textContent = `${index + 1} / ${this.storyData.length}`;
        
        // Update timeline progress
        const progress = ((index + 1) / this.storyData.length) * 100;
        document.getElementById('story-timeline-progress').style.width = `${progress}%`;
        
        // Show image if available
        const imageContainer = document.getElementById('story-image');
        if (story.image || story.images) {
            const imageSrc = story.image || (story.images && story.images[0]);
            imageContainer.innerHTML = `<img src="images/${imageSrc}" alt="${story.name}" style="max-width: 100%; border-radius: 4px;">`;
        } else {
            imageContainer.innerHTML = '';
        }
        
        // Geocode and show on map
        this.showStoryLocationOnMap(story);
        
        // Update navigation buttons
        document.getElementById('story-prev').disabled = index === 0;
        document.getElementById('story-next').disabled = index === this.storyData.length - 1;
    }
    
    showStoryLocationOnMap(story) {
        // Clear previous story markers
        this.clearStoryMarkers();
        
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: story.address }, (results, status) => {
            if (status === 'OK') {
                const position = results[0].geometry.location;
                
                // Create highlighted marker
                const marker = new google.maps.Marker({
                    position: position,
                    map: this.map,
                    title: story.name,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: story.type === 'family' ? '#FF4500' : '#FFD700',
                        fillOpacity: 1,
                        strokeWeight: 3,
                        strokeColor: '#FFFFFF',
                        scale: 15
                    },
                    animation: google.maps.Animation.BOUNCE
                });
                
                // Stop bouncing after 2 seconds
                setTimeout(() => {
                    marker.setAnimation(null);
                }, 2000);
                
                this.storyMarkers.push(marker);
                
                // Center map on location
                this.map.setCenter(position);
                this.map.setZoom(16);
                
                // Create info window
                const infoWindow = new google.maps.InfoWindow({
                    content: `
                        <div class="popup-content">
                            <h3>${story.name}</h3>
                            <p><strong>Year:</strong> ${story.year}</p>
                            <p>${story.details}</p>
                        </div>
                    `
                });
                
                infoWindow.open(this.map, marker);
                setTimeout(() => infoWindow.close(), 5000);
            }
        });
    }
    
    clearStoryMarkers() {
        this.storyMarkers.forEach(marker => marker.setMap(null));
        this.storyMarkers = [];
    }
    
    nextStory() {
        if (this.currentStoryIndex < this.storyData.length - 1) {
            this.showStory(this.currentStoryIndex + 1);
        }
    }
    
    previousStory() {
        if (this.currentStoryIndex > 0) {
            this.showStory(this.currentStoryIndex - 1);
        }
    }
    
    goToStory(index) {
        this.showStory(index);
    }
    
    toggleAutoplay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
            document.getElementById('story-autoplay').innerHTML = '▶️';
        } else {
            this.autoPlayInterval = setInterval(() => {
                if (this.currentStoryIndex < this.storyData.length - 1) {
                    this.nextStory();
                } else {
                    this.toggleAutoplay(); // Stop at end
                }
            }, 8000); // 8 seconds per story
            document.getElementById('story-autoplay').innerHTML = '⏸️';
        }
    }
}

// Story Mode Styles
const storyModeStyles = `
.story-mode-button {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    background: #4285f4;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
    z-index: 12;
}

.story-mode-button:hover {
    background: #3367d6;
}

.story-mode-button.active {
    background: #ff6b35;
}

.story-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.story-overlay.hidden {
    display: none;
}

.story-content {
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.story-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #eee;
    background: #f8f9fa;
    border-radius: 8px 8px 0 0;
}

.story-header h2 {
    margin: 0;
    font-size: 18px;
    color: #333;
}

.story-controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

.story-nav-btn, .story-control-btn {
    background: #4285f4;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.story-nav-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.story-body {
    padding: 20px;
}

.story-narrative {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 20px;
    color: #333;
}

.story-image {
    margin: 15px 0;
    text-align: center;
}

.story-location-info {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
}

.story-location-info strong {
    color: #4285f4;
    font-size: 16px;
}

.story-footer {
    padding: 20px;
    border-top: 1px solid #eee;
    background: #f8f9fa;
    border-radius: 0 0 8px 8px;
}

.story-timeline {
    background: #e0e0e0;
    height: 4px;
    border-radius: 2px;
    margin-bottom: 15px;
    overflow: hidden;
}

.story-timeline-progress {
    background: #4285f4;
    height: 100%;
    transition: width 0.3s ease;
}

.story-chapters select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

@media (max-width: 768px) {
    .story-content {
        width: 95%;
        max-height: 95vh;
    }
    
    .story-header {
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }
    
    .story-controls {
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .story-mode-button {
        right: 10px;
        font-size: 12px;
        padding: 6px 8px;
    }
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = storyModeStyles;
document.head.appendChild(styleSheet);