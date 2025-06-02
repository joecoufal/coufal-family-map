const historicalContext = [
    // Lower East Side
    {
        name: "Lower East Side Jewish Community (1900-1910)",
        address: "Essex Street and Delancey Street, Manhattan, New York, NY",
        year: "1900-1910",
        details: "The Lower East Side was the heart of Jewish immigrant life in New York, particularly around Essex and Clinton Streets where the Reckler family lived. The neighborhood was filled with kosher shops, synagogues, and Yiddish theaters.",
        links: [
            {
                text: "Lower East Side History",
                url: "https://www.tenement.org/explore/lower-east-side-history/"
            }
        ]
    },
    {
        name: "Forward Building",
        address: "175 East Broadway, Manhattan, New York, NY",
        year: "1900-1910",
        details: "The iconic Forward Building, completed in 1912, was home to the Jewish Daily Forward newspaper. It served as a beacon for Jewish immigrants, providing news, advice, and connection to the old country. The paper helped immigrants navigate American life while maintaining their cultural identity.",
        links: [
            {
                text: "Forward Building History",
                url: "https://www.nytimes.com/2013/02/17/realestate/the-forward-building-a-monument-to-jewish-immigration.html"
            }
        ]
    },
    {
        name: "Eldridge Street Synagogue",
        address: "12 Eldridge Street, Manhattan, New York, NY",
        year: "1900-1910",
        details: "Completed in 1887, this synagogue was the first great house of worship built by Eastern European Jews in America. Its magnificent architecture and ornate design demonstrated the rising prosperity and ambitions of the immigrant Jewish community.",
        links: [
            {
                text: "Eldridge Street Synagogue",
                url: "https://www.eldridgestreet.org/history/"
            }
        ]
    },
    {
        name: "Katz's Delicatessen",
        address: "205 East Houston Street, Manhattan, New York, NY",
        year: "1900-1910",
        details: "Founded in 1888, Katz's became an institution in the Jewish community. The deli served as both a gathering place and a taste of traditional Eastern European Jewish cuisine. During WWII, the tradition of 'Send a Salami to Your Boy in the Army' began here.",
        links: [
            {
                text: "Katz's History",
                url: "https://www.katzsdelicatessen.com/history"
            }
        ]
    },

    // East Village Czech Community
    {
        name: "East Village Czech Community (1905-1920)",
        address: "First Avenue and East 5th Street, Manhattan, New York, NY",
        year: "1905-1920",
        details: "The East Village, particularly around First Avenue, was home to a significant Czech and Slovak community. The area where the Coufal family lived featured Czech restaurants, social clubs, and the historic Jan Hus Presbyterian Church.",
        links: [
            {
                text: "Czech New York History",
                url: "https://www.bohemianbenevolent.org/history"
            }
        ]
    },
    {
        name: "Bohemian National Hall",
        address: "321 East 73rd Street, Manhattan, New York, NY",
        year: "1895-1920",
        details: "Built in 1896, this Renaissance Revival building served as the cultural and social center for New York's Czech and Slovak community. It housed numerous cultural organizations, a gymnasium, and ballroom where community events were held.",
        links: [
            {
                text: "Bohemian National Hall",
                url: "https://www.bohemianbenevolent.org/"
            }
        ]
    },
    {
        name: "Jan Hus Presbyterian Church",
        address: "351 East 74th Street, Manhattan, New York, NY",
        year: "1880-1920",
        details: "Founded in 1877 as a Czech Presbyterian church, it served the immigrant community with both religious services and social support. The church provided English classes and aid to new immigrants, helping them adjust to life in America.",
        links: [
            {
                text: "Jan Hus Church History",
                url: "https://www.janhus.org/history"
            }
        ]
    },

    // Yorkville
    {
        name: "Yorkville German-Czech Community (1910-1920)",
        address: "East 73rd Street and First Avenue, Manhattan, New York, NY",
        year: "1910-1920",
        details: "Yorkville was home to a large German and Czech population, with many businesses and cultural institutions around 72nd Street and First Avenue where the Coufal family resided.",
        links: [
            {
                text: "Yorkville History",
                url: "https://www.6sqft.com/yorkville-history-upper-east-side-german-hungarian-czech/"
            }
        ]
    },
    {
        name: "Glaser's Bake Shop",
        address: "1670 First Avenue, Manhattan, New York, NY",
        year: "1902-1920",
        details: "Founded in 1902 by John Glaser from Bavaria, this bakery became a cornerstone of Yorkville's German community. For over a century, it served traditional German and European pastries, particularly known for their black and white cookies.",
        links: [
            {
                text: "Glaser's History",
                url: "https://ephemralnewyork.wordpress.com/tag/glasers-bake-shop/"
            }
        ]
    },
    {
        name: "Schaller & Weber",
        address: "1654 Second Avenue, Manhattan, New York, NY",
        year: "1937-1950",
        details: "Founded in 1937, this German butcher shop and grocery became an institution in Yorkville. It represented the strong German influence in the neighborhood and provided traditional European meats and products to the community.",
        links: [
            {
                text: "Schaller & Weber History",
                url: "https://www.schallerweber.com/pages/about-us"
            }
        ]
    },

    // Bronx Jewish Community
    {
        name: "Bronx Jewish Migration (1920-1940)",
        address: "Grand Concourse and Fordham Road, Bronx, New York, NY",
        year: "1920-1940",
        details: "Many Jewish families, including the Krotman and Reckler families, moved to the Bronx during this period. The Grand Concourse became known as the 'Jewish Boulevard,' with numerous synagogues and Jewish-owned businesses.",
        links: [
            {
                text: "Bronx Jewish Heritage",
                url: "https://www.bxscience.edu/apps/pages/index.jsp?uREC_ID=219393&type=d"
            }
        ]
    },
    {
        name: "Loew's Paradise Theater",
        address: "2403 Grand Concourse, Bronx, NY",
        year: "1929-1950",
        details: "Opened in 1929, this 'movie palace' represented the grandeur of the Grand Concourse. Its elaborate Italian Baroque design featured a ceiling painted with clouds and stars, making it a cultural centerpiece of the Bronx Jewish community.",
        links: [
            {
                text: "Paradise Theater History",
                url: "https://bronxhistoricalsociety.org/2019/02/15/loews-paradise-theater/"
            }
        ]
    },
    {
        name: "Concourse Plaza Hotel",
        address: "900 Grand Concourse, Bronx, NY",
        year: "1923-1950",
        details: "This elegant hotel was the social center of the South Bronx, hosting Jewish weddings, bar mitzvahs, and community events. It was known as the 'Waldorf-Astoria of the Bronx' and hosted numerous celebrities and politicians.",
        links: [
            {
                text: "Concourse Plaza History",
                url: "https://www.nytimes.com/1987/12/13/realestate/streetscapes-the-concourse-plaza-hotel-the-bronx-s-waldorf-gets-a-new-life.html"
            }
        ]
    },
    {
        name: "Bronx House",
        address: "1637 Washington Avenue, Bronx, NY",
        year: "1920-1950",
        details: "Founded in 1912, this settlement house served as a crucial community center for Jewish immigrants in the Bronx. It offered educational programs, recreational activities, and social services, helping families adjust to American life.",
        links: [
            {
                text: "Bronx House History",
                url: "https://www.bronxhouse.org/about/history/"
            }
        ]
    },

    // Queens Development
    {
        name: "Queens Migration (1930-1950)",
        address: "Jamaica Avenue and 168th Street, Queens, New York, NY",
        year: "1930-1950",
        details: "The period saw many families moving to Queens, including the Beasley, Coufal, and Reckler families. New subway lines and housing developments made Queens an attractive option for upwardly mobile families.",
        links: [
            {
                text: "Queens Development History",
                url: "https://www.queenshistoricalsociety.org/"
            }
        ]
    },
    {
        name: "Jamaica Savings Bank",
        address: "161-02 Jamaica Avenue, Queens, NY",
        year: "1939-1950",
        details: "This Art Deco landmark, built in 1939, symbolized the growth and prosperity of Jamaica, Queens. Its modern design reflected the optimism of the period and the area's transformation into a major commercial center.",
        links: [
            {
                text: "Jamaica Savings Bank History",
                url: "https://www.nycago.org/Organs/NYC/html/JamaicaSavingsBank.html"
            }
        ]
    },
    {
        name: "RKO Keith's Theater",
        address: "135-35 Northern Boulevard, Flushing, Queens, NY",
        year: "1928-1950",
        details: "This atmospheric theater, opened in 1928, was designed in the Spanish Baroque style. It became a cultural landmark in Queens, representing the borough's growing entertainment and cultural scene.",
        links: [
            {
                text: "RKO Keith's History",
                url: "https://queenshistoricalsociety.org/rko-keiths-theater/"
            }
        ]
    }
];