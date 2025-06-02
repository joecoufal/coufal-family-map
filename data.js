const familyColors = {
    'Coufal': '#e74c3c',
    'McKee': '#9b59b6',
    'Beasley': '#3498db',
    'Reckler': '#f1c40f',
    'Krotman': '#2ecc71'
};

const familyAddresses = [
    {
        name: 'Sebastian & Antoinette Coufal (1910)',
        family: 'Coufal',
        year: '1910',
        address: '509 West 48th Street, New York, NY',
        details: 'Sebastian and Antoinette Coufal lived here with their children.',
        displayAddress: '509 West 48th Street'
    },
    {
        name: 'Frank & Anna Coufal (1920-1950)',
        family: 'Coufal',
        year: '1920-1950',
        address: '346 West 48th Street, New York, NY',
        details: 'Frank and Anna Coufal raised their family here.',
        displayAddress: '346 West 48th Street'
    }
];

const historicalContext = [
    {
        name: "Hell's Kitchen Historical District",
        year: '1900s',
        address: 'West 48th Street and 9th Avenue, New York, NY',
        details: "Hell's Kitchen was a working-class neighborhood during this period.",
    }
];

const vintageStyle = [
    {
        "elementType": "geometry",
        "stylers": [{"color": "#ebe3cd"}]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#523735"}]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{"color": "#f5f1e6"}]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#c9b2a6"}]
    }
];