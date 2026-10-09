// Colour themes. Each sets CSS custom properties on :root, which inherit into every shadow tree.

export interface Theme { id: string; name: string; v: Record<string, string> }

export const THEMES: Theme[] = [
  { id: 'aubergine', name: 'Aubergine', v: { bg: '#2B1D30', bg2: '#221726', ink: '#150E18', fg: '#F7EADF', mute: '#C3ADBF', mute2: '#9C8598', acc: '#FFB38A', panel: '#33243A', line: '#4A3651', div: '#E3DCC4', kick: '#E0573A', snare: '#3E63C4', snareL: '#7FA0F0', open: '#D29A12' } },
  { id: 'midnight', name: 'Midnight', v: { bg: '#17191E', bg2: '#111317', ink: '#0A0B0E', fg: '#F2EFE8', mute: '#9EA3AE', mute2: '#7D828C', acc: '#7CE0C3', panel: '#1D2027', line: '#30343D', div: '#E3DCC4', kick: '#E0573A', snare: '#3E63C4', snareL: '#7FA0F0', open: '#D29A12' } },
  { id: 'cobalt', name: 'Cobalt', v: { bg: '#1E3A8C', bg2: '#18307A', ink: '#0E1C52', fg: '#FFF6DC', mute: '#B5C4F2', mute2: '#8EA2DE', acc: '#FFD84D', panel: '#23429C', line: '#3A58B0', div: '#E3DCC4', kick: '#E0573A', snare: '#0E1C52', snareL: '#FFF6DC', open: '#D29A12' } },
  { id: 'moss', name: 'Moss', v: { bg: '#33472A', bg2: '#283A21', ink: '#142010', fg: '#F3EDD8', mute: '#B4C39A', mute2: '#9DAE84', acc: '#D6E26B', panel: '#2A3C22', line: '#3A4E2E', div: '#E3DCC4', kick: '#E0573A', snare: '#3E63C4', snareL: '#8FA9EE', open: '#D29A12' } },
  { id: 'deepsea', name: 'Deep Sea', v: { bg: '#0F3A3F', bg2: '#0B2F33', ink: '#06191C', fg: '#EEF4EC', mute: '#9CC2BE', mute2: '#76A19C', acc: '#FF8A6B', panel: '#14464C', line: '#24585E', div: '#DCE6E0', kick: '#FF6B4A', snare: '#2E6FD8', snareL: '#86AEF5', open: '#E3B23C' } },
  { id: 'espresso', name: 'Espresso', v: { bg: '#2A1F18', bg2: '#211812', ink: '#130D09', fg: '#F6ECDD', mute: '#C7B29C', mute2: '#9C8670', acc: '#F2C14E', panel: '#34271E', line: '#4A392C', div: '#E8DCC8', kick: '#E0573A', snare: '#4F79D9', snareL: '#93AEF0', open: '#C9A0DC' } }
];

const KEY = 'beatmapper.theme';

export function storedTheme(): string {
  try { return localStorage.getItem(KEY) || THEMES[0].id; } catch { return THEMES[0].id; }
}

export function applyTheme(id: string, persist = false): void {
  const t = THEMES.find(x => x.id === id) || THEMES[0], st = document.documentElement.style;
  Object.entries(t.v).forEach(([k, v]) => st.setProperty('--' + k, v));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t.v.bg);
  if (persist) { try { localStorage.setItem(KEY, t.id); } catch { /* storage unavailable */ } }
}
