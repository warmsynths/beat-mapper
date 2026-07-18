import type { DrumClass } from '../audio/classifier.ts';

export interface ClassifiedBeatEvent {
  class: DrumClass;
  confidence: number;
  controlId: string;
  timestamp: number;
}

/**
 * Dedicated, minimal event channel for the high-frequency "beat happened"
 * signal. Deliberately not routed through Lit context/reactive properties —
 * this needs to reach the UI in a single hop with no diffing overhead so pad
 * highlights feel instant.
 */
export class BeatBus extends EventTarget {
  emit(beat: ClassifiedBeatEvent): void {
    this.dispatchEvent(new CustomEvent<ClassifiedBeatEvent>('beat', { detail: beat }));
  }
}
