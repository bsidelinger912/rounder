/**
 * @file utils.ts
 * @description some reused pure functions
 */

export function stopProp(e: React.SyntheticEvent | Event) {
  e.stopPropagation();
}