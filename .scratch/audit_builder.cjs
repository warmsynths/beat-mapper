const fs = require('fs');
const path = require('path');

// Reference metadata for all 135 beats: the record (or style) each one is based on.
// Format: id -> { refSong, refArtist, refDrummer, refYear }. refYear is null for styles with no single record.
const AUDIT_DATA = {
  // --- BREAKBEATS (27) ---
  "amen": {
    refSong: "Amen, Brother", refArtist: "The Winstons", refDrummer: "G.C. Coleman", refYear: 1969,
  },
  "apache": {
    refSong: "Apache", refArtist: "Incredible Bongo Band", refDrummer: "Jim Gordon / King Errisson (bongos)", refYear: 1973,
  },
  "impeach": {
    refSong: "Impeach the President", refArtist: "The Honey Drippers", refDrummer: "Uncredited (produced by Roy C. Hammond)", refYear: 1973,
  },
  "skullsnaps": {
    refSong: "It's A New Day", refArtist: "Skull Snaps", refDrummer: "George Bragg", refYear: 1973,
  },
  "ashley": {
    refSong: "Ashley's Roachclip", refArtist: "The Soul Searchers", refDrummer: "Kenneth Scoggins", refYear: 1974,
  },
  "mardigras": {
    refSong: "Take Me to the Mardi Gras", refArtist: "Bob James", refDrummer: "Steve Gadd / Ralph MacDonald (bells)", refYear: 1975,
  },
  "synthetic": {
    refSong: "Synthetic Substitution", refArtist: "Melvin Bliss", refDrummer: "Bernard Purdie", refYear: 1973,
  },
  "godmake": {
    refSong: "God Make Me Funky", refArtist: "The Headhunters", refDrummer: "Mike Clark", refYear: 1975,
  },
  "differentstrokes": {
    refSong: "Different Strokes", refArtist: "Syl Johnson", refDrummer: "Morris Jennings (as commonly credited)", refYear: 1967,
  },
  "singasong": {
    refSong: "Sing a Simple Song", refArtist: "Sly & The Family Stone", refDrummer: "Greg Errico", refYear: 1968,
  },
  "justkissed": {
    refSong: "Just Kissed My Baby", refArtist: "The Meters", refDrummer: "Joseph 'Zigaboo' Modeliste", refYear: 1974,
  },
  "ntbreak": {
    refSong: "N.T. (Do It to the Funky Beat)", refArtist: "Kool & The Gang", refDrummer: "George 'Funky' Brown", refYear: 1971,
  },
  "imglad": {
    refSong: "I'm Glad You're Mine", refArtist: "Al Green", refDrummer: "Howard Grimes / Al Jackson Jr.", refYear: 1972,
  },
  "odebillie": {
    refSong: "Ode to Billie Joe", refArtist: "Lou Donaldson", refDrummer: "Idris Muhammad", refYear: 1967,
  },
  "tramp": {
    refSong: "Tramp", refArtist: "Lowell Fulsom", refDrummer: "Chuck Blackwell / Earl Palmer", refYear: 1967,
  },
  "thechamp": {
    refSong: "The Champ", refArtist: "The Mohawks", refDrummer: "Brian Bennett (The Shadows) / Alan Hawkshaw band", refYear: 1968,
  },
  "longred": {
    refSong: "Long Red", refArtist: "Mountain", refDrummer: "N.D. Smart II", refYear: 1969,
  },
  "scorpio": {
    refSong: "Scorpio", refArtist: "Dennis Coffey", refDrummer: "Richard 'Pistol' Allen / Uriel Jones", refYear: 1971,
  },
  "blindalley": {
    refSong: "Blind Alley", refArtist: "The Emotions", refDrummer: "Al Jackson Jr.", refYear: 1971,
  },
  "giveitup": {
    refSong: "Give It Up or Turnit a Loose", refArtist: "James Brown", refDrummer: "Clyde Stubblefield", refYear: 1970,
  },
  "hotpants": {
    refSong: "Hot Pants (I'm Coming)", refArtist: "Bobby Byrd", refDrummer: "John 'Jabo' Starks", refYear: 1971,
  },
  "thegrunt": {
    refSong: "The Grunt", refArtist: "The J.B.'s", refDrummer: "Jabo Starks / Clyde Stubblefield", refYear: 1970,
  },
  "papawas": {
    refSong: "Papa Was, Too", refArtist: "Joe Tex", refDrummer: "Clyde Stubblefield", refYear: 1966,
  },
  "funkypenguin": {
    refSong: "Do the Funky Penguin", refArtist: "Rufus Thomas", refDrummer: "Willie Hall", refYear: 1971,
  },
  "ufo": {
    refSong: "UFO", refArtist: "ESG", refDrummer: "Valerie Scroggins", refYear: 1981,
  },
  "darkestlight": {
    refSong: "Darkest Light", refArtist: "Lafayette Afro Rock Band", refDrummer: "Ernest 'Donny' Donable", refYear: 1974,
  },
  "hihache": {
    refSong: "Hihache", refArtist: "Lafayette Afro Rock Band", refDrummer: "Ernest 'Donny' Donable", refYear: 1973,
  },

  // --- FUNK (4) ---
  "funky": {
    refSong: "Funky Drummer", refArtist: "James Brown", refDrummer: "Clyde Stubblefield", refYear: 1970,
  },
  "think": {
    refSong: "Think (About It)", refArtist: "Lyn Collins", refDrummer: "John 'Jabo' Starks", refYear: 1972,
  },
  "coldsweat": {
    refSong: "Cold Sweat", refArtist: "James Brown", refDrummer: "Clyde Stubblefield", refYear: 1967,
  },
  "cissy": {
    refSong: "Cissy Strut", refArtist: "The Meters", refDrummer: "Joseph 'Zigaboo' Modeliste", refYear: 1969,
  },

  // --- ROCK (6) ---
  "levee": {
    refSong: "When the Levee Breaks", refArtist: "Led Zeppelin", refDrummer: "John Bonham", refYear: 1971,
  },
  "bigbeat": {
    refSong: "The Big Beat", refArtist: "Billy Squier", refDrummer: "Bobby Chouinard", refYear: 1980,
  },
  "walkthisway": {
    refSong: "Walk This Way", refArtist: "Aerosmith", refDrummer: "Joey Kramer", refYear: 1975,
  },
  "rock": {
    refSong: "Straight Eighths Rock Standard", refArtist: "AC/DC / Rock Standard", refDrummer: "Phil Rudd style", refYear: null,
  },
  "teenspirit": {
    refSong: "Smells Like Teen Spirit", refArtist: "Nirvana", refDrummer: "Dave Grohl", refYear: 1991,
  },
  "dbeat": {
    refSong: "Hear Nothing See Nothing Say Nothing", refArtist: "Discharge", refDrummer: "Garry Maloney", refYear: 1982,
  },

  // --- JAZZ & SOUL / POP / KRAUTROCK (5) ---
  "purdie": {
    refSong: "Babylon Sisters / Home at Last", refArtist: "Steely Dan", refDrummer: "Bernard Purdie", refYear: 1977,
  },
  "sexualhealing": {
    refSong: "Sexual Healing", refArtist: "Marvin Gaye", refDrummer: "Marvin Gaye (Roland TR-808)", refYear: 1982,
  },
  "billie": {
    refSong: "Billie Jean", refArtist: "Michael Jackson", refDrummer: "Leon 'Ndugu' Chancler", refYear: 1982,
  },
  "motown": {
    refSong: "You Can't Hurry Love / Dancing in the Street", refArtist: "The Supremes / Martha & The Vandellas", refDrummer: "Pistol Allen & Benny Benjamin", refYear: 1966,
  },
  "motorik": {
    refSong: "Hallogallo", refArtist: "NEU!", refDrummer: "Klaus Dinger", refYear: 1972,
  },

  // --- LATIN, AFROBEAT, REGGAETON & REGGAE (13) ---
  "bossa": {
    refSong: "The Girl from Ipanema", refArtist: "Stan Getz & João Gilberto", refDrummer: "Milton Banana", refYear: 1964,
  },
  "sonclave": {
    refSong: "Son Clave 3:2 Traditional", refArtist: "Afro-Cuban Traditional", refDrummer: "Changuito / Traditional", refYear: null,
  },
  "rumbaclave": {
    refSong: "Rumba Clave 3:2 Traditional", refArtist: "Afro-Cuban Traditional", refDrummer: "Guaguancó rhythm section", refYear: null,
  },
  "tambor": {
    refSong: "Tamborzão (Baile Funk)", refArtist: "MC Mengo / DJ Marlboro", refDrummer: "Rio Favela Producers", refYear: 1998,
  },
  "songo": {
    refSong: "Sandunguera", refArtist: "Los Van Van", refDrummer: "José Luis Quintana 'Changuito'", refYear: 1984,
  },
  "baion": {
    refSong: "Asa Branca", refArtist: "Luiz Gonzaga", refDrummer: "Traditional Zabumba Section", refYear: 1947,
  },
  "cumbia": {
    refSong: "Cumbia (traditional style)", refArtist: "Colombian standard", refDrummer: "Traditional tambora section", refYear: null,
  },
  "dembow": {
    refSong: "Dem Bow", refArtist: "Shabba Ranks", refDrummer: "Steely & Clevie", refYear: 1990,
  },
  "afrobeat": {
    refSong: "Zombie / Expensive Shit", refArtist: "Fela Kuti & Africa 70", refDrummer: "Tony Allen", refYear: 1975,
  },
  "onedrop": {
    refSong: "One Drop", refArtist: "Bob Marley & The Wailers", refDrummer: "Carlton Barrett", refYear: 1979,
  },
  "steppers": {
    refSong: "Sponji Reggae", refArtist: "Black Uhuru / Sly & Robbie", refDrummer: "Sly Dunbar", refYear: 1981,
  },
  "rockers": {
    refSong: "Rockers (style)", refArtist: "Channel One / The Revolutionaries", refDrummer: "Sly Dunbar", refYear: null,
  },
  "ska": {
    refSong: "Guns of Navarone", refArtist: "The Skatalites", refDrummer: "Lloyd Knibb", refYear: 1965,
  },

  // --- HIP-HOP GOLDEN ERA (23) ---
  "boombap": {
    refSong: "Boom Bap Standard", refArtist: "DJ Premier style", refDrummer: "Sampled breaks / DJ Premier", refYear: null,
  },
  "boombap2bar": {
    refSong: "Boom Bap 2-Bar Loop", refArtist: "Pete Rock / Marley Marl standard", refDrummer: "Sampled funk breaks", refYear: null,
  },
  "massappeal": {
    refSong: "Mass Appeal", refArtist: "Gang Starr", refDrummer: "DJ Premier (Vic Juris sample)", refYear: 1994,
  },
  "troy": {
    refSong: "They Reminisce Over You (T.R.O.Y.)", refArtist: "Pete Rock & CL Smooth", refDrummer: "Pete Rock (Tom Scott sample)", refYear: 1992,
  },
  "nystate": {
    refSong: "N.Y. State of Mind", refArtist: "Nas", refDrummer: "DJ Premier (Joe Chambers sample)", refYear: 1994,
  },
  "shookones": {
    refSong: "Shook Ones Pt. II", refArtist: "Mobb Deep", refDrummer: "Havoc (Quincy Jones sample)", refYear: 1995,
  },
  "cream": {
    refSong: "C.R.E.A.M.", refArtist: "Wu-Tang Clan", refDrummer: "RZA (The Charmels sample)", refYear: 1993,
  },
  "electricrelaxation": {
    refSong: "Electric Relaxation", refArtist: "A Tribe Called Quest", refDrummer: "Q-Tip (Ronnie Foster \"Mystic Brew\" sample)", refYear: 1993,
  },
  "comeclean": {
    refSong: "Come Clean", refArtist: "Jeru the Damaja", refDrummer: "DJ Premier (Shelly Manne sample)", refYear: 1993,
  },
  "halftime": {
    refSong: "Halftime", refArtist: "Nas", refDrummer: "Large Professor (Gary Byrd sample)", refYear: 1992,
  },
  "scenario": {
    refSong: "Scenario", refArtist: "A Tribe Called Quest", refDrummer: "Ali Shaheed & Q-Tip (Brother Jack McDuff sample)", refYear: 1991,
  },
  "survival": {
    refSong: "Survival of the Fittest", refArtist: "Mobb Deep", refDrummer: "Havoc (Barry Harris sample)", refYear: 1995,
  },
  "timesup": {
    refSong: "Time's Up", refArtist: "O.C.", refDrummer: "Buckwild (Les McCann sample)", refYear: 1994,
  },
  "hip2dagame": {
    refSong: "Hip 2 Da Game", refArtist: "Lord Finesse", refDrummer: "Lord Finesse (Oscar Peterson sample)", refYear: 1995,
  },
  "protectyaneck": {
    refSong: "Protect Ya Neck", refArtist: "Wu-Tang Clan", refDrummer: "RZA (The Grunt sample)", refYear: 1992,
  },
  "worstcomes": {
    refSong: "Worst Comes to Worst", refArtist: "Dilated Peoples", refDrummer: "The Alchemist (William Bell sample)", refYear: 2001,
  },
  "whogotdaprops": {
    refSong: "Who Got Da Props", refArtist: "Black Moon", refDrummer: "Da Beatminerz (Ronnie Laws sample)", refYear: 1992,
  },
  "bestkeptsecret": {
    refSong: "Best Kept Secret", refArtist: "Diamond D", refDrummer: "Diamond D (Al Green sample)", refYear: 1992,
  },
  "partyandbull": {
    refSong: "Party and Bullshit", refArtist: "The Notorious B.I.G.", refDrummer: "Easy Mo Bee (Johnny Pate sample)", refYear: 1993,
  },
  "statikswing": {
    refSong: "East Coast Boom Bap Swing", refArtist: "Statik Selektah standard", refDrummer: "MPC swung boom bap", refYear: null,
  },
  "dilla": {
    refSong: "Fall In Love", refArtist: "Slum Village", refDrummer: "J Dilla (Gap Mangione sample)", refYear: 2000,
  },
  "gfunk": {
    refSong: "Nuthin' but a 'G' Thang", refArtist: "Dr. Dre", refDrummer: "Dr. Dre (Leon Haywood sample)", refYear: 1992,
  },
  "timbaland": {
    refSong: "Try Again", refArtist: "Aaliyah", refDrummer: "Timbaland (mouth percussion & Ensoniq ASR-10)", refYear: 2000,
  },

  // --- LO-FI & CHILLHOP (16) ---
  "aruarian": {
    refSong: "Aruarian Dance", refArtist: "Nujabes", refDrummer: "Nujabes (Laurindo Almeida sample)", refYear: 2004,
  },
  "feather": {
    refSong: "Feather", refArtist: "Nujabes", refDrummer: "Nujabes (Yusef Lateef sample)", refYear: 2005,
  },
  "donuttime": {
    refSong: "Time: The Donut of the Heart", refArtist: "J Dilla", refDrummer: "J Dilla (Jackson 5 sample)", refYear: 2006,
  },
  "sofar": {
    refSong: "So Far to Go", refArtist: "J Dilla / Common & D'Angelo", refDrummer: "J Dilla (Isley Brothers sample)", refYear: 2006,
  },
  "workinonit": {
    refSong: "Workinonit", refArtist: "J Dilla", refDrummer: "J Dilla (10cc sample)", refYear: 2006,
  },
  "accordion": {
    refSong: "Accordion", refArtist: "Madvillain (Madlib & MF DOOM)", refDrummer: "Madlib (Daedelus sample)", refYear: 2004,
  },
  "allcaps": {
    refSong: "All Caps", refArtist: "Madvillain (Madlib & MF DOOM)", refDrummer: "Madlib (Ironside sample)", refYear: 2004,
  },
  "lowclass": {
    refSong: "Low Class Conspiracy", refArtist: "Quasimoto / Madlib", refDrummer: "Madlib (SP-1200)", refYear: 2000,
  },
  "klipsh": {
    refSong: "Klipsh", refArtist: "Knxwledge", refDrummer: "Knxwledge (Roland SP-404)", refYear: 2015,
  },
  "lofigirl": {
    refSong: "Coffee Shop Study Beat", refArtist: "Lofi Girl Standard", refDrummer: "Lofi Girl Production Team", refYear: null,
  },
  "whataday": {
    refSong: "What a Day", refArtist: "Kiefer", refDrummer: "Kiefer (piano and live feel drums)", refYear: 2018,
  },
  "sakuratrees": {
    refSong: "Sakura Trees", refArtist: "Saib", refDrummer: "Saib (koto and chillhop drums)", refYear: 2017,
  },
  "faraway": {
    refSong: "Far Away", refArtist: "Tomppabeats", refDrummer: "Tomppabeats (tape cassette loop)", refYear: 2016,
  },
  "cookinsoul": {
    refSong: "Cookin Soul Dope Beat", refArtist: "Cookin Soul", refDrummer: "Cookin Soul (SP-1200 / MPC 2000XL)", refYear: 2018,
  },
  "vanilla": {
    refSong: "Sweet Talk", refArtist: "Vanilla", refDrummer: "Vanilla (soul sample chop)", refYear: 2014,
  },
  "wuntwo": {
    refSong: "Rio", refArtist: "Wun Two", refDrummer: "Wun Two (SP-404 vinyl flutter)", refYear: 2013,
  },

  // --- ELECTRO & ELECTRONIC (7) ---
  "planetrock": {
    refSong: "Planet Rock", refArtist: "Afrika Bambaataa & Soulsonic Force", refDrummer: "Arthur Baker & John Robie (TR-808)", refYear: 1982,
  },
  "clear": {
    refSong: "Clear", refArtist: "Cybotron", refDrummer: "Juan Atkins & Richard Davis (TR-808)", refYear: 1983,
  },
  "bluemonday": {
    refSong: "Blue Monday", refArtist: "New Order", refDrummer: "Stephen Morris (Oberheim DMX)", refYear: 1983,
  },
  "numbers": {
    refSong: "Numbers", refArtist: "Kraftwerk", refDrummer: "Electronic drum sequencing", refYear: 1981,
  },
  "trans-europe": {
    refSong: "Trans-Europe Express", refArtist: "Kraftwerk", refDrummer: "Electronic drum sequencing", refYear: 1977,
  },
  "closer": {
    refSong: "Closer", refArtist: "Nine Inch Nails", refDrummer: "Trent Reznor (Iggy Pop 'Nightclubbing' kick)", refYear: 1994,
  },
  "tourdefrance": {
    refSong: "Tour de France", refArtist: "Kraftwerk", refDrummer: "Electronic drum sequencing", refYear: 1983,
  },

  // --- HOUSE & TECHNO (12) ---
  "pumpup": {
    refSong: "Pump Up The Volume", refArtist: "M|A|R|R|S", refDrummer: "Sampled 909 & breakbeat collage", refYear: 1987,
  },
  "voodooray": {
    refSong: "Voodoo Ray", refArtist: "A Guy Called Gerald", refDrummer: "Gerald Simpson (TR-808)", refYear: 1988,
  },
  "aroundtheworld": {
    refSong: "Around The World", refArtist: "Daft Punk", refDrummer: "Thomas Bangalter & Guy-Manuel (TR-909)", refYear: 1997,
  },
  "acid303": {
    refSong: "Acid House 303 (Acid Tracks)", refArtist: "Phuture", refDrummer: "DJ Pierre & Spanky (TR-707)", refYear: 1987,
  },
  "four": {
    refSong: "Four on the Floor", refArtist: "Disco / Chicago House Standard", refDrummer: "TR-909 / Acoustic kit", refYear: null,
  },
  "deephouse": {
    refSong: "Deep House (Can You Feel It)", refArtist: "Larry Heard / Mr. Fingers", refDrummer: "Larry Heard (TR-909)", refYear: 1986,
  },
  "jackinhouse": {
    refSong: "Jackin' House", refArtist: "DJ Sneak / Derrick Carter", refDrummer: "Chicago Jackin' Producers (TR-909)", refYear: 1995,
  },
  "detroittechno": {
    refSong: "Detroit Techno", refArtist: "Underground Resistance / Model 500", refDrummer: "Juan Atkins / UR (TR-909)", refYear: 1990,
  },
  "berlinrumble": {
    refSong: "Berlin Rumble Techno", refArtist: "Berghain / Industrial Standard", refDrummer: "Industrial techno producers", refYear: null,
  },
  "minimaltechno": {
    refSong: "Minimal Techno (Minimal Nation)", refArtist: "Robert Hood", refDrummer: "Robert Hood (TR-909)", refYear: 1994,
  },
  "dubtechno": {
    refSong: "Dub Techno (Quadrant Dub)", refArtist: "Basic Channel / Rhythm & Sound", refDrummer: "Moritz von Oswald & Mark Ernestus", refYear: 1993,
  },
  "acidtechno": {
    refSong: "Acid Techno", refArtist: "London Acid City / Stay Up Forever", refDrummer: "Chris Liberator / D.A.V.E. The Drummer", refYear: 1996,
  },

  // --- UK GARAGE, BASS, TRAP & DRILL (12) ---
  "twostep": {
    refSong: "Two-Step", refArtist: "UK Garage Standard (MJ Cole / Artful Dodger)", refDrummer: "UK Garage Producers", refYear: null,
  },
  "speedgarage": {
    refSong: "Speed Garage (Gunman)", refArtist: "187 Lockdown / Armand Van Helden", refDrummer: "Speed Garage Producers", refYear: 1997,
  },
  "jungle": {
    refSong: "Chopped Amen (Jungle)", refArtist: "Jungle Standard", refDrummer: "Tim Reaper / Dillinja / Goldie style", refYear: null,
  },
  "dnb": {
    refSong: "Two-Step D&B", refArtist: "Drum & Bass Standard", refDrummer: "D&B rhythm section", refYear: null,
  },
  "dnbrolling": {
    refSong: "Rolling D&B", refArtist: "Hospital Records / Liquid Standard", refDrummer: "Liquid D&B Producers", refYear: null,
  },
  "dubstep": {
    refSong: "Dubstep Half-Time", refArtist: "Digital Mystikz / Skream", refDrummer: "DMZ / FWD>> Producers", refYear: 2006,
  },
  "grime": {
    refSong: "Grime 140 (Eskibeat / I Luv U)", refArtist: "Wiley / Dizzee Rascal", refDrummer: "Wiley (Eskibeat) / Dizzee Rascal (I Luv U)", refYear: 2003,
  },
  "trap": {
    refSong: "Half-Time Trap", refArtist: "Atlanta Standard / Metro Boomin", refDrummer: "Metro Boomin / Southside", refYear: null,
  },
  "trapbounce": {
    refSong: "808 Bounce Trap", refArtist: "Southside / Lex Luger", refDrummer: "Lex Luger / 808 Mafia", refYear: 2011,
  },
  "drill": {
    refSong: "UK Drill", refArtist: "London Standard (67 / LD)", refDrummer: "Carns Hill / MKThePlug", refYear: null,
  },
  "brooklyndrill": {
    refSong: "Brooklyn Drill (Welcome to the Party)", refArtist: "Pop Smoke / 808Melo", refDrummer: "808Melo", refYear: 2019,
  },
  "crunk": {
    refSong: "Southern Crunk (Get Low)", refArtist: "Lil Jon / Three 6 Mafia", refDrummer: "Lil Jon (TR-808)", refYear: 2003,
  },

  // --- FINGER DRUMMING DRILLS (10) ---
  "drill-8th": {
    refSong: "Drill: 8th-Note Foundation", refArtist: "Finger Drumming Level 1", refDrummer: "Pedagogical Exercise", refYear: null,
  },
  "drill-four": {
    refSong: "Drill: 4-on-the-Floor Coordination", refArtist: "Finger Drumming Level 1", refDrummer: "Pedagogical Exercise", refYear: null,
  },
  "drill-sync": {
    refSong: "Drill: Kick Syncopation & Pushes", refArtist: "Finger Drumming Level 1", refDrummer: "Pedagogical Exercise", refYear: null,
  },
  "drill-ghost": {
    refSong: "Drill: Ghost Note Pocket", refArtist: "Finger Drumming Level 2", refDrummer: "Pedagogical Exercise", refYear: null,
  },
  "drill-linear": {
    refSong: "Drill: Linear Drumming 1", refArtist: "Finger Drumming Level 2", refDrummer: "Pedagogical Exercise", refYear: null,
  },
  "drill-alt": {
    refSong: "Drill: Hand Alternation (R L R L)", refArtist: "Finger Drumming Level 2", refDrummer: "Pedagogical Exercise", refYear: null,
  },
  "drill-paradiddle": {
    refSong: "Drill: Paradiddle Pad Groove", refArtist: "Finger Drumming Level 3", refDrummer: "Pedagogical Exercise", refYear: null,
  },
  "drill-rolls": {
    refSong: "Drill: 16th Hat Roll Flow", refArtist: "Finger Drumming Level 3", refDrummer: "Pedagogical Exercise", refYear: null,
  },
  "drill-poly": {
    refSong: "Drill: Polyrhythm 3-Over-4", refArtist: "Finger Drumming Level 3", refDrummer: "Pedagogical Exercise", refYear: null,
  },
  "drill-master": {
    refSong: "Drill: Finger Independence Master", refArtist: "Finger Drumming Level 3", refDrummer: "Pedagogical Exercise", refYear: null,
  }
};

console.log('Total audit items in database:', Object.keys(AUDIT_DATA).length);

module.exports = { AUDIT_DATA };
