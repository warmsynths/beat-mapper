// Audit database part 4: Electronic, House, Techno, UK Bass, Trap, Drills (41 beats)

const AUDIT_REFS_PART4 = {
  // ==========================================
  // ELECTRO & ELECTRONIC (7)
  // ==========================================
  "planetrock": {
    refSong: "Planet Rock", refArtist: "Afrika Bambaataa & Soulsonic Force", refYear: 1982,
    refDrummer: "Arthur Baker & John Robie (TR-808)",
    label: "Tommy Boy Records (recorded at Intergalactic Studios, NY)",
    gear: "Roland TR-808 Rhythm Composer, Fairlight CMI, Micromoog",
    recordReality: "Synthesized TR-808 drum machine programming. Arthur Baker and John Robie programmed the iconic 808 beat, interpolating Kraftwerk's 'Trans-Europe Express' and 'Numbers'. Features programmed TR-808 snare rolls leading into section changes.",
    transcriptionNotes: "Tempo 128 BPM. Roland TR-808 kick on 1, 1-a, 2-and, 3, 3-a; loud 808 clap on 2 and 4; rapid 16th-note closed 808 hats with programmed 32nd-note snare rolls.",
    sources: [
      { title: "Sound On Sound: Classic Tracks - Afrika Bambaataa 'Planet Rock'", url: "https://www.soundonsound.com/" },
      { title: "Roland Articles: The Beat That Changed the World - Planet Rock and the 808", url: "https://www.roland.com/" },
      { title: "Songsterr: Afrika Bambaataa - Planet Rock Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },
  "clear": {
    refSong: "Clear", refArtist: "Cybotron", refYear: 1983,
    refDrummer: "Juan Atkins & Richard Davis (TR-808)",
    label: "Fantasy Records (Detroit)",
    gear: "Roland TR-808, ARP Odyssey, Sequential Circuits Pro-One",
    recordReality: "Foundational Detroit electro. Juan Atkins and Richard Davis sequenced a rapid, syncopated TR-808 pattern. The sequenced groove runs steadily; programmed fills feature rapid 808 snare bursts.",
    transcriptionNotes: "Tempo 130 BPM. Fast, syncopated 808 kick; crisp 808 snare on 2 and 4; driving 16th-note 808 hats.",
    sources: [
      { title: "Pitchfork: The Story of Cybotron and the Birth of Techno", url: "https://pitchfork.com/" },
      { title: "WhoSampled: Cybotron - Clear (sampled by Missy Elliott 'Lose Control')", url: "https://www.whosampled.com/Cybotron/Clear/" }
    ]
  },
  "bluemonday": {
    refSong: "Blue Monday", refArtist: "New Order", refYear: 1983,
    refDrummer: "Stephen Morris (Oberheim DMX)",
    label: "Factory Records (FAC 73, Strawberry Studios, engineered by Michael Johnson)",
    gear: "Oberheim DMX drum machine, Powertran sequencer, E-mu Emulator",
    recordReality: "Stephen Morris programmed the Oberheim DMX. Features the legendary 16th-note stuttering kick drum intro burst. The main verse beat is an unvarying, locked 4-on-the-floor kick with DMX snare on 2 and 4.",
    transcriptionNotes: "Tempo 130 BPM. Verse: 4-on-the-floor kick, DMX snare on 2 and 4, steady 16th hats. Fill in Beat Mapper transcribed directly from the famous 16th-note kick stutter intro.",
    sources: [
      { title: "Sound On Sound: Classic Tracks - New Order 'Blue Monday'", url: "https://www.soundonsound.com/" },
      { title: "Songsterr: New Order - Blue Monday Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },
  "numbers": {
    refSong: "Numbers", refArtist: "Kraftwerk", refYear: 1981,
    refDrummer: "Electronic drum sequencing",
    label: "Kling Klang / EMI (Computer World)",
    gear: "Custom Kling Klang electronic drum pads, Texas Instruments speech synth",
    recordReality: "Pioneering electronic rhythm. Completely sequenced electronic percussion. Minimal, unyielding electronic beat with NO live fills.",
    transcriptionNotes: "Tempo 126 BPM. Heavy synthesized electronic kick on 1 and 3; electronic snare on 2 and 4; synthesized blip hats.",
    sources: [
      { title: "Sound On Sound: Kraftwerk and the Kling Klang Studio", url: "https://www.soundonsound.com/" },
      { title: "WhoSampled: Kraftwerk - Numbers (interpolated in Planet Rock)", url: "https://www.whosampled.com/Kraftwerk/Numbers/" }
    ]
  },
  "trans-europe": {
    refSong: "Trans-Europe Express", refArtist: "Kraftwerk", refYear: 1977,
    refDrummer: "Electronic drum sequencing",
    label: "Kling Klang / Capitol (Trans-Europe Express)",
    gear: "Custom Kling Klang electronic drum pads, Minimoog",
    recordReality: "Electronic train rhythm imitation. Ralf Hütter, Florian Schneider, Karl Bartos, and Wolfgang Flür mimicked the rhythmic click of European train tracks. Hypnotic electronic sequence without kit fills.",
    transcriptionNotes: "Tempo 114 BPM. Hypnotic electronic pulse: electronic kick on 1, 2-and, 3; synthesized snare/click on 2 and 4; rolling mechanical hats.",
    sources: [
      { title: "Sound On Sound: Classic Tracks - Kraftwerk 'Trans-Europe Express'", url: "https://www.soundonsound.com/" },
      { title: "WhoSampled: Kraftwerk - Trans-Europe Express", url: "https://www.whosampled.com/Kraftwerk/Trans-Europe-Express/" }
    ]
  },
  "closer": {
    refSong: "Closer", refArtist: "Nine Inch Nails", refYear: 1994,
    refDrummer: "Trent Reznor (Iggy Pop 'Nightclubbing' kick)",
    label: "Nothing / Interscope (The Downward Spiral, Le Pig Studios)",
    gear: "Akai S1100, Pro Tools, Roland drum machine sample, Eventide H3000",
    recordReality: "Trent Reznor sampled the distorted bass drum from Iggy Pop's 'Nightclubbing' (1977, played on a Roland drum machine, produced by David Bowie) and heavily processed it with digital distortion and compression. Unvarying industrial loop; section transitions driven by synth drops rather than kit fills.",
    transcriptionNotes: "Tempo 90 BPM. Crushing distorted kick on 1 and 3-and; industrial snare crack on 2 and 4; gritty electronic hi-hats.",
    sources: [
      { title: "Sound On Sound: Trent Reznor - Recording The Downward Spiral", url: "https://www.soundonsound.com/" },
      { title: "WhoSampled: Nine Inch Nails - Closer (Iggy Pop sample)", url: "https://www.whosampled.com/Nine-Inch-Nails/Closer/" }
    ]
  },
  "tourdefrance": {
    refSong: "Tour de France", refArtist: "Kraftwerk", refYear: 1983,
    refDrummer: "Electronic drum sequencing",
    label: "Kling Klang / EMI",
    gear: "Roland TR-808, LinnDrum, sampled bicycle gears & breathing",
    recordReality: "Cycling-inspired electronic groove. Sequenced drum machines layered with mechanical bicycle clicks and human breath. Steady sequence without kit fills.",
    transcriptionNotes: "Tempo 130 BPM. Steady 4-on-the-floor kick with syncopated electronic snare and rhythmic 16th-note bicycle click patterns.",
    sources: [
      { title: "Pitchfork: Kraftwerk - Tour de France Review", url: "https://pitchfork.com/" },
      { title: "WhoSampled: Kraftwerk - Tour de France", url: "https://www.whosampled.com/Kraftwerk/Tour-De-France/" }
    ]
  },

  // ==========================================
  // HOUSE & TECHNO (12)
  // ==========================================
  "pumpup": {
    refSong: "Pump Up The Volume", refArtist: "M|A|R|R|S", refYear: 1987,
    refDrummer: "Sampled 909 & breakbeat collage",
    label: "4AD Records (produced by Martyn Young)",
    gear: "Roland TR-909, Akai S900, vinyl collage",
    recordReality: "Pioneering UK sample collage. 4-on-the-floor TR-909 kick layered with sampled funk breaks (Trouble Funk, Graham Central Station). Continuous high-energy dance loop.",
    transcriptionNotes: "Tempo 114 BPM. Heavy four-on-the-floor kick, 909 handclap/snare on 2 and 4, rolling breakbeat hi-hats.",
    sources: [
      { title: "Sound On Sound: Classic Tracks - M|A|R|R|S 'Pump Up The Volume'", url: "https://www.soundonsound.com/" }
    ]
  },
  "voodooray": {
    refSong: "Voodoo Ray", refArtist: "A Guy Called Gerald", refYear: 1988,
    refDrummer: "Gerald Simpson (TR-808)",
    label: "Rham! Records (Manchester, Moonraker Studios)",
    gear: "Roland TR-808, Roland TB-303, Akai S950",
    recordReality: "Hacienda acid house anthem. Gerald Simpson programmed an unvarying, hypnotic 808 groove with Latin percussion elements and pitched vocal chops.",
    transcriptionNotes: "Tempo 122 BPM. 808 kick on all four beats with syncopated offbeat congas, 808 claps, and offbeat open hi-hats.",
    sources: [
      { title: "The Guardian: How We Made A Guy Called Gerald's Voodoo Ray", url: "https://www.theguardian.com/music/2014/sep/08/how-we-made-voodoo-ray-a-guy-called-gerald" }
    ]
  },
  "aroundtheworld": {
    refSong: "Around The World", refArtist: "Daft Punk", refYear: 1997,
    refDrummer: "Thomas Bangalter & Guy-Manuel (TR-909)",
    label: "Virgin Records (Homework)",
    gear: "Roland TR-909, Alesis 3630 compressor, Ensoniq ASR-10",
    recordReality: "Thomas Bangalter and Guy-Manuel programmed a locked 909 groove with aggressive Alesis 3630 sidechain compression pumping behind Bernard Edwards-style bass. NO drum fills on the track.",
    transcriptionNotes: "Tempo 121 BPM. Four-on-the-floor TR-909 kick; 909 clap on 2 and 4; open hi-hat on all offbeat '&' subdivisions.",
    sources: [
      { title: "Sound On Sound: Daft Punk - Homework Recording & 3630 Compression", url: "https://www.soundonsound.com/" },
      { title: "Songsterr: Daft Punk - Around The World Drum Tab", url: "https://www.songsterr.com/" }
    ]
  },
  "acid303": {
    refSong: "Acid House 303 (Acid Tracks)", refArtist: "Phuture", refYear: 1987,
    refDrummer: "DJ Pierre & Spanky (TR-707)",
    label: "Trax Records (Chicago)",
    gear: "Roland TR-707, Roland TB-303",
    recordReality: "Birth of acid house. DJ Pierre and Spanky sequenced an unyielding TR-707 pattern to drive the modulating TB-303 bassline. The drum pattern remains constant across 12 minutes.",
    transcriptionNotes: "Tempo 122 BPM. Four-on-the-floor 707 kick; crisp 707 snare on 2 and 4; open/closed hi-hats on offbeats.",
    sources: [
      { title: "Red Bull Music Academy: DJ Pierre on Inventing Acid House", url: "https://www.redbullmusicacademy.com/" }
    ]
  },
  "four": {
    refSong: "Four on the Floor", refArtist: "Disco / Chicago House Standard", refYear: null,
    refDrummer: "TR-909 / Acoustic kit",
    label: "Dance Club Standard",
    gear: "Roland TR-909 / Ludwig acoustic kit",
    recordReality: "The universal rhythmic anchor of modern dance music: bass drum on every beat (1, 2, 3, 4); open hi-hat on all offbeat '&' subdivisions; snare/clap on 2 and 4.",
    transcriptionNotes: "Tempo 124 BPM. Metronomic four-on-the-floor kick; open hi-hat on 1-and, 2-and, 3-and, 4-and; backbeat clap/snare.",
    sources: [
      { title: "Attack Magazine: Beat Dissected - Four on the Floor House Blueprint", url: "https://www.attackmagazine.com/" }
    ]
  },
  "deephouse": {
    refSong: "Deep House (Can You Feel It)", refArtist: "Larry Heard / Mr. Fingers", refYear: 1986,
    refDrummer: "Larry Heard (TR-909)",
    label: "Trax Records (Chicago)",
    gear: "Roland TR-909, Roland Juno-60",
    recordReality: "Larry Heard's soulful deep house blueprint. Unvarying, warm 909 beat with soft handclaps and lush Juno-60 pads. NO drum kit fills on the recording.",
    transcriptionNotes: "Tempo 120 BPM. Four-on-the-floor kick; gentle 909 handclap on 2 and 4; swinging 16th closed hi-hats with offbeat open hats.",
    sources: [
      { title: "Red Bull Music Academy: Larry Heard - Deep House Pioneer", url: "https://www.redbullmusicacademy.com/" }
    ]
  },
  "jackinhouse": {
    refSong: "Jackin' House", refArtist: "DJ Sneak / Derrick Carter", refYear: 1995,
    refDrummer: "Chicago Jackin' Producers (TR-909)",
    label: "Chicago House Standard",
    gear: "Roland TR-909, Akai MPC, swinging 16ths",
    recordReality: "Bouncy, syncopated Chicago house. Characterized by aggressive swing quantization on the hi-hats and syncopated snare ghost hits.",
    transcriptionNotes: "Tempo 126 BPM. Four-on-the-floor kick; syncopated snare on 2, 3-and, 4; heavy swinging 16th hats.",
    sources: [
      { title: "Attack Magazine: Beat Dissected - Chicago Jackin' House", url: "https://www.attackmagazine.com/" }
    ]
  },
  "detroittechno": {
    refSong: "Detroit Techno", refArtist: "Underground Resistance / Model 500", refYear: 1990,
    refDrummer: "Juan Atkins / UR (TR-909)",
    label: "Metroplex / Underground Resistance (Detroit)",
    gear: "Roland TR-909, Roland SH-101",
    recordReality: "Futuristic Detroit techno. Relentless, driving 909 kick with syncopated open hats and 16th-note ride cymbals.",
    transcriptionNotes: "Tempo 130 BPM. Driving four-on-the-floor kick; tight 909 snare on 2 and 4; driving 16th ride cymbal.",
    sources: [
      { title: "The Wire: Underground Resistance and the Sound of Detroit", url: "https://thewire.co.uk/" }
    ]
  },
  "berlinrumble": {
    refSong: "Berlin Rumble Techno", refArtist: "Berghain / Industrial Standard", refYear: null,
    refDrummer: "Industrial techno producers",
    label: "Berlin Techno Standard",
    gear: "Reverb-delayed distorted 909 kick rumble",
    recordReality: "Modern industrial warehouse techno standard. The bassline is created from a reverb-delayed, low-passed distortion of the kick drum itself ('rumble').",
    transcriptionNotes: "Tempo 135 BPM. Four-on-the-floor kick accompanied by 16th-note sub-bass rumble; harsh offbeat closed/open hats.",
    sources: [
      { title: "Attack Magazine: Beat Dissected - Berlin Industrial Rumble", url: "https://www.attackmagazine.com/" }
    ]
  },
  "minimaltechno": {
    refSong: "Minimal Techno (Minimal Nation)", refArtist: "Robert Hood", refYear: 1994,
    refDrummer: "Robert Hood (TR-909)",
    label: "Axis Records (Minimal Nation)",
    gear: "Roland TR-909",
    recordReality: "Stripped-down, essential techno. Robert Hood stripped away layers to focus on the raw momentum of kick and hi-hat. Hypnotic loop without fills.",
    transcriptionNotes: "Tempo 128 BPM. Sparse: 4-on-the-floor kick, offbeat open hat, minimal ghost clap.",
    sources: [
      { title: "Pitchfork: Robert Hood - Minimal Nation Retrospective", url: "https://pitchfork.com/" }
    ]
  },
  "dubtechno": {
    refSong: "Dub Techno (Quadrant Dub)", refArtist: "Basic Channel / Rhythm & Sound", refYear: 1993,
    refDrummer: "Moritz von Oswald & Mark Ernestus",
    label: "Basic Channel (Berlin)",
    gear: "Roland TR-909, space echo tape delay, resonant filters",
    recordReality: "Moritz von Oswald and Mark Ernestus merged techno with Jamaican dub tape delay. Muffled, submerged kick and whispered hi-hats.",
    transcriptionNotes: "Tempo 120 BPM. Filtered kick on all four beats, delay-drenched chord stabs, sparse hi-hats.",
    sources: [
      { title: "The Wire: Basic Channel and the Dub Techno Architecture", url: "https://thewire.co.uk/" }
    ]
  },
  "acidtechno": {
    refSong: "Acid Techno", refArtist: "London Acid City / Stay Up Forever", refYear: 1996,
    refDrummer: "Chris Liberator / D.A.V.E. The Drummer",
    label: "Stay Up Forever / Cluster",
    gear: "Roland TR-909, Roland TB-303 with Devil Fish mod",
    recordReality: "High-speed London underground acid. Driving 145 BPM kick with distorted claps and squelching 303 filters.",
    transcriptionNotes: "Tempo 145 BPM. Fast four-on-the-floor kick; crashing open hats on offbeats; hard snare backbeats.",
    sources: [
      { title: "Red Bull Music Academy: London Acid Techno Underground", url: "https://www.redbullmusicacademy.com/" }
    ]
  },

  // ==========================================
  // UK GARAGE, BASS, TRAP & DRILL (12)
  // ==========================================
  "twostep": {
    refSong: "Two-Step", refArtist: "UK Garage Standard (MJ Cole / Artful Dodger)", refYear: null,
    refDrummer: "UK Garage Producers",
    label: "UK Garage Standard",
    gear: "Akai MPC, Roland TR-909, heavy 16th swing",
    recordReality: "Classic UKG 2-step groove: the kick hits on beat 1 and skips beat 2 to land on beat 3-and or 4-and, leaving space for skippy syncopated snares.",
    transcriptionNotes: "Tempo 132 BPM. Syncopated kick on 1 and 3-and (dropping 2 and 4); crisp snare on 2 and 4 with ghost notes; swinging 16th hats.",
    sources: [
      { title: "Attack Magazine: Beat Dissected - UK Garage 2-Step", url: "https://www.attackmagazine.com/" }
    ]
  },
  "speedgarage": {
    refSong: "Speed Garage (Gunman)", refArtist: "187 Lockdown / Armand Van Helden", refYear: 1997,
    refDrummer: "Speed Garage Producers",
    label: "UK Speed Garage Standard",
    gear: "Four-on-the-floor kick, warped time-stretched sub-bass, snare rolls",
    recordReality: "187 Lockdown's 'Gunman'. Driving 4-on-the-floor kick with warped sub-bass and syncopated snare rolls leading into drops.",
    transcriptionNotes: "Tempo 135 BPM. Four-on-the-floor kick; snare on 2 and 4; rapid 16th snare pickups into bass drops.",
    sources: [
      { title: "Red Bull Music Academy: The History of Speed Garage", url: "https://www.redbullmusicacademy.com/" }
    ]
  },
  "jungle": {
    refSong: "Chopped Amen (Jungle)", refArtist: "Jungle Standard", refYear: null,
    refDrummer: "Tim Reaper / Dillinja / Goldie style",
    label: "UK Jungle Standard",
    gear: "Akai S950 / S1100, chopped Amen break, pitched-up snare",
    recordReality: "The defining UK jungle rhythm: G.C. Coleman's Amen break pitched up to 160–165 BPM and sliced into syncopated, stuttering breakbeat patterns over 808 sub-bass.",
    transcriptionNotes: "Tempo 165 BPM. Chopped 16th-note breakbeat rhythm with displaced backbeats, double-kick rolls, and rapid ghosted snares.",
    sources: [
      { title: "Attack Magazine: Beat Dissected - Classic 90s Jungle", url: "https://www.attackmagazine.com/" }
    ]
  },
  "dnb": {
    refSong: "Two-Step D&B", refArtist: "Drum & Bass Standard", refYear: null,
    refDrummer: "D&B rhythm section",
    label: "Drum & Bass Standard",
    gear: "Engineered acoustic break samples, synthesized 174 BPM punch",
    recordReality: "The foundational modern D&B two-step rhythm: kick on 1 and the '&' of 2; snare on 2 and 4; rapid 16th-note shakers/hats.",
    transcriptionNotes: "Tempo 174 BPM. Linear two-step: kick on step 1 and step 11; snare crack on step 5 and step 13; driving 16th-note hats.",
    sources: [
      { title: "Attack Magazine: Beat Dissected - Two-Step Drum & Bass", url: "https://www.attackmagazine.com/" }
    ]
  },
  "dnbrolling": {
    refSong: "Rolling D&B", refArtist: "Hospital Records / Liquid Standard", refYear: null,
    refDrummer: "Liquid D&B Producers",
    label: "Liquid Drum & Bass Standard",
    gear: "Layered funk breaks (Think / Soul Searchers), high-pass filtered hats",
    recordReality: "Liquid funk rolling D&B: layered funk breakbeats (Think, Tramp) creating a continuous rolling river of ghost notes beneath the primary 2-step kick/snare.",
    transcriptionNotes: "Tempo 174 BPM. Rolling 16th-note ghost snares and syncopated ride cymbals filling every subdivision between the backbeats.",
    sources: [
      { title: "MusicRadar: How to Build a Rolling Liquid D&B Groove", url: "https://www.musicradar.com/" }
    ]
  },
  "dubstep": {
    refSong: "Dubstep Half-Time", refArtist: "Digital Mystikz / Skream", refYear: 2006,
    refDrummer: "DMZ / FWD>> Producers",
    label: "DMZ / Tempa (South London)",
    gear: "DAW sequencing, heavy sub-bass sine wave, sparse percussion",
    recordReality: "Classic South London 140 BPM half-time. Kick on beat 1, snare only on beat 3; spacious, empty subdivisions allowing the sub-bass room to vibrate.",
    transcriptionNotes: "Tempo 140 BPM (70 BPM half-time). Kick on 1 and optional 2-and; snare crack strictly on beat 3; sparse 8th-note hi-hats.",
    sources: [
      { title: "Attack Magazine: Beat Dissected - Deep Dubstep", url: "https://www.attackmagazine.com/" }
    ]
  },
  "grime": {
    refSong: "Grime 140 (Eskibeat / I Luv U)", refArtist: "Wiley / Dizzee Rascal", refYear: 2003,
    refDrummer: "Wiley (Eskibeat) / Dizzee Rascal (I Luv U)",
    label: "XL Recordings / Boy Better Know (East London)",
    gear: "Korg Triton, Roland JV-1080, PC software",
    recordReality: "Wiley's 'Eskibeat' and Dizzee Rascal's 'I Luv U'. Aggressive, syncopated 140 BPM rhythm with staggered, displaced snares and stabbing square-wave bass.",
    transcriptionNotes: "Tempo 140 BPM. Staggered, syncopated kicks; biting electronic snare on 2-and and 4; rapid, cold 16th hats.",
    sources: [
      { title: "Pitchfork: Dizzee Rascal - Boy in da Corner Retrospective", url: "https://pitchfork.com/" },
      { title: "Red Bull Music Academy: Wiley and the Birth of Eskibeat", url: "https://www.redbullmusicacademy.com/" }
    ]
  },
  "trap": {
    refSong: "Half-Time Trap", refArtist: "Atlanta Standard / Metro Boomin", refYear: null,
    refDrummer: "Metro Boomin / Southside",
    label: "Atlanta Trap Standard",
    gear: "Roland TR-808 sub kick, 808 snare/clap, 32nd/64th-note hi-hat rolls",
    recordReality: "Modern Atlanta trap archetype. 140 BPM half-time feel: booming 808 sub kick, snare on beat 3, and rapid triplet/32nd-note hi-hat rolls. Fills feature rapid hat rolls and pitched kick slides.",
    transcriptionNotes: "Tempo 140 BPM. Kick on 1 and syncopated offbeats; snare/clap on beat 3; rapid rolling 16th/32nd-note hi-hats.",
    sources: [
      { title: "Attack Magazine: Beat Dissected - Atlanta Trap", url: "https://www.attackmagazine.com/" }
    ]
  },
  "trapbounce": {
    refSong: "808 Bounce Trap", refArtist: "Southside / Lex Luger", refYear: 2011,
    refDrummer: "Lex Luger / 808 Mafia",
    label: "808 Mafia Standard",
    gear: "FL Studio, 808 sub bass, brass stabs, hard claps",
    recordReality: "High-energy 808 Mafia trap bounce. Booming 808 kick patterns with active syncopated rolls and hard-hitting claps on beat 3.",
    transcriptionNotes: "Tempo 144 BPM. Active double-kick syncopations; clap on beat 3; rolling hi-hats with velocity dynamics.",
    sources: [
      { title: "Complex: How Lex Luger Changed the Sound of Rap", url: "https://www.complex.com/" }
    ]
  },
  "drill": {
    refSong: "UK Drill", refArtist: "London Standard (67 / LD)", refYear: null,
    refDrummer: "Carns Hill / MKThePlug",
    label: "UK Drill Standard",
    gear: "FL Studio, sliding 808 bass, delayed snare",
    recordReality: "UK drill rhythm: distinct delayed snare on the 'a' of beat 3 and beat 4, with sliding pitched 808s and counter-rhythm hi-hats.",
    transcriptionNotes: "Tempo 142 BPM. Signature drill snare phrasing: snare hits delayed to beat 3-a and beat 4; sliding 808 sub-bass.",
    sources: [
      { title: "Attack Magazine: Beat Dissected - UK Drill", url: "https://www.attackmagazine.com/" }
    ]
  },
  "brooklyndrill": {
    refSong: "Brooklyn Drill (Welcome to the Party)", refArtist: "Pop Smoke / 808Melo", refYear: 2019,
    refDrummer: "808Melo",
    label: "Victor Victor / Republic (Meet the Woo)",
    gear: "FL Studio, 808Melo sliding 808 bass, UK drill drums",
    recordReality: "Brooklyn drill explosion. Produced by UK producer 808Melo for Pop Smoke. Staggered snare hits, sliding glissando 808 basslines, and offbeat hi-hat triplets.",
    transcriptionNotes: "Tempo 143 BPM. Sliding 808 kick notes; staggered snare on beat 3-a and 4; syncopated hi-hat trips.",
    sources: [
      { title: "Sound On Sound: Producing Pop Smoke - 808Melo", url: "https://www.soundonsound.com/" },
      { title: "WhoSampled: Pop Smoke - Welcome to the Party", url: "https://www.whosampled.com/Pop-Smoke/Welcome-to-the-Party/" }
    ]
  },
  "crunk": {
    refSong: "Southern Crunk (Get Low)", refArtist: "Lil Jon / Three 6 Mafia", refYear: 2003,
    refDrummer: "Lil Jon (TR-808)",
    label: "BME / TVT (Kings of Crunk)",
    gear: "Roland TR-808, high-pitched 808 claps, whistle samples",
    recordReality: "High-energy Atlanta crunk anthem. Driving four-on-the-floor 808 kick with hard-hitting handclaps on 2 and 4 and rapid whistle accents.",
    transcriptionNotes: "Tempo 102 BPM. Booming 808 kick on all four beats; loud 808 claps on 2 and 4; driving 16th hats.",
    sources: [
      { title: "Red Bull Music Academy: Lil Jon and the History of Crunk", url: "https://www.redbullmusicacademy.com/" }
    ]
  },

  // ==========================================
  // FINGER DRUMMING DRILLS (10)
  // ==========================================
  "drill-8th": {
    refSong: "Drill: 8th-Note Foundation", refArtist: "Finger Drumming Level 1", refYear: null,
    refDrummer: "Pedagogical Exercise",
    label: "Finger Drumming Academy Level 1",
    gear: "Pad controller (MPC, Maschine, Launchpad)",
    recordReality: "Pedagogical practice drill. Developed to build timing and coordination between strong and weak hands on pads. Fill written as a practice turnaround.",
    transcriptionNotes: "Tempo 90 BPM. Foundation exercise: steady 8th-note hi-hats, kick on 1 and 3, snare on 2 and 4.",
    sources: [
      { title: "Melodics: Finger Drumming Foundation Exercises", url: "https://melodics.com/" },
      { title: "Quest for Groove: Beginner Pad Drumming Foundations", url: "https://thequestforgroove.com/" }
    ]
  },
  "drill-four": {
    refSong: "Drill: 4-on-the-Floor Coordination", refArtist: "Finger Drumming Level 1", refYear: null,
    refDrummer: "Pedagogical Exercise",
    label: "Finger Drumming Academy Level 1",
    gear: "Pad controller",
    recordReality: "Pedagogical exercise for training kick independence under offbeat hi-hats and backbeat claps.",
    transcriptionNotes: "Tempo 120 BPM. Four-on-the-floor kick with alternating offbeat hats and backbeat claps.",
    sources: [
      { title: "Quest for Groove: 4-on-the-Floor Finger Drumming Independence", url: "https://thequestforgroove.com/" }
    ]
  },
  "drill-sync": {
    refSong: "Drill: Kick Syncopation & Pushes", refArtist: "Finger Drumming Level 1", refYear: null,
    refDrummer: "Pedagogical Exercise",
    label: "Finger Drumming Academy Level 1",
    gear: "Pad controller",
    recordReality: "Pedagogical exercise focusing on anticipating downbeats with offbeat kick pushes ('&' of 2 and '&' of 4).",
    transcriptionNotes: "Tempo 95 BPM. Syncopated kick phrasing against a steady snare backbeat and straight hi-hat.",
    sources: [
      { title: "Melodics: Kick Syncopation Pad Drills", url: "https://melodics.com/" }
    ]
  },
  "drill-ghost": {
    refSong: "Drill: Ghost Note Pocket", refArtist: "Finger Drumming Level 2", refYear: null,
    refDrummer: "Pedagogical Exercise",
    label: "Finger Drumming Academy Level 2",
    gear: "Velocity-sensitive pads (MPC / Maschine)",
    recordReality: "Pedagogical exercise for velocity control. Trains delicate low-velocity ghost notes between accented backbeats.",
    transcriptionNotes: "Tempo 92 BPM. Accented backbeats on 2 and 4 with low-velocity ghost taps on the 'e' and 'a' 16th subdivisions.",
    sources: [
      { title: "Quest for Groove: Pad Dynamics and Ghost Notes", url: "https://thequestforgroove.com/" }
    ]
  },
  "drill-linear": {
    refSong: "Drill: Linear Drumming 1", refArtist: "Finger Drumming Level 2", refYear: null,
    refDrummer: "Pedagogical Exercise",
    label: "Finger Drumming Academy Level 2",
    gear: "Pad controller",
    recordReality: "Linear finger drumming drill where no two pads are struck simultaneously. Trains sequential limb flow.",
    transcriptionNotes: "Tempo 100 BPM. Strictly linear 16th-note sequence alternating kick, hat, and snare.",
    sources: [
      { title: "Melodics: Linear Finger Drumming Patterns", url: "https://melodics.com/" }
    ]
  },
  "drill-alt": {
    refSong: "Drill: Hand Alternation (R L R L)", refArtist: "Finger Drumming Level 2", refYear: null,
    refDrummer: "Pedagogical Exercise",
    label: "Finger Drumming Academy Level 2",
    gear: "Pad controller",
    recordReality: "Rudimental finger drumming drill. Trains strict hand-to-hand single-stroke roll alternation on pads.",
    transcriptionNotes: "Tempo 105 BPM. Strict R L R L sticking across hi-hat and snare pads.",
    sources: [
      { title: "Quest for Groove: Sticking and Hand Alternation on Pads", url: "https://thequestforgroove.com/" }
    ]
  },
  "drill-paradiddle": {
    refSong: "Drill: Paradiddle Pad Groove", refArtist: "Finger Drumming Level 3", refYear: null,
    refDrummer: "Pedagogical Exercise",
    label: "Finger Drumming Academy Level 3",
    gear: "Pad controller",
    recordReality: "Advanced rudimental pad drill. Adapts the classic snare paradiddle (R L R R L R L L) to drum kit pads.",
    transcriptionNotes: "Tempo 96 BPM. Single paradiddle sticking split between hi-hat (right hand) and snare (left hand) over kick.",
    sources: [
      { title: "Drumeo: Rudiments on Drum Pads - The Paradiddle", url: "https://www.drumeo.com/" }
    ]
  },
  "drill-rolls": {
    refSong: "Drill: 16th Hat Roll Flow", refArtist: "Finger Drumming Level 3", refYear: null,
    refDrummer: "Pedagogical Exercise",
    label: "Finger Drumming Academy Level 3",
    gear: "Pad controller",
    recordReality: "Advanced trap/hip-hop finger drumming drill. Trains rapid two-finger alternation for rolling 16th and 32nd hi-hats.",
    transcriptionNotes: "Tempo 135 BPM. Rapid two-finger alternation on hi-hat pad over syncopated kicks and snares.",
    sources: [
      { title: "Melodics: Advanced Hi-Hat Roll Finger Drumming", url: "https://melodics.com/" }
    ]
  },
  "drill-poly": {
    refSong: "Drill: Polyrhythm 3-Over-4", refArtist: "Finger Drumming Level 3", refYear: null,
    refDrummer: "Pedagogical Exercise",
    label: "Finger Drumming Academy Level 3",
    gear: "Pad controller",
    recordReality: "Advanced coordination drill. Left hand maintains a 4/4 backbeat while right hand taps dotted-8th (3-over-4) polyrhythmic accents.",
    transcriptionNotes: "Tempo 110 BPM. Metric modulation and polyrhythmic independence training.",
    sources: [
      { title: "Quest for Groove: Polyrhythmic Independence on Pads", url: "https://thequestforgroove.com/" }
    ]
  },
  "drill-master": {
    refSong: "Drill: Finger Independence Master", refArtist: "Finger Drumming Level 3", refYear: null,
    refDrummer: "Pedagogical Exercise",
    label: "Finger Drumming Academy Level 3",
    gear: "Pad controller",
    recordReality: "Master-level finger drumming challenge combining polyrhythms, ghost notes, and displaced kicks across four pads.",
    transcriptionNotes: "Tempo 115 BPM. Complex four-pad independence test requiring mastery of dynamic levels and timing.",
    sources: [
      { title: "Quest for Groove: Master Class Finger Drumming Independence", url: "https://thequestforgroove.com/" }
    ]
  }
};

module.exports = { AUDIT_REFS_PART4 };
