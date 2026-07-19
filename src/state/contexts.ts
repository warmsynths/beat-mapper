import { createContext } from '@lit/context';
import type { DeviceConfig } from '../devices/device-config.ts';
import type { BeatBus } from './beat-bus.ts';
import type { ClassifierThresholds } from '../audio/classifier.ts';
import type { EngineState } from '../audio/types.ts';
import type { AudioEngine } from '../audio/audio-engine.ts';

// Structural, slow-changing state goes through context so components
// reactively re-render when it changes. The high-frequency beat signal does
// NOT go through context — see beat-bus.ts.
export const deviceConfigContext = createContext<DeviceConfig>('device-config');
export const beatBusContext = createContext<BeatBus>('beat-bus');
export const audioEngineContext = createContext<AudioEngine>('audio-engine');
export const classifierThresholdsContext = createContext<ClassifierThresholds>('classifier-thresholds');
export const engineStateContext = createContext<EngineState>('engine-state');
