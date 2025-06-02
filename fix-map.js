// This script fixes the map initialization issue
window.addEventListener('DOMContentLoaded', function() {
    // Find and fix the map initialization code
    const mapInitScript = document.querySelector('script:not([src])');
    if (mapInitScript && mapInitScript.textContent.includes('function initMap()')) {
        // Fix the syntax error in the map initialization
        const fixedMapInit = mapInitScript.textContent.replace(
            'styles: vintageStyle\n\s+gestureHandling: \'greedy\',',
            'styles: vintageStyle,\n                gestureHandling: \'greedy\','
        );
        
        // Replace the script content
        const newScript = document.createElement('script');
        newScript.textContent = fixedMapInit;
        mapInitScript.parentNode.replaceChild(newScript, mapInitScript);
    }
});
