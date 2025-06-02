const familyColors = {
    'Coufal': '#e74c3c',
    'McKee': '#9b59b6',
    'Beasley': '#3498db',
    'Reckler': '#f1c40f',
    'Krotman': '#2ecc71'
};

const familyAddresses = [
    {
        name: "Sebastian & Antoinette Coufal Home (1910)",
        address: "509 West 48th Street, New York, NY",
        year: 1910,
        family: "Coufal",
        details: "Sebastian (age 33) and Antoinette (age 34) lived here with their children, including Frank (age 3). Sebastian worked as a cigar maker and Antoinette as a saleswoman at a department store.",
        images: ["509_West_48_Street._1910_anna_buckley_age_11._mother_mary_saleswoman_at_dept_store.png"]
    },
    {
        name: "Frank & Anna Coufal Home (1920-1950)",
        address: "346 West 48th Street, New York, NY",
        year: "1920-1950",
        family: "Coufal",
        details: "Frank (starting age 13) and later his wife Anna lived here. Frank worked as a printer.",
        images: ["346_west_48th_street_1920_frank_13.png", "346_west_48th_street_1930_frank_23_anna_23.png", "346_west_48th_street_1940_frank_33_anna_33.png"]
    },
    {
        name: "Edward & Annie McKee Home (1910)",
        address: "505 West 47th Street, New York, NY",
        year: 1910,
        family: "McKee",
        details: "Edward (age 45) and Annie (age 40) lived here with their children, including Emma (age 15). Edward worked as a watchman.",
        images: ["505_west_47th_street_1910_edward_45_annie_40_emma_15.png"]
    },
    {
        name: "Robert & Elizabeth Beasley Home (1910)",
        address: "424 West 57th Street, New York, NY",
        year: 1910,
        family: "Beasley",
        details: "Robert (age 45) and Elizabeth (age 44) lived here with their children, including Walter (age 15). Robert worked as an elevator operator.",
        images: ["424_west_57th_street_1910_robert_45_elizabeth_44_walter_15.png"]
    },
    {
        name: "Walter & Emma Beasley Home (1930-1950)",
        address: "345 West 58th Street, New York, NY",
        year: "1930-1950",
        family: "Beasley",
        details: "Walter (starting age 35) and Emma (age 35, née McKee) lived here with their daughter Edna. Walter worked as an elevator operator like his father.",
        images: ["345_west_58th_street_1930_walter_35_emma_35_edna_8.png", "345_west_58th_street_1940_walter_45_emma_45_edna_18.png"]
    },
    {
        name: "Harry Reckler Home (1910)",
        address: "73 East 104th Street, New York, NY",
        year: 1910,
        family: "Reckler",
        details: "Harry (Hersch) Reckler (age 40) lived here. He worked as a tailor.",
        images: ["73_east_104th_street_1910_harry_40.png"]
    },
    {
        name: "Harry & Anna Reckler Home (1930-1950)",
        address: "55 East 95th Street, New York, NY",
        year: "1930-1950",
        family: "Reckler",
        details: "Harry (starting age 28) and Anna (age 28) lived here with their daughter Claire. Harry worked as a tailor like his father.",
        images: ["55_east_95th_street_1930_harry_28_anna_28_claire_5.png", "55_east_95th_street_1940_harry_38_anna_38_claire_15.png"]
    },
    {
        name: "Joseph & Fannie Krotman Home (1920)",
        address: "1520 Charlotte Street, Bronx, NY",
        year: 1920,
        family: "Krotman",
        details: "Joseph (age 45) and Fannie (age 43) lived here with their children, including Joseph Jr. (age 13). Joseph worked as a house painter.",
        images: ["1520_charlotte_street_bronx_1920_joseph_45_fannie_43_joseph_13.png"]
    },
    {
        name: "Joseph & Rose Krotman Home (1930-1940)",
        address: "2011 Clinton Avenue, Bronx, NY",
        year: "1930-1940",
        family: "Krotman",
        details: "Joseph Jr. (starting age 23) and Rose (age 23) lived here with their son Eli. Joseph worked as a house painter like his father.",
        images: ["2011_clinton_avenue_bronx_1930_joseph_23_rose_23_eli_3.png", "2011_clinton_avenue_bronx_1940_joseph_33_rose_33_eli_13.png"]
    },
    {
        name: "Eli Krotman - Townsend Harris High School (1935)",
        address: "https://maps.app.goo.gl/EPfWPdYHxf32pwth9",
        displayAddress: "17 Lexington Avenue, New York, NY 10010",
        year: 1935,
        family: "Krotman",
        details: "Eli Krotman attended Townsend Harris High School, which was located in the 23rd Street Building of City College (now part of Baruch College). The school was known for its rigorous academics and produced many distinguished alumni.",
        image: "townsend_harris_hs_eli_krotman.jpg",
        link: "https://blogs.baruch.cuny.edu/baruchcollegearchives/?p=282"
    },
    {
        name: "Eli & Claire Krotman Home (1950)",
        address: "2962 Decatur Avenue, Bronx, New York, NY",
        year: 1950,
        family: "Krotman",
        details: "Eli (age 33) and Claire (age 25)",
        images: ["2962_decatur_ave_bronx._1950_eli_33_claire_25..png", "2962_decatur.png", "2962_decatur_2.png"]
    }
];

const historicalContext = [
    {
        name: "Hell's Kitchen Historical District",
        year: "1900s",
        address: "West 48th Street and 9th Avenue, New York, NY",
        details: "Hell's Kitchen was a working-class neighborhood during this period, home to many immigrant families including Irish, Italian, and Eastern European Jews. The area was characterized by its tenement buildings and proximity to the Hudson River docks and garment district, where many residents worked.",
        links: [
            {
                text: "Hell's Kitchen History",
                url: "https://www.nycgo.com/neighborhoods/hells-kitchen-manhattan"
            }
        ]
    },
    {
        name: "East Harlem Historical District",
        year: "1900s-1910s",
        address: "East 104th Street and Lexington Avenue, New York, NY",
        details: "East Harlem in the early 1900s was home to a significant Jewish population, particularly around 104th Street. Many residents worked in the garment industry or operated small businesses.",
        links: [
            {
                text: "East Harlem History",
                url: "https://www.nypl.org/blog/2015/06/22/east-harlem-history"
            }
        ]
    },
    {
        name: "Carnegie Hill District",
        year: "1930s-1940s",
        address: "East 95th Street and Madison Avenue, New York, NY",
        details: "The Carnegie Hill area, named after Andrew Carnegie's mansion, was an upscale residential neighborhood. By the 1930s, it had become home to many middle-class families.",
        links: [
            {
                text: "Carnegie Hill History",
                url: "https://www.carnegiehill.org/history"
            }
        ]
    },
    {
        name: "Bronx Development",
        year: "1920s-1950s",
        address: "Grand Concourse and Fordham Road, Bronx, NY",
        details: "The Bronx saw significant development in the early-to-mid 20th century. Many Jewish families moved from Manhattan to the Bronx during this period, particularly to neighborhoods around the Grand Concourse.",
        links: [
            {
                text: "Bronx History",
                url: "https://www.bronxhistoricalsociety.org/bronx-history"
            }
        ]
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
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#dcd2be"}]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#ae9e90"}]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{"color": "#dfd2ae"}]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{"color": "#dfd2ae"}]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#93817c"}]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#a5b076"}]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#447530"}]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{"color": "#f5f1e6"}]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{"color": "#fdfcf8"}]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{"color": "#f8c967"}]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#e9bc62"}]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [{"color": "#e98d58"}]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#db8555"}]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#806b63"}]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{"color": "#dfd2ae"}]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#8f7d77"}]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [{"color": "#ebe3cd"}]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{"color": "#dfd2ae"}]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#b9d3c2"}]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#92998d"}]
    }
];