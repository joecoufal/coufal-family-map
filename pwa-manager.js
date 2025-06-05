// Simplified PWA Manager - Just handles installation and offline status
class PWAManager {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.isOnline = navigator.onLine;
        
        this.init();
    }
    
    init() {
        // Register service worker
        this.registerServiceWorker();
        
        // Handle install prompt
        this.handleInstallPrompt();
        
        // Monitor online/offline status
        this.monitorConnectionStatus();
        
        // Check if app is already installed
        this.checkInstallationStatus();
        
        // Create PWA UI elements
        this.createPWAUI();
    }
    
    async registerServiceWorker() {
        // Temporarily disable service worker to debug PWA issues
        console.log('Service Worker registration disabled for debugging');
        return;
        
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/coufal-family-map/sw.js');
                console.log('Service Worker registered successfully:', registration);
                
                // Handle service worker updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            this.showUpdateAvailable();
                        }
                    });
                });
                
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    }
    
    handleInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later
            this.deferredPrompt = e;
            // Show install button
            this.showInstallButton();
        });
        
        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            this.isInstalled = true;
            this.hideInstallButton();
            this.showInstallationSuccess();
        });
    }
    
    monitorConnectionStatus() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.hideOfflineIndicator();
            this.showConnectionRestored();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showOfflineIndicator();
        });
    }
    
    checkInstallationStatus() {
        // Check if app is running in standalone mode
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
            this.isInstalled = true;
        }
    }
    
    createPWAUI() {
        // Create install button
        const installButton = document.createElement('button');
        installButton.id = 'pwa-install-btn';
        installButton.className = 'pwa-install-button hidden';
        installButton.innerHTML = '📱 Install App';
        installButton.onclick = () => this.promptInstall();
        
        // Create offline indicator
        const offlineIndicator = document.createElement('div');
        offlineIndicator.id = 'offline-indicator';
        offlineIndicator.className = 'offline-indicator hidden';
        offlineIndicator.innerHTML = `
            <div class="offline-content">
                <span class="offline-icon">📡</span>
                <span class="offline-text">You're offline. Some features may be limited.</span>
            </div>
        `;
        
        // Create update notification
        const updateNotification = document.createElement('div');
        updateNotification.id = 'update-notification';
        updateNotification.className = 'update-notification hidden';
        updateNotification.innerHTML = `
            <div class="update-content">
                <span class="update-text">A new version is available!</span>
                <button id="update-btn" class="update-button">Update</button>
                <button id="dismiss-update" class="dismiss-button">×</button>
            </div>
        `;
        
        // Add to page
        const header = document.querySelector('.header');
        header.appendChild(installButton);
        document.body.appendChild(offlineIndicator);
        document.body.appendChild(updateNotification);
        
        // Add event listeners
        document.getElementById('update-btn').onclick = () => this.updateApp();
        document.getElementById('dismiss-update').onclick = () => this.dismissUpdate();
        
        // Show install button if not installed
        if (!this.isInstalled && this.deferredPrompt) {
            this.showInstallButton();
        }
        
        // Show offline indicator if offline
        if (!this.isOnline) {
            this.showOfflineIndicator();
        }
    }
    
    showInstallButton() {
        const installBtn = document.getElementById('pwa-install-btn');
        if (installBtn) {
            installBtn.classList.remove('hidden');
        }
    }
    
    hideInstallButton() {
        const installBtn = document.getElementById('pwa-install-btn');
        if (installBtn) {
            installBtn.classList.add('hidden');
        }
    }
    
    async promptInstall() {
        if (this.deferredPrompt) {
            // Show the install prompt
            this.deferredPrompt.prompt();
            
            // Wait for the user to respond to the prompt
            const { outcome } = await this.deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            
            // Clear the deferredPrompt
            this.deferredPrompt = null;
            
            if (outcome === 'accepted') {
                this.hideInstallButton();
            }
        }
    }
    
    showOfflineIndicator() {
        const indicator = document.getElementById('offline-indicator');
        if (indicator) {
            indicator.classList.remove('hidden');
        }
    }
    
    hideOfflineIndicator() {
        const indicator = document.getElementById('offline-indicator');
        if (indicator) {
            indicator.classList.add('hidden');
        }
    }
    
    showConnectionRestored() {
        // Show temporary notification that connection is restored
        const notification = document.createElement('div');
        notification.className = 'connection-restored-notification';
        notification.innerHTML = `
            <div class="connection-content">
                <span class="connection-icon">✅</span>
                <span class="connection-text">Connection restored!</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    showUpdateAvailable() {
        const updateNotification = document.getElementById('update-notification');
        if (updateNotification) {
            updateNotification.classList.remove('hidden');
        }
    }
    
    updateApp() {
        // Send message to service worker to skip waiting
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
        }
        
        // Reload the page to get the new version
        window.location.reload();
    }
    
    dismissUpdate() {
        const updateNotification = document.getElementById('update-notification');
        if (updateNotification) {
            updateNotification.classList.add('hidden');
        }
    }
    
    showInstallationSuccess() {
        // Show success message
        const successNotification = document.createElement('div');
        successNotification.className = 'install-success-notification';
        successNotification.innerHTML = `
            <div class="success-content">
                <span class="success-icon">🎉</span>
                <span class="success-text">App installed successfully!</span>
            </div>
        `;
        
        document.body.appendChild(successNotification);
        
        setTimeout(() => {
            successNotification.remove();
        }, 4000);
    }
}

// Simplified PWA Styles
const pwaStyles = `
.pwa-install-button {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    background: #34a853;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
    z-index: 12;
}

.pwa-install-button:hover {
    background: #2d8f47;
}

.pwa-install-button.hidden {
    display: none;
}

.offline-indicator {
    position: fixed;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff9800;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    animation: slideDown 0.3s ease-out;
}

.offline-indicator.hidden {
    display: none;
}

.offline-content {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
}

.offline-icon {
    font-size: 16px;
}

.update-notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #4285f4;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1001;
    animation: slideUp 0.3s ease-out;
}

.update-notification.hidden {
    display: none;
}

.update-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.update-button {
    background: white;
    color: #4285f4;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
}

.dismiss-button {
    background: none;
    color: white;
    border: none;
    font-size: 18px;
    cursor: pointer;
    padding: 0 4px;
}

.connection-restored-notification {
    position: fixed;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    background: #34a853;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    animation: slideDown 0.3s ease-out;
}

.connection-content {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
}

.install-success-notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #34a853;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1001;
    animation: slideUp 0.3s ease-out;
}

.success-content {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
}

@keyframes slideDown {
    from {
        transform: translateX(-50%) translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        transform: translateX(-50%) translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .pwa-install-button {
        left: 10px;
        font-size: 12px;
        padding: 6px 8px;
    }
    
    .offline-indicator {
        top: 50px;
        left: 10px;
        right: 10px;
        transform: none;
        text-align: center;
    }
    
    .update-notification {
        left: 10px;
        right: 10px;
        transform: none;
    }
    
    .connection-restored-notification {
        top: 50px;
        left: 10px;
        right: 10px;
        transform: none;
        text-align: center;
    }
    
    .install-success-notification {
        left: 10px;
        right: 10px;
        transform: none;
    }
}
`;

// Add PWA styles to document
const pwaStyleSheet = document.createElement('style');
pwaStyleSheet.textContent = pwaStyles;
document.head.appendChild(pwaStyleSheet);

// Initialize PWA Manager
const pwaManager = new PWAManager();