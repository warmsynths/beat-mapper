// Pattern library and machine mappings. Each lane is a 16-step string: 'X' = accent, 'x' = hit, 'g' = ghost, '.' = rest.

export type LaneKey = 'k' | 's' | 'h' | 'o' | 'c' | 'r' | 't' | 'b' | 'w' | 'z' | 'y';
export type PartId = 'MAIN' | 'VAR' | 'FILL';
export type Lanes = Record<LaneKey, string>;

export interface Inst { key: LaneKey; label: string; core: boolean }

export interface Pattern extends Lanes {
  id: string; name: string; artist: string; genre: string; bpm: number;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  gear?: string;
  tip?: string;
  tags?: string[];
  hands?: Partial<Record<LaneKey, string>>;
  stepHands?: Partial<Record<LaneKey, string>>;
  var?: Lanes; fill?: Lanes;
  /** Main bars 2, 3, 4… (bar 1 is the pattern itself). */
  bars?: Lanes[];
  /** Swing %: 50 = straight, 66 = triplet. */
  sw: number;
  /** A recorded performance reduced to the 16-step grid. */
  simp: boolean;
}

export type Family = 'sp' | 'po' | 'ct' | 'tr' | 'dt';

export interface Device {
  id: string; maker: string; short: string; fam: Family; method: string; guess?: boolean;
  map: Partial<Record<LaneKey, string>>;
  inst?: string[]; rec?: string;
  slot?: Partial<Record<LaneKey, number>>; tracks?: string[]; trackIdx?: Partial<Record<LaneKey, number>>; dim?: number;
  track?: Partial<Record<LaneKey, number>>;
}

export const INST: Inst[] = (
  [['k', 'KICK'], ['s', 'SNARE'], ['h', 'HAT'], ['o', 'OPEN'], ['c', 'CLAP'], ['r', 'RIM'], ['t', 'TOM'], ['b', 'BONGO'],
    ['w', 'COWBELL'], ['z', 'SHAKER'], ['y', 'CRASH']] as [LaneKey, string][]
).map(([key, label], n) => ({ key, label, core: n < 4 }));

const XK = INST.filter(i => !i.core).map(i => i.key);
export const E = '................';

type RawPattern = Omit<Pattern, LaneKey | 'var' | 'fill' | 'bars' | 'sw' | 'simp'> & Partial<Lanes> & { var?: Partial<Lanes>; fill?: Partial<Lanes> };

const RAW: RawPattern[] = [
  {
    "id": "amen",
    "name": "Amen Break",
    "artist": "The Winstons",
    "genre": "Breakbeat",
    "bpm": 136,
    "difficulty": "Advanced",
    "gear": "1960s Ludwig kit / Spencer Dryden & G.C. Coleman",
    "tip": "Feather the ghost snares softly with your left hand on the \"e\" and \"a\" subdivisions; only pop the backbeats.",
    "tags": [
      "holy grail",
      "jungle",
      "breakbeat",
      "ghost notes"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.x.......XX....",
    "s": "....X..g.g..X..g",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................",
    "var": {
      "k": "X.x.......X.....",
      "s": "....X..g.g....X.",
      "h": "x.x.x.x.x.x.x.x.",
      "o": "..........x....."
    },
    "fill": {
      "k": "..XX......X.....",
      "s": ".g..X..g.g....X.",
      "h": "x.x.x.x.x...x.x.",
      "o": "..........x....."
    }
  },
  {
    "id": "funky",
    "name": "Funky Drummer",
    "artist": "James Brown",
    "genre": "Funk",
    "bpm": 100,
    "difficulty": "Advanced",
    "gear": "Ludwig Downbeat kit / Clyde Stubblefield",
    "tip": "The defining breakbeat of hip-hop. Keep continuous 16th hats going with right hand while left hand ghosts between 2 and 4.",
    "tags": [
      "holy grail",
      "funk",
      "hip-hop",
      "ghost notes"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.x.......x..x..",
    "s": "....X..g.g.XXg.g",
    "h": "xxxxxxx.xxxxxxxx",
    "o": ".......x........",
    "var": {
      "k": "X.x.......x..x..",
      "s": "....X..g.g.X.g.X",
      "h": "xxxxxxx.xxxxxxx.",
      "o": ".......x.......x"
    }
  },
  {
    "id": "apache",
    "name": "Apache",
    "artist": "Incredible Bongo Band",
    "genre": "Breakbeat",
    "bpm": 118,
    "difficulty": "Intermediate",
    "gear": "Acoustic kit + Bongos / Jim Gordon",
    "tip": "Notice the double kick pickup into beat 3. The galloping bongo percussion creates the iconic b-boy break energy.",
    "tags": [
      "b-boy",
      "breakbeat",
      "hip-hop",
      "bongos"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "b": "L",
      "t": "R"
    },
    "k": "X......XX.x.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "levee",
    "name": "When the Levee Breaks",
    "artist": "Led Zeppelin",
    "genre": "Rock",
    "bpm": 72,
    "difficulty": "Intermediate",
    "gear": "Ludwig Green Sparkle 26\" bass drum / John Bonham",
    "tip": "Huge slow pocket. The flamming double kick at the start of beat 1 and beat 3 requires relaxed timing and heavy accents.",
    "tags": [
      "rock",
      "heavy",
      "breakbeat",
      "bonham"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "y": "R"
    },
    "k": "XX.....x..XX....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "impeach",
    "name": "Impeach the President",
    "artist": "The Honey Drippers",
    "genre": "Breakbeat",
    "bpm": 96,
    "difficulty": "Intermediate",
    "gear": "Acoustic kit recorded at The Hit Factory",
    "tip": "Crucial open hi-hat sizzle on step 15 right before the downbeat. The kick syncopation on step 11 drives the bounce.",
    "tags": [
      "boom bap",
      "sample classic",
      "golden era",
      "holy grail"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X......x..x.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x...",
    "o": "..............x."
  },
  {
    "id": "think",
    "name": "Think (About It)",
    "artist": "Lyn Collins",
    "genre": "Funk",
    "bpm": 112,
    "difficulty": "Advanced",
    "gear": "Ludwig Downbeat kit / John \"Jabo\" Starks",
    "tip": "The \"Woo! Yeah!\" source break. Ghost notes on steps 7, 9, and 15 cradle the driving 8th-note hat groove.",
    "tags": [
      "holy grail",
      "funk",
      "breakbeat",
      "ghost notes"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X......x..x.x...",
    "s": "....X..g.g..X..g",
    "h": "x.x.x.x.x.x.x...",
    "o": "..............x."
  },
  {
    "id": "coldsweat",
    "name": "Cold Sweat",
    "artist": "James Brown",
    "genre": "Funk",
    "bpm": 112,
    "difficulty": "Intermediate",
    "gear": "Ludwig kit / Clyde Stubblefield",
    "tip": "Often cited as the very first true funk record (1967). Open hat on the upbeat of 2 gives it that buoyant lift.",
    "tags": [
      "funk",
      "james brown",
      "syncopation"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.......X.x.....",
    "s": "....X..g.g..X..g",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "......x.........",
    "var": {
      "k": "X.x.......x..x..",
      "s": "....X..g.g..X.g.",
      "h": "x.x.x.x.x.x.x.x.",
      "o": "......x........."
    }
  },
  {
    "id": "cissy",
    "name": "Cissy Strut",
    "artist": "The Meters",
    "genre": "Funk",
    "bpm": 88,
    "difficulty": "Intermediate",
    "gear": "Gretsch Broadkaster kit / Zigaboo Modeliste",
    "tip": "New Orleans second-line syncopation. The kick plays a 3-3-2 tresillo cadence while the snare interlocks around beat 2 and 3.",
    "tags": [
      "new orleans",
      "second line",
      "funk"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "x..x..x...x..x..",
    "s": "....X..g.X..g...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................",
    "var": {
      "k": "x..x..x...x.....",
      "s": "....X..g.X..g.XX",
      "h": "x.x.x.x.x.x.x...",
      "o": "..............x."
    }
  },
  {
    "id": "purdie",
    "name": "Purdie Shuffle",
    "artist": "Steely Dan / Bernard Purdie",
    "genre": "Jazz & Soul",
    "bpm": 118,
    "difficulty": "Advanced",
    "gear": "Sonor kit / Bernard Purdie (\"Babylon Sisters\" / \"Home At Last\")",
    "tip": "The holy grail half-time shuffle. Keep ghost snares feather-light on the \"e\" and \"a\" of every beat between the backbeat clacks.",
    "tags": [
      "shuffle",
      "ghost notes",
      "half-time",
      "holy grail"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.......X.......",
    "s": "..g.X.g...g.X.g.",
    "h": "x.xxx.xxx.xxx.xx",
    "o": "................",
    "var": {
      "k": "X.....x.X.......",
      "s": "..g.X.g...g.X.g.",
      "h": "x.xxx.xxx.xxx.xx",
      "o": "................"
    }
  },
  {
    "id": "skullsnaps",
    "name": "It's A New Day",
    "artist": "Skull Snaps",
    "genre": "Breakbeat",
    "bpm": 95,
    "difficulty": "Intermediate",
    "gear": "Rogers kit / George Clinton & Skull Snaps",
    "tip": "Sampled by Gang Starr, The Prodigy, and Ol Dirty Bastard. Crisp, tight open hat on step 15 and punchy ghost notes.",
    "tags": [
      "holy grail",
      "boom bap",
      "breakbeat"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X......x..X.....",
    "s": "....X..g.g..X..g",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "..............x."
  },
  {
    "id": "ashley",
    "name": "Ashley's Roachclip",
    "artist": "The Soul Searchers",
    "genre": "Breakbeat",
    "bpm": 106,
    "difficulty": "Intermediate",
    "gear": "Custom acoustic kit / Kenneth Scoggins",
    "tip": "The rhythm behind Eric B. & Rakim (\"Paid in Full\") and PM Dawn. The syncopated kick hitch on step 8 into 9 is the hook.",
    "tags": [
      "golden era",
      "breakbeat",
      "funk"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X......xX.X.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "......x........."
  },
  {
    "id": "mardigras",
    "name": "Take Me to the Mardi Gras",
    "artist": "Bob James",
    "genre": "Breakbeat",
    "bpm": 105,
    "difficulty": "Intermediate",
    "gear": "Acoustic kit + Agogo bells / Steve Gadd",
    "tip": "Sampled by Run-DMC (\"Peter Piper\") and Missy Elliott. Gadd’s agogo bells dance over a syncopated kick pattern.",
    "tags": [
      "breakbeat",
      "bell",
      "hip-hop"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "w": "R"
    },
    "k": "X..x....X..x....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "synthetic",
    "name": "Synthetic Substitution",
    "artist": "Melvin Bliss",
    "genre": "Breakbeat",
    "bpm": 98,
    "difficulty": "Intermediate",
    "gear": "Bernard Purdie on drums",
    "tip": "Sampled by Wu-Tang Clan, De La Soul, and Ultramagnetic MCs. Heavy, dry, dragging kick and open hat sizzle on the upbeat of 2.",
    "tags": [
      "wu-tang",
      "holy grail",
      "breakbeat"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.....x.X.......",
    "s": "....X.......X..g",
    "h": "x.x.x.x.x.x.x.x.",
    "o": ".......x........"
  },
  {
    "id": "bigbeat",
    "name": "The Big Beat",
    "artist": "Billy Squier",
    "genre": "Rock",
    "bpm": 84,
    "difficulty": "Beginner",
    "gear": "Bobby Chouinard on oversized Slingerland kit",
    "tip": "The thunderous boom-boom-clack sampled on Jay-Z (\"99 Problems\") and Alicia Keys. Heavy, simple, monumental dynamics.",
    "tags": [
      "rock",
      "stomp",
      "hip-hop"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "y": "R"
    },
    "k": "X.X.....X.X.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "walkthisway",
    "name": "Walk This Way",
    "artist": "Aerosmith",
    "genre": "Rock",
    "bpm": 106,
    "difficulty": "Intermediate",
    "gear": "Ludwig kit / Joey Kramer",
    "tip": "The opening break that launched rap-rock via Run-DMC. Double kick push on beat 2-and and 4-and with open hat accents.",
    "tags": [
      "rock",
      "rap-rock",
      "breakbeat"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X...x.x.X...x.x.",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": ".......x.......x"
  },
  {
    "id": "godmake",
    "name": "God Make Me Funky",
    "artist": "The Headhunters / Mike Clark",
    "genre": "Breakbeat",
    "bpm": 90,
    "difficulty": "Advanced",
    "gear": "Fibes acrylic drum kit / Mike Clark",
    "tip": "Sampled by 2Pac (\"Keep Ya Head Up\"), De La Soul, Snoop Dogg. The quintessential West Coast funk pocket with crisp open hat on step 7.",
    "tags": [
      "holy grail",
      "breakbeat",
      "funk",
      "2pac"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.....x...X.x...",
    "s": "....X..g.g..X..g",
    "h": "x.x.x.x.x.x.x.x.",
    "o": ".......x........"
  },
  {
    "id": "differentstrokes",
    "name": "Different Strokes",
    "artist": "Syl Johnson",
    "genre": "Breakbeat",
    "bpm": 102,
    "difficulty": "Intermediate",
    "gear": "Hi Records Memphis studio kit",
    "tip": "Sampled in Wu-Tang Clan (\"Shame on a Nigga\"), De La Soul (\"The Magic Number\"), EPMD. Aggressive stuttering kick pickup into beat 3.",
    "tags": [
      "breakbeat",
      "wu-tang",
      "soul",
      "de la soul"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X...x.X...x.x...",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "singasong",
    "name": "Sing a Simple Song",
    "artist": "Sly & the Family Stone",
    "genre": "Breakbeat",
    "bpm": 98,
    "difficulty": "Intermediate",
    "gear": "Gretsch kit / Greg Errico",
    "tip": "Sampled by 2Pac, Cypress Hill, Public Enemy. The kick drops on 1, the \"and\" of 1, and rolls heavily into beat 3.",
    "tags": [
      "breakbeat",
      "funk",
      "sly stone"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X..x....X.x.x...",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "..............x."
  },
  {
    "id": "justkissed",
    "name": "Just Kissed My Baby",
    "artist": "The Meters",
    "genre": "Breakbeat",
    "bpm": 86,
    "difficulty": "Advanced",
    "gear": "Gretsch Broadkaster kit / Zigaboo Modeliste",
    "tip": "Sampled by Public Enemy, EPMD. Deep New Orleans swamp funk. Zigaboo’s offbeat kick drags with ghost snares around the backbeats.",
    "tags": [
      "breakbeat",
      "meters",
      "new orleans",
      "funk"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X..x..X...x..X..",
    "s": "....X..g.X..g...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "ntbreak",
    "name": "N.T.",
    "artist": "Kool & The Gang",
    "genre": "Breakbeat",
    "bpm": 101,
    "difficulty": "Intermediate",
    "gear": "Acoustic jazz kit / George \"Funky\" Brown",
    "tip": "Sampled by Nas (\"N.Y. State of Mind\" intro), Q-Tip, Big Daddy Kane. Crisp ghost notes with open hi-hat on beat 2-and.",
    "tags": [
      "breakbeat",
      "nas",
      "kool & the gang"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X..x..X...x.x...",
    "s": "....X..g.g..X..g",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "......x........."
  },
  {
    "id": "imglad",
    "name": "I'm Glad You're Mine",
    "artist": "Al Green / Al Jackson Jr.",
    "genre": "Breakbeat",
    "bpm": 74,
    "difficulty": "Beginner",
    "gear": "Al Jackson Jr. on Ludwig kit at Royal Studios Memphis",
    "tip": "Sampled by The Notorious B.I.G. (\"Dead Wrong\"), Eric B. & Rakim (\"The R\"). Deep, slow, dripping snare crack with double kick into 3.",
    "tags": [
      "breakbeat",
      "biggie",
      "memphis soul"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.......X.x.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "odebillie",
    "name": "Ode to Billie Joe",
    "artist": "Lou Donaldson / Idris Muhammad",
    "genre": "Breakbeat",
    "bpm": 89,
    "difficulty": "Intermediate",
    "gear": "Leo Morris (Idris Muhammad) on drums",
    "tip": "Sampled by A Tribe Called Quest (\"Clap Your Hands\"), Cypress Hill, Kanye West. Relaxed, greasy jazz-funk pocket.",
    "tags": [
      "breakbeat",
      "idris muhammad",
      "jazz funk",
      "tribe"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.....x...X.x...",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "..............x."
  },
  {
    "id": "tramp",
    "name": "Tramp",
    "artist": "Lowell Fulsom",
    "genre": "Breakbeat",
    "bpm": 104,
    "difficulty": "Beginner",
    "gear": "Acoustic kit recorded 1967",
    "tip": "Sampled in Salt-N-Pepa (\"Push It\"), Cypress Hill, De La Soul. Laid-back blues-funk kick syncopation.",
    "tags": [
      "breakbeat",
      "blues funk",
      "sample gold"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.......X..x....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "thechamp",
    "name": "The Champ",
    "artist": "The Mohawks",
    "genre": "Breakbeat",
    "bpm": 104,
    "difficulty": "Intermediate",
    "gear": "Acoustic kit + Hammond B3 / Alan Hawkshaw",
    "tip": "Sampled in over 700 songs (KRS-One, Eric B & Rakim, De La Soul). Driving double kick syncopation that defines b-boy breaking.",
    "tags": [
      "b-boy",
      "breakbeat",
      "holy grail",
      "krs-one"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X...x.X.X...x.X.",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "longred",
    "name": "Long Red",
    "artist": "Mountain",
    "genre": "Breakbeat",
    "bpm": 80,
    "difficulty": "Beginner",
    "gear": "N.D. Smart II on drums live at Woodstock 1969",
    "tip": "Sampled in Eric B & Rakim, Nas, Pete Rock, J Dilla. Heavy stomping rock kick with delayed hitch on beat 2-and.",
    "tags": [
      "breakbeat",
      "rock",
      "nas",
      "woodstock"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.....x.X.......",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "scorpio",
    "name": "Scorpio",
    "artist": "Dennis Coffey",
    "genre": "Breakbeat",
    "bpm": 112,
    "difficulty": "Intermediate",
    "gear": "Pistol Allen on kit + King Errisson on congas",
    "tip": "Sampled in Public Enemy, Young MC, LL Cool J. Driving 16th conga roll layered over a driving 3-3-2 kick pulse.",
    "tags": [
      "breakbeat",
      "congas",
      "b-boy"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "b": "L"
    },
    "k": "X..x..X.X..x..X.",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "blindalley",
    "name": "Blind Alley",
    "artist": "The Emotions",
    "genre": "Breakbeat",
    "bpm": 94,
    "difficulty": "Intermediate",
    "gear": "Stax studio kit / Willie Hall",
    "tip": "Sampled by Big Daddy Kane (\"Ain't No Half-Steppin'\"), Mariah Carey, 112. Open hi-hats sizzling on beat 2-and and 4-and.",
    "tags": [
      "breakbeat",
      "stax",
      "big daddy kane"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.......X.x.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": ".......x.......x"
  },
  {
    "id": "giveitup",
    "name": "Give It Up or Turnit a Loose",
    "artist": "James Brown",
    "genre": "Breakbeat",
    "bpm": 116,
    "difficulty": "Advanced",
    "gear": "In The Jungle Groove remix / Clyde Stubblefield & Jabo Starks",
    "tip": "The ultimate b-boy cypher battle break. Galloping congas, crisp double kicks, and rolling ghost snares.",
    "tags": [
      "b-boy",
      "cypher",
      "breakbeat",
      "james brown"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "b": "L"
    },
    "k": "X..x....X..x....",
    "s": "....X..g.g..X..g",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "hotpants",
    "name": "Hot Pants (I'm Coming)",
    "artist": "Bobby Byrd",
    "genre": "Breakbeat",
    "bpm": 98,
    "difficulty": "Intermediate",
    "gear": "John \"Jabo\" Starks on drums",
    "tip": "Sampled by Stone Roses (\"Fools Gold\"), Public Enemy, 2 Live Crew. Swung funk pocket with ghost snare on step 15.",
    "tags": [
      "breakbeat",
      "fools gold",
      "jabo starks"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X......x..x.x...",
    "s": "....X.......X..g",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "..............x."
  },
  {
    "id": "thegrunt",
    "name": "The Grunt",
    "artist": "The J.B.'s",
    "genre": "Breakbeat",
    "bpm": 100,
    "difficulty": "Beginner",
    "gear": "Jabo Starks on drums",
    "tip": "Sampled on Public Enemy (\"Rebel Without a Pause\"), Jungle Brothers. Driving continuous 16th hats with 4-on-the-floor kick push.",
    "tags": [
      "breakbeat",
      "public enemy",
      "jbs"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X...X...X...X...",
    "s": "....X.......X...",
    "h": "xxxxxxxxxxxxxxxx",
    "o": "................"
  },
  {
    "id": "papawas",
    "name": "Papa Was, Too",
    "artist": "Joe Tex",
    "genre": "Breakbeat",
    "bpm": 96,
    "difficulty": "Intermediate",
    "gear": "Acoustic southern soul kit",
    "tip": "Sampled by Eric B & Rakim (\"I Ain't No Joke\"), Wu-Tang. Heavy downbeat kick with syncopated open hat upbeat.",
    "tags": [
      "breakbeat",
      "eric b & rakim",
      "joe tex"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X..x....X.x.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": ".......x........"
  },
  {
    "id": "funkypenguin",
    "name": "Do the Funky Penguin",
    "artist": "Rufus Thomas",
    "genre": "Breakbeat",
    "bpm": 112,
    "difficulty": "Intermediate",
    "gear": "Stax Records Memphis / Willie Hall",
    "tip": "Sampled by A Tribe Called Quest, Compton's Most Wanted. Funky ghost note flurries around the backbeat.",
    "tags": [
      "breakbeat",
      "stax",
      "rufus thomas"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.......X..x....",
    "s": "....X..g.g..X..g",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "ufo",
    "name": "UFO",
    "artist": "ESG",
    "genre": "Breakbeat",
    "bpm": 112,
    "difficulty": "Beginner",
    "gear": "South Bronx punk-funk sisters / acoustic kit",
    "tip": "Sampled by Biggie, Public Enemy, TLC, Beastie Boys. Sparse post-punk offbeat hats and subterranean simplicity.",
    "tags": [
      "breakbeat",
      "esg",
      "minimal",
      "bronx"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.......X.......",
    "s": "....X.......X...",
    "h": "..x...x...x...x.",
    "o": "................"
  },
  {
    "id": "darkestlight",
    "name": "Darkest Light",
    "artist": "Lafayette Afro Rock Band",
    "genre": "Breakbeat",
    "bpm": 96,
    "difficulty": "Intermediate",
    "gear": "Afro-funk kit recorded in Paris 1974",
    "tip": "Sampled in Jay-Z (\"Show Me What You Got\"), Wreckx-n-Effect (\"Rump Shaker\"). Heavy syncopated open hat on the upbeat of 2.",
    "tags": [
      "breakbeat",
      "jay-z",
      "afro-rock"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X......x..X.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": ".......x........"
  },
  {
    "id": "hihache",
    "name": "Hihache",
    "artist": "Lafayette Afro Rock Band",
    "genre": "Breakbeat",
    "bpm": 106,
    "difficulty": "Intermediate",
    "gear": "Layered acoustic kit + Congas",
    "tip": "Sampled by Biz Markie (\"Nobody Beats The Biz\"), LL Cool J. Rolling conga cadence with punchy syncopated kicks.",
    "tags": [
      "breakbeat",
      "biz markie",
      "congas"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "b": "L"
    },
    "k": "X..x..X...x.x...",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "boombap",
    "name": "Boom Bap Standard",
    "artist": "Golden-era standard / DJ Premier",
    "genre": "Hip-Hop",
    "bpm": 90,
    "difficulty": "Beginner",
    "gear": "Akai MPC60 / E-mu SP-1200",
    "tip": "The gold standard. Kick on beat 1 and the upbeat of beat 2, crack of the snare on 2 and 4, steady 8th hats.",
    "tags": [
      "boom bap",
      "golden era",
      "hip-hop standard"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.....x...X.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "boombap2bar",
    "name": "Boom Bap 2-Bar Loop",
    "artist": "Pete Rock / Marley Marl standard",
    "genre": "Hip-Hop",
    "bpm": 92,
    "difficulty": "Intermediate",
    "gear": "E-mu SP-1200",
    "tip": "Two-bar narrative loop: Bar 1 sets the phrase, Bar 2 varies the kick syncopation and adds double-snare pickups.",
    "tags": [
      "2-bar loop",
      "boom bap",
      "sp-1200"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.....x...X.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................",
    "var": {
      "k": "X.....x.....x...",
      "s": "....X.......X...",
      "h": "x.x.x.x.x.x.x.xx",
      "o": "..............x."
    }
  },
  {
    "id": "massappeal",
    "name": "Mass Appeal",
    "artist": "Gang Starr / DJ Premier",
    "genre": "Hip-Hop",
    "bpm": 102,
    "difficulty": "Intermediate",
    "gear": "Akai S950 sampler + Akai MPC60 / DJ Premier",
    "tip": "The ultimate Premier head-nod pocket. Snapping open hat on the upbeat of 2, slightly dragged kick cadence.",
    "tags": [
      "boom bap",
      "dj premier",
      "gang starr"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.....x...X.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": ".......x........",
    "var": {
      "k": "X.....x.x.X.....",
      "s": "....X.......X...",
      "h": "x.x.x.x.x.x.x.x.",
      "o": ".......x........"
    }
  },
  {
    "id": "troy",
    "name": "They Reminisce Over You",
    "artist": "Pete Rock & CL Smooth",
    "genre": "Hip-Hop",
    "bpm": 102,
    "difficulty": "Intermediate",
    "gear": "E-mu SP-1200 / Pete Rock",
    "tip": "Layered Tom Scott saxophone over a crisp SP-1200 kick and razor-sharp layered snare with pickup open hat.",
    "tags": [
      "boom bap",
      "pete rock",
      "troy",
      "sp-1200"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.....x...X.x...",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "..............x."
  },
  {
    "id": "nystate",
    "name": "N.Y. State of Mind",
    "artist": "Nas / DJ Premier",
    "genre": "Hip-Hop",
    "bpm": 84,
    "difficulty": "Intermediate",
    "gear": "E-mu SP-1200 & Akai S950",
    "tip": "The grittiest Queensbridge street cadence. Joe Chambers jazz piano chops over Joe Tex / Kool & The Gang drums.",
    "tags": [
      "boom bap",
      "nas",
      "illmatic",
      "dj premier"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X......x..X.....",
    "s": "....X..g....X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": ".......x........"
  },
  {
    "id": "shookones",
    "name": "Shook Ones Pt. II",
    "artist": "Mobb Deep / Havoc",
    "genre": "Hip-Hop",
    "bpm": 94,
    "difficulty": "Intermediate",
    "gear": "Akai EPS-16+ / Havoc",
    "tip": "Menacing Queensbridge coldness. Herbie Hancock piano slowed down with crisp layered snare and relentless 8th hats.",
    "tags": [
      "boom bap",
      "mobb deep",
      "havoc",
      "queensbridge"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.....x.X.x.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................",
    "var": {
      "k": "X.....x...X.x...",
      "s": "....X.......X...",
      "h": "x.x.x.x.x.x.x.x.",
      "o": "................"
    }
  },
  {
    "id": "cream",
    "name": "C.R.E.A.M.",
    "artist": "Wu-Tang Clan / RZA",
    "genre": "Hip-Hop",
    "bpm": 90,
    "difficulty": "Beginner",
    "gear": "Ensoniq ASR-10 / RZA",
    "tip": "The Charmels piano loop with dusty, unquantized kick-snare snap. Simple, devastating, timeless.",
    "tags": [
      "boom bap",
      "wu-tang",
      "rza",
      "classic"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.......X.x.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "electricrelaxation",
    "name": "Electric Relaxation",
    "artist": "A Tribe Called Quest / Q-Tip",
    "genre": "Hip-Hop",
    "bpm": 98,
    "difficulty": "Intermediate",
    "gear": "E-mu SP-1200 & Akai S950",
    "tip": "Ramsey Lewis jazz chops over swung boom bap kick rolls. Keep right hand steady on 8th hats.",
    "tags": [
      "boom bap",
      "tribe called quest",
      "q-tip",
      "jazz hop"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X...x.x.X.......",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "......x........."
  },
  {
    "id": "comeclean",
    "name": "Come Clean",
    "artist": "Jeru the Damaja / DJ Premier",
    "genre": "Hip-Hop",
    "bpm": 94,
    "difficulty": "Beginner",
    "gear": "Akai MPC60 & SP-1200",
    "tip": "Water droplet dripping sounds paired with an extremely dry, crisp snare and hollow offbeat hats.",
    "tags": [
      "boom bap",
      "dj premier",
      "jeru the damaja"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.......X..x....",
    "s": "....X.......X...",
    "h": "..x...x...x...x.",
    "o": "................"
  },
  {
    "id": "halftime",
    "name": "Halftime",
    "artist": "Nas / Large Professor",
    "genre": "Hip-Hop",
    "bpm": 92,
    "difficulty": "Intermediate",
    "gear": "E-mu SP-1200 / Large Professor",
    "tip": "Japanese Schoolchildren brass loop with booming 808 kick drops underlying acoustic boom bap drums.",
    "tags": [
      "boom bap",
      "nas",
      "large professor"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.....x...X.x...",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "scenario",
    "name": "Scenario",
    "artist": "A Tribe Called Quest / Leaders of the New School",
    "genre": "Hip-Hop",
    "bpm": 102,
    "difficulty": "Beginner",
    "gear": "E-mu SP-1200 / Q-Tip",
    "tip": "High-energy stomp boom bap. Double kick punches on 1 and 3 driving maximum cypher hype.",
    "tags": [
      "boom bap",
      "tribe called quest",
      "busta rhymes"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.x.....X.x.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "survival",
    "name": "Survival of the Fittest",
    "artist": "Mobb Deep / Havoc",
    "genre": "Hip-Hop",
    "bpm": 94,
    "difficulty": "Intermediate",
    "gear": "Ensoniq ASR-10 / Havoc",
    "tip": "Stark, haunting piano chords over a punchy kick push on step 11 and open hat on beat 2-and.",
    "tags": [
      "boom bap",
      "mobb deep",
      "queensbridge"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X......x..X.x...",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": ".......x........"
  },
  {
    "id": "timesup",
    "name": "Time's Up",
    "artist": "O.C. / Buckwild",
    "genre": "Hip-Hop",
    "bpm": 92,
    "difficulty": "Intermediate",
    "gear": "Akai MPC60 / Buckwild (D.I.T.C.)",
    "tip": "Slick D.I.T.C. shuffle. Open hat on step 7 with double 16th hat roll on step 14-15 before downbeat.",
    "tags": [
      "boom bap",
      "ditc",
      "buckwild"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.....x.X.......",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.xx",
    "o": ".......x........"
  },
  {
    "id": "hip2dagame",
    "name": "Hip 2 Da Game",
    "artist": "Lord Finesse",
    "genre": "Hip-Hop",
    "bpm": 90,
    "difficulty": "Intermediate",
    "gear": "E-mu SP-1200 / Lord Finesse",
    "tip": "Swung 16th hi-hat flutter driving classic Bronx D.I.T.C. elegance and precision.",
    "tags": [
      "boom bap",
      "ditc",
      "lord finesse"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X......x..X.....",
    "s": "....X.......X...",
    "h": "x.xxx.xxx.xxx.xx",
    "o": "................"
  },
  {
    "id": "protectyaneck",
    "name": "Protect Ya Neck",
    "artist": "Wu-Tang Clan / RZA",
    "genre": "Hip-Hop",
    "bpm": 102,
    "difficulty": "Intermediate",
    "gear": "E-mu SP-1200 12-bit crunchy sampling",
    "tip": "Raw, unpolished Staten Island boom bap attack. Double kick hitch right before beat 2 and beat 4.",
    "tags": [
      "boom bap",
      "wu-tang",
      "rza"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X...x.x.X...x.x.",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "worstcomes",
    "name": "Worst Comes to Worst",
    "artist": "Dilated Peoples / The Alchemist",
    "genre": "Hip-Hop",
    "bpm": 94,
    "difficulty": "Intermediate",
    "gear": "Akai MPC2000XL / The Alchemist",
    "tip": "The Alchemist neck-snap signature. William Bell vocal chop over heavy, compressed SP/MPC boom bap.",
    "tags": [
      "boom bap",
      "alchemist",
      "dilated peoples"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.....x...X.x...",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "......x........."
  },
  {
    "id": "whogotdaprops",
    "name": "Who Got Da Props",
    "artist": "Black Moon / Da Beatminerz",
    "genre": "Hip-Hop",
    "bpm": 92,
    "difficulty": "Intermediate",
    "gear": "Akai S950 & MPC60 / Evil Dee & Mr. Walt",
    "tip": "Dusty Brooklyn basement boom bap. Ghost snare pickup on step 15 and deep syncopated kick.",
    "tags": [
      "boom bap",
      "beatminerz",
      "black moon"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.......X.x.....",
    "s": "....X.......X..g",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "..............x."
  },
  {
    "id": "bestkeptsecret",
    "name": "Best Kept Secret",
    "artist": "Diamond D",
    "genre": "Hip-Hop",
    "bpm": 95,
    "difficulty": "Intermediate",
    "gear": "E-mu SP-1200 / Diamond D",
    "tip": "Kool & The Gang horns over punchy SP-1200 kick with syncopated open hat on the upbeat of 2.",
    "tags": [
      "boom bap",
      "diamond d",
      "ditc"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X..x....X.x.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": ".......x........"
  },
  {
    "id": "partyandbull",
    "name": "Party and Bullshit",
    "artist": "The Notorious B.I.G. / Easy Mo Bee",
    "genre": "Hip-Hop",
    "bpm": 98,
    "difficulty": "Intermediate",
    "gear": "E-mu SP-1200 / Easy Mo Bee",
    "tip": "Driving uptown Brooklyn party bounce. Punchy double kick cadence on 1-and and 3-and.",
    "tags": [
      "boom bap",
      "biggie",
      "easy mo bee"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X...x.X.X...x.X.",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "statikswing",
    "name": "East Coast Boom Bap Swing",
    "artist": "Statik Selektah standard",
    "genre": "Hip-Hop",
    "bpm": 90,
    "difficulty": "Intermediate",
    "gear": "Turntables & Akai MPC2000XL",
    "tip": "The classic modern East Coast 2-bar boom bap swing. Ghost notes support the backbeat with punchy open hat on step 7.",
    "tags": [
      "boom bap",
      "statik selektah",
      "swing"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.....x...X.....",
    "s": "....X..g....X..g",
    "h": "x.x.x.x.x.x.x.x.",
    "o": ".......x........",
    "var": {
      "k": "X.....x.x.X.....",
      "s": "....X..g.g..X..g",
      "h": "x.x.x.x.x.x.x.x.",
      "o": ".......x........"
    }
  },
  {
    "id": "aruarian",
    "name": "Aruarian Dance",
    "artist": "Nujabes",
    "genre": "Lo-Fi",
    "bpm": 88,
    "difficulty": "Beginner",
    "gear": "Akai MPC2000 / Nujabes (Samurai Champloo)",
    "tip": "The defining anthem of lo-fi hip-hop. Soft acoustic guitar chop with gentle, swinging kick and open hat on beat 2-and.",
    "tags": [
      "nujabes",
      "lo-fi classic",
      "samurai champloo"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.....x.X.......",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": ".......x........"
  },
  {
    "id": "feather",
    "name": "Feather",
    "artist": "Nujabes / Cise Starr",
    "genre": "Lo-Fi",
    "bpm": 98,
    "difficulty": "Beginner",
    "gear": "Akai MPC2000 & vintage soul records",
    "tip": "Breezy, nostalgic piano loop with warm pillowy kick drum and relaxed backbeat.",
    "tags": [
      "nujabes",
      "chillhop",
      "nostalgia"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.......X.x.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................",
    "var": {
      "k": "X.....x.X.......",
      "s": "....X.......X...",
      "h": "x.x.x.x.x.x.x.x.",
      "o": "..............x."
    }
  },
  {
    "id": "donuttime",
    "name": "Time: The Donut of the Heart",
    "artist": "J Dilla",
    "genre": "Lo-Fi",
    "bpm": 87,
    "difficulty": "Advanced",
    "gear": "Akai MPC3000 / J Dilla (\"Donuts\")",
    "tip": "Masterclass in micro-timing. The kick on step 9 drags heavily behind beat 3, creating the legendary Dilla neck snap.",
    "tags": [
      "dilla",
      "donuts",
      "drunk swing"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X..x.....x.X....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................",
    "var": {
      "k": "X.......x..X....",
      "s": "....X.......X..g",
      "h": "x.x.x.x.x.x.x.xx",
      "o": "................"
    }
  },
  {
    "id": "sofar",
    "name": "So Far to Go",
    "artist": "J Dilla / Common & D'Angelo",
    "genre": "Lo-Fi",
    "bpm": 85,
    "difficulty": "Advanced",
    "gear": "Akai MPC3000 / The Isley Brothers sample",
    "tip": "Sensual neo-soul groove. Feather-light 16th hats with subtle ghost snare on step 7 supporting the backbeat.",
    "tags": [
      "dilla",
      "neo-soul",
      "pocket"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.....x...X.x...",
    "s": "....X..g....X...",
    "h": "x.xxx.xxx.xxx.xx",
    "o": "................"
  },
  {
    "id": "workinonit",
    "name": "Workinonit",
    "artist": "J Dilla",
    "genre": "Lo-Fi",
    "bpm": 88,
    "difficulty": "Intermediate",
    "gear": "Akai MPC3000 / 10cc guitar chop",
    "tip": "Four-on-the-floor kick meets dirty, crunchy rock breakbeat chops and relentless offbeat open hats.",
    "tags": [
      "dilla",
      "donuts",
      "rock chop"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X...X...X...X...",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "..x...x...x...x."
  },
  {
    "id": "accordion",
    "name": "Accordion",
    "artist": "Madvillain (Madlib & MF DOOM)",
    "genre": "Lo-Fi",
    "bpm": 96,
    "difficulty": "Beginner",
    "gear": "Roland SP-303 Dr. Sample / Madlib",
    "tip": "Daedelus accordion loop sampled through SP-303 vinyl simulator. Offbeat hi-hat clicks floating over muffled kick.",
    "tags": [
      "madlib",
      "mf doom",
      "sp-303"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.....x.X.......",
    "s": "....X.......X...",
    "h": "..x...x...x...x.",
    "o": "................"
  },
  {
    "id": "allcaps",
    "name": "All Caps",
    "artist": "Madvillain (Madlib & MF DOOM)",
    "genre": "Lo-Fi",
    "bpm": 91,
    "difficulty": "Intermediate",
    "gear": "Roland SP-303 & Akai MPC2000",
    "tip": "Heavy, dragging comic-book groove. Kick on step 9 pushes into beat 3 with delayed 16th hat grace notes.",
    "tags": [
      "madlib",
      "mf doom",
      "sp-303"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.......X.x.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................",
    "var": {
      "k": "X.....x.X.......",
      "s": "....X.......X...",
      "h": "x.x.x.x.x.x.x.xx",
      "o": "................"
    }
  },
  {
    "id": "lowclass",
    "name": "Low Class Conspiracy",
    "artist": "Quasimoto / Madlib",
    "genre": "Lo-Fi",
    "bpm": 89,
    "difficulty": "Beginner",
    "gear": "Roland SP-303 vinyl sim & vintage jazz records",
    "tip": "Dusty, muted kick with crackling vinyl hiss. Open hi-hat on the upbeat of 2 provides the breathing room.",
    "tags": [
      "madlib",
      "quasimoto",
      "vinyl"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X......x..X.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": ".......x........"
  },
  {
    "id": "klipsh",
    "name": "Klipsh",
    "artist": "Knxwledge",
    "genre": "Lo-Fi",
    "bpm": 84,
    "difficulty": "Advanced",
    "gear": "Roland SP-404SX / Knxwledge",
    "tip": "Extreme off-grid swing. The kick hits are noticeably displaced from the quantize grid, creating a fluid, human wobble.",
    "tags": [
      "knxwledge",
      "sp-404",
      "tape swing"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "x..x.....x.x....",
    "s": "....X..g....X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "lofigirl",
    "name": "Coffee Shop Study Beat",
    "artist": "Lofi Girl Standard",
    "genre": "Lo-Fi",
    "bpm": 80,
    "difficulty": "Beginner",
    "gear": "Muffled 808 kick + filtered rimshot + vinyl crackle",
    "tip": "The world-famous study beat formula: low-pass filtered kick, soft rimshot on 2 and 4, relaxed 8th-note hats.",
    "tags": [
      "lofigirl",
      "study",
      "chillhop",
      "relax"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "r": "L"
    },
    "k": "X.......X.x.....",
    "s": "................",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................",
    "var": {
      "k": "X.....x.X.......",
      "s": "................",
      "h": "x.x.x.x.x.x.x.x.",
      "o": "................"
    }
  },
  {
    "id": "whataday",
    "name": "What a Day",
    "artist": "Kiefer",
    "genre": "Lo-Fi",
    "bpm": 86,
    "difficulty": "Advanced",
    "gear": "Stones Throw live-feel drum recording / Kiefer",
    "tip": "Jazz-hop virtuosity. Ghost snares roll softly on the e-and-a subdivisions under rich Rhodes chords.",
    "tags": [
      "kiefer",
      "jazzhop",
      "ghost notes"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.....x.X.......",
    "s": "..g.X.g...g.X.g.",
    "h": "x.xxx.xxx.xxx.xx",
    "o": "................"
  },
  {
    "id": "sakuratrees",
    "name": "Sakura Trees",
    "artist": "Saib",
    "genre": "Lo-Fi",
    "bpm": 84,
    "difficulty": "Intermediate",
    "gear": "Bossa-hop nylon guitar + shaker + SP-404",
    "tip": "Chillhop bossa nova fusion. Continuous shaker 16ths floating over syncopated kicks and gentle snare brushes.",
    "tags": [
      "saib",
      "chillhop",
      "bossa"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "z": "R"
    },
    "k": "X..x....X..x....",
    "s": "....X.......X...",
    "h": "..x...x...x...x.",
    "o": "................"
  },
  {
    "id": "faraway",
    "name": "Far Away",
    "artist": "Tomppabeats",
    "genre": "Lo-Fi",
    "bpm": 78,
    "difficulty": "Beginner",
    "gear": "Roland SP-404 vinyl sim + pitch-bent samples",
    "tip": "Ultra-minimal 1-minute bedroom loop. Slow dragging tempo with kick pickup on step 11.",
    "tags": [
      "tomppabeats",
      "bedroom",
      "sp-404"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.......X..x....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "cookinsoul",
    "name": "Cookin Soul Dope Beat",
    "artist": "Cookin Soul",
    "genre": "Lo-Fi",
    "bpm": 92,
    "difficulty": "Intermediate",
    "gear": "Roland SP-404MKII & Akai MPC Live",
    "tip": "Punchy Cookin Soul trademark bounce. Crispy layered snare with ghost taps and punchy kick on 1 and 2-and.",
    "tags": [
      "cookin soul",
      "sp-404mkii",
      "boom bap"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.....x.X.x.....",
    "s": "....X..g....X..g",
    "h": "x.x.x.x.x.x.x.x.",
    "o": ".......x........"
  },
  {
    "id": "vanilla",
    "name": "Sweet Talk",
    "artist": "Vanilla",
    "genre": "Lo-Fi",
    "bpm": 88,
    "difficulty": "Intermediate",
    "gear": "Vintage soul 45s + Akai MPC",
    "tip": "Warm, uplifting soul lo-fi. Shuffling 16th hats with sweet open hat upbeat on step 6.",
    "tags": [
      "vanilla",
      "soul lo-fi",
      "sample flip"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R"
    },
    "k": "X.......X.x.....",
    "s": "....X.......X...",
    "h": "x.xxx.xxx.xxx.xx",
    "o": "......x........."
  },
  {
    "id": "wuntwo",
    "name": "Rio",
    "artist": "Wun Two",
    "genre": "Lo-Fi",
    "bpm": 76,
    "difficulty": "Beginner",
    "gear": "Tape deck + muted drum hits",
    "tip": "Pure lo-fi meditation. Maximum restraint: kick on 1 and 3, dry finger-click snare on 2 and 4, gentle offbeat hats.",
    "tags": [
      "wun two",
      "minimal",
      "tape"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.......X.......",
    "s": "....X.......X...",
    "h": "..x...x...x...x.",
    "o": "................"
  },
  {
    "id": "planetrock",
    "name": "Planet Rock",
    "artist": "Afrika Bambaataa",
    "genre": "Electro",
    "bpm": 128,
    "difficulty": "Intermediate",
    "gear": "Roland TR-808 Rhythm Composer",
    "tip": "The definitive 808 electro blueprint. Syncopated tresillo kick with snappy claps on 2 and 4 and rapid 16th hats.",
    "tags": [
      "808",
      "electro",
      "hip-hop",
      "classic"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L"
    },
    "k": "X..X..X.X..X..X.",
    "s": "................",
    "h": "xxxxxxxxxxxxxxxx",
    "o": "................"
  },
  {
    "id": "bluemonday",
    "name": "Blue Monday",
    "artist": "New Order",
    "genre": "Electronic",
    "bpm": 130,
    "difficulty": "Intermediate",
    "gear": "Oberheim DMX drum machine",
    "tip": "The best-selling 12\" single in history. Machine-gun 16th kick burst anchors the relentless intro before dropping into 4-on-floor.",
    "tags": [
      "synth-pop",
      "dmx",
      "post-punk"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.X.X.X.X.X.X.X.",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................",
    "var": {
      "k": "X...X...X...X...",
      "s": "....X.......X...",
      "h": "x.x.x.x.x.x.x.x.",
      "o": "................"
    }
  },
  {
    "id": "numbers",
    "name": "Numbers",
    "artist": "Kraftwerk",
    "genre": "Electronic",
    "bpm": 126,
    "difficulty": "Beginner",
    "gear": "Custom electronic percussion pads & sequencers",
    "tip": "Sparse, crystalline electro minimalism. Snare clicks and dry kick steps leave vast space for speech synthesizers.",
    "tags": [
      "krautrock",
      "electro",
      "kraftwerk"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.......X.......",
    "s": "....X.......X...",
    "h": "..x...x...x...x.",
    "o": "................"
  },
  {
    "id": "clear",
    "name": "Clear",
    "artist": "Cybotron",
    "genre": "Electro",
    "bpm": 128,
    "difficulty": "Intermediate",
    "gear": "Roland TR-808 / Juan Atkins & Richard Davis",
    "tip": "Detroit electro genesis. Dotted 808 bass patterns sync with double snare pops and bright crash hits.",
    "tags": [
      "detroit",
      "electro",
      "808"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L"
    },
    "k": "X..x..X...x..x..",
    "s": "....X.......X..x",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "trans-europe",
    "name": "Trans-Europe Express",
    "artist": "Kraftwerk",
    "genre": "Electronic",
    "bpm": 108,
    "difficulty": "Beginner",
    "gear": "Electronic drum synths",
    "tip": "The mechanical train pulse later lifted by Afrika Bambaataa for Planet Rock. Hypnotic kick and tight shaker hats.",
    "tags": [
      "krautrock",
      "mechanical",
      "proto-techno"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X...x...X...x...",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "sexualhealing",
    "name": "Sexual Healing",
    "artist": "Marvin Gaye",
    "genre": "Jazz & Soul",
    "bpm": 95,
    "difficulty": "Beginner",
    "gear": "Roland TR-808 (one of the first major hits to use it)",
    "tip": "Warm 808 handclaps on 2 and 4 with gentle kick downbeats and laid-back open hat accents.",
    "tags": [
      "808",
      "soul",
      "classic"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L",
      "o": "R"
    },
    "k": "X.......X.x.....",
    "s": "................",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "......x.......x."
  },
  {
    "id": "pumpup",
    "name": "Pump Up The Volume",
    "artist": "M|A|R|R|S",
    "genre": "House",
    "bpm": 114,
    "difficulty": "Intermediate",
    "gear": "Akai S900 sampler + Roland TR-909",
    "tip": "Early sampling masterpiece. Four-on-the-floor kick coupled with syncopated breakbeat snare fills and offbeat hats.",
    "tags": [
      "early house",
      "sampling",
      "uk club"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L"
    },
    "k": "X...X...X...X...",
    "s": "....X.......X..x",
    "h": "x...x...x...x...",
    "o": "..x...x...x...x."
  },
  {
    "id": "voodooray",
    "name": "Voodoo Ray",
    "artist": "A Guy Called Gerald",
    "genre": "House",
    "bpm": 124,
    "difficulty": "Intermediate",
    "gear": "Roland TR-808 & TB-303 (Manchester Hacienda anthem)",
    "tip": "Classic UK acid house swing. Swung 808 hats, conga accents, and skipping snare taps create hypnotic movement.",
    "tags": [
      "acid house",
      "hacienda",
      "808"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "b": "L"
    },
    "k": "X...x...X...x...",
    "s": "....X.......X...",
    "h": "x.xxx.xxx.xxx.xx",
    "o": "................"
  },
  {
    "id": "closer",
    "name": "Closer",
    "artist": "Nine Inch Nails",
    "genre": "Electronic",
    "bpm": 90,
    "difficulty": "Intermediate",
    "gear": "Sampled acoustic drums + Akai S1100 + distortion",
    "tip": "Industrial groove sampled from Iggy Pop (\"Nightclubbing\"). Heavy stomping kick and heavily filtered snare on 2 and 4.",
    "tags": [
      "industrial",
      "nin",
      "heavy groove"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X...X...X...X...",
    "s": "....X.......X...",
    "h": "..x...x...x...x.",
    "o": "................",
    "var": {
      "k": "X...X...X..xX...",
      "s": "....X.......X...",
      "h": "..x...x...x...x.",
      "o": "................"
    }
  },
  {
    "id": "tourdefrance",
    "name": "Tour de France",
    "artist": "Kraftwerk",
    "genre": "Electronic",
    "bpm": 128,
    "difficulty": "Beginner",
    "gear": "E-mu Emulator & electronic percussions",
    "tip": "Mechanical rhythmic pedaling with breathing sound effects acting as upbeats over a crisp electronic 4/4 pulse.",
    "tags": [
      "electro",
      "cycling",
      "krautrock"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X...X...X...X...",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "aroundtheworld",
    "name": "Around The World",
    "artist": "Daft Punk",
    "genre": "House",
    "bpm": 121,
    "difficulty": "Beginner",
    "gear": "Roland TR-909 + LinnDrum + Ensoniq ASR-10",
    "tip": "French touch perfection. Driving 909 four-on-the-floor kick with punchy clap on 2/4 and bright open hat sizzles on upbeats.",
    "tags": [
      "french touch",
      "909",
      "disco house"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L",
      "o": "R"
    },
    "k": "X...X...X...X...",
    "s": "................",
    "h": "x...x...x...x...",
    "o": "..x...x...x...x."
  },
  {
    "id": "acid303",
    "name": "Acid House 303",
    "artist": "Phuture / Chicago 1987",
    "genre": "House",
    "bpm": 122,
    "difficulty": "Beginner",
    "gear": "Roland TR-707 & TB-303 (\"Acid Tracks\")",
    "tip": "The track that started Acid House. Punchy 707 rimshots and dry handclaps cutting through churning 303 squelches.",
    "tags": [
      "acid house",
      "707",
      "chicago"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L",
      "r": "L"
    },
    "k": "X...X...X...X...",
    "s": "................",
    "h": "x...x...x...x...",
    "o": "..x...x...x...x."
  },
  {
    "id": "four",
    "name": "Four on the Floor",
    "artist": "Disco / Chicago house",
    "genre": "House",
    "bpm": 124,
    "difficulty": "Beginner",
    "gear": "Roland TR-909",
    "tip": "The heartbeat of club music. Kick on all four beats, open hat on the offbeat (& of every beat), claps on 2 and 4.",
    "tags": [
      "house",
      "909",
      "club foundation"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R",
      "c": "L"
    },
    "k": "X...X...X...X...",
    "s": "....X.......X...",
    "h": "x...x...x...x...",
    "o": "..x...x...x...x."
  },
  {
    "id": "deephouse",
    "name": "Deep House",
    "artist": "Larry Heard / Chicago",
    "genre": "House",
    "bpm": 120,
    "difficulty": "Intermediate",
    "gear": "Roland TR-909 & TR-707",
    "tip": "Warm, swung 16th hats layered over subtle rimshots and a deep, pillowy kick. Keep velocities relaxed.",
    "tags": [
      "deep house",
      "swing",
      "chicago"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "r": "L"
    },
    "k": "X...X...X...X...",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.xx",
    "o": "..x...x...x...x."
  },
  {
    "id": "detroittechno",
    "name": "Detroit Techno",
    "artist": "Underground Resistance / Model 500",
    "genre": "Techno",
    "bpm": 132,
    "difficulty": "Intermediate",
    "gear": "Roland TR-909",
    "tip": "Relentless driving 909 kick paired with syncopated open hats, ride cymbal pushes, and fierce claps.",
    "tags": [
      "detroit",
      "909",
      "techno foundation"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L",
      "y": "R"
    },
    "k": "X...X...X...X...",
    "s": "....X.......X...",
    "h": "..x...x...x...xx",
    "o": "..x...x...x...x."
  },
  {
    "id": "berlinrumble",
    "name": "Berlin Rumble Techno",
    "artist": "Berghain / Industrial Standard",
    "genre": "Techno",
    "bpm": 134,
    "difficulty": "Intermediate",
    "gear": "Analog drum synths + Reverb tail rumble + Overdrive",
    "tip": "The modern industrial techno signature. Fast driving 16th closed hats cutting through a heavy sub-frequency kick rumble.",
    "tags": [
      "industrial",
      "rumble",
      "peak-time",
      "berlin"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.x.x.x.X.x.x.x.",
    "s": "............X...",
    "h": "xxxxxxxxxxxxxxxx",
    "o": "..x...x...x...x."
  },
  {
    "id": "minimaltechno",
    "name": "Minimal Techno",
    "artist": "Robert Hood",
    "genre": "Techno",
    "bpm": 128,
    "difficulty": "Beginner",
    "gear": "Roland TR-909 minimal processing",
    "tip": "Hypnotic restraint. Only two or three elements playing at once: a dry kick, sparse click hat, and offbeat rim.",
    "tags": [
      "minimal",
      "robert hood",
      "hypnotic"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "r": "L"
    },
    "k": "X...X...X...X...",
    "s": "............X...",
    "h": "..x.......x...x.",
    "o": "................"
  },
  {
    "id": "dubtechno",
    "name": "Dub Techno",
    "artist": "Basic Channel / Rhythm & Sound",
    "genre": "Techno",
    "bpm": 125,
    "difficulty": "Intermediate",
    "gear": "Roland TR-909 + Tape delay / Space Echo",
    "tip": "Cavernous space. Kick on quarter notes with filtered noise hats delayed across dotted-eighth subdivisions.",
    "tags": [
      "dub techno",
      "delay",
      "basic channel"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L"
    },
    "k": "X...X...X...X...",
    "s": "....X.......X...",
    "h": "x..x..x.x..x..x.",
    "o": "................"
  },
  {
    "id": "jackinhouse",
    "name": "Jackin' House",
    "artist": "DJ Sneak / Derrick Carter",
    "genre": "House",
    "bpm": 126,
    "difficulty": "Intermediate",
    "gear": "E-mu SP-1200 & Roland TR-909",
    "tip": "Skippy, syncopated snare bounces on steps 7 and 15 that make the body \"jack\". Shuffling 16th hats.",
    "tags": [
      "chicago",
      "jack",
      "swing"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L"
    },
    "k": "X...X...X...X...",
    "s": "....X..x....X..x",
    "h": "..x...x...x...xx",
    "o": "..x...x...x...x."
  },
  {
    "id": "acidtechno",
    "name": "Acid Techno",
    "artist": "London Acid City / Stay Up Forever",
    "genre": "Techno",
    "bpm": 138,
    "difficulty": "Intermediate",
    "gear": "Roland TR-909 pushed into red mixer gain",
    "tip": "Hard, fast, unapologetic driving kick with rapid sixteenth hats and stinging crash cymbals on section drops.",
    "tags": [
      "acid",
      "hard techno",
      "909"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "y": "R"
    },
    "k": "X...X...X...X...",
    "s": "....X.......X...",
    "h": "xxxxxxxxxxxxxxxx",
    "o": "..x...x...x...x."
  },
  {
    "id": "dilla",
    "name": "Dilla Drunk Swing",
    "artist": "J Dilla / Slum Village (\"Fall In Love\")",
    "genre": "Hip-Hop",
    "bpm": 86,
    "difficulty": "Advanced",
    "gear": "Akai MPC3000 (quantize turned completely OFF)",
    "tip": "Legendary unquantized human feel. The kick drags slightly behind the downbeat, snare leans forward, hats shuffle lazily.",
    "tags": [
      "dilla",
      "neo-soul",
      "drunk swing",
      "mpc3000"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "x..x.....x.x....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................",
    "var": {
      "k": "x.......x..x....",
      "s": "....X.......X..g",
      "h": "x.x.x.x.x.x.x.xx",
      "o": "................"
    }
  },
  {
    "id": "gfunk",
    "name": "West Coast G-Funk",
    "artist": "Dr. Dre / Snoop Dogg",
    "genre": "Hip-Hop",
    "bpm": 94,
    "difficulty": "Beginner",
    "gear": "Akai MPC3000 & LinnDrum samples",
    "tip": "Laid back California bounce. Heavy snare clap on 2 and 4, delayed kick pickups, and sparkling open hats.",
    "tags": [
      "g-funk",
      "west coast",
      "dr dre"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L",
      "o": "R"
    },
    "k": "X.....x.X.......",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "......x.......x."
  },
  {
    "id": "timbaland",
    "name": "Timbaland Bounce",
    "artist": "Timbaland / Aaliyah (\"Try Again\")",
    "genre": "Hip-Hop",
    "bpm": 92,
    "difficulty": "Advanced",
    "gear": "Ensoniq ASR-10 keyboard workstation",
    "tip": "Staccato beatbox mouth percussions and skippy 16th syncopations. Crisp ghost kicks and playful rhythmic spaces.",
    "tags": [
      "timbaland",
      "bounce",
      "syncopation"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "b": "L"
    },
    "k": "X...x..x..X.x...",
    "s": "....X.......X..x",
    "h": "x.x.xxx.x.x.xxx.",
    "o": "................"
  },
  {
    "id": "trap",
    "name": "Half-Time Trap",
    "artist": "Atlanta standard / Metro Boomin",
    "genre": "Trap",
    "bpm": 140,
    "difficulty": "Beginner",
    "gear": "Roland TR-808 software kits",
    "tip": "Halftime snare exclusively on beat 3 (step 8). Rapid 16th and 32nd hi-hat rolls over booming sub 808 kicks.",
    "tags": [
      "trap",
      "atlanta",
      "808 rolls"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L"
    },
    "k": "X......X..X.....",
    "s": "........X.......",
    "h": "x.x.x.x.xxx.x.xx",
    "o": "................"
  },
  {
    "id": "trapbounce",
    "name": "808 Bounce Trap",
    "artist": "Southside / Lex Luger",
    "genre": "Trap",
    "bpm": 144,
    "difficulty": "Intermediate",
    "gear": "Roland TR-808 sub hits",
    "tip": "Syncopated 808 kick notes that slide around the half-time snare, with sudden triplet hat flourishes.",
    "tags": [
      "trap",
      "808 bounce",
      "lex luger"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L"
    },
    "k": "X..x......x..x..",
    "s": "........X.......",
    "h": "x.x.x.x.x.xxx.x.",
    "o": "................"
  },
  {
    "id": "drill",
    "name": "UK Drill",
    "artist": "London standard",
    "genre": "Trap",
    "bpm": 142,
    "difficulty": "Intermediate",
    "gear": "Custom Drill sample packs + 808 glide",
    "tip": "Signature displaced snare landing on beat 3 and the upbeat of 4 (step 8 and 13). Skippy dotted hats.",
    "tags": [
      "drill",
      "uk drill",
      "slipped snare"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.........x..X..",
    "s": "........X....X..",
    "h": "x..x..x.x..x..x.",
    "o": "................"
  },
  {
    "id": "brooklyndrill",
    "name": "Brooklyn Drill",
    "artist": "Pop Smoke / 808Melo",
    "genre": "Trap",
    "bpm": 140,
    "difficulty": "Intermediate",
    "gear": "FL Studio + Sliding 808s",
    "tip": "Aggressive sliding 808 sub kicks with staggered snare accents and stuttering triplets.",
    "tags": [
      "drill",
      "brooklyn",
      "pop smoke"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L"
    },
    "k": "X....x....x..x..",
    "s": "........X...x...",
    "h": "x.xxx.x.x.xxx.x.",
    "o": "................"
  },
  {
    "id": "crunk",
    "name": "Southern Crunk",
    "artist": "Lil Jon / Three 6 Mafia",
    "genre": "Trap",
    "bpm": 150,
    "difficulty": "Beginner",
    "gear": "Roland TR-808 & Boss SP-505",
    "tip": "High-energy club hypeness. Loud 808 clap on beat 3 with straight 8th hats and heavy downbeat 808 kicks.",
    "tags": [
      "crunk",
      "808",
      "southern"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L"
    },
    "k": "X.......X...x...",
    "s": "........X.......",
    "h": "xxxxxxxxxxxxxxxx",
    "o": "................"
  },
  {
    "id": "twostep",
    "name": "Two-Step",
    "artist": "UK garage standard",
    "genre": "UK Garage",
    "bpm": 132,
    "difficulty": "Intermediate",
    "gear": "Akai S3000XL / Roland JV-1080 drum samples",
    "tip": "Skippy, syncopated kick rhythm on step 0 and step 10. Shuffling hats with ghost snares give it that buoyant UK swing.",
    "tags": [
      "2-step",
      "ukg",
      "swing"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "r": "L"
    },
    "k": "X.........X.....",
    "s": "....X.......X...",
    "h": "..x...x...x...x.",
    "o": "................",
    "var": {
      "k": "X.....x...X.....",
      "s": "....X.......X...",
      "h": "..x.x.x...x.x.x.",
      "o": "..............x."
    }
  },
  {
    "id": "speedgarage",
    "name": "Speed Garage",
    "artist": "187 Lockdown / Armand Van Helden",
    "genre": "UK Garage",
    "bpm": 130,
    "difficulty": "Intermediate",
    "gear": "Roland TR-909 & Akai sampler",
    "tip": "Driving 4-on-the-floor kick underneath syncopated UK garage snares and time-stretched break fills.",
    "tags": [
      "speed garage",
      "909",
      "bass"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L"
    },
    "k": "X...X...X...X...",
    "s": "....X..x....X..x",
    "h": "..x...x...x...x.",
    "o": "..x...x...x...x."
  },
  {
    "id": "jungle",
    "name": "Chopped Amen",
    "artist": "Jungle standard",
    "genre": "Jungle",
    "bpm": 170,
    "difficulty": "Advanced",
    "gear": "Akai S950 / E-mu Emax time-stretched Amen sample",
    "tip": "Rapid chopped snare syncopations and delayed kick drops. Requires lightning-fast finger dexterity or sequencer edits.",
    "tags": [
      "jungle",
      "breakbeat",
      "amen"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.x.......X.....",
    "s": "....X..g.X.XX.X.",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................",
    "var": {
      "k": "X.x...x...x..x..",
      "s": ".x..X..g.X..X.XX",
      "h": "x.x.x.x.x.x.x.x.",
      "o": "................"
    }
  },
  {
    "id": "dnb",
    "name": "Two-Step D&B",
    "artist": "Drum & bass standard",
    "genre": "Drum & Bass",
    "bpm": 174,
    "difficulty": "Intermediate",
    "gear": "E-mu Ultra sampler + EMU Morpheus filters",
    "tip": "The foundational D&B cadence: Kick on step 0, Snare on step 4, Kick on step 10, Snare on step 12. Relentless speed.",
    "tags": [
      "dnb",
      "two-step",
      "fast"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "y": "R"
    },
    "k": "X.........X.....",
    "s": "....X..g....X..g",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................",
    "var": {
      "k": "X.........XX....",
      "s": "....X..g.X..X...",
      "h": "x.x.x.x.x.x.x.x.",
      "o": "..............x."
    }
  },
  {
    "id": "dnbrolling",
    "name": "Rolling D&B",
    "artist": "Hospital Records / Liquid standard",
    "genre": "Drum & Bass",
    "bpm": 174,
    "difficulty": "Advanced",
    "gear": "Processed Think & Soul Searcher breaks layered with synthetic punch",
    "tip": "Continuous 16th ghost snare taps rolling between the heavy backbeats. Smooth, hypnotic, forward-surging motion.",
    "tags": [
      "liquid",
      "rolling",
      "dnb",
      "ghost notes"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.........XX....",
    "s": "....X..g.g..X..g",
    "h": "x.xxx.xxx.xxx.xx",
    "o": "................"
  },
  {
    "id": "dubstep",
    "name": "Dubstep Half-Time",
    "artist": "Digital Mystikz / Skream",
    "genre": "Dubstep",
    "bpm": 140,
    "difficulty": "Beginner",
    "gear": "Korg Electribe / FruityLoops",
    "tip": "Massive half-time weight. Kick on step 0, colossal reverberant snare on step 8 (beat 3). Sub-bass carries the groove.",
    "tags": [
      "dubstep",
      "half-time",
      "deep"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.........X.....",
    "s": "........X.......",
    "h": "..x.......x.....",
    "o": "................"
  },
  {
    "id": "grime",
    "name": "Grime 140",
    "artist": "Wiley / Dizzee Rascal (\"I Luv U\")",
    "genre": "Grime",
    "bpm": 140,
    "difficulty": "Intermediate",
    "gear": "Korg Triton / PC Music 2000s synths (\"Eski-beat\")",
    "tip": "Cold, angular syncopation. 8-bar square wave bass with snappy clap on 2 and 4 and unexpected kick displacements.",
    "tags": [
      "grime",
      "eski",
      "uk"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "c": "L"
    },
    "k": "X.....x.x...X...",
    "s": "....X.......X...",
    "h": "..x...x...x...x.",
    "o": "................"
  },
  {
    "id": "bossa",
    "name": "Bossa Nova",
    "artist": "Rio de Janeiro / João Gilberto",
    "genre": "Latin",
    "bpm": 140,
    "difficulty": "Intermediate",
    "gear": "Acoustic nylon guitar tapping + soft brushes kit",
    "tip": "Soft Brazilian baion kick on dotted eighths with syncopated cross-stick rim clicks. Gentle, breezy dynamics.",
    "tags": [
      "bossa nova",
      "brazil",
      "cross-stick"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "r": "L"
    },
    "k": "x..xx..xx..xx..x",
    "s": "x..x..x...x..x..",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "sonclave",
    "name": "Son Clave 3:2",
    "artist": "Traditional Afro-Cuban",
    "genre": "Latin",
    "bpm": 120,
    "difficulty": "Intermediate",
    "gear": "Rosewood Claves & Timbales",
    "tip": "The foundational key of Afro-Cuban music. Bar 1 has three pulses (1, 2-and, 4); Bar 2 has two pulses (2, 3).",
    "tags": [
      "clave",
      "afro-cuban",
      "latin foundation"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "w": "R",
      "r": "L"
    },
    "k": "X.......X.......",
    "s": "X..x..X.....X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................",
    "var": {
      "k": "X.......X.......",
      "s": "....X...X.......",
      "h": "x.x.x.x.x.x.x.x.",
      "o": "................"
    }
  },
  {
    "id": "rumbaclave",
    "name": "Rumba Clave 3:2",
    "artist": "Afro-Cuban Rumba",
    "genre": "Latin",
    "bpm": 120,
    "difficulty": "Advanced",
    "gear": "Claves, Quinto, Congas, Palitos",
    "tip": "Notice the delayed third hit in the 3-side: instead of step 6 (2-and), it lands on step 7 (the \"a\" of 2). Deep syncopation.",
    "tags": [
      "rumba",
      "clave",
      "afro-cuban"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "r": "L"
    },
    "k": "X.......X.......",
    "s": "X..x...X....X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................",
    "var": {
      "k": "X.......X.......",
      "s": "....X...X.......",
      "h": "x.x.x.x.x.x.x.x.",
      "o": "................"
    }
  },
  {
    "id": "dembow",
    "name": "Dem Bow",
    "artist": "Shabba Ranks / Steely & Clevie",
    "genre": "Reggaeton",
    "bpm": 95,
    "difficulty": "Beginner",
    "gear": "Oberheim DMX / E-mu SP-1200",
    "tip": "The rhythm of reggaeton and modern Latin pop. Four-on-the-floor kick with the syncopated tresillo snare (step 3, 6, 11, 14).",
    "tags": [
      "reggaeton",
      "dembow",
      "tresillo"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X...X...X...X...",
    "s": "...X..X....X..X.",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "tambor",
    "name": "Tamborzão",
    "artist": "Baile funk / Rio favela",
    "genre": "Latin",
    "bpm": 130,
    "difficulty": "Intermediate",
    "gear": "Boss Dr. Sample SP-202 / MPC",
    "tip": "The percussive heartbeat of Brazilian Baile Funk. Thumping low-end kick cadence interlocking with crisp timbal/rim shots.",
    "tags": [
      "baile funk",
      "brazil",
      "favela"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "b": "L"
    },
    "k": "x..x...x..x.x...",
    "s": "...X..X...X...X.",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "songo",
    "name": "Songo",
    "artist": "Changuito / Los Van Van",
    "genre": "Latin",
    "bpm": 120,
    "difficulty": "Advanced",
    "gear": "Timbales kit with bass drum pedal & cowbell",
    "tip": "Invented by Changuito in Cuba. The cowbell drives steady eighths while the kick avoids beat 1 and accents upbeats.",
    "tags": [
      "songo",
      "cuba",
      "changuito"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "w": "R",
      "b": "L"
    },
    "k": "...X......X..X..",
    "s": "..x..X.x..XX...X",
    "h": "x...x...x...x...",
    "o": "................"
  },
  {
    "id": "afrobeat",
    "name": "Afrobeat",
    "artist": "Tony Allen / Fela Kuti",
    "genre": "Afrobeat",
    "bpm": 110,
    "difficulty": "Advanced",
    "gear": "Acoustic jazz kit / Tony Allen",
    "tip": "Masterclass in polyrhythmic independence. Constant shaker 16ths, polyrhythmic cowbell, and interlocking hi-hat/cross-stick.",
    "tags": [
      "afrobeat",
      "tony allen",
      "polyrhythm"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "w": "R",
      "z": "R",
      "r": "L"
    },
    "k": "X.....x...X.x...",
    "s": "..x..X.x..X..x.x",
    "h": "x.xxx.xxx.xxx.xx",
    "o": "..........x....."
  },
  {
    "id": "baion",
    "name": "Baion",
    "artist": "Luiz Gonzaga / Brazilian Northeast",
    "genre": "Latin",
    "bpm": 110,
    "difficulty": "Beginner",
    "gear": "Zabumba bass drum & Triangle",
    "tip": "The dotted-eighth kick syncopation that influenced rock and pop across the world. Shuffling triangle/hat 16ths.",
    "tags": [
      "brazil",
      "zabumba",
      "baion"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "z": "R"
    },
    "k": "X..x..X.X..x..X.",
    "s": "....X.......X...",
    "h": "xxxxxxxxxxxxxxxx",
    "o": "................"
  },
  {
    "id": "cumbia",
    "name": "Cumbia",
    "artist": "Colombian standard",
    "genre": "Latin",
    "bpm": 96,
    "difficulty": "Beginner",
    "gear": "Tambor alegre, llamador, and guache shaker",
    "tip": "Rolling 16th shaker scraping over steady offbeat upbeats. Kick drops on 1 and 3, congas accent beat 2 and 4.",
    "tags": [
      "cumbia",
      "colombia",
      "shaker"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "z": "R",
      "b": "L"
    },
    "k": "X.......X.......",
    "s": "....X.......X...",
    "h": "..x...x...x...x.",
    "o": "................"
  },
  {
    "id": "onedrop",
    "name": "One Drop",
    "artist": "Bob Marley & The Wailers / Carlton Barrett",
    "genre": "Reggae",
    "bpm": 76,
    "difficulty": "Beginner",
    "gear": "Ludwig kit with tuned timbales / Carlton Barrett",
    "tip": "Complete silence on beat 1. The kick and rimshot fall together exclusively on beat 3. Relaxed, deep spiritual groove.",
    "tags": [
      "reggae",
      "one drop",
      "carlton barrett"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "r": "L"
    },
    "k": "........X.......",
    "s": "................",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "steppers",
    "name": "Steppers Reggae",
    "artist": "Sly & Robbie / UK Dub",
    "genre": "Reggae",
    "bpm": 138,
    "difficulty": "Intermediate",
    "gear": "Acoustic kit + Simmons electronic drum pads",
    "tip": "Driving four-on-the-floor kick through a dub reggae skank. The offbeat hi-hat skank drives the spiritual forward march.",
    "tags": [
      "dub",
      "steppers",
      "sly and robbie"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "r": "L"
    },
    "k": "X...X...X...X...",
    "s": "........X.......",
    "h": "..x...x...x...x.",
    "o": "................"
  },
  {
    "id": "rockers",
    "name": "Rockers Reggae",
    "artist": "Third World / Channel One",
    "genre": "Reggae",
    "bpm": 78,
    "difficulty": "Intermediate",
    "gear": "Acoustic kit / Sly Dunbar",
    "tip": "Unlike the One Drop, Rockers kicks on beat 1 and beat 3, with militaristic rolling snare syncopations.",
    "tags": [
      "rockers",
      "channel one",
      "sly dunbar"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "r": "L"
    },
    "k": "X.......X.......",
    "s": "....x...X...x.x.",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "ska",
    "name": "Ska Upbeat",
    "artist": "The Skatalites / Lloyd Knibb",
    "genre": "Reggae",
    "bpm": 130,
    "difficulty": "Intermediate",
    "gear": "Jazz kit with tight snare",
    "tip": "Fast, joyous Jamaican jump blues. The guitar skank and hi-hat hit on the upbeat (& of every beat) with punchy bass drum drops.",
    "tags": [
      "ska",
      "jamaica",
      "upbeat"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "r": "L"
    },
    "k": "X.......X.x.....",
    "s": "....X.......X...",
    "h": "..x...x...x...x.",
    "o": "..x...x...x...x."
  },
  {
    "id": "billie",
    "name": "Billie Jean",
    "artist": "Michael Jackson",
    "genre": "Pop",
    "bpm": 117,
    "difficulty": "Beginner",
    "gear": "Yamaha kit / Leon \"Ndugu\" Chancler",
    "tip": "The cleanest pocket in pop history. Rock-solid 8th-note hats, unshakeable backbeat on 2 and 4, kick on 1 and 3.",
    "tags": [
      "pop",
      "classic",
      "pocket"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "z": "R"
    },
    "k": "X.......X.......",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "rock",
    "name": "Straight Eighths",
    "artist": "Rock standard",
    "genre": "Rock",
    "bpm": 120,
    "difficulty": "Beginner",
    "gear": "Acoustic rock drum kit",
    "tip": "The driving bedrock of classic rock. Kick hits on 1 and the upbeat of 3 (\"3-and\"), pushing the pulse into the 4th beat.",
    "tags": [
      "rock",
      "standard",
      "beginner"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "y": "R"
    },
    "k": "X.......X.x.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "motorik",
    "name": "Motorik",
    "artist": "NEU! / Klaus Dinger",
    "genre": "Krautrock",
    "bpm": 130,
    "difficulty": "Beginner",
    "gear": "Acoustic kit recorded with pristine German tape delay",
    "tip": "The \"endless road\" beat that inspired David Bowie, Joy Division, and Stereolab. Relentless, hypnotic 16th kick pulse.",
    "tags": [
      "krautrock",
      "motorik",
      "hypnotic"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R"
    },
    "k": "X.x...x.X.x...x.",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "motown",
    "name": "Motown Four-Snare",
    "artist": "The Supremes / Pistol Allen",
    "genre": "Pop",
    "bpm": 126,
    "difficulty": "Beginner",
    "gear": "Funk Brothers studio kit / Snakepit Detroit",
    "tip": "The trademark Motown signature: snare hits on all four quarter notes (1, 2, 3, 4) accompanied by driving tambourine/shakers.",
    "tags": [
      "motown",
      "soul",
      "pop foundation"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "z": "R"
    },
    "k": "X...X...X...X...",
    "s": "X...X...X...X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "teenspirit",
    "name": "Smells Like Teen Spirit",
    "artist": "Nirvana / Dave Grohl",
    "genre": "Rock",
    "bpm": 116,
    "difficulty": "Intermediate",
    "gear": "Tama Granstar kit with oversized cymbals / Dave Grohl",
    "tip": "Explosive grunge powerhouse. Double kick syncopation into beat 1 and beat 3 with massive rimshot wallops.",
    "tags": [
      "grunge",
      "nirvana",
      "dave grohl"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "y": "R"
    },
    "k": "X.X.....X.X.....",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": ".......x.......x"
  },
  {
    "id": "dbeat",
    "name": "D-Beat Hardcore",
    "artist": "Discharge / Punk standard",
    "genre": "Rock",
    "bpm": 160,
    "difficulty": "Intermediate",
    "gear": "Raw acoustic punk kit",
    "tip": "The foundational beat of hardcore crust punk. Displaced kick lands on 1, the \"and\" of 2, and 3, driving relentless momentum.",
    "tags": [
      "punk",
      "hardcore",
      "d-beat"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "y": "R"
    },
    "k": "X.....X.X.......",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "drill-8th",
    "name": "Drill: 8th-Note Foundation",
    "artist": "Finger Drumming Level 1",
    "genre": "Drills",
    "bpm": 85,
    "difficulty": "Beginner",
    "gear": "4x4 Drum Pads (MPC, Maschine, SP-404)",
    "tip": "Lock in your right-hand 8th hats while left hand lands backbeats on 2 & 4. Keep your kick on 1 & 3 completely rock-solid.",
    "tags": [
      "drill",
      "beginner",
      "hand-independence",
      "foundation"
    ],
    "hands": {
      "h": "R",
      "s": "L",
      "k": "R"
    },
    "k": "X.......X.......",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "drill-four",
    "name": "Drill: 4-on-the-Floor Coordination",
    "artist": "Finger Drumming Level 1",
    "genre": "Drills",
    "bpm": 120,
    "difficulty": "Beginner",
    "gear": "4x4 Drum Pads",
    "tip": "Master kicking on every downbeat while coordinating offbeat open-hat taps with right index finger and claps with left index.",
    "tags": [
      "drill",
      "beginner",
      "house",
      "coordination"
    ],
    "hands": {
      "k": "R",
      "s": "L",
      "h": "R",
      "o": "R",
      "c": "L"
    },
    "k": "X...X...X...X...",
    "s": "....X.......X...",
    "h": "x...x...x...x...",
    "o": "..x...x...x...x."
  },
  {
    "id": "drill-sync",
    "name": "Drill: Kick Syncopation & Pushes",
    "artist": "Finger Drumming Level 1",
    "genre": "Drills",
    "bpm": 90,
    "difficulty": "Beginner",
    "gear": "4x4 Drum Pads",
    "tip": "Practise dropping the kick on the syncopated upbeat \"and\" of 2 and 3 without letting your steady hi-hat hand flinch.",
    "tags": [
      "drill",
      "beginner",
      "syncopation"
    ],
    "hands": {
      "h": "R",
      "s": "L",
      "k": "R"
    },
    "k": "X.....X...X.x...",
    "s": "....X.......X...",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "drill-ghost",
    "name": "Drill: Ghost Note Pocket",
    "artist": "Finger Drumming Level 2",
    "genre": "Drills",
    "bpm": 95,
    "difficulty": "Intermediate",
    "gear": "Velocity-sensitive drum pads",
    "tip": "Develop finger touch dynamics. Tap the ghost snares (g) with minimal pad velocity right before and after loud backbeats (X).",
    "tags": [
      "drill",
      "intermediate",
      "ghost notes",
      "velocity"
    ],
    "hands": {
      "h": "R",
      "s": "L",
      "k": "R"
    },
    "k": "X.......X.......",
    "s": "..g.X.g...g.X.g.",
    "h": "x.x.x.x.x.x.x.x.",
    "o": "................"
  },
  {
    "id": "drill-linear",
    "name": "Drill: Linear Drumming 1",
    "artist": "Finger Drumming Level 2",
    "genre": "Drills",
    "bpm": 100,
    "difficulty": "Intermediate",
    "gear": "4x4 Drum Pads",
    "tip": "Linear drumming: NO two pads are ever hit simultaneously! Notice each step has at most ONE hit across kick, snare, or hat.",
    "tags": [
      "drill",
      "intermediate",
      "linear",
      "coordination"
    ],
    "hands": {
      "h": "R",
      "s": "L",
      "k": "R"
    },
    "k": "X.......x.......",
    "s": "....X.......X...",
    "h": ".x.x...x.x.x...x",
    "o": "................"
  },
  {
    "id": "drill-alt",
    "name": "Drill: Hand Alternation (R L R L)",
    "artist": "Finger Drumming Level 2",
    "genre": "Drills",
    "bpm": 110,
    "difficulty": "Intermediate",
    "gear": "4x4 Drum Pads",
    "tip": "Alternate strictly Right hand and Left hand on sixteenth notes (RLRLRLRL). Drop accents on the snare pad with left hand.",
    "tags": [
      "drill",
      "intermediate",
      "rudiments",
      "alternation"
    ],
    "hands": {
      "h": "R/L",
      "s": "L",
      "k": "R"
    },
    "stepHands": {
      "h": "RLRLRLRLRLRLRLRL"
    },
    "k": "X.......X.......",
    "s": "....X.......X...",
    "h": "xxxxxxxxxxxxxxxx",
    "o": "................"
  },
  {
    "id": "drill-paradiddle",
    "name": "Drill: Paradiddle Pad Groove",
    "artist": "Finger Drumming Level 3",
    "genre": "Drills",
    "bpm": 100,
    "difficulty": "Advanced",
    "gear": "4x4 Drum Pads",
    "tip": "Classic drumming rudiment translated to pads: R L R R | L R L L. Distributes hat taps and snare drops between hands.",
    "tags": [
      "drill",
      "advanced",
      "paradiddle",
      "rudiments"
    ],
    "hands": {
      "h": "R/L",
      "s": "L",
      "k": "R"
    },
    "stepHands": {
      "h": "RLRRLLRRLRLLRLRR"
    },
    "k": "X...x...X.......",
    "s": "....X.......X...",
    "h": "xxxxxxxxxxxxxxxx",
    "o": "................"
  },
  {
    "id": "drill-rolls",
    "name": "Drill: 16th Hat Roll Flow",
    "artist": "Finger Drumming Level 3",
    "genre": "Drills",
    "bpm": 135,
    "difficulty": "Advanced",
    "gear": "4x4 Drum Pads",
    "tip": "Trap finger drumming speed drill. Alternate index and middle fingers on the hi-hat pad for bursts of rapid 16th rolls.",
    "tags": [
      "drill",
      "advanced",
      "trap",
      "speed"
    ],
    "hands": {
      "h": "R index+mid",
      "s": "L",
      "k": "R thumb"
    },
    "k": "X......X..X..x..",
    "s": "........X.......",
    "h": "xxxxxxxxxxxxxxxx",
    "o": "................"
  },
  {
    "id": "drill-poly",
    "name": "Drill: Polyrhythm 3-Over-4",
    "artist": "Finger Drumming Level 3",
    "genre": "Drills",
    "bpm": 115,
    "difficulty": "Advanced",
    "gear": "4x4 Drum Pads",
    "tip": "Accenting every 3rd sixteenth step while maintaining a standard 4/4 downbeat kick and snare pulse. Trains brain independence.",
    "tags": [
      "drill",
      "advanced",
      "polyrhythm",
      "metric modulation"
    ],
    "hands": {
      "h": "R",
      "s": "L",
      "k": "R"
    },
    "k": "X...X...X...X...",
    "s": "....X.......X...",
    "h": "X..X..X..X..X..x",
    "o": "................"
  },
  {
    "id": "drill-master",
    "name": "Drill: Finger Independence Master",
    "artist": "Finger Drumming Level 3",
    "genre": "Drills",
    "bpm": 92,
    "difficulty": "Advanced",
    "gear": "4x4 Drum Pads",
    "tip": "The ultimate boss drill: combines ghost notes, syncopated offbeat kicks, open-hat chokes, and hand alternation simultaneously.",
    "tags": [
      "drill",
      "advanced",
      "master",
      "independence"
    ],
    "hands": {
      "h": "R",
      "s": "L",
      "k": "R",
      "o": "R"
    },
    "k": "X..x..x.X..x..x.",
    "s": "..g.X.g...g.X.g.",
    "h": "x.x.x.x.x.x.x...",
    "o": "..............x."
  }
];

// Extra percussion per pattern.
const PERC: Record<string, Partial<Lanes>> = {
  "billie": {
    "z": ".x.x.x.x.x.x.x.x"
  },
  "apache": {
    "b": "x..x..x.x..x.x..",
    "t": "..............xx"
  },
  "four": {
    "c": "....x.......x...",
    "z": ".x.x.x.x.x.x.x.x"
  },
  "trap": {
    "c": "........x......."
  },
  "songo": {
    "w": "x.x.x.x.x.x.x.x.",
    "b": "..xx...x..xx...x"
  },
  "afrobeat": {
    "w": "x.x.xx.x.x.xx.x.",
    "z": "xxxxxxxxxxxxxxxx"
  },
  "tambor": {
    "b": "x..x..x...x..x.."
  },
  "onedrop": {
    "s": "................",
    "r": "........X......."
  },
  "rock": {
    "y": "X..............."
  },
  "dnb": {
    "y": "X..............."
  },
  "levee": {
    "y": "X..............."
  },
  "bigbeat": {
    "y": "X..............."
  },
  "mardigras": {
    "w": "x.xx.xx.x.xx.xx."
  },
  "planetrock": {
    "c": "....X.......X..."
  },
  "clear": {
    "c": "....X.......X..."
  },
  "sexualhealing": {
    "c": "....x.......x..."
  },
  "pumpup": {
    "c": "....X.......X..."
  },
  "aroundtheworld": {
    "c": "....X.......X..."
  },
  "acid303": {
    "c": "....X.......X...",
    "r": "X...X...X...X..."
  },
  "deephouse": {
    "r": "..x.......x....."
  },
  "detroittechno": {
    "c": "....X.......X...",
    "y": "..x...x...x...x."
  },
  "minimaltechno": {
    "r": "....x.......x..."
  },
  "gfunk": {
    "c": "....X.......X..."
  },
  "timbaland": {
    "b": "..x...x...x...x."
  },
  "crunk": {
    "c": "........X......."
  },
  "speedgarage": {
    "c": "....X.......X..."
  },
  "sonclave": {
    "r": "X..x..X.....X..."
  },
  "rumbaclave": {
    "r": "X..x...X....X..."
  },
  "baion": {
    "z": "xxxxxxxxxxxxxxxx"
  },
  "cumbia": {
    "z": "xxxxxxxxxxxxxxxx",
    "b": "....x.......x..."
  },
  "steppers": {
    "r": "....X.......X..."
  },
  "rockers": {
    "r": "....X.......X..."
  },
  "ska": {
    "r": "....X.......X..."
  },
  "motown": {
    "z": "xxxxxxxxxxxxxxxx"
  },
  "teenspirit": {
    "y": "X..............."
  },
  "dbeat": {
    "y": "X..............."
  },
  "drill-four": {
    "c": "....X.......X..."
  },
  "scorpio": {
    "b": "x.xx.xx.x.xx.xx."
  },
  "giveitup": {
    "b": "..x...x...x...x."
  },
  "hihache": {
    "b": "x.xx.xx.x.xx.xx."
  },
  "lofigirl": {
    "r": "....X.......X..."
  },
  "sakuratrees": {
    "z": "xxxxxxxxxxxxxxxx"
  }
};

const norm = (o: Partial<Lanes>): Lanes => { INST.forEach(i => { if (!o[i.key]) o[i.key] = E; }); return o as Lanes; };
// Variation/fill bars inherit the main bar's extra percussion unless they define their own.
const inherit = (part: Partial<Lanes>, main: Partial<Lanes>): Lanes =>
  norm(Object.assign(part, Object.fromEntries(XK.map(k => [k, part[k] || main[k]]))));

// Swing % (50 = straight, 66 = triplet). Approximate, by ear; beats not listed are straight.
const SW: Record<string, number> = {
  amen: 54, funky: 58, levee: 60, impeach: 54, apache: 54, boombap: 58, onedrop: 62, twostep: 64,
  coldsweat: 54, think: 54, cissy: 56, afrobeat: 52, jungle: 52,
  purdie: 60, statikswing: 58, donuttime: 58, klipsh: 60, deephouse: 56, jackinhouse: 56, dilla: 60
};
// Recorded performances reduced to a 16-step grid.
const SIMP = ['amen', 'funky', 'levee', 'impeach', 'apache', 'think', 'coldsweat', 'cissy', 'afrobeat', 'songo', 'onedrop'];

/** Busy hat lines (12+ hits, no marked dynamics) get ghosted off-beats so the 16ths breathe. */
const ghostHats = (l: Partial<Lanes>) => {
  const h = l.h;
  if (h && (h.match(/x/g) || []).length >= 12 && !/[Xg]/.test(h)) l.h = h.split('').map((c, i) => c === 'x' && i % 2 ? 'g' : c).join('');
};

export const LIB: Pattern[] = RAW.map(r => {
  const p = Object.assign(r, PERC[r.id] || {}, { sw: SW[r.id] || 50, simp: SIMP.includes(r.id) });
  norm(p);
  ghostHats(p);
  if (p.var) { inherit(p.var, p); ghostHats(p.var); }
  if (p.fill) inherit(p.fill, p);
  return p as Pattern;
});

// Extra Main bars (bar 1 is the pattern itself). Rough transcriptions: lanes not listed repeat bar 1.
const BARS: Record<string, Partial<Lanes>[]> = {
  amen: [{}, { k: 'x.x.......x.....', s: '....x..x.x....x.' }, { k: '..xx......x.....', s: '.x..x..x.x....x.', y: '..........x.....' }],
  funky: [{ s: '....x..x.x.x.x.x' }, {}, { k: 'x.x.......x.x...', s: '....x..x.x..x.xx', o: '...............x' }],
  billie: [{}, {}, { s: '....x.......x.xx' }],
  levee: [{ k: 'xx.....x..x.....' }],
  impeach: [{ k: 'x......x..x..x..', o: '..............x.' }, {}, { s: '....x.......x.x.', h: 'x.x.x.x.x.x.....' }],
  think: [{ k: 'x......x..x.....' }, {}, { s: '....x..x.x..xxxx' }],
  boombap: [{ k: 'x.....x..x.x....' }],
  jungle: [{ k: 'x.x...x...x.....', s: '....x..x.x..x.x.' }, {}, { k: 'x.....x.x.x.....', s: '.x..x..xx...xxxx' }],
  dnb: [{ k: 'x.........x..x..' }, {}, { s: '....x..x.x..xxxx' }]
};
/** A changed lane keeps bar 1's accent or ghost where both bars hit the same step. */
const keepDynamics = (bar: string, main: string) => bar.split('').map((c, i) => c === '.' ? '.' : main[i] !== '.' ? main[i] : c).join('');
LIB.forEach(p => {
  const extra = BARS[p.id];
  if (extra) p.bars = extra.map(b => Object.fromEntries(INST.map(i => [i.key, b[i.key] ? keepDynamics(b[i.key]!, p[i.key]) : p[i.key]])) as Lanes);
});
/** How many bars a part has: Main can have several, Var and Fill are one bar each. */
export const barsOf = (p: Pattern, id: PartId) => id === 'MAIN' && p.bars ? p.bars.length + 1 : 1;

// Generated fills, styled per genre, for patterns without a known fill bar.
const FILL_STYLE: Record<string, string> = {
  Trap: 'trap', House: 'house', Techno: 'house', Electro: 'trap', Electronic: 'trap',
  Club: 'house', 'UK Garage': 'house', Dubstep: 'trap', Grime: 'trap',
  Rock: 'build', Funk: 'build', Breakbeat: 'build', Jungle: 'build', 'Drum & Bass': 'build',
  Krautrock: 'build', 'Jazz & Soul': 'build', Latin: 'build', Afrobeat: 'build',
  Reggae: 'build', Pop: 'build', Reggaeton: 'house', Drills: 'build',
  'Hip-Hop': 'build', 'Lo-Fi': 'build'
};
const setAt = (str: string, idx: number[], ch: string) => { const a = str.split(''); idx.forEach(i => { a[i] = ch; }); return a.join(''); };
const R8 = [8, 9, 10, 11, 12, 13, 14, 15], R4 = [12, 13, 14, 15];
function makeFillCore(p: Pattern): Pick<Lanes, 'k' | 's' | 'h' | 'o'> {
  const st = FILL_STYLE[p.genre] || 'roll';
  if (st === 'trap') return { k: setAt(p.k, [14], 'X'), s: setAt(p.s, [13, 15], 'X'), h: setAt(p.h, R8, 'x'), o: setAt(p.o, R8, '.') };
  if (st === 'house') return { k: p.k, s: setAt(p.s, [8, 10, 12, 13, 14, 15], 'X'), h: p.h, o: setAt(p.o, R4, '.') };
  if (st === 'build') return { k: setAt(p.k, [9, 11, 13, 14, 15], '.'), s: setAt(setAt(p.s, [8, 10], 'X'), R4, 'X'), h: setAt(p.h, R8, '.'), o: setAt(p.o, R8, '.') };
  return { k: setAt(p.k, [13, 14, 15], '.'), s: setAt(p.s, R4, 'X'), h: setAt(p.h, R4, '.'), o: setAt(p.o, R4, '.') };
}
const fillCache = new Map<string, Lanes>();
function makeFill(p: Pattern): Lanes {
  let f = fillCache.get(p.id);
  if (!f) {
    f = Object.assign(Object.fromEntries(XK.map(k => [k, p[k] || E])), { y: setAt(p.y || E, [0], p.y.includes('x') || p.y.includes('X') ? 'X' : '.') }, makeFillCore(p)) as Lanes;
    fillCache.set(p.id, f);
  }
  return f;
}

/** One bar of a part; `bar` counts from 0 and only matters for Main. */
export function partData(p: Pattern, id: PartId, bar = 0): Lanes {
  if (id === 'MAIN' && bar > 0 && p.bars?.[bar - 1]) return p.bars[bar - 1];
  if (id === 'VAR' && p.var) return p.var;
  if (id === 'FILL') return p.fill || makeFill(p);
  return p;
}
/**
 * The bars Chain loops through, as [part, bar]. Multi-bar beats play every Main bar, then Var (if any) and Fill;
 * one-bar beats loop main, main, var, fill.
 */
export const chainOf = (p: Pattern): [PartId, number][] => p.bars
  ? [...Array.from({ length: p.bars.length + 1 }, (_, i): [PartId, number] => ['MAIN', i]), ...(p.var ? [['VAR', 0] as [PartId, number]] : []), ['FILL', 0]]
  : [['MAIN', 0], ['MAIN', 0], [p.var ? 'VAR' : 'MAIN', 0], ['FILL', 0]];

export const DEVS: Device[] = [
  { id: 'SP-404MKII', maker: 'Roland', short: 'SP-404', fam: 'sp', map: { k: 'A1', s: 'A2', h: 'A3', o: 'A4' }, method: 'TR-REC · PADS = STEPS 1–16' },
  { id: 'TR-8S', maker: 'Roland', short: 'TR-8S', fam: 'tr', inst: ['BD', 'SD', 'LT', 'MT', 'HT', 'RS', 'HC', 'CH', 'OH', 'CC', 'RC'], map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, method: 'TR-REC · PICK INSTRUMENT · STEP KEYS 1–16' },
  { id: 'TR-6S', maker: 'Roland', short: 'TR-6S', fam: 'tr', inst: ['BD', 'SD', 'LT', 'HT', 'CH', 'OH'], map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, method: 'TR-REC · PICK INSTRUMENT · STEP KEYS 1–16' },
  { id: 'TR-08', maker: 'Roland', short: 'TR-08', fam: 'tr', inst: ['BD', 'SD', 'LT', 'MT', 'HT', 'RS', 'CP', 'CB', 'CY', 'OH', 'CH'], map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, method: 'STEP WRITE · PICK INSTRUMENT · STEP KEYS 1–16' },
  { id: 'PO-33', maker: 'Teenage Eng.', short: 'PO-33', fam: 'po', map: { k: '9', s: '10', h: '11', o: '12' }, method: 'WRITE MODE · ONE SOUND PER PASS' },
  { id: 'PO-32', maker: 'Teenage Eng.', short: 'PO-32', fam: 'po', map: { k: '1', s: '2', h: '7', o: '7+B' }, method: 'WRITE · OPEN HAT = HOLD STEP + TURN B', guess: true },
  { id: 'PO-12', maker: 'Teenage Eng.', short: 'PO-12', fam: 'po', map: { k: '1', s: '2', h: '9', o: '10' }, method: 'WRITE MODE · ONE SOUND PER PASS', guess: true },
  { id: 'CIRCUIT TRACKS', maker: 'Novation', short: 'CIRCUIT T', fam: 'ct', map: { k: 'D1', s: 'D2', h: 'D3', o: 'D4' }, slot: { k: 1, s: 3, h: 5, o: 7 }, tracks: ['SYN 1', 'SYN 2', 'MIDI 1', 'MIDI 2', 'DRUM 1', 'DRUM 2', 'DRUM 3', 'DRUM 4'], trackIdx: { k: 4, s: 5, h: 6, o: 7 }, dim: 4, method: 'DRUM 1–4 · TOP 16 PADS = STEPS · BOTTOM 16 = SAMPLE' },
  { id: 'CIRCUIT RHYTHM', maker: 'Novation', short: 'CIRCUIT R', fam: 'ct', map: { k: 'T1', s: 'T2', h: 'T3', o: 'T4' }, slot: { k: 1, s: 2, h: 3, o: 4 }, tracks: ['TRK 1', 'TRK 2', 'TRK 3', 'TRK 4', 'TRK 5', 'TRK 6', 'TRK 7', 'TRK 8'], trackIdx: { k: 0, s: 1, h: 2, o: 3 }, dim: 0, method: 'TRACKS 1–4 · TOP 16 PADS = STEPS', guess: true },
  { id: 'DIGITAKT II', maker: 'Elektron', short: 'DIGITAKT', fam: 'dt', map: { k: 'T1', s: 'T2', h: 'T3', o: 'T4' }, track: { k: 1, s: 2, h: 3, o: 4 }, method: 'GRID REC · [TRK] + TRIG PICKS TRACK · TRIGS 1–16', guess: true },
  { id: 'SYNTAKT', maker: 'Elektron', short: 'SYNTAKT', fam: 'dt', map: { k: 'T1', s: 'T2', h: 'T3', o: 'T4' }, track: { k: 1, s: 2, h: 3, o: 4 }, method: 'GRID REC · [TRK] + TRIG PICKS TRACK · TRIGS 1–16', guess: true },
  { id: 'ANALOG RYTM MKII', maker: 'Elektron', short: 'RYTM', fam: 'dt', map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, track: { k: 1, s: 2, h: 9, o: 10 }, method: 'GRID REC · [TRK] + PAD PICKS TRACK · TRIGS 1–16' },
  { id: 'MPC ONE+', maker: 'Akai', short: 'MPC ONE+', fam: 'sp', map: { k: 'A01', s: 'A02', h: 'A03', o: 'A04' }, method: 'STEP SEQ · PADS = STEPS 1–16', guess: true },
  { id: 'MPC LIVE II', maker: 'Akai', short: 'MPC LIVE', fam: 'sp', map: { k: 'A01', s: 'A02', h: 'A03', o: 'A04' }, method: 'STEP SEQ · PADS = STEPS 1–16', guess: true },
  { id: 'MASCHINE MK3', maker: 'Native Instr.', short: 'MASCHINE', fam: 'sp', map: { k: '1', s: '2', h: '3', o: '4' }, method: 'STEP MODE · PADS = STEPS 1–16', guess: true },
  { id: 'VOLCA BEATS', maker: 'Korg', short: 'VOLCA', fam: 'tr', inst: ['KICK', 'SNR', 'LTOM', 'HTOM', 'CHAT', 'OHAT', 'CLAP', 'CLAV', 'AGO', 'CRSH'], map: { k: 'KICK', s: 'SNR', h: 'CHAT', o: 'OHAT' }, rec: 'STEP', method: 'STEP MODE · PICK PART · TOUCH KEYS 1–16' },
  { id: 'DRUMLOGUE', maker: 'Korg', short: 'DRUMLOGUE', fam: 'tr', inst: ['BD', 'SD', 'LT', 'HT', 'CH', 'OH', 'RS', 'CP', 'MULTI'], map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, rec: 'STEP', method: 'STEP EDIT · PICK PART · STEP KEYS 1–16' },
  { id: 'DRUMBRUTE IMPACT', maker: 'Arturia', short: 'IMPACT', fam: 'tr', inst: ['KCK1', 'KCK2', 'SNR', 'TOMH', 'TOML', 'CYM', 'COW', 'CHH', 'OHH', 'FM'], map: { k: 'KCK1', s: 'SNR', h: 'CHH', o: 'OHH' }, rec: 'STEP', method: 'STEP MODE · PICK INSTRUMENT · STEP KEYS 1–16' },
  { id: 'TR-808', maker: 'Roland', short: 'TR-808', fam: 'tr', inst: ['BD', 'SD', 'LT', 'MT', 'HT', 'RS', 'CP', 'MA', 'CB', 'CY', 'OH', 'CH'], map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, method: 'STEP WRITE · INSTRUMENT SELECT · STEP KEYS 1–16' },
  { id: 'TR-909', maker: 'Roland', short: 'TR-909', fam: 'tr', inst: ['BD', 'SD', 'LT', 'MT', 'HT', 'RS', 'HC', 'CH', 'OH', 'CR', 'RD'], map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, method: 'PATTERN WRITE · PICK INSTRUMENT · STEP KEYS 1–16' },
  { id: 'RD-78', maker: 'Behringer', short: 'RD-78', fam: 'tr', inst: ['BD', 'SD', 'RS', 'CP', 'HH', 'CY', 'CB', 'CL', 'LB', 'HB', 'LC', 'GU', 'MA', 'TB', 'MB'], map: { k: 'BD', s: 'SD', h: 'HH', o: 'CY' }, method: 'WRITE · PICK INSTRUMENT · STEP KEYS 1–16', guess: true },
  { id: 'RD-8', maker: 'Behringer', short: 'RD-8', fam: 'tr', inst: ['BD', 'SD', 'LT', 'MT', 'HT', 'RS', 'CP', 'CB', 'CY', 'OH', 'CH'], map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, method: 'STEP WRITE · PICK INSTRUMENT · STEP KEYS 1–16' },
  { id: 'RD-9', maker: 'Behringer', short: 'RD-9', fam: 'tr', inst: ['BD', 'SD', 'LT', 'MT', 'HT', 'RS', 'CP', 'CH', 'OH', 'CR', 'RD'], map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, method: 'STEP WRITE · PICK INSTRUMENT · STEP KEYS 1–16' }
];

// Map the extra percussion onto each machine. Sounds a machine has no slot for stay unmapped.
const SYN: Record<string, string[]> = { c: ['CP', 'CLAP', 'HC'], r: ['RS', 'RIM'], t: ['LT', 'MT', 'HT', 'LTOM', 'HTOM', 'TOML', 'TOMH'], b: ['CONGA', 'BONGO', 'LB', 'HB', 'LC'], w: ['CB', 'COW', 'AGO'], z: ['SHKR', 'MA', 'TB'], y: ['CC', 'CY', 'CR', 'CRSH', 'CYM', 'RC', 'RD'] };
const PO_X: Record<string, Partial<Record<LaneKey, string>>> = { 'PO-33': { c: '13', r: '14', z: '15', y: '16' }, 'PO-32': { c: '3', r: '4', t: '5', w: '6', b: '8', z: '9', y: '10' }, 'PO-12': { t: '3', r: '5', c: '6', w: '7', z: '11', y: '12' } };
const RYTM = ['BD', 'SD', 'RS', 'CP', 'BT', 'LT', 'MT', 'HT', 'CH', 'OH', 'CY', 'CB'];
DEVS.forEach(dv => {
  const set = (k: LaneKey, v: string, n?: number) => { dv.map[k] = v; if (dv.track && n) dv.track[k] = n; };
  XK.forEach((k, j) => {
    if (dv.fam === 'sp') { const m = /^([A-Z]?)(0?)(\d+)$/.exec(dv.map.k!)!, n = j + 5; set(k, m[1] + (m[2] && n < 10 ? '0' : '') + n); }
    else if (dv.fam === 'tr') { const hit = SYN[k].find(x => dv.inst!.includes(x)); if (hit) set(k, hit); }
    else if (dv.fam === 'po') { const v = (PO_X[dv.id] || {})[k]; if (v) set(k, v); }
    else if (dv.id === 'CIRCUIT RHYTHM') { const n = ({ c: 5, r: 6, t: 7, y: 8 } as Partial<Record<LaneKey, number>>)[k]; if (n) { set(k, 'T' + n); dv.slot![k] = n; dv.trackIdx![k] = n - 1; } }
    else if (dv.id === 'ANALOG RYTM MKII') { const hit = SYN[k].find(x => RYTM.includes(x)); if (hit) set(k, hit, RYTM.indexOf(hit) + 1); }
    else if (dv.fam === 'dt') set(k, 'T' + (j + 5), j + 5);
  });
});

export const FAM: Record<Family, string> = { sp: 'PAD GRID', po: 'POCKET', ct: 'GRID 8×4', tr: 'STEP ROW', dt: 'TRIG ROW' };
