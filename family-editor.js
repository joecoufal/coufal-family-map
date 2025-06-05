// Family Record Editor - Allows users to edit family history records
class FamilyRecordEditor {
    constructor(familyAddresses, historicalContext, notableFigures) {
        this.familyAddresses = familyAddresses;
        this.historicalContext = historicalContext;
        this.notableFigures = notableFigures;
        this.currentEditingRecord = null;
        this.pendingChanges = this.loadPendingChanges();
        
        this.init();
    }
    
    init() {
        this.createEditingUI();
        this.addEditButtonsToPopups();
        this.setupImageUpload();
    }
    
    createEditingUI() {
        // Create edit modal
        const editModal = document.createElement('div');
        editModal.id = 'edit-modal';
        editModal.className = 'edit-modal hidden';
        editModal.innerHTML = `
            <div class="edit-modal-content">
                <div class="edit-modal-header">
                    <h2 id="edit-modal-title">Edit Family Record</h2>
                    <button id="close-edit-modal" class="close-modal-btn">×</button>
                </div>
                <div class="edit-modal-body">
                    <form id="edit-record-form">
                        <div class="form-group">
                            <label for="edit-name">Location Name:</label>
                            <input type="text" id="edit-name" name="name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-address">Address:</label>
                            <input type="text" id="edit-address" name="address" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-year">Year:</label>
                            <input type="text" id="edit-year" name="year" placeholder="e.g., 1920 or 1920-1930">
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-family">Family:</label>
                            <select id="edit-family" name="family">
                                <option value="">Select Family</option>
                                <option value="Coufal">Coufal</option>
                                <option value="McKee">McKee</option>
                                <option value="Beasley">Beasley</option>
                                <option value="Reckler">Reckler</option>
                                <option value="Krotman">Krotman</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-details">Details:</label>
                            <textarea id="edit-details" name="details" rows="4" placeholder="Tell the story of this location..."></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-link">External Link (optional):</label>
                            <input type="url" id="edit-link" name="link" placeholder="https://...">
                        </div>
                        
                        <div class="form-group">
                            <label>Current Images:</label>
                            <div id="current-images" class="current-images"></div>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-images">Add New Images:</label>
                            <input type="file" id="edit-images" name="images" multiple accept="image/*">
                            <small>Select multiple images to add to this location</small>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-contributor">Your Name (optional):</label>
                            <input type="text" id="edit-contributor" name="contributor" placeholder="Who is making this edit?">
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" id="cancel-edit" class="cancel-btn">Cancel</button>
                            <button type="submit" id="save-edit" class="save-btn">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(editModal);
        
        // Create "Add New Record" button
        const addRecordBtn = document.createElement('button');
        addRecordBtn.id = 'add-record-btn';
        addRecordBtn.className = 'add-record-button';
        addRecordBtn.innerHTML = '+ Add Location';
        addRecordBtn.onclick = () => {
            // Initialize editor on-demand if needed
            if (!window.familyEditor) {
                try {
                    if (typeof familyAddresses !== 'undefined') {
                        window.familyEditor = new FamilyRecordEditor(
                            familyAddresses, 
                            historicalContext, 
                            notableFigures || []
                        );
                    }
                } catch (error) {
                    alert('Could not initialize editor. Please refresh the page.');
                    return;
                }
            }
            
            if (window.familyEditor) {
                window.familyEditor.openEditModal();
            } else {
                alert('Editor could not be loaded. Please refresh the page and try again.');
            }
        };
        
        // Add to header
        const header = document.querySelector('.header');
        header.appendChild(addRecordBtn);
        
        // Create pending changes indicator
        const changesIndicator = document.createElement('div');
        changesIndicator.id = 'pending-changes';
        changesIndicator.className = 'pending-changes hidden';
        changesIndicator.innerHTML = `
            <div class="changes-content">
                <span class="changes-icon">📝</span>
                <span class="changes-text">You have unsaved changes</span>
                <button id="view-changes" class="view-changes-btn">View</button>
                <button id="submit-changes" class="submit-changes-btn">Submit</button>
            </div>
        `;
        
        document.body.appendChild(changesIndicator);
        
        this.addEventListeners();
        this.updatePendingChangesIndicator();
    }
    
    addEventListeners() {
        // Modal controls
        document.getElementById('close-edit-modal').onclick = () => this.closeEditModal();
        document.getElementById('cancel-edit').onclick = () => this.closeEditModal();
        document.getElementById('edit-record-form').onsubmit = (e) => this.saveRecord(e);
        
        // Pending changes
        document.getElementById('view-changes').onclick = () => this.showPendingChanges();
        document.getElementById('submit-changes').onclick = () => this.submitAllChanges();
        
        // Close modal when clicking outside
        document.getElementById('edit-modal').onclick = (e) => {
            if (e.target.id === 'edit-modal') {
                this.closeEditModal();
            }
        };
        
        // Image upload preview
        document.getElementById('edit-images').onchange = (e) => this.previewImages(e);
    }
    
    addEditButtonsToPopups() {
        // Store reference to this for use in the override
        const editor = this;
        
        // Store the original createMarker function if not already stored
        if (typeof window.originalCreateMarker === 'undefined') {
            window.originalCreateMarker = window.createMarker;
        }
        
        // Override createMarker to add edit buttons
        window.createMarker = function(position, title, color, content) {
            // Create a simple edit button that calls the editor directly
            const editButton = `<div style="margin-top: 10px; text-align: center;"><button class="edit-record-btn" onclick="window.openEditFor('${title.replace(/'/g, "\\'")}')">✏️ Edit This Location</button></div>`;
            
            // Add the edit button before the closing div
            const editableContent = content.replace('</div>', editButton + '</div>');
            
            return window.originalCreateMarker(position, title, color, editableContent);
        };
        
        // Create a global function to handle edit clicks - much simpler approach
        window.openEditFor = function(locationName) {
            // Try to initialize editor on-demand if it doesn't exist
            if (!window.familyEditor) {
                try {
                    if (typeof familyAddresses !== 'undefined') {
                        window.familyEditor = new FamilyRecordEditor(
                            familyAddresses, 
                            historicalContext, 
                            notableFigures || []
                        );
                    }
                } catch (error) {
                    alert('Could not initialize editor. Please refresh the page.');
                    return;
                }
            }
            
            // Now try to edit
            if (window.familyEditor && window.familyEditor.editRecord) {
                window.familyEditor.editRecord(locationName);
            } else {
                alert('Editor could not be loaded. Please refresh the page and try again.');
            }
        };
    }
    
    editRecord(locationName) {
        try {
            // Find the record to edit
            const allRecords = [
                ...this.familyAddresses.map(r => ({...r, type: 'family'})),
                ...this.historicalContext.map(r => ({...r, type: 'historical'})),
                ...(this.notableFigures || []).map(r => ({...r, type: 'notable'}))
            ];
            
            const record = allRecords.find(r => r.name === locationName);
            
            if (record) {
                this.openEditModal(record);
            } else {
                this.showMessage(`Could not find "${locationName}" to edit. Please try again.`, 'error');
            }
        } catch (error) {
            this.showMessage('Error opening editor. Please refresh and try again.', 'error');
        }
    }
    
    openEditModal(record = null) {
        this.currentEditingRecord = record;
        const modal = document.getElementById('edit-modal');
        const form = document.getElementById('edit-record-form');
        
        // Set modal title
        document.getElementById('edit-modal-title').textContent = 
            record ? 'Edit Family Record' : 'Add New Family Location';
        
        // Populate form if editing existing record
        if (record) {
            document.getElementById('edit-name').value = record.name || '';
            document.getElementById('edit-address').value = record.address || '';
            document.getElementById('edit-year').value = record.year || '';
            document.getElementById('edit-family').value = record.family || '';
            document.getElementById('edit-details').value = record.details || '';
            document.getElementById('edit-link').value = record.link || '';
            
            // Show current images
            this.displayCurrentImages(record);
        } else {
            form.reset();
            document.getElementById('current-images').innerHTML = '';
        }
        
        modal.classList.remove('hidden');
    }
    
    closeEditModal() {
        document.getElementById('edit-modal').classList.add('hidden');
        this.currentEditingRecord = null;
        document.getElementById('edit-record-form').reset();
        document.getElementById('current-images').innerHTML = '';
    }
    
    displayCurrentImages(record) {
        const container = document.getElementById('current-images');
        container.innerHTML = '';
        
        const images = record.images || (record.image ? [record.image] : []);
        
        if (images.length > 0) {
            images.forEach((image, index) => {
                const imageDiv = document.createElement('div');
                imageDiv.className = 'current-image-item';
                imageDiv.innerHTML = `
                    <img src="images/${image}" alt="Current image" style="width: 100px; height: 80px; object-fit: cover; border-radius: 4px;">
                    <button type="button" class="remove-image-btn" onclick="familyEditor.removeImage(${index})">×</button>
                `;
                container.appendChild(imageDiv);
            });
        } else {
            container.innerHTML = '<p class="no-images">No images currently</p>';
        }
    }
    
    removeImage(index) {
        if (this.currentEditingRecord && this.currentEditingRecord.images) {
            this.currentEditingRecord.images.splice(index, 1);
            this.displayCurrentImages(this.currentEditingRecord);
        }
    }
    
    previewImages(event) {
        const files = event.target.files;
        const previewContainer = document.createElement('div');
        previewContainer.className = 'image-preview-container';
        
        // Remove existing preview
        const existingPreview = document.querySelector('.image-preview-container');
        if (existingPreview) {
            existingPreview.remove();
        }
        
        if (files.length > 0) {
            previewContainer.innerHTML = '<h4>New Images Preview:</h4>';
            
            Array.from(files).forEach((file, index) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const imageDiv = document.createElement('div');
                        imageDiv.className = 'preview-image-item';
                        imageDiv.innerHTML = `
                            <img src="${e.target.result}" alt="Preview" style="width: 100px; height: 80px; object-fit: cover; border-radius: 4px;">
                            <span class="image-name">${file.name}</span>
                        `;
                        previewContainer.appendChild(imageDiv);
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            // Insert preview after the file input
            const fileInput = document.getElementById('edit-images');
            fileInput.parentNode.insertBefore(previewContainer, fileInput.nextSibling);
        }
    }
    
    saveRecord(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const recordData = {
            name: formData.get('name'),
            address: formData.get('address'),
            year: formData.get('year'),
            family: formData.get('family'),
            details: formData.get('details'),
            link: formData.get('link'),
            contributor: formData.get('contributor'),
            editDate: new Date().toISOString(),
            isUserEdit: true
        };
        
        // Handle images
        const imageFiles = formData.getAll('images');
        if (imageFiles.length > 0) {
            recordData.newImages = imageFiles;
        }
        
        // If editing existing record, preserve existing images
        if (this.currentEditingRecord) {
            recordData.existingImages = this.currentEditingRecord.images || 
                                       (this.currentEditingRecord.image ? [this.currentEditingRecord.image] : []);
            recordData.originalRecord = this.currentEditingRecord;
        }
        
        // Add to pending changes
        const changeId = this.generateChangeId();
        this.pendingChanges[changeId] = {
            id: changeId,
            type: this.currentEditingRecord ? 'edit' : 'add',
            data: recordData,
            timestamp: new Date().toISOString()
        };
        
        this.savePendingChanges();
        this.updatePendingChangesIndicator();
        this.closeEditModal();
        
        // Show success message
        this.showMessage('Changes saved locally! Click "Submit" to share with family.', 'success');
        
        // If it's a new record, add it to the map immediately for preview
        if (!this.currentEditingRecord) {
            this.previewNewRecord(recordData);
        }
    }
    
    previewNewRecord(recordData) {
        // Add temporary marker to map for immediate feedback
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: recordData.address }, (results, status) => {
            if (status === 'OK') {
                const content = `
                    <div class="popup-content">
                        <h3>${recordData.name} <span class="preview-badge">PREVIEW</span></h3>
                        <p><strong>Year:</strong> ${recordData.year}</p>
                        <p><strong>Address:</strong> ${recordData.address}</p>
                        <p>${recordData.details}</p>
                        <p><em>This is a preview of your new location. Submit your changes to make it permanent.</em></p>
                    </div>
                `;
                
                const marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    title: recordData.name,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: '#FF6B35',
                        fillOpacity: 0.8,
                        strokeWeight: 2,
                        strokeColor: '#ffffff',
                        scale: 12
                    }
                });
                
                const infoWindow = new google.maps.InfoWindow({
                    content: content,
                    maxWidth: 360
                });
                
                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            }
        });
    }
    
    showPendingChanges() {
        const changes = Object.values(this.pendingChanges);
        if (changes.length === 0) {
            this.showMessage('No pending changes.', 'info');
            return;
        }
        
        let changesHtml = '<div class="changes-summary"><h3>Your Pending Changes:</h3>';
        
        changes.forEach(change => {
            const date = new Date(change.timestamp).toLocaleDateString();
            changesHtml += `
                <div class="change-item">
                    <strong>${change.type === 'add' ? 'New Location' : 'Edit'}: ${change.data.name}</strong>
                    <p>Date: ${date}</p>
                    ${change.data.contributor ? `<p>By: ${change.data.contributor}</p>` : ''}
                    <button onclick="familyEditor.removeChange('${change.id}')" class="remove-change-btn">Remove</button>
                </div>
            `;
        });
        
        changesHtml += '</div>';
        
        this.showMessage(changesHtml, 'info', false);
    }
    
    removeChange(changeId) {
        delete this.pendingChanges[changeId];
        this.savePendingChanges();
        this.updatePendingChangesIndicator();
        this.showMessage('Change removed.', 'success');
    }
    
    submitAllChanges() {
        const changes = Object.values(this.pendingChanges);
        if (changes.length === 0) {
            this.showMessage('No changes to submit.', 'info');
            return;
        }
        
        // In a real implementation, this would send to a server
        // For now, we'll simulate the submission
        this.showSubmissionModal(changes);
    }
    
    showSubmissionModal(changes) {
        const modal = document.createElement('div');
        modal.className = 'submission-modal';
        modal.innerHTML = `
            <div class="submission-modal-content">
                <h2>Submit Changes to Family</h2>
                <p>You're about to submit ${changes.length} change(s) to the family history:</p>
                <ul>
                    ${changes.map(change => `<li>${change.type === 'add' ? 'New' : 'Edit'}: ${change.data.name}</li>`).join('')}
                </ul>
                <p><strong>How would you like to share these changes?</strong></p>
                <div class="submission-options">
                    <button onclick="familyEditor.submitViaEmail()" class="submit-option-btn">📧 Email to Family</button>
                    <button onclick="familyEditor.exportChanges()" class="submit-option-btn">💾 Export Data</button>
                    <button onclick="familyEditor.shareChanges()" class="submit-option-btn">📱 Share</button>
                </div>
                <div class="submission-actions">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" class="cancel-btn">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    submitViaEmail() {
        const changes = Object.values(this.pendingChanges);
        const emailBody = this.formatChangesForEmail(changes);
        const subject = `Family History Updates - ${changes.length} changes`;
        
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
        
        this.showMessage('Email client opened. Send the email to share your changes!', 'success');
    }
    
    exportChanges() {
        const changes = Object.values(this.pendingChanges);
        const exportData = {
            exportDate: new Date().toISOString(),
            changes: changes,
            familyMapVersion: '1.0'
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `family-history-changes-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showMessage('Changes exported! Share this file with family members.', 'success');
    }
    
    shareChanges() {
        if (navigator.share) {
            const changes = Object.values(this.pendingChanges);
            const shareText = this.formatChangesForSharing(changes);
            
            navigator.share({
                title: 'Family History Updates',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback for browsers without Web Share API
            const changes = Object.values(this.pendingChanges);
            const shareText = this.formatChangesForSharing(changes);
            
            navigator.clipboard.writeText(shareText).then(() => {
                this.showMessage('Changes copied to clipboard! Paste to share with family.', 'success');
            });
        }
    }
    
    formatChangesForEmail(changes) {
        let body = `Hi Family!\n\nI've made some updates to our family history map:\n\n`;
        
        changes.forEach((change, index) => {
            body += `${index + 1}. ${change.type === 'add' ? 'Added new location' : 'Updated'}: ${change.data.name}\n`;
            body += `   Address: ${change.data.address}\n`;
            body += `   Year: ${change.data.year}\n`;
            if (change.data.details) {
                body += `   Details: ${change.data.details}\n`;
            }
            body += `\n`;
        });
        
        body += `View the updated map at: ${window.location.href}\n\n`;
        body += `Best regards!`;
        
        return body;
    }
    
    formatChangesForSharing(changes) {
        let text = `🏠 Family History Updates!\n\n`;
        text += `I've added ${changes.length} update(s) to our family map:\n\n`;
        
        changes.forEach((change, index) => {
            text += `${index + 1}. ${change.data.name} (${change.data.year})\n`;
        });
        
        text += `\nCheck it out: ${window.location.href}`;
        
        return text;
    }
    
    // Utility methods
    generateChangeId() {
        return 'change_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    savePendingChanges() {
        localStorage.setItem('family-map-pending-changes', JSON.stringify(this.pendingChanges));
    }
    
    loadPendingChanges() {
        const saved = localStorage.getItem('family-map-pending-changes');
        return saved ? JSON.parse(saved) : {};
    }
    
    updatePendingChangesIndicator() {
        const indicator = document.getElementById('pending-changes');
        const changeCount = Object.keys(this.pendingChanges).length;
        
        if (changeCount > 0) {
            indicator.classList.remove('hidden');
            document.querySelector('.changes-text').textContent = 
                `You have ${changeCount} unsaved change${changeCount > 1 ? 's' : ''}`;
        } else {
            indicator.classList.add('hidden');
        }
    }
    
    showMessage(message, type = 'info', autoClose = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-toast message-${type}`;
        messageDiv.innerHTML = typeof message === 'string' ? message : message;
        
        document.body.appendChild(messageDiv);
        
        if (autoClose) {
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }
        
        // Add close button for non-auto-closing messages
        if (!autoClose) {
            const closeBtn = document.createElement('button');
            closeBtn.textContent = '×';
            closeBtn.className = 'message-close-btn';
            closeBtn.onclick = () => messageDiv.remove();
            messageDiv.appendChild(closeBtn);
        }
    }
}

// Simple initialization - just try once when everything loads
let familyEditor;

// Try to initialize when the page is fully loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        if (typeof familyAddresses !== 'undefined' && !window.familyEditor) {
            try {
                familyEditor = new FamilyRecordEditor(
                    familyAddresses, 
                    historicalContext, 
                    notableFigures || []
                );
                window.familyEditor = familyEditor;
            } catch (error) {
                // Silent fail - will initialize on-demand when needed
            }
        }
    }, 500);
});