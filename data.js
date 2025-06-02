const familyColors = {
    'Coufal': '#e74c3c',
    'McKee': '#9b59b6',
    'Beasley': '#3498db',
    'Reckler': '#f1c40f',
    'Krotman': '#2ecc71'
};

const familyAddresses = [
    // Coufal Family
    {
        name: "Anna Buckley Home (1905)",
        address: "252 West 44th Street, Manhattan, New York, NY",
        year: 1905,
        family: "Coufal",
        details: "Anna Buckley (age 6) lived here. Her mother Mary worked as a janitor.",
        image: "252_w_44th_st_manhattan._1905_anna_buckley_age_6._mother_mary_janitor.png"
    },
    {
        name: "Sebastian & Antoinette Coufal Home (1910)",
        address: "509 West 48th Street, New York, NY",
        year: 1910,
        family: "Coufal",
        details: "Sebastian (age 33) and Antoinette (age 34) lived here with their children, including Frank (age 3). Sebastian worked as a cigar maker and Antoinette as a saleswoman at a department store.",
        image: "509_West_48_Street._1910_anna_buckley_age_11._mother_mary_saleswoman_at_dept_store.png"
    },
    {
        name: "Frank & Anna Coufal Home (1920)",
        address: "534 East 5th Street, Manhattan, New York, NY",
        year: 1920,
        family: "Coufal",
        details: "Frank worked as a plumber",
        image: "534_East_5_Street_frank_anna.png"
    },
    {
        name: "Frank & Anna Coufal Home (1930)",
        address: "87-14 87th Street, Queens, New York, NY",
        year: 1930,
        family: "Coufal",
        details: "Frank worked as a plumber in the building industry",
        image: "87-14_87th_St_queens_coufal_1940.png"
    },
    {
        name: "Frank & Anna Coufal Home (1940)",
        address: "219-27 114th Avenue, Queens, New York, NY",
        year: 1940,
        family: "Coufal",
        details: "Lived here with their sons Donald (22) and Frank Jr. (25)",
        image: "coufal1940.png"
    },

    // McKee Family
    {
        name: "Edward & Annie McKee Home (1910)",
        address: "335 East 93rd Street, Manhattan, New York, NY",
        year: 1910,
        family: "McKee",
        details: "Edward McKee's house, where Emma Beasley lived at age 20",
        image: "335_East_93_Street_emma_beasley_20_yrs_old._edward_mckee_father_house.png"
    },

    // Beasley Family
    {
        name: "Robert & Elizabeth Beasley Home (1910)",
        address: "214 East 10th Street, Manhattan, New York, NY",
        year: 1910,
        family: "Beasley",
        details: "Robert worked as a Horse Dealer",
        image: "214_East_10_Street_beasley_horse_dealer_not_house.png"
    },
    {
        name: "Walter Beasley Family Home (1910-1920)",
        address: "406 East 79th Street, Manhattan, New York, NY",
        year: "1910-1920",
        family: "Beasley",
        details: "Walter Beasley (age 14-24) lived here with parents Robert (horse dealer) and Elizabeth from 1910-1920",
        image: "406_e_79_1910-1920_walter_beasley_age_14-24._parents_robert_(horse_dealer)_and_elizabeth.png"
    },
    {
        name: "Walter & Emma Beasley Home (1930)",
        address: "115-57 217th Street, Queens, New York, NY",
        year: 1930,
        family: "Beasley",
        details: "Walter & Emma's home where their daughter Edna grew up",
        images: ["115_57_217_Street.png", "walter_beasley_queens.png"]
    },
    {
        name: "Walter & Emma Beasley Home (1940)",
        address: "88-14 168th Street, Queens, New York, NY",
        year: 1940,
        family: "Beasley",
        details: "Walter worked as a supervisor at the Telephone Company",
        image: "88_14_168_Street.png"
    },
    {
        name: "Walter & Emma Beasley Home (1950)",
        address: "1 South Gate, Massapequa, New York, NY",
        year: 1950,
        family: "Beasley",
        details: "Walter and Emma Beasley's home",
        image: "1_s_gate_massapequa_new_york._walter_and_emma_beasley.png"
    },

    // Reckler Family
    {
        name: "Harry Reckler Childhood Home (1910)",
        address: "87 Clinton Street, Manhattan, New York, NY",
        year: 1910,
        family: "Reckler",
        details: "Harry (Hersch) (age 13) lived here with his brother Sam (Salomon) (age 7), sister Rosa (age 16), and mother Chaje (age 42)",
        image: "87_clinton_st_manhattan._1910_harry_reckler_age_13,_sam_7._rosa_16_mother_chaje_42_.png"
    },
    {
        name: "Harry & Anna Reckler Bakery (1930)",
        address: "5816 Fort Hamilton Parkway, Brooklyn, New York, NY",
        year: 1930,
        family: "Reckler",
        details: "Harry and Anna owned and operated their bakery at this location",
        image: "recklerbrooklynbakery_ft_hamilton.png"
    },
    {
        name: "Sam Reckler Home (1930)",
        address: "769 Arnow Avenue, Bronx, New York, NY",
        year: 1930,
        family: "Reckler",
        details: "Sam Reckler's home with Henrietta and daughter Coralie",
        image: "769_arnow_ave_bronx._1930_sam_reckler_home_with_henrietta,_daughter_coralie.png"
    },
    {
        name: "Harry & Anna Reckler Home (1940)",
        address: "2145 Garden Street, Bronx, New York, NY",
        year: 1940,
        family: "Reckler",
        details: "Harry and Anna's residence. Claire lived here when she was 15 years old",
        image: "2145_garden_st.png"
    },
    {
        name: "Sam Reckler Home (1940)",
        address: "108-41 66th Road, Queens, New York, NY",
        year: 1940,
        family: "Reckler",
        details: "Sam Reckler's home with Henrietta and daughters Coralie and Ruth",
        image: "108-41_66_rd._1940_sam_reckler_home_with_hentrietta._daughters_coralie_and_ruth_.png"
    },
    {
        name: "Harry & Anna Reckler Bakery (1940s)",
        address: "765 East 182nd Street, Bronx, New York, NY",
        year: 1940,
        family: "Reckler",
        details: "Harry and Anna owned and operated their bakery at this location in the 1940s",
        image: "765_East_182_Street_reckler_bakery_1940s.png"
    },
    {
        name: "Harry & Anna Reckler Bakery (1950)",
        address: "144-12 Hissons Boulevard, Queens, New York, NY",
        year: 1950,
        family: "Reckler",
        details: "Harry and Anna owned and operated their bakery at this location",
        image: "144-12_hissons_blvd_queens_reckler_bakery.png"
    },

    // Krotman Family
    {
        name: "Fannie Hermann Family Home (1905)",
        address: "216 East 3rd Street, Manhattan, New York, NY",
        year: 1905,
        family: "Krotman",
        details: "Fannie Hermann (age 17) lived here with her father Joseph (Romanian fruit vendor), brother Tony (decorator), brother Louis (clothing dealer), and sister Regina (millinery)",
        image: "216_e_3rd_st_manhattan._1905_fannie_hermann_age_17._father_joseph_romanian_fruit_vendor._brother_tony_decorator_brother_louis_clothing_dealer_sister_regina_millinery.png"
    },
    {
        name: "Fannie Hermann Home (1910)",
        address: "288 East 2nd Street, Manhattan, New York, NY",
        year: 1910,
        family: "Krotman",
        details: "Fannie (age 23)",
        image: "288_e_2nd_st_manhattan_fannie_1910_age_23.png"
    },
    {
        name: "Joseph & Fannie Krotman Home (1920)",
        address: "1524 Washington Avenue, Bronx, New York, NY",
        year: 1920,
        family: "Krotman",
        details: "Joseph (age 32), Fannie (age 31), and Eli (age 3). Joseph worked as a furniture salesman",
        image: "1524_washington_ave_1920_joseph_krotman_32,_fannie_krotman_31,_eli_3.png"
    },
    {
        name: "Joseph & Rose Krotman Home (1930)",
        address: "3604 Olinville Avenue, Bronx, New York, NY",
        year: 1930,
        family: "Krotman",
        details: "Joseph (age 40), Rose (age 32), and Eli (age 12)",
        image: "3604_Olinville_Avenue_1930_joseph_krotman_age_40,_rose_32,_eli_12.png"
    },
    {
        name: "Eli Krotman - Townsend Harris High School (1935)",
        address: "17 Lexington Avenue, New York, NY 10010",
        year: 1935,
        family: "Krotman",
        details: "Eli Krotman attended Townsend Harris High School, which was located in the 23rd Street Building of City College (now part of Baruch College). The school was known for its rigorous academics and produced many distinguished alumni.",
        image: "townsend_harris_hs_eli_krotman.jpg",
        link: "https://blogs.baruch.cuny.edu/baruchcollegearchives/?p=282"
    },
    {
        name: "Claire Reckler High School (1942)",
        address: "500 East Fordham Road, Bronx, New York, NY",
        year: 1942,
        family: "Reckler",
        details: "Claire Reckler attended Theodore Roosevelt High School",
        image: "claire_reckler_1942_high_school_yearbook,_theodore_roosevelt_high_school_500_E_Fordham_Rd,_Bronx,_NY.png"
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
    // Lower East Side
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