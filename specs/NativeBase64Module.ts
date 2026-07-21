import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  readonly encode: (input: string) => string;
  readonly decode: (input: string) => string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeBase64Module');
