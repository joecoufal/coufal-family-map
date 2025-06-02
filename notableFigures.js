const notableFigures = [
    // Lower East Side
    {
        name: "Irving Berlin Home",
        address: "330 Cherry Street, Manhattan, New York, NY",
        year: "1893-1906",
        details: "Irving Berlin, one of America's greatest songwriters, lived here as a child after immigrating from Russia. Born Israel Beilin, he went on to compose over 1,500 songs including 'White Christmas', 'God Bless America', and 'There's No Business Like Show Business'.",
        link: "https://en.wikipedia.org/wiki/Irving_Berlin"
    },
    {
        name: "George & Ira Gershwin Childhood Home",
        address: "91 Second Avenue, Manhattan, New York, NY",
        year: "1904-1917",
        details: "The Gershwin brothers lived on the second floor of this building in the heart of the Yiddish Theatre District. It was here that George first played piano after the family acquired one, which had to be hoisted through the window. George and Ira would go on to create some of America's most beloved music including 'Rhapsody in Blue' and the opera 'Porgy and Bess'.",
        link: "https://gershwininnewyork.wordpress.com/gershwin-homes/"
    },
    {
        name: "Al Jolson Residence",
        address: "133 East 7th Street, Manhattan, New York, NY",
        year: "1894-1906",
        details: "Al Jolson, known as 'The World's Greatest Entertainer,' lived in this area as a young immigrant. He would go on to become a pioneering singer, comedian, and actor, starring in 'The Jazz Singer' (1927), the first feature-length motion picture with synchronized dialogue.",
        link: "https://en.wikipedia.org/wiki/Al_Jolson"
    },
    {
        name: "Emma Goldman Residence",
        address: "208 East 13th Street, Manhattan, New York, NY",
        year: "1903-1913",
        details: "Emma Goldman, the influential anarchist, feminist, and writer, lived at this address in the early 1900s. From this location, she published the radical journal 'Mother Earth' and became one of the most prominent political activists of her era.",
        link: "https://www.nyclgbtsites.org/site/emma-goldman-residence/"
    },

    // Yorkville
    {
        name: "Lou Gehrig Birthplace",
        address: "309 East 94th Street, Manhattan, New York, NY",
        year: 1903,
        details: "Baseball legend Lou Gehrig was born here on June 19, 1903. Known as 'The Iron Horse,' Gehrig played 17 seasons for the New York Yankees and set several MLB records. His career was cut short by amyotrophic lateral sclerosis (ALS), now commonly referred to as Lou Gehrig's disease.",
        link: "https://www.baseball-reference.com/players/g/gehrilo01.shtml"
    },
    {
        name: "Marx Brothers Family Home",
        address: "179 East 93rd Street, Manhattan, New York, NY",
        year: "1895-1909",
        details: "The legendary Marx Brothers—Chico, Harpo, Groucho, Gummo, and Zeppo—grew up in this Yorkville tenement. Their distinctive comedy style, honed in vaudeville before transitioning to Broadway and Hollywood, made them one of the most influential comedy acts of the 20th century.",
        link: "https://www.marx-brothers.org/"
    },
    {
        name: "James Cagney Childhood Home",
        address: "265 East 204th Street, Bronx, New York, NY",
        year: "1899-1918",
        details: "James Cagney, the Academy Award-winning actor known for tough-guy roles and versatile performances, grew up in this neighborhood. His career spanned more than five decades, with memorable performances in films like 'The Public Enemy' and 'Yankee Doodle Dandy'.",
        link: "https://en.wikipedia.org/wiki/James_Cagney"
    },

    // Bronx
    {
        name: "Fiorello La Guardia Residence",
        address: "5020 Goodridge Avenue, Bronx, New York, NY",
        year: "1945-1947",
        details: "Fiorello La Guardia, the 99th Mayor of New York City (1934-1945), lived in this English Tudor-style mansion in the Fieldston neighborhood after completing his third term as mayor. Known as 'The Little Flower,' La Guardia was a reformist who helped rebuild the city during the Great Depression and World War II.",
        link: "https://en.wikipedia.org/wiki/Fiorello_La_Guardia"
    },
    {
        name: "Edgar Allan Poe Cottage",
        address: "2640 Grand Concourse, Bronx, New York, NY",
        year: "1846-1849",
        details: "Edgar Allan Poe, the renowned poet and author, spent his final years in this small cottage in what was then rural Fordham. While living here, he wrote several of his most famous works, including 'The Bells', 'Annabel Lee', and 'The Cask of Amontillado'.",
        link: "https://www.bronxhistoricalsociety.org/poe-cottage"
    },
    {
        name: "Theodore Roosevelt's Childhood Summer Home",
        address: "Mosholu Parkway, Bronx, New York, NY",
        year: "1870s",
        details: "The future 26th President of the United States, Theodore Roosevelt, spent summers in the Bronx as a child. His family owned a summer home near what is now Mosholu Parkway. These early experiences in nature helped shape his later conservation efforts as president.",
        link: "https://www.nps.gov/thrb/index.htm"
    },

    // Queens
    {
        name: "Louis Armstrong House",
        address: "34-56 107th Street, Corona, Queens, New York, NY",
        year: "1943-1971",
        details: "Jazz legend Louis 'Satchmo' Armstrong lived in this modest house in Corona with his wife Lucille from 1943 until his death in 1971. Now a museum, the home preserves the legacy of one of the most influential musicians in jazz history, known for his distinctive gravelly voice and virtuosic trumpet playing.",
        link: "https://www.louisarmstronghouse.org/"
    },
    {
        name: "Ella Fitzgerald Residence",
        address: "179-32 Murdock Avenue, St. Albans, Queens, New York, NY",
        year: "1949-1956",
        details: "Ella Fitzgerald, the 'First Lady of Song' and one of the greatest jazz vocalists of all time, lived in the Addisleigh Park neighborhood of St. Albans. This area was home to many prominent African American musicians and entertainers during the mid-20th century.",
        link: "https://en.wikipedia.org/wiki/Ella_Fitzgerald"
    },
    {
        name: "Count Basie Residence",
        address: "174-27 Adelaide Road, Jamaica, Queens, New York, NY",
        year: "1940-1982",
        details: "Jazz pianist and bandleader Count Basie lived in this house in the Addisleigh Park neighborhood from the early 1940s until 1982. His influential swing orchestra helped define the sound of big band jazz, and his neighbors included other jazz luminaries like Lena Horne and Mercer Ellington.",
        link: "https://en.wikipedia.org/wiki/Count_Basie"
    },
    {
        name: "Malcolm X Residence",
        address: "23-11 97th Street, East Elmhurst, Queens, New York, NY",
        year: "1959-1965",
        details: "Civil rights leader Malcolm X lived in this modest home with his wife Betty Shabazz and their children until his assassination in 1965. The house was firebombed just a week before his death, an event that foreshadowed the violence that would take his life.",
        link: "https://en.wikipedia.org/wiki/Malcolm_X"
    },
    {
        name: "Jackie Robinson Home",
        address: "112-40 177th Street, St. Albans, Queens, New York, NY",
        year: "1949-1955",
        details: "Baseball pioneer Jackie Robinson, who broke Major League Baseball's color barrier in 1947, lived in this house in the Addisleigh Park neighborhood. Robinson and his family were among the first African Americans to move into what had previously been a whites-only community.",
        link: "https://www.jackierobinson.com/"
    }
];