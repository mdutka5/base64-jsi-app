import Base64TurboModule from '../specs/NativeBase64Module';

export function encode(input: string): string {
  return Base64TurboModule.encode(input);
}

export function decode(input: string): string {
  return Base64TurboModule.decode(input);
}
