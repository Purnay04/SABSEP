export function isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
  return obj === null || obj === undefined;
}