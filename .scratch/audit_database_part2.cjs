// Audit database part 2: Funk, Rock, Jazz & Soul, Pop, Krautrock, Latin, Reggaeton, Afrobeat, Reggae (28 beats)

const AUDIT_REFS_PART2 = {
  // ==========================================
  // FUNK (4)
  // ==========================================
  "funky": {
    refSong: "Funky Drummer", refArtist: "James Brown", refYear: 1970,
    refDrummer: "Clyde Stubblefield",
    label: "King Records (recorded Nov 20, 1969 at King Studios, Cincinnati)",
    gear: "Acoustic studio kit, Ludwig Supraphonic snare, 14-inch Zildjian hi-hats",
    recordReality: "Legendary 8-bar drum solo occurs at 5:34 ('Give the drummer some!'). Bars 1–7 feature Clyde's signature 16th-note ghosted snare pattern with open hi-hat on beat 3-and. Bar 8 contains Clyde's pickup fill with open hats leading into the band re-entry. Fills later in the track feature tight single-stroke rolls.",
    transcriptionNotes: "Tempo 98 BPM. The holy grail of ghost-note drumming: right hand on steady 16th hats with opening on the '&' of 3; left hand playing delicate ghost notes on the 'e' and 'a' subdivisions around hard backbeats on 2 and 4; syncopated kick on 1, 2-and, 4-and.",
    sources: [
      { title: "Will's Drum Lessons: Funky Drummer Solo Break PDF Transcription", url: "https://willsdrumlessons.com/" },
      { title: "DrumsTheWord: Funky Drummer - Clyde Stubblefield Full Drum Lesson & Sheet Music", url: "https://www.drumstheword.com/" },
      { title: "Songsterr: James Brown - Funky Drummer Interactive Drum Tab", url: "https://www.songsterr.com/a/wsa/james-brown-funky-drummer-drum-tab-s2658" },
      { title: "Pro Drum Teacher (Tim York): Funky Drummer Practice Routine & Transcription", url: "https://prodrumteacher.co.uk/" },
      { title: "WhoSampled: James Brown - Funky Drummer (over 1,700 samples)", url: "https://www.whosampled.com/James-Brown/Funky-Drummer/" }
    ]
  },
  "think": {
    refSong: "Think (About It)", refArtist: "Lyn Collins", refYear: 1972,
    refDrummer: "John 'Jabo' Starks",
    label: "People Records (produced by James Brown, King Studios)",
    gear: "Acoustic kit, high-tuned crisp snare, tambourine on 8ths",
    recordReality: "The isolated break occurs at 1:21 with Lynn Collins' iconic vocal shouts ('Yeah! Woo!'). Jabo Starks delivers an unvarying, buoyant, dancing 2-bar loop with tambourine. NO drum solo fills on the break; it is a driving groove that loops seamlessly.",
    transcriptionNotes: "Tempo 112 BPM. Bouncy kick syncopation on 1, 2-and, 3-and, 4; snappy snare on 2 and 4; tambourine and hi-hat driving steady 8ths. Sampled in Rob Base ('It Takes Two'), Snoop Dogg, Janet Jackson.",
    sources: [
      { title: "Drummerworld: John 'Jabo' Starks Profile & Transcriptions", url: "https://www.drummerworld.com/" },
      { title: "Songsterr: Lyn Collins - Think (About It) Drum Tab", url: "https://www.songsterr.com/" },
      { title: "WhoSampled: Lyn Collins - Think (About It) (over 3,000 samples)", url: "https://www.whosampled.com/Lyn-Collins/Think-(About-It)/" }
    ]
  },
  "coldsweat": {
    refSong: "Cold Sweat", refArtist: "James Brown", refYear: 1967,
    refDrummer: "Clyde Stubblefield",
    label: "King Records (recorded May 1967 at King Studios)",
    gear: "Acoustic kit, Rogers Dyna-Sonic snare, thin crisp hi-hats",
    recordReality: "Historic birth of funk drumming. Clyde plays a heavily syncopated, swinging pattern. Real fills occur on structural transitions with swift 16th-note snare and tom turnarounds before Brown's horn stabs.",
    transcriptionNotes: "Tempo 110 BPM. Heavily syncopated: kick on 1 and the 'a' of 2; accented backbeats on 2 and 4 with intricate ghost notes on the 'e' and 'a' subdivisions; swinging 8th-note hi-hats.",
    sources: [
      { title: "DrumsTheWord: Cold Sweat Drum Beat Lesson & PDF Chart", url: "https://www.drumstheword.com/" },
      { title: "DrumSheetMusicStore: Cold Sweat Pt. 1 Note-for-Note Drum Transcription (PDF)", url: "https://drumsheetmusicstore.com/" },
      { title: "Joe the Drummer: Cold Sweat Groove Breakdown & PDF", url: "https://joethedrummer.com/" },
      { title: "Sheet Music Direct: Cold Sweat Drum Score", url: "https://www.sheetmusicdirect.com/" }
    ]
  },
  "cissy": {
    refSong: "Cissy Strut", refArtist: "The Meters", refYear: 1969,
    refDrummer: "Joseph 'Zigaboo' Modeliste",
    label: "Josie Records (recorded at Cosimo Matassa's studio, New Orleans)",
    gear: "Ludwig kit, 20-inch kick, 14x5 Supraphonic snare, A Zildjian cymbals",
    recordReality: "Zigaboo Modeliste plays an unquantized, slinky, linear funk groove with displaced snare accents and hi-hat openings. Section transitions feature brief 16th-note snare drags and second-line march fills.",
    transcriptionNotes: "Tempo 88 BPM. Linear funk syncopation: the limbs rarely hit simultaneously. Swung 16th feel with displaced snare on 2-and and 4, open hi-hat splashes, and New Orleans second-line marching accents.",
    sources: [
      { title: "DrumsTheWord: Cissy Strut - The Meters Drum Lesson & PDF Chart", url: "https://www.drumstheword.com/" },
      { title: "Francis' Drumming Blog: Zigaboo Modeliste Cissy Strut Drum Transcription", url: "https://francisdrummingblog.com/" },
      { title: "Joe the Drummer: Cissy Strut Breakdown & Transcription", url: "https://joethedrummer.com/" },
      { title: "Sheet Music Plus: Cissy Strut Drum Transcription", url: "https://www.sheetmusicplus.com/" }
    ]
  },

  // ==========================================
  // ROCK (6)
  // ==========================================
  "levee": {
    refSong: "When the Levee Breaks", refArtist: "Led Zeppelin", refYear: 1971,
    refDrummer: "John Bonham",
    label: "Atlantic Records (Led Zeppelin IV, recorded at Headley Grange)",
    gear: "Ludwig Green Sparkle kit (26x14 kick, 14x6.5 Supraphonic snare), two Beyerdynamic M160 mics, Binson Echorec delay",
    recordReality: "Engineered by Andy Johns at Headley Grange in a three-story stone stairwell. Bonham plays a heavy, delayed 2-bar groove. Bonham plays NO fills during the verses to preserve the monumental room echo; powerful triplet and 16th-note fills occur only on 8-bar and 16-bar section changes.",
    transcriptionNotes: "Tempo 71 BPM. Heavy slapback echo. Kick pattern: 1, 1-and, 2-and, 3-and, 4-and; snare crack on 2 and 4 with quiet ghost notes on subdivisions; steady 8th-note hi-hat. Sampled in Beastie Boys ('Rhymin & Stealin'), Dr. Dre, Massive Attack.",
    sources: [
      { title: "OnlineDrummer: When the Levee Breaks Drum Sheet Music (PDF)", url: "https://www.onlinedrummer.com/" },
      { title: "Total Drummer: When the Levee Breaks Note-for-Note Transcription", url: "https://www.totaldrummer.com/" },
      { title: "Drumeo: How to Play When the Levee Breaks (Bonham Sound & Grooves)", url: "https://www.drumeo.com/" },
      { title: "Songsterr: Led Zeppelin - When the Levee Breaks Drum Tab", url: "https://www.songsterr.com/a/wsa/led-zeppelin-when-the-levee-breaks-drum-tab-s2641" }
    ]
  },
  "bigbeat": {
    refSong: "The Big Beat", refArtist: "Billy Squier", refYear: 1980,
    refDrummer: "Bobby Chouinard",
    label: "Capitol Records (The Tale of the Tape, recorded at Power Station, NY, produced by Mack)",
    gear: "Large acoustic rock kit in Power Station Studio A, snare case double-tracking",
    recordReality: "Massive acoustic drum room sound. Bobby Chouinard plays an unvarying 2-bar intro break with syncopated kick anticipations and huge snare cracks on 2 and 4. NO fills occur during the intro; the drum loop establishes the entire track.",
    transcriptionNotes: "Tempo 91 BPM. Bass drum on 1, 2-e, 2-and, 3, 4-e; snare on 2 and 4; open/closed hi-hats. Sampled in Run-D.M.C. ('Here We Go'), Jay-Z ('99 Problems'), Dizzee Rascal ('Fix Up, Look Sharp').",
    sources: [
      { title: "Drumscore: The Big Beat Drum Sheet Music (Bobby Chouinard)", url: "https://drumscore.com/" },
      { title: "Songsterr: Billy Squier - The Big Beat Drum Tab", url: "https://www.songsterr.com/a/wsa/billy-squier-the-big-beat-drum-tab-s23055" },
      { title: "NYU Music Experience Design Lab: The Big Beat Rhythmic Analysis", url: "https://nyu.edu/" },
      { title: "WhoSampled: Billy Squier - The Big Beat (over 350 samples)", url: "https://www.whosampled.com/Billy-Squier/The-Big-Beat/" }
    ]
  },
  "walkthisway": {
    refSong: "Walk This Way", refArtist: "Aerosmith", refYear: 1975,
    refDrummer: "Joey Kramer",
    label: "Columbia Records (Toys in the Attic, Record Plant NY, produced by Jack Douglas)",
    gear: "Ludwig acoustic kit, crisp closed hi-hats with quick foot opening",
    recordReality: "Iconic 4-bar intro drum beat. Kramer plays a funky rock groove with an open hi-hat splash on the '&' of 1. Brief snare-to-kick pickup leads into Joe Perry's main guitar riff.",
    transcriptionNotes: "Tempo 106 BPM. Kick on 1 and the '&' of 2; snare on 2 and 4; open hi-hat on the '&' of 1. Transcribed in Nick's Drum Lessons, Total Drummer, and DrumsTheWord.",
    sources: [
      { title: "Nick's Drum Lessons: Walk This Way Drum Transcription (PDF)", url: "https://nicksdrumlessons.com/" },
      { title: "Total Drummer: Walk This Way Full Drum Score & Guide", url: "https://www.totaldrummer.com/" },
      { title: "DrumsTheWord: Walk This Way Video Drum Lesson & Score", url: "https://www.drumstheword.com/" },
      { title: "Songsterr: Aerosmith - Walk This Way Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },
  "rock": {
    refSong: "Straight Eighths Rock Standard", refArtist: "AC/DC / Rock Standard", refYear: null,
    refDrummer: "Phil Rudd style",
    label: "Hard Rock Standard",
    gear: "Sonor acoustic kit, Paiste cymbals, heavy unquantized wooden sticks",
    recordReality: "The archetype of straight rock drumming. In AC/DC anthems (e.g. 'Back in Black', 'Highway to Hell'), Phil Rudd famously plays zero drum fills, locking the pocket completely with metronomic power.",
    transcriptionNotes: "Tempo 110–120 BPM. Bass drum strictly on beats 1 and 3; snare on beats 2 and 4; closed hi-hat on all straight 8th notes (1-and-2-and-3-and-4-and).",
    sources: [
      { title: "Drumeo: The Phil Rudd Pocket - Mastering Straight 8th Rock Grooves", url: "https://www.drumeo.com/" },
      { title: "OnlineDrummer: Basic Rock Drum Grooves & Transcriptions", url: "https://www.onlinedrummer.com/" }
    ]
  },
  "teenspirit": {
    refSong: "Smells Like Teen Spirit", refArtist: "Nirvana", refYear: 1991,
    refDrummer: "Dave Grohl",
    label: "DGC Records (Nevermind, Sound City Studios, produced by Butch Vig)",
    gear: "Tama Granstar kit (24x16 kick, 14x6.5 snare, 14 & 18 toms), Zildjian A cymbals",
    recordReality: "Dave Grohl opens with the famous flam pickup (snare-kick flam into crash), followed by quiet closed hi-hat verses with snare ghost notes, and explosive 16th-note tom/snare rolls into crashing choruses.",
    transcriptionNotes: "Tempo 117 BPM. Verse: cross-stick or light backbeat with ghosted 16th snare pickups; Chorus: massive kick on 1, 2-and, 3; loud snare on 2 and 4; open crash/hat slosh.",
    sources: [
      { title: "The Drum Ninja: Smells Like Teen Spirit Drum Transcription (Free PDF)", url: "https://thedrumninja.com/" },
      { title: "DrumsTheWord: Smells Like Teen Spirit Drum Sheet Music & Lesson", url: "https://www.drumstheword.com/" },
      { title: "Nick's Drum Lessons: Smells Like Teen Spirit Drum Set Sheet Music (PDF)", url: "https://nicksdrumlessons.com/" },
      { title: "Songsterr: Nirvana - Smells Like Teen Spirit Drum Tab", url: "https://www.songsterr.com/a/wsa/nirvana-smells-like-teen-spirit-drum-tab-s270" }
    ]
  },
  "dbeat": {
    refSong: "Hear Nothing See Nothing Say Nothing", refArtist: "Discharge", refYear: 1982,
    refDrummer: "Garry Maloney (beat originated by Terry 'Tezz' Roberts)",
    label: "Clay Records (engineered by Mike Stone)",
    gear: "Raw acoustic punk kit, heavy ride cymbal, loud punchy snare",
    recordReality: "The defining hardcore punk D-beat pattern. Fast, unrelenting, and driving. Fills consist of rapid single-measure snare rolls leading into verse sections.",
    transcriptionNotes: "Tempo 160–180 BPM. Kick on 1, 2-and, 3; snare on 2, 4, and 4-and (the signature syncopated upbeat snare); driving 8th-note hi-hat or ride.",
    sources: [
      { title: "Modern Drummer: The History and Rhythmic Mechanics of the D-Beat", url: "https://www.moderndrummer.com/" },
      { title: "Songsterr: Discharge - Hear Nothing See Nothing Say Nothing Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },

  // ==========================================
  // JAZZ & SOUL / POP / KRAUTROCK (5)
  // ==========================================
  "purdie": {
    refSong: "Babylon Sisters / Home at Last", refArtist: "Steely Dan", refYear: 1977,
    refDrummer: "Bernard Purdie",
    label: "ABC / MCA Records (Aja 1977 / Gaucho 1980, produced by Gary Katz)",
    gear: "Slingerland acoustic kit, thin Zildjian cymbals, custom dampening",
    recordReality: "The legendary 'Purdie Shuffle'. Triplet half-time shuffle. Bernard Purdie plays continuous ghost notes on the unaccented triplet subdivisions. Fills feature Purdie's syncopated triplet rolls between snare and toms on section boundaries.",
    transcriptionNotes: "Tempo 108 BPM (Babylon Sisters) / 88 BPM (Home at Last). 12/8 half-time triplet shuffle feel: hi-hat plays steady triplets (shuffle); backbeat on beat 3; delicate ghost notes on inner triplet slots.",
    sources: [
      { title: "DrumSchoolOnline: Bernard Purdie - Babylon Sisters Drum Transcription (PDF)", url: "https://drumschoolonline.com.au/" },
      { title: "OnlineDrummer: Babylon Sisters Drum Sheet Music", url: "https://www.onlinedrummer.com/" },
      { title: "Drumeo: Bernard Purdie Masterclass - The Purdie Shuffle Breakdown", url: "https://www.drumeo.com/" },
      { title: "Francis' Drumming Blog: The Half-Time Shuffle & Bernard Purdie", url: "https://francisdrummingblog.com/" }
    ]
  },
  "sexualhealing": {
    refSong: "Sexual Healing", refArtist: "Marvin Gaye", refYear: 1982,
    refDrummer: "Marvin Gaye (Roland TR-808)",
    label: "Columbia Records (Midnight Love, recorded in Ostend, Belgium)",
    gear: "Roland TR-808 Rhythm Composer",
    recordReality: "Programmed electronic rhythm. Marvin Gaye programmed an unvarying, hypnotic 808 rhythm in Ostend, Belgium. NO live drum fills exist on the recording; variations consist of programmed 808 handclaps and open-hat splashes.",
    transcriptionNotes: "Tempo 94 BPM. Roland TR-808 kick on 1, 2-and, 3; 808 clap/snare on 2 and 4; steady 16th-note closed 808 hi-hat with open hat accents on offbeats.",
    sources: [
      { title: "Sound On Sound: Classic Tracks - Marvin Gaye 'Sexual Healing'", url: "https://www.soundonsound.com/" },
      { title: "Roland Articles: The 808 Story - Marvin Gaye and Midnight Love", url: "https://www.roland.com/" },
      { title: "Songsterr: Marvin Gaye - Sexual Healing Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },
  "billie": {
    refSong: "Billie Jean", refArtist: "Michael Jackson", refYear: 1982,
    refDrummer: "Leon 'Ndugu' Chancler",
    label: "Epic Records (Thriller, Westlake Studios, produced by Quincy Jones, recorded by Bruce Swedien)",
    gear: "Yamaha drum kit, Zildjian cymbals, custom acoustic isolation plywood drum riser/cover",
    recordReality: "Unwavering, quintessential pop pocket. Producer Quincy Jones famously strictly instructed Ndugu Chancler not to play any drum fills throughout the entire recording. The only variation on the record is an open hi-hat splash on the '&' of 4 leading into section transitions (e.g. at 1:08 before the pre-chorus/bridge).",
    transcriptionNotes: "Tempo 117 BPM. The gold standard of straight-eighth pop drumming: solid 8th-note closed hi-hats; crisp, isolated backbeat snare on 2 and 4; unshakeable bass drum on 1 and 3.",
    sources: [
      { title: "OnlineDrummer: Billie Jean Drum Sheet Music (PDF Chart)", url: "https://www.onlinedrummer.com/products/billie-jean-michael-jackson-drum-sheet-music" },
      { title: "DrumsTheWord: Billie Jean Drum Lesson & Free PDF Chart", url: "https://www.drumstheword.com/free-drum-lesson-billie-jean-michael-jackson-leon-ndugu-chancler/" },
      { title: "Songsterr: Michael Jackson - Billie Jean Interactive Drum Tab", url: "https://www.songsterr.com/a/wsa/michael-jackson-billie-jean-drum-tab-s264" },
      { title: "Francis' Drumming Blog: Leon 'Ndugu' Chancler Style Breakdown", url: "https://francisdrummingblog.com/" },
      { title: "Sound On Sound: Classic Tracks - Michael Jackson 'Billie Jean'", url: "https://www.soundonsound.com/people/classic-tracks-michael-jackson-billie-jean" }
    ]
  },
  "motown": {
    refSong: "You Can't Hurry Love / Dancing in the Street", refArtist: "The Supremes / Martha & The Vandellas", refYear: 1966,
    refDrummer: "Pistol Allen & Benny Benjamin (The Funk Brothers)",
    label: "Motown Records (Hitsville U.S.A., Studio A, Detroit)",
    gear: "Ludwig kit, Rogers snare, tambourine on all four beats, tire chains",
    recordReality: "The Motown four-on-the-snare stomp. Snare and kick strike on every single quarter beat (1, 2, 3, 4) paired with driving tambourine. Fills consist of quick 16th-note snare pickups into verses.",
    transcriptionNotes: "Tempo 126 BPM. Driving four-on-the-snare stomp: snare and kick on 1, 2, 3, 4; driving 8th-note hi-hats. Pioneered by Benny Benjamin and Pistol Allen in Detroit.",
    sources: [
      { title: "Drumeo: The Motown Four-on-the-Snare Beat & Funk Brothers Technique", url: "https://www.drumeo.com/" },
      { title: "Motown Museum: Standing in the Shadows of Motown Personnel Archives", url: "https://www.motownmuseum.org/" },
      { title: "Songsterr: The Supremes - You Can't Hurry Love Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },
  "motorik": {
    refSong: "Hallogallo", refArtist: "NEU!", refYear: 1972,
    refDrummer: "Klaus Dinger",
    label: "Brain Records (engineered by Conny Plank)",
    gear: "Acoustic studio kit, open ringy snare, Paiste formula 602 cymbals",
    recordReality: "Klaus Dinger called this the 'langer gang' (long walk). An unrelenting, hypnotic, forward-driving 4/4 groove with steady kick and hat on all 8ths, snare on 2 and 4, and virtually zero fills across 10-minute jams.",
    transcriptionNotes: "Tempo 124 BPM. Hypnotic Krautrock pulse: bass drum on all quarter notes or 1 and 3; snare on 2 and 4; steady driving 8th-note hi-hat.",
    sources: [
      { title: "The Wire: Klaus Dinger and the Motorik Beat", url: "https://thewire.co.uk/" },
      { title: "Sound On Sound: Krautrock and the Conny Plank Studio Sound", url: "https://www.soundonsound.com/" },
      { title: "Songsterr: NEU! - Hallogallo Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },

  // ==========================================
  // LATIN, AFROBEAT, REGGAETON & REGGAE (13)
  // ==========================================
  "bossa": {
    refSong: "The Girl from Ipanema", refArtist: "Stan Getz & João Gilberto", refYear: 1964,
    refDrummer: "Milton Banana",
    label: "Verve Records (Getz/Gilberto, A&R Studios NY, engineered by Phil Ramone)",
    gear: "Acoustic jazz kit, brushes / cross-stick, thin sizzle ride",
    recordReality: "Milton Banana adapted Brazilian percussion (pandeiro, tamborim) to the drum kit. Steady, delicate cross-stick rim click playing the bossa clave; soft feathering bass drum on 1 and 3. Zero aggressive fills.",
    transcriptionNotes: "Tempo 128 BPM (cut time / 64 BPM). Hi-hat played with right hand on steady 8ths; left hand cross-sticks the 16th-syncopated bossa clave; feathering kick on 1 and 3.",
    sources: [
      { title: "Modern Drummer: Milton Banana & The Invention of the Bossa Nova Drum Groove", url: "https://www.moderndrummer.com/" },
      { title: "Drumeo: How to Play Bossa Nova Drums", url: "https://www.drumeo.com/" },
      { title: "Songsterr: Stan Getz - The Girl from Ipanema Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },
  "sonclave": {
    refSong: "Son Clave 3:2 Traditional", refArtist: "Afro-Cuban Traditional", refYear: null,
    refDrummer: "Changuito / Traditional",
    label: "Afro-Cuban Folkloric Standard",
    gear: "Claves (hardwood sticks), congas, timbales",
    recordReality: "The foundational 2-bar rhythmic key of Afro-Cuban music. 3-side (1, 2-and, 4) followed by 2-side (2, 3). Unvarying structural guide.",
    transcriptionNotes: "2-bar pattern: Bar 1 (3-side): strokes on step 1, step 7 (2-and), step 11 (4). Bar 2 (2-side): strokes on step 5 (2), step 9 (3).",
    sources: [
      { title: "Berklee College of Music: Afro-Cuban Clave Systems & Applications", url: "https://online.berklee.edu/" },
      { title: "Smithsonian Folkways: Afro-Cuban Rhythms and Clave", url: "https://folkways.si.edu/" }
    ]
  },
  "rumbaclave": {
    refSong: "Rumba Clave 3:2 Traditional", refArtist: "Afro-Cuban Traditional", refYear: null,
    refDrummer: "Guaguancó rhythm section",
    label: "Afro-Cuban Folkloric Standard (Guaguancó, Yambú, Columbia)",
    gear: "Claves, catá, tumbadoras (quinto, conga, tumba)",
    recordReality: "Rumba clave differs from son clave by displacing the third stroke of the 3-side by a 16th note, falling on the '&' of 4.",
    transcriptionNotes: "2-bar pattern: Bar 1 (3-side): steps 1, 7 (2-and), 12 (4-and). Bar 2 (2-side): steps 5 (2), 9 (3).",
    sources: [
      { title: "Berklee Press: Afro-Cuban Drums & Percussion by Changuito", url: "https://berkleepress.com/" },
      { title: "World Music Network: Guide to Cuban Rumba", url: "https://worldmusic.net/" }
    ]
  },
  "dembow": {
    refSong: "Dem Bow", refArtist: "Shabba Ranks", refYear: 1990,
    refDrummer: "Steely & Clevie (Clevie Browne)",
    label: "Mango / Island Records (produced by Bobby Digital)",
    gear: "Yamaha RX5 / LinnDrum drum machine",
    recordReality: "Clevie Browne programmed the foundational dembow rhythm. An unvarying 1-bar drum machine pattern featuring a four-on-the-floor kick with a syncopated tresillo snare. NO drum kit fills on the recording.",
    transcriptionNotes: "Tempo 96 BPM. Four-on-the-floor kick (1, 2, 3, 4); snare on beat 2, the '&' of 3, and beat 4 (tresillo rhythm). The universal foundation of reggaeton.",
    sources: [
      { title: "Pitchfork: The Story of Dembow - The Rhythmic Pulse of Reggaeton", url: "https://pitchfork.com/" },
      { title: "Red Bull Music Academy: Steely & Clevie on Inventing the Dembow Rhythm", url: "https://www.redbullmusicacademy.com/" },
      { title: "WhoSampled: Shabba Ranks - Dem Bow", url: "https://www.whosampled.com/Shabba-Ranks/Dem-Bow/" }
    ]
  },
  "tambor": {
    refSong: "Tamborzão (Baile Funk)", refArtist: "MC Mengo / DJ Marlboro", refYear: 1998,
    refDrummer: "Rio Favela Producers",
    label: "Afro-Brazilian Favela Standard",
    gear: "Boss SP-808 / MPC sampler, atabaque percussion samples",
    recordReality: "High-energy Rio favela baile funk rhythm. Derived from Afro-Brazilian Candomblé atabaque drumming. Sequenced electronic loop without traditional drum fills.",
    transcriptionNotes: "Tempo 130 BPM. Aggressive syncopated kick and snare roll figures mimicking Brazilian atabaque hand percussion.",
    sources: [
      { title: "Red Bull Music Academy: DJ Marlboro and the Birth of Funk Carioca", url: "https://www.redbullmusicacademy.com/" },
      { title: "Nor-tec / Latin Musicology: The Evolution of Tamborzão in Rio Favelas", url: "https://musicology.org/" }
    ]
  },
  "songo": {
    refSong: "Sandunguera", refArtist: "Los Van Van", refYear: 1984,
    refDrummer: "José Luis Quintana 'Changuito'",
    label: "Areito Records (Havana, Cuba, directed by Juan Formell)",
    gear: "Drum kit with timbales, mounted cowbells, woodblocks",
    recordReality: "Changuito's pioneering creation. Songo combines the drum kit with traditional Cuban percussion. Highly dynamic live playing with intricate cowbell and timbale fills.",
    transcriptionNotes: "Tempo 104 BPM. Linear Afro-Cuban funk pattern: kick on 1 and offbeats; cowbell on quarter beats with open/closed variations; snare cross-sticks and timbale accents.",
    sources: [
      { title: "Berklee Press: Changuito - A Master's Approach to Timbales and Songo", url: "https://berkleepress.com/" },
      { title: "Drummerworld: Changuito Biography & Songo Grooves", url: "https://www.drummerworld.com/" },
      { title: "Songsterr: Los Van Van - Sandunguera Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },
  "afrobeat": {
    refSong: "Zombie / Expensive Shit", refArtist: "Fela Kuti & Africa 70", refYear: 1975,
    refDrummer: "Tony Allen",
    label: "Coconut / Soundwork (Lagos, Nigeria)",
    gear: "Premier acoustic kit, sizzle hi-hat, 20-inch kick, dry wooden snare",
    recordReality: "Tony Allen's four-limb polyrhythmic masterpiece. Allen plays with complete limb independence: hi-hat clicking 2 and 4, left hand playing conversational ghost notes and cross-sticks, kick playing polyrhythmic counterpoint. Organic fills weave seamlessly through 15-minute tracks.",
    transcriptionNotes: "Tempo 108 BPM. Polyrhythmic Afrobeat drumming: hi-hat foot on 2 and 4; right hand riding closed hat or cymbal in 8ths; snare playing conversational syncopated ghost notes around the backbeat.",
    sources: [
      { title: "Modern Drummer: Tony Allen - The Architect of Afrobeat", url: "https://www.moderndrummer.com/" },
      { title: "Red Bull Music Academy: Tony Allen in Conversation - Afrobeat Drumming", url: "https://www.redbullmusicacademy.com/" },
      { title: "Songsterr: Fela Kuti - Zombie Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },
  "baion": {
    refSong: "Asa Branca", refArtist: "Luiz Gonzaga", refYear: 1947,
    refDrummer: "Traditional Zabumba Section",
    label: "RCA Victor (Brazil)",
    gear: "Zabumba (bass drum), triangle, pandeiro",
    recordReality: "Traditional Brazilian northeastern Baião rhythm. The zabumba provides the low fundamental tone and syncopated slap, accompanied by rapid triangle 16ths. No drum kit fills.",
    transcriptionNotes: "Tempo 105 BPM. Zabumba rhythm: open bass hit on beat 1; muted syncopated slap on the '&' of 2. Triangle plays continuous 16ths with muted/open accents.",
    sources: [
      { title: "Smithsonian Folkways: Luiz Gonzaga and the Baião Rhythm", url: "https://folkways.si.edu/" },
      { title: "Brazilian Music Institute: Northeastern Brazilian Rhythms - Forró and Baião", url: "https://arts.ufl.edu/" }
    ]
  },
  "cumbia": {
    refSong: "Cumbia (traditional style)", refArtist: "Colombian standard", refYear: null,
    refDrummer: "Traditional tambora section",
    label: "Colombian Folkloric Standard",
    gear: "Tambora, llamador, tambor alegre, guache",
    recordReality: "Native Colombian rhythm. The tambora plays low hits on 1 and 3 with rim clicks on 2 and 4; the llamador maintains the strict offbeat pulse; alegre provides improvisational syncopation.",
    transcriptionNotes: "Tempo 96 BPM. Driving Afro-Indigenous groove: low kick on 1 and 3; rim click on 2 and 4; steady shaker/guache 16ths.",
    sources: [
      { title: "Smithsonian Folkways: The Cumbia of Colombia - Historical Overview", url: "https://folkways.si.edu/" },
      { title: "Berklee Latino: Traditional Cumbia Rhythmic Analysis", url: "https://berklee.edu/" }
    ]
  },
  "onedrop": {
    refSong: "One Drop", refArtist: "Bob Marley & The Wailers", refYear: 1979,
    refDrummer: "Carlton 'Carly' Barrett",
    label: "Island Records (Survival, Tuff Gong Studio, Kingston)",
    gear: "Ludwig kit, Rogers snare with high tuning, open A Zildjian hi-hats",
    recordReality: "Carlton Barrett pioneered the 'One Drop'. Beat 1 is completely empty (rest); kick drum and snare rim-click hit simultaneously only on beat 3. Fills consist of light triplet rolls or rim clicks leading into section changes.",
    transcriptionNotes: "Tempo 76 BPM. Essential reggae rhythm: beat 1 is vacant; kick and snare drop together on beat 3; swinging 16th-note hi-hat with open splashes on offbeats.",
    sources: [
      { title: "Drummerworld: Carlton Barrett Profile & Reggae Grooves", url: "https://www.drummerworld.com/" },
      { title: "Drumeo: How to Play Reggae Drums - The One Drop", url: "https://www.drumeo.com/" },
      { title: "Songsterr: Bob Marley - One Drop Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },
  "steppers": {
    refSong: "Sponji Reggae", refArtist: "Black Uhuru / Sly & Robbie", refYear: 1981,
    refDrummer: "Sly Dunbar",
    label: "Island Records (Red, Compass Point Studios, produced by Sly & Robbie)",
    gear: "Tama kit, electronic Simmons drums / Syndrums, loud rimshot snare",
    recordReality: "Sly Dunbar's four-on-the-floor 'steppers' beat. Kick drum hits steadily on all four beats (1, 2, 3, 4) with snare on beat 3. Minimal fills; driving, hypnotic pulse that paved the way for UK dub.",
    transcriptionNotes: "Tempo 74 BPM (or 148 BPM). Steppers kick on 1, 2, 3, 4; snare crack on beat 3; driving 16th-note hi-hat with syncopated open accents.",
    sources: [
      { title: "Modern Drummer: Sly Dunbar - The Reggae Innovator", url: "https://www.moderndrummer.com/" },
      { title: "Red Bull Music Academy: Sly & Robbie Lecture on Steppers Reggae", url: "https://www.redbullmusicacademy.com/" },
      { title: "Songsterr: Black Uhuru - Sponji Reggae Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },
  "rockers": {
    refSong: "Rockers (style)", refArtist: "Channel One / The Revolutionaries", refYear: null,
    refDrummer: "Sly Dunbar",
    label: "Channel One Studios (Kingston)",
    gear: "Acoustic kit, crisp snare rimshots on 2 and 4",
    recordReality: "Sly Dunbar created 'rockers' in the mid-1970s at Channel One. Moved the snare backbeat to beats 2 and 4 over syncopated double-kick patterns, breaking from the one-drop formula.",
    transcriptionNotes: "Tempo 78 BPM. Snare backbeat on 2 and 4 (unlike one drop); syncopated double kick on 1 and 3-and; rolling 16th hi-hat.",
    sources: [
      { title: "Trojan Records: The Rockers Revolution at Channel One", url: "https://trojanrecords.com/" },
      { title: "Drummerworld: Sly Dunbar Rockers Grooves", url: "https://www.drummerworld.com/" }
    ]
  },
  "ska": {
    refSong: "Guns of Navarone", refArtist: "The Skatalites", refYear: 1965,
    refDrummer: "Lloyd Knibb",
    label: "Studio One / Island Records (Kingston, produced by Clement 'Coxsone' Dodd)",
    gear: "Acoustic kit, high-tuned snare, crisp ride cymbal",
    recordReality: "Lloyd Knibb invented the ska drum beat. Energetic syncopated rimshots on beats 2 and 4, accompanied by fast snare press rolls leading into downbeats.",
    transcriptionNotes: "Tempo 130 BPM. Snare rimshot accent on beats 2 and 4; kick on 1 and 3; snare press rolls on beat 4 leading into 1; upbeat-accented hi-hat.",
    sources: [
      { title: "Modern Drummer: Lloyd Knibb - The Creator of the Ska Drum Beat", url: "https://www.moderndrummer.com/" },
      { title: "Songsterr: The Skatalites - Guns of Navarone Drum Tab", url: "https://www.songsterr.com/" },
      { title: "Trojan Records: Lloyd Knibb Biography", url: "https://trojanrecords.com/" }
    ]
  }
};

module.exports = { AUDIT_REFS_PART2 };
