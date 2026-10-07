import type { Feel, Genre, LibraryPattern } from './pattern.ts';

// Seed library. Each lane is a 16th-note step string per bar (x = hit,
// - = rest, whitespace between bars is ignored). These are generic,
// genre-defining grooves written by hand — a starting point to browse and
// extend, not an exhaustive catalogue. Add more by appending to this list;
// test/library.test.ts checks every entry is well-formed.

function p(
  id: string,
  name: string,
  genre: Genre,
  feel: Feel,
  bpm: number,
  bpmRange: [number, number],
  tags: string[],
  kick: string,
  snare: string,
  hat: string
): LibraryPattern {
  return { id, name, genre, feel, bpm, bpmRange, tags, lanes: { kick, snare, hat } };
}

export const PATTERNS: LibraryPattern[] = [
  // house
  p('house-four-floor', 'Four on the floor', 'house', 'straight', 124, [118, 130], ['classic', 'club', 'offbeat hats'],
    'x---x---x---x---', '----x-------x---', '--x---x---x---x-'),
  p('house-funky', 'Funky house', 'house', 'straight', 124, [120, 128], ['groovy', '16th hats'],
    'x---x---x---x---', '----x-------x---', 'x-xxx-xxx-xxx-xx'),
  p('house-deep', 'Deep house', 'house', 'swung', 120, [115, 124], ['deep', 'laid back'],
    'x---x---x---x---', '----x-------x---', 'x-x-x-x-x-x-x-xx'),
  p('house-jack', 'Jackin\' house', 'house', 'straight', 126, [122, 130], ['chicago', 'driving'],
    'x---x---x---x---', '----x--x----x---', '--x---x---x---xx'),

  // techno
  p('techno-classic', 'Classic techno', 'techno', 'straight', 132, [126, 140], ['classic', 'warehouse'],
    'x---x---x---x---', '----x-------x---', '--x---x---x---xx'),
  p('techno-driving', 'Driving techno', 'techno', 'straight', 135, [130, 145], ['driving', 'peak time'],
    'x---x---x---x---', '------------x---', 'xxxxxxxxxxxxxxxx'),
  p('techno-minimal', 'Minimal techno', 'techno', 'straight', 126, [120, 132], ['minimal', 'sparse'],
    'x---x---x---x---', '------------x---', '--x-------x---x-'),
  p('techno-rolling', 'Rolling hats', 'techno', 'straight', 134, [128, 142], ['rolling', 'hypnotic'],
    'x---x---x---x---', '----x-------x---', '-xx--xx--xx--xx-'),

  // electro
  p('electro-tresillo', 'Electro tresillo', 'electro', 'broken', 128, [120, 136], ['miami bass', 'tresillo'],
    'x--x--x-x--x--x-', '----x-------x---', 'x-x-x-x-x-x-x-x-'),

  // hip-hop
  p('hiphop-boom-bap', 'Boom bap', 'hip-hop', 'straight', 90, [84, 96], ['classic', '90s'],
    'x-----x---x-----', '----x-------x---', 'x-x-x-x-x-x-x-x-'),
  p('hiphop-lofi-swing', 'Lo-fi swing', 'hip-hop', 'swung', 80, [70, 88], ['lo-fi', 'dusty', 'laid back'],
    'x--x-----x-x----', '----x-------x---', 'x-x-x-x-x-x-x-x-'),
  p('hiphop-two-bar', 'Boom bap, two-bar', 'hip-hop', 'straight', 92, [86, 98], ['classic', 'two bars', 'variation'],
    'x-----x---x----- x-----x-----x---', '----x-------x--- ----x-------x---', 'x-x-x-x-x-x-x-x- x-x-x-x-x-x-x-xx'),
  p('hiphop-west-coast', 'Bounce', 'hip-hop', 'straight', 96, [88, 102], ['west coast', 'bounce'],
    'x-----x-x-------', '----x-------x---', '--x---x---x---x-'),

  // trap
  p('trap-half-time', 'Trap half-time', 'trap', 'half-time', 140, [130, 160], ['classic', 'hat rolls'],
    'x-----x---x-----', '--------x-------', 'x-x-x-x-x-x-x-xx'),
  p('trap-bounce', '808 bounce', 'trap', 'half-time', 144, [130, 160], ['808', 'bouncy'],
    'x--x------x--x--', '--------x-------', 'x-x-x-x-x-xxx-x-'),
  p('trap-sparse', 'Sparse trap', 'trap', 'half-time', 138, [128, 150], ['minimal', 'dark'],
    'x---------x-----', '--------x-------', 'x-x-x-x-x-x-x-x-'),
  p('trap-hat-roll', 'Hat roll trap', 'trap', 'half-time', 150, [136, 165], ['hat rolls', 'busy'],
    'x-----x---x-----', '--------x-------', 'xxxxxxxxxxxxxxxx'),

  // drum & bass
  p('dnb-two-step', 'Two-step', 'drum & bass', 'straight', 172, [164, 178], ['classic', 'two-step'],
    'x---------x-----', '----x-------x---', 'x-x-x-x-x-x-x-x-'),
  p('dnb-rolling', 'Rolling DnB', 'drum & bass', 'straight', 174, [166, 178], ['rolling', 'driving'],
    'x---------xx----', '----x-------x---', 'x-xxx-xxx-xxx-xx'),
  p('dnb-amen', 'Amen-style break', 'drum & bass', 'broken', 170, [160, 178], ['jungle', 'break', 'chopped'],
    'x-x-------xx----', '----x--x-x--x---', 'x-x-x-x-x-x-x-x-'),

  // dubstep
  p('dubstep-half-time', 'Dubstep half-time', 'dubstep', 'half-time', 140, [136, 146], ['half-time', 'heavy'],
    'x---------x-----', '--------x-------', '--x-------x-----'),

  // garage
  p('garage-two-step', 'UK garage two-step', 'garage', 'swung', 132, [128, 136], ['2-step', 'skippy'],
    'x-----x-----x---', '----x-------x---', 'x-x-x-x-x-x-x-x-'),

  // breakbeat
  p('breaks-classic', 'Classic break', 'breakbeat', 'broken', 130, [120, 140], ['b-boy', 'chopped'],
    'x-x-------x--x--', '----x--x----x---', 'x-x-x-x-x-x-x-x-'),
  p('breaks-big-beat', 'Big beat', 'breakbeat', 'broken', 125, [118, 134], ['big beat', 'heavy'],
    'x-x-----x--x----', '----x-------x---', '--x---x---x---x-'),

  // funk
  p('funk-sixteenth', '16th funk', 'funk', 'broken', 104, [94, 112], ['syncopated', 'ghost notes'],
    'x--x---x--x-----', '----x--x-x--x---', 'x-xxx-xxx-xxx-xx'),
  p('funk-pocket', 'Pocket groove', 'funk', 'swung', 98, [88, 106], ['pocket', 'laid back'],
    'x-----x-x-------', '----x-------x---', 'x-x-x-x-x-x-x-x-'),

  // disco
  p('disco-classic', 'Disco', 'disco', 'straight', 118, [110, 126], ['classic', 'open hats'],
    'x---x---x---x---', '----x-------x---', 'xxxxxxxxxxxxxxxx'),

  // rock
  p('rock-basic', 'Basic rock', 'rock', 'straight', 110, [90, 140], ['classic', 'eighth hats'],
    'x-------x-------', '----x-------x---', 'x-x-x-x-x-x-x-x-'),
  p('rock-push', 'Rock with kick push', 'rock', 'straight', 112, [90, 140], ['driving', 'pushed kick'],
    'x-------x-x-----', '----x-------x---', 'x-x-x-x-x-x-x-x-'),
  p('rock-half-time', 'Half-time rock', 'rock', 'half-time', 80, [66, 96], ['heavy', 'slow'],
    'x-------------x-', '--------x-------', 'x-x-x-x-x-x-x-x-'),
  p('rock-driving', 'Driving rock', 'rock', 'straight', 135, [120, 160], ['driving', 'fast', 'punk'],
    'x---x---x---x---', '----x-------x---', 'x-x-x-x-x-x-x-x-'),

  // reggae
  p('reggae-one-drop', 'One drop', 'reggae', 'half-time', 76, [66, 84], ['classic', 'one drop'],
    '--------x-------', '--------x-------', '--x---x---x---x-'),
  p('reggae-steppers', 'Steppers', 'reggae', 'straight', 140, [130, 150], ['steppers', 'dub'],
    'x---x---x---x---', '--------x-------', '--x---x---x---x-'),

  // reggaeton
  p('reggaeton-dembow', 'Dembow', 'reggaeton', 'broken', 96, [88, 102], ['dembow', 'latin'],
    'x---x---x---x---', '---x--x----x--x-', 'x-x-x-x-x-x-x-x-'),
];
