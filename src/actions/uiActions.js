export const SCREEN_RESIZE = "SCREEN_RESIZE";
export function screenResize(width, height) {
  return { type: SCREEN_RESIZE, width, height };
}
