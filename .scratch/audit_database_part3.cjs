// Audit database part 3: Hip-Hop Golden Era (23 beats) and Lo-Fi & Chillhop (16 beats)

const AUDIT_REFS_PART3 = {
  // ==========================================
  // HIP-HOP GOLDEN ERA (23)
  // ==========================================
  "boombap": {
    refSong: "Boom Bap Standard", refArtist: "DJ Premier style", refYear: null,
    refDrummer: "Sampled breaks / DJ Premier",
    label: "East Coast 90s Standard",
    gear: "Akai MPC60 / E-mu SP-1200, 12-bit sampling, vinyl crackle",
    recordReality: "Classic 90s boom bap archetype. Built from chopped funk drum breaks (Amen, Impeach, Skull Snaps) with swing quantization and hard kick/snare punch.",
    transcriptionNotes: "Tempo 90 BPM. Classic East Coast boom bap: punchy kick on 1, 2-and, 3-and; fat snare on 2 and 4; closed 8th-note hi-hat.",
    sources: [
      { title: "Sound On Sound: Classic Hip-Hop Drum Production Techniques", url: "https://www.soundonsound.com/" },
      { title: "Drumeo: The Boom Bap Hip Hop Drumming Blueprint", url: "https://www.drumeo.com/" }
    ]
  },
  "boombap2bar": {
    refSong: "Boom Bap 2-Bar Loop", refArtist: "Pete Rock / Marley Marl standard", refYear: null,
    refDrummer: "Sampled funk breaks",
    label: "Golden Era 2-Bar Standard",
    gear: "E-mu SP-1200 / Akai MPC60, chopped vinyl drums",
    recordReality: "2-bar loop standard: bar 1 establishes the head; bar 2 adds an anticipatory kick double into beat 3 and open hi-hat splash.",
    transcriptionNotes: "Tempo 92 BPM. Two-measure phrase avoiding repetitive 1-bar stagnation. Kick syncopations vary between bar 1 and bar 2.",
    sources: [
      { title: "Attack Magazine: Beat Dissected - 90s East Coast Boom Bap", url: "https://www.attackmagazine.com/" },
      { title: "Sound On Sound: Recreating 90s Hip-Hop Drum Loops on MPC & SP-1200", url: "https://www.soundonsound.com/" },
      { title: "Drumeo: 2-Bar Phrase Development for Hip Hop Grooves", url: "https://www.drumeo.com/" }
    ]
  },
  "massappeal": {
    refSong: "Mass Appeal", refArtist: "Gang Starr", refYear: 1994,
    refDrummer: "DJ Premier (Vic Juris sample)",
    label: "Chrysalis / EMI (Hard to Earn, D&D Studios, NY)",
    gear: "Akai MPC60, chopped vinyl sample, S950 low-pass filter",
    recordReality: "Sample-loop record. DJ Premier sampled the opening of Vic Juris's 'Horizon Drive' (1980) and layered it with hard-hitting chopped drums. The drum loop repeats continuously throughout; NO drum fills exist on the original track. Any fill in Beat Mapper is a synthetic turnaround exercise.",
    transcriptionNotes: "Tempo 94 BPM. Crisp snare on 2 and 4; syncopated kick on 1, 2-and, 3-and; steady 8th-note closed hi-hats. Premier's unswung, razor-sharp quantization.",
    sources: [
      { title: "Sound On Sound: DJ Premier - The Making of Classic Hip-Hop", url: "https://www.soundonsound.com/" },
      { title: "WhoSampled: Gang Starr - Mass Appeal (Vic Juris sample)", url: "https://www.whosampled.com/Gang-Starr/Mass-Appeal/" },
      { title: "Songsterr: Gang Starr - Mass Appeal Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },
  "troy": {
    refSong: "They Reminisce Over You (T.R.O.Y.)", refArtist: "Pete Rock & CL Smooth", refYear: 1992,
    refDrummer: "Pete Rock (Tom Scott sample)",
    label: "Elektra Records (Mecca and the Soul Brother)",
    gear: "E-mu SP-1200, Akai S950, vinyl chops",
    recordReality: "Sample-loop record. Pete Rock sampled Tom Scott with The California Dreamers ('Today', 1967) for the saxophone and bassline, layered over James Brown's 'Say It Loud - I'm Black and I'm Proud' (1968) drum break. The loop runs continuously with Pete Rock's horn filtering. NO drum fills exist on the record.",
    transcriptionNotes: "Tempo 92 BPM. Pete Rock production: kick on 1, 2-and, 3-and, 4; snare on 2 and 4; open hi-hat on 4-and.",
    sources: [
      { title: "Pitchfork: Pete Rock & CL Smooth - Mecca and the Soul Brother Review", url: "https://pitchfork.com/" },
      { title: "WhoSampled: Pete Rock & CL Smooth - They Reminisce Over You (T.R.O.Y.)", url: "https://www.whosampled.com/Pete-Rock-%26-C.L.-Smooth/They-Reminisce-Over-You-(T.R.O.Y.)/" }
    ]
  },
  "nystate": {
    refSong: "N.Y. State of Mind", refArtist: "Nas", refYear: 1994,
    refDrummer: "DJ Premier (Joe Chambers sample)",
    label: "Columbia Records (Illmatic, recorded at D&D Studios, NY)",
    gear: "Akai MPC60, chopped vinyl piano & drum breaks",
    recordReality: "Sample-loop record. DJ Premier sampled Joe Chambers' 'Mind Rain' (1978) for the eerie piano lick and chopped drums from Donald Byrd's 'Flight Time' and Kool & The Gang's 'N.T.'. The drum groove loops hypnotically behind Nas's flow. NO drum fills on the track.",
    transcriptionNotes: "Tempo 90 BPM. DJ Premier production: kick on 1, 2-a, 3-and; crisp snare on 2 and 4; open hi-hat on 2-a.",
    sources: [
      { title: "Sound On Sound: Classic Tracks - Nas 'N.Y. State of Mind' / DJ Premier", url: "https://www.soundonsound.com/" },
      { title: "WhoSampled: Nas - N.Y. State of Mind", url: "https://www.whosampled.com/Nas/N.Y.-State-of-Mind/" },
      { title: "Songsterr: Nas - N.Y. State of Mind Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },
  "shookones": {
    refSong: "Shook Ones Pt. II", refArtist: "Mobb Deep", refYear: 1995,
    refDrummer: "Havoc (Quincy Jones sample)",
    label: "Loud / RCA (The Infamous, engineered by Tony Black)",
    gear: "Ensoniq EPS-16+ keyboard sampler, vinyl pitch-shifting",
    recordReality: "Sample-loop record. Havoc pitched down Herbie Hancock's 'Jessica' (1969) on his EPS-16+ and layered drums from Quincy Jones's 'Kitty With the Bent Frame' (1971) and Daly-Wilson Big Band. A locked, repeating loop with NO drum kit fills on the recording.",
    transcriptionNotes: "Tempo 94 BPM. Havoc / Mobb Deep groove: syncopated kick on 1, 2-and, 3, 3-and; hard snare on 2 and 4; closed 8th-note hi-hat.",
    sources: [
      { title: "Sound On Sound: Havoc - Producing Mobb Deep's The Infamous", url: "https://www.soundonsound.com/" },
      { title: "WhoSampled: Mobb Deep - Shook Ones Pt. II", url: "https://www.whosampled.com/Mobb-Deep/Shook-Ones-Part-II/" },
      { title: "Songsterr: Mobb Deep - Shook Ones Pt. II Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },
  "cream": {
    refSong: "C.R.E.A.M.", refArtist: "Wu-Tang Clan", refYear: 1993,
    refDrummer: "RZA (The Charmels sample)",
    label: "Loud / RCA (Enter the Wu-Tang: 36 Chambers, Firehouse Studios)",
    gear: "Ensoniq EPS-16+ / E-mu SP-1200",
    recordReality: "Sample-loop record. RZA sampled the opening 2 bars of The Charmels' 'As Long As I've Got You' (1967, Stax, featuring Al Jackson Jr. on drums and Isaac Hayes on piano). The record loops this exact performance continuously. NO drum fills exist on the Wu-Tang track.",
    transcriptionNotes: "Tempo 90 BPM. RZA / Wu-Tang groove: kick on 1, 3, 3-and; dry acoustic snare on 2 and 4; steady 8th-note hi-hat.",
    sources: [
      { title: "Wax Poetics: The Making of Wu-Tang Clan's 36 Chambers", url: "https://www.waxpoetics.com/" },
      { title: "WhoSampled: Wu-Tang Clan - C.R.E.A.M. (The Charmels sample)", url: "https://www.whosampled.com/Wu-Tang-Clan/C.R.E.A.M./" },
      { title: "Songsterr: Wu-Tang Clan - C.R.E.A.M. Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },
  "electricrelaxation": {
    refSong: "Electric Relaxation", refArtist: "A Tribe Called Quest", refYear: 1993,
    refDrummer: "Q-Tip (Ronnie Foster 'Mystic Brew' sample)",
    label: "Jive Records (Midnight Marauders, Battery Studios, NY)",
    gear: "E-mu SP-1200, Akai S950, vinyl chops",
    recordReality: "Sample-loop record. Q-Tip sampled Ronnie Foster's 'Mystic Brew' (1972, Blue Note, recorded by Rudy Van Gelder). The drum loop repeats steadily throughout the verses; NO drum fills on the recording. Any fill in Beat Mapper is a synthetic practice variation.",
    transcriptionNotes: "Tempo 98 BPM. ATCQ / Ali Shaheed Muhammad: syncopated kick on 1, 2, 2-and, 3; snare on 2 and 4; open hi-hat on 2-and.",
    sources: [
      { title: "Wax Poetics: A Tribe Called Quest - Midnight Marauders 20th Anniversary", url: "https://www.waxpoetics.com/" },
      { title: "WhoSampled: A Tribe Called Quest - Electric Relaxation (Ronnie Foster sample)", url: "https://www.whosampled.com/A-Tribe-Called-Quest/Electric-Relaxation/" }
    ]
  },
  "comeclean": {
    refSong: "Come Clean", refArtist: "Jeru the Damaja", refYear: 1993,
    refDrummer: "DJ Premier (Shelly Manne sample)",
    label: "Payday / FFRR (The Sun Rises in the East, D&D Studios)",
    gear: "Akai MPC60, chopped vinyl water droplets",
    recordReality: "DJ Premier sampled Shelly Manne's 'Infinity' (1969) for the eerie water droplet percussion, over an extremely dry, crisp snare and hollow offbeat hats. Looped boom bap beat without live kit fills.",
    transcriptionNotes: "Tempo 94 BPM. Minimalist, syncopated kick and snare groove paired with pitched droplet percussion and unyielding backbeats.",
    sources: [
      { title: "Sound On Sound: DJ Premier Production Breakdown", url: "https://www.soundonsound.com/" },
      { title: "WhoSampled: Jeru the Damaja - Come Clean", url: "https://www.whosampled.com/Jeru-the-Damaja/Come-Clean/" }
    ]
  },
  "halftime": {
    refSong: "Halftime", refArtist: "Nas", refYear: 1992,
    refDrummer: "Large Professor (Gary Byrd sample)",
    label: "Ruffhouse / Columbia (Zebrahead OST / Illmatic)",
    gear: "E-mu SP-1200, Akai S950",
    recordReality: "Sample-loop record. Large Professor chopped Gary Byrd's 'Soul Travelin' Pt. I' (1973) and Average White Band's 'School Boy Crush' (1975) cowbell/drums. Continuous, hard-hitting Golden Era loop.",
    transcriptionNotes: "Tempo 92 BPM (original master ~95 BPM; 92 BPM practice preset). Large Professor groove: kick on 1, 2-and, 3-and, 4; snare on 2 and 4; closed 8th-note hi-hat.",
    sources: [
      { title: "Complex: Large Professor Breaks Down Nas's Illmatic", url: "https://www.complex.com/" },
      { title: "WhoSampled: Nas - Halftime", url: "https://www.whosampled.com/Nas/Halftime/" }
    ]
  },
  "scenario": {
    refSong: "Scenario", refArtist: "A Tribe Called Quest", refYear: 1991,
    refDrummer: "Ali Shaheed & Q-Tip (Brother Jack McDuff sample)",
    label: "Jive Records (The Low End Theory)",
    gear: "E-mu SP-1200, chopped vinyl breaks",
    recordReality: "Q-Tip sampled Brother Jack McDuff's 'Oblighetto' (1970) and Jimmy McGriff's 'The Worm' (1968) drum break. Driving, high-energy boom bap loop.",
    transcriptionNotes: "Tempo 102 BPM. ATCQ party classic: kick on 1, 1-and, 3, 3-and; snare on 2 and 4; steady 8th-note hats.",
    sources: [
      { title: "Pitchfork: A Tribe Called Quest - The Low End Theory Retrospective", url: "https://pitchfork.com/" },
      { title: "WhoSampled: A Tribe Called Quest - Scenario", url: "https://www.whosampled.com/A-Tribe-Called-Quest/Scenario/" }
    ]
  },
  "survival": {
    refSong: "Survival of the Fittest", refArtist: "Mobb Deep", refYear: 1995,
    refDrummer: "Havoc (Barry Harris sample)",
    label: "Loud / RCA (The Infamous)",
    gear: "Ensoniq EPS-16+, chopped vinyl",
    recordReality: "Sample-loop record. Havoc sampled The Barry Harris Trio's 'High Fly' (1961) piano and Al Green's 'I'm Glad You're Mine' drums. The track is an unvarying 2-bar loop.",
    transcriptionNotes: "Tempo 95 BPM. Dark, rolling kick on 1 and offbeats; crisp backbeat on 2 and 4; steady closed hi-hat.",
    sources: [
      { title: "WhoSampled: Mobb Deep - Survival of the Fittest", url: "https://www.whosampled.com/Mobb-Deep/Survival-of-the-Fittest/" }
    ]
  },
  "timesup": {
    refSong: "Time's Up", refArtist: "O.C.", refYear: 1994,
    refDrummer: "Buckwild (Les McCann sample)",
    label: "Wild Pitch Records (Word...Life, produced by Buckwild)",
    gear: "Akai MPC60, E-mu SP-1200",
    recordReality: "Sample-loop record. Buckwild sampled Les McCann's 'North Carolina' (1972) and Slick Rick vocal snippets. The beat is a relentless 1-bar loop with zero live kit fills.",
    transcriptionNotes: "Tempo 92 BPM. Punchy kick on 1, 2-and, 3; snapping snare on 2 and 4; swinging 8th-note hi-hat.",
    sources: [
      { title: "WhoSampled: O.C. - Time's Up (Les McCann sample)", url: "https://www.whosampled.com/O.C./Time%27s-Up/" }
    ]
  },
  "hip2dagame": {
    refSong: "Hip 2 Da Game", refArtist: "Lord Finesse", refYear: 1995,
    refDrummer: "Lord Finesse (Oscar Peterson sample)",
    label: "Penalty / Tommy Boy (The Awakening)",
    gear: "E-mu SP-1200, Akai S950",
    recordReality: "Sample-loop record. Lord Finesse sampled Oscar Peterson's 'Dream of You' (1970). Swinging MPC boom bap loop with no live fills.",
    transcriptionNotes: "Tempo 91 BPM. Smooth, swinging boom bap pocket with deep ghosted snare nuances and unquantized kick bounce.",
    sources: [
      { title: "WhoSampled: Lord Finesse - Hip 2 Da Game", url: "https://www.whosampled.com/Lord-Finesse/Hip-2-Da-Game/" }
    ]
  },
  "protectyaneck": {
    refSong: "Protect Ya Neck", refArtist: "Wu-Tang Clan", refYear: 1992,
    refDrummer: "RZA (The Grunt sample)",
    label: "Wu-Tang Records / Loud (Enter the Wu-Tang: 36 Chambers)",
    gear: "E-mu SP-1200, raw vinyl chops",
    recordReality: "Sample-loop record. RZA sampled The J.B.'s 'The Grunt' (1970). Raw, unpolished, aggressive drum loop running under 8 emcees. Zero kit fills.",
    transcriptionNotes: "Tempo 102 BPM. RZA production: syncopated kick on 1, 2, 2-and, 3, 4, 4-and; hard snare on 2 and 4; driving hats.",
    sources: [
      { title: "WhoSampled: Wu-Tang Clan - Protect Ya Neck", url: "https://www.whosampled.com/Wu-Tang-Clan/Protect-Ya-Neck/" }
    ]
  },
  "worstcomes": {
    refSong: "Worst Comes to Worst", refArtist: "Dilated Peoples", refYear: 2001,
    refDrummer: "The Alchemist (William Bell sample)",
    label: "Capitol Records (Expansion Team)",
    gear: "Akai MPC2000XL, chopped soul vinyl",
    recordReality: "Sample-loop record. The Alchemist pitched up William Bell's 'I Forgot to Be Your Lover' (1968) and layered it with hard-knocking MPC drums. Unvarying soul chop loop.",
    transcriptionNotes: "Tempo 94 BPM. Alchemist groove: kick on 1, 2-and, 3-and, 4; snare on 2 and 4; open hi-hat on 2-and.",
    sources: [
      { title: "WhoSampled: Dilated Peoples - Worst Comes to Worst", url: "https://www.whosampled.com/Dilated-Peoples/Worst-Comes-to-Worst/" }
    ]
  },
  "whogotdaprops": {
    refSong: "Who Got Da Props", refArtist: "Black Moon", refYear: 1992,
    refDrummer: "Da Beatminerz (Ronnie Laws sample)",
    label: "Nervous Records (Enta da Stage)",
    gear: "E-mu SP-1200, Akai S950",
    recordReality: "Sample-loop record. Da Beatminerz sampled Ronnie Laws' 'Tidal Wave' (1975). Gritty Brooklyn basement boom bap loop with no kit fills.",
    transcriptionNotes: "Tempo 92 BPM. Dark, filtered low-end kick; snapping snare on 2 and 4; lazy, laid-back 8th-note hi-hats.",
    sources: [
      { title: "WhoSampled: Black Moon - Who Got Da Props", url: "https://www.whosampled.com/Black-Moon/Who-Got-Da-Props/" }
    ]
  },
  "bestkeptsecret": {
    refSong: "Best Kept Secret", refArtist: "Diamond D", refYear: 1992,
    refDrummer: "Diamond D (Al Green sample)",
    label: "Chemistry / Mercury (Stunts, Blunts and Hip Hop)",
    gear: "E-mu SP-1200, chopped vinyl breakbeats",
    recordReality: "Sample-loop record. Diamond D sampled Al Green's 'Love and Happiness' and John Davis's 'I Can't Stop' drum break. Driving 1-bar loop with no live fills.",
    transcriptionNotes: "Tempo 95 BPM. Diamond D production: kick on 1, 1-a, 3, 3-and; snare on 2 and 4; open hi-hat on 2-a.",
    sources: [
      { title: "WhoSampled: Diamond D - Best Kept Secret", url: "https://www.whosampled.com/Diamond-D/Best-Kept-Secret/" }
    ]
  },
  "partyandbull": {
    refSong: "Party and Bullshit", refArtist: "The Notorious B.I.G.", refYear: 1993,
    refDrummer: "Easy Mo Bee (Johnny Pate sample)",
    label: "Uptown Records (Who's the Man? OST)",
    gear: "Akai MPC60, chopped vinyl",
    recordReality: "Sample-loop record. Easy Mo Bee sampled Johnny Pate's 'Shaft in Africa' (1973). Upbeat, party-starting boom bap loop.",
    transcriptionNotes: "Tempo 100 BPM. Easy Mo Bee groove: kick on 1, 2, 2-and, 3, 4, 4-and; big snare on 2 and 4; steady 8th-note hats.",
    sources: [
      { title: "WhoSampled: The Notorious B.I.G. - Party and Bullshit", url: "https://www.whosampled.com/The-Notorious-B.I.G./Party-and-Bullshit/" }
    ]
  },
  "statikswing": {
    refSong: "East Coast Boom Bap Swing", refArtist: "Statik Selektah standard", refYear: null,
    refDrummer: "MPC swung boom bap",
    label: "East Coast Hip-Hop Standard",
    gear: "Akai MPC2000XL / MPC Renaissance, unquantized swing",
    recordReality: "Modern East Coast boom bap swing archetype. MPC groove template with delayed snare ghost notes and pushed kicks.",
    transcriptionNotes: "Tempo 92 BPM. Swung boom bap: kick on 1, 2-and, 3-and; snare on 2 and 4; open hi-hat on 2-a.",
    sources: [
      { title: "Attack Magazine: Beat Dissected - MPC Swung Boom Bap", url: "https://www.attackmagazine.com/" }
    ]
  },
  "dilla": {
    refSong: "Fall In Love", refArtist: "Slum Village", refYear: 2000,
    refDrummer: "J Dilla (Gap Mangione sample)",
    label: "GoodVibe Recordings (Fantastic, Vol. 2)",
    gear: "Akai MPC3000, unquantized pads, vinyl chops",
    recordReality: "Sample-loop record. J Dilla sampled Gap Mangione's 'Diana in the Autumn Wind' (1968). Dilla turned off the MPC3000 auto-correct, playing the kicks and snares entirely by hand to create his legendary 'drunk' unquantized swing. NO drum kit fills on the record.",
    transcriptionNotes: "Tempo 87 BPM. Dilla's signature 'drunk' microtiming: kick drum delayed by 15–30ms behind the grid; snare arriving slightly early on 2 and 4; hi-hat playing unquantized swinging 16ths.",
    sources: [
      { title: "Dan Charnas: Dilla Time - The Life and Afterlife of J Dilla", url: "https://www.mcdbooks.com/" },
      { title: "WhoSampled: Slum Village - Fall In Love (Gap Mangione sample)", url: "https://www.whosampled.com/Slum-Village/Fall-in-Love/" },
      { title: "Sound On Sound: J Dilla - The Rhythmic Revolution", url: "https://www.soundonsound.com/" }
    ]
  },
  "gfunk": {
    refSong: "Nuthin' but a 'G' Thang", refArtist: "Dr. Dre", refYear: 1992,
    refDrummer: "Dr. Dre (Leon Haywood sample)",
    label: "Death Row / Interscope (The Chronic, engineered by Greg Collins)",
    gear: "E-mu SP-1200 / Akai MPC60, Minimoog bass",
    recordReality: "Dr. Dre replayed and sampled Leon Haywood's 'I Want'a Do Something Freaky to You' (1975). A locked, laid-back West Coast funk groove with live percussion and Moog bass. NO drum fills on the track.",
    transcriptionNotes: "Tempo 95 BPM. Laid-back G-Funk: kick on 1, 2-and, 3; snare on 2 and 4; open hi-hats sizzling on 2-and and 4-and.",
    sources: [
      { title: "Sound On Sound: Classic Tracks - Dr. Dre 'The Chronic'", url: "https://www.soundonsound.com/" },
      { title: "WhoSampled: Dr. Dre - Nuthin' but a 'G' Thang", url: "https://www.whosampled.com/Dr.-Dre/Nuthin%27-but-a-%27G%27-Thang/" }
    ]
  },
  "timbaland": {
    refSong: "Try Again", refArtist: "Aaliyah", refYear: 2000,
    refDrummer: "Timbaland (mouth percussion & Ensoniq ASR-10)",
    label: "Blackground / Virgin (Romeo Must Die OST)",
    gear: "Ensoniq ASR-10, mouth beatbox, syncopated digital delay",
    recordReality: "Futuristic syncopated R&B bounce. Timbaland layered vocal beatboxing with stuttering ASR-10 digital snares and rolling hi-hats. Fills consist of syncopated vocal beatbox turnarounds.",
    transcriptionNotes: "Tempo 110 BPM. Syncopated bounce: kick on 1, 2, 2-a, 3-and, 4; snare on 2 and 4 with signature beatbox syncopations.",
    sources: [
      { title: "Sound On Sound: Timbaland - Creating the Futuristic R&B Sound", url: "https://www.soundonsound.com/" },
      { title: "WhoSampled: Aaliyah - Try Again", url: "https://www.whosampled.com/Aaliyah/Try-Again/" }
    ]
  },

  // ==========================================
  // LO-FI & CHILLHOP (16)
  // ==========================================
  "aruarian": {
    refSong: "Aruarian Dance", refArtist: "Nujabes / Laurindo Almeida", refYear: 2004,
    refDrummer: "Nujabes (Laurindo Almeida sample)",
    label: "Victor Entertainment (Samurai Champloo Music Record: Departure)",
    gear: "Akai MPC2000XL, vinyl chops, SP-404 tape vinyl sim",
    recordReality: "Sample-loop record. Nujabes sampled Laurindo Almeida's 'The Lamp Is Low' (1969). Unvarying, tranquil boom bap drum loop with MPC swing. NO drum kit fills on the recording.",
    transcriptionNotes: "Tempo 99 BPM. Signature Nujabes lo-fi pocket: distinctive 16th double kicks on 1 and 1-e, and syncopated double kicks on 3-and and 3-a into beat 4 (Bar 2 double-kicks on 1/1-e and pushes on 2-and into 3); backbeat snare on 2 and 4; steady 8th-note hi-hat with 58% MPC swing.",
    sources: [
      { title: "WhoSampled: Nujabes - Aruarian Dance (Laurindo Almeida sample)", url: "https://www.whosampled.com/Nujabes/Aruarian-Dance/" }
    ]
  },
  "feather": {
    refSong: "Feather", refArtist: "Nujabes", refYear: 2005,
    refDrummer: "Nujabes (Yusef Lateef sample)",
    label: "Hydeout Productions (Modal Soul)",
    gear: "Akai MPC2000XL, Roland SP-404",
    recordReality: "Sample-loop record. Nujabes sampled Yusef Lateef's 'Love Theme from The Robe' (1970). Steady 1-bar hip-hop loop with NO drum fills.",
    transcriptionNotes: "Tempo 98 BPM. Nujabes groove: kick on 1, 3, 3-and; warm snare on 2 and 4; steady 8th-note hats.",
    sources: [
      { title: "WhoSampled: Nujabes - Feather (Yusef Lateef sample)", url: "https://www.whosampled.com/Nujabes/Feather/" }
    ]
  },
  "donuttime": {
    refSong: "Time: The Donut of the Heart", refArtist: "J Dilla", refYear: 2006,
    refDrummer: "J Dilla (Jackson 5 sample)",
    label: "Stones Throw Records (Donuts)",
    gear: "Boss SP-303, Akai MPC3000 (produced in Cedars-Sinai hospital)",
    recordReality: "Sample-loop record. Dilla chopped Jackson 5's 'All I Do Is Think of You' (1975). Off-grid, unquantized vinyl chops. NO drum fills on the track.",
    transcriptionNotes: "Tempo 87 BPM. Unquantized kicks and snares chopped directly from the vinyl source with SP-303 vinyl simulator flutter.",
    sources: [
      { title: "Pitchfork: J Dilla - Donuts Retrospective Review", url: "https://pitchfork.com/" },
      { title: "WhoSampled: J Dilla - Time: The Donut of the Heart", url: "https://www.whosampled.com/J-Dilla/Time%3A-The-Donut-of-the-Heart/" }
    ]
  },
  "sofar": {
    refSong: "So Far to Go", refArtist: "J Dilla / Common & D'Angelo", refYear: 2006,
    refDrummer: "J Dilla (Isley Brothers sample)",
    label: "Stones Throw / Geffen (The Shining)",
    gear: "Akai MPC3000, vinyl chops",
    recordReality: "Sample-loop record. Dilla sampled The Isley Brothers' 'Don't Say Goodnight (It's Time for Love)' (1980). Dilla's signature laid-back unquantized pocket. NO kit fills on the track.",
    transcriptionNotes: "Tempo 85 BPM. Dilla time feel: kick delayed behind the grid; snare arriving early; floating, unquantized hi-hats.",
    sources: [
      { title: "WhoSampled: J Dilla - So Far to Go", url: "https://www.whosampled.com/J-Dilla/So-Far-to-Go/" }
    ]
  },
  "workinonit": {
    refSong: "Workinonit", refArtist: "J Dilla", refYear: 2006,
    refDrummer: "J Dilla (10cc sample)",
    label: "Stones Throw Records (Donuts)",
    gear: "Boss SP-303, Roland SP-404",
    recordReality: "Sample-loop record. Dilla chopped 10cc's 'The Worst Band in the World' (1974) and Mantronix's 'King of the Beats'. Aggressive chopped loop with siren effects and NO live kit fills.",
    transcriptionNotes: "Tempo 92 BPM. Aggressive kick stutter; distorted rock snare chops on 2 and 4.",
    sources: [
      { title: "WhoSampled: J Dilla - Workinonit", url: "https://www.whosampled.com/J-Dilla/Workinonit/" }
    ]
  },
  "accordion": {
    refSong: "Accordion", refArtist: "Madvillain (Madlib & MF DOOM)", refYear: 2004,
    refDrummer: "Madlib (Daedelus sample)",
    label: "Stones Throw Records (Madvillainy)",
    gear: "Boss SP-303 Dr. Sample, portable turntable, cassette deck",
    recordReality: "Sample-loop record. Madlib sampled Daedelus's 'Experience' (2001) accordion chords. The percussion is an ultra-minimal SP-303 loop with muffled thumps and shaker. NO drum fills on the track.",
    transcriptionNotes: "Tempo 96 BPM. Muffled, deep kick; subtle shaker and rimshot on 2 and 4.",
    sources: [
      { title: "Pitchfork: Madvillain - Madvillainy 10th Anniversary Review", url: "https://pitchfork.com/" },
      { title: "WhoSampled: Madvillain - Accordion", url: "https://www.whosampled.com/Madvillain/Accordion/" }
    ]
  },
  "allcaps": {
    refSong: "All Caps", refArtist: "Madvillain (Madlib & MF DOOM)", refYear: 2004,
    refDrummer: "Madlib (Ironside sample)",
    label: "Stones Throw Records (Madvillainy)",
    gear: "Boss SP-303, Roland SP-404, chopped vinyl",
    recordReality: "Sample-loop record. Madlib sampled Quincy Jones's 'Theme from Ironside' (1971). Raw, lo-fi boom bap loop with NO drum kit fills on the recording.",
    transcriptionNotes: "Tempo 92 BPM. Madlib groove: kick on 1, 3, 3-and; snare on 2 and 4; steady 8th-note hats.",
    sources: [
      { title: "WhoSampled: Madvillain - All Caps", url: "https://www.whosampled.com/Madvillain/All-Caps/" }
    ]
  },
  "lowclass": {
    refSong: "Low Class Conspiracy", refArtist: "Quasimoto / Madlib", refYear: 2000,
    refDrummer: "Madlib (SP-1200)",
    label: "Stones Throw Records (The Unseen)",
    gear: "E-mu SP-1200, Boss SP-303, pitched-down vocals",
    recordReality: "Sample-loop record. Madlib on SP-1200. Hypnotic lo-fi boom bap loop without live fills.",
    transcriptionNotes: "Tempo 88 BPM. Gritty 12-bit kick and snare; lazy offbeat hi-hat.",
    sources: [
      { title: "WhoSampled: Quasimoto - Low Class Conspiracy", url: "https://www.whosampled.com/Quasimoto/Low-Class-Conspiracy/" }
    ]
  },
  "klipsh": {
    refSong: "Klipsh", refArtist: "Knxwledge", refYear: 2015,
    refDrummer: "Knxwledge (Roland SP-404)",
    label: "Stones Throw Records (Hud Dreems)",
    gear: "Roland SP-404SX, vinyl compressor, Rhodes chops",
    recordReality: "Sample-loop record. Knxwledge's signature heavy SP-404 vinyl compressor pump with drunken, off-grid drum chops. NO kit fills on the track.",
    transcriptionNotes: "Tempo 82 BPM. Drunken, unquantized kick-snare pocket with heavy sidechain-style vinyl compression.",
    sources: [
      { title: "Bandcamp: Knxwledge - Hud Dreems", url: "https://knxwledge.bandcamp.com/" }
    ]
  },
  "lofigirl": {
    refSong: "Coffee Shop Study Beat", refArtist: "Lofi Girl Standard", refYear: null,
    refDrummer: "Lofi Girl Production Team",
    label: "Lofi Girl / ChilledCow Standard",
    gear: "DAW, bitcrusher, tape flutter emulator, vinyl noise plugin",
    recordReality: "Modern lo-fi hip-hop study beat archetype. Continuous, unchanging 2-bar loop designed for background concentration. NO disruptive drum fills.",
    transcriptionNotes: "Tempo 80 BPM. Soft, low-passed kick; gentle rim-click or wood snare; quiet swinging 8th-note hi-hat.",
    sources: [
      { title: "Lofi Girl Official Hub", url: "https://lofigirl.com/" }
    ]
  },
  "whataday": {
    refSong: "What a Day", refArtist: "Kiefer", refYear: 2018,
    refDrummer: "Kiefer (piano and live feel drums)",
    label: "Stones Throw Records (Happysad)",
    gear: "Fender Rhodes, upright piano, acoustic jazz kit",
    recordReality: "Live-feel instrumental beat. Kiefer combines intricate jazz piano chords with loose, humanly swung hip-hop drumming.",
    transcriptionNotes: "Tempo 86 BPM. Cookin Soul groove: kick on 1, 2-and, 3; snare on 2 and 4; swung 8th-note hats.",
    sources: [
      { title: "Stones Throw: Kiefer - Happysad Album Notes", url: "https://www.stonesthrow.com/store/happysad/" }
    ]
  },
  "sakuratrees": {
    refSong: "Sakura Trees", refArtist: "Saib", refYear: 2017,
    refDrummer: "Saib (koto and chillhop drums)",
    label: "Chillhop Music (Around the World)",
    gear: "Sampler, koto samples, tape saturation",
    recordReality: "Chillhop standard. Japanese koto melody layered over a dusty boom bap drum loop. Steady loop without live fills.",
    transcriptionNotes: "Tempo 82 BPM. Saib chillhop groove: kick on 1, 1-a, 3, 3-a; snare rim on 2 and 4; gentle 8th-note hats.",
    sources: [
      { title: "Chillhop Music: Saib - Sakura Trees", url: "https://chillhop.com/" }
    ]
  },
  "faraway": {
    refSong: "Far Away", refArtist: "Tomppabeats", refYear: 2016,
    refDrummer: "Tomppabeats (tape cassette loop)",
    label: "Tomppabeats (Harbor)",
    gear: "Cassette 4-track recorder, Roland SP-404, chopped bossa vinyl",
    recordReality: "Cassette tape lo-fi loop. Pitch-wobbled soul sample with warm, muffled drums. Continuous loop with NO fills.",
    transcriptionNotes: "Tempo 78 BPM. Muffled kick; soft acoustic snare; cassette flutter on hi-hats.",
    sources: [
      { title: "Bandcamp: Tomppabeats - Harbor", url: "https://tomppabeats.bandcamp.com/" }
    ]
  },
  "cookinsoul": {
    refSong: "Cookin Soul Dope Beat", refArtist: "Cookin Soul", refYear: 2018,
    refDrummer: "Cookin Soul (SP-1200 / MPC 2000XL)",
    label: "Cookin Soul Records",
    gear: "E-mu SP-1200, Akai MPC2000XL, 12-bit vinyl grit",
    recordReality: "Spanish producer David Alvarez (Cookin Soul). Punchy 90s boom bap loop with hard-hitting kick and cracking snare.",
    transcriptionNotes: "Tempo 90 BPM. Cookin Soul bounce: kick on 1, 2-and, 3, 3-and; snare on 2 and 4; open hi-hat on 2-a.",
    sources: [
      { title: "Cookin Soul Official Bandcamp", url: "https://cookinsoul.bandcamp.com/" }
    ]
  },
  "vanilla": {
    refSong: "Sweet Talk", refArtist: "Vanilla", refYear: 2014,
    refDrummer: "Vanilla (soul sample chop)",
    label: "Vanilla (Origin)",
    gear: "DAW sampler, pitched soul vocal chops, warm MPC-style drums",
    recordReality: "UK beatmaker Vanilla. Soul vocal chop with warm, swinging boom bap drums. Seamless loop without live kit fills.",
    transcriptionNotes: "Tempo 86 BPM. Bouncy kick on 1, 3, 3-and; warm snare on 2 and 4; open hi-hat on 2-and; swinging 8th-note hi-hat.",
    sources: [
      { title: "Bandcamp: Vanilla - Origin", url: "https://vanillabeats.bandcamp.com/" }
    ]
  },
  "wuntwo": {
    refSong: "Rio", refArtist: "Wun Two", refYear: 2013,
    refDrummer: "Wun Two (SP-404 vinyl flutter)",
    label: "Sichtexot (Rio EP)",
    gear: "Roland SP-404, vinyl crackle, pitch-bent Brazilian chops",
    recordReality: "German producer Wun Two. Brazilian vinyl samples with dusty, laid-back lo-fi hip-hop drums. Steady loop.",
    transcriptionNotes: "Tempo 82 BPM. Deep low-passed kick; soft snare rim on 2 and 4; vinyl crackle and closed hats.",
    sources: [
      { title: "Bandcamp: Wun Two - Rio EP", url: "https://wuntwo.bandcamp.com/" }
    ]
  }
};

module.exports = { AUDIT_REFS_PART3 };
