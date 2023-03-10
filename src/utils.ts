export function getSize(fullScreen: boolean | undefined): number {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  return getCanvasSize(windowHeight, windowWidth, fullScreen);
}

export function getCanvasSize(
  windowHeight: number,
  windowWidth: number,
  fullScreen?: boolean,
): number {
  let size = windowHeight < windowWidth ? windowHeight : windowWidth;
  if (!fullScreen) {
    const whitespace = 30;
    size = windowHeight - whitespace < 0.75 * windowWidth
      ? windowHeight - whitespace - 15
      : 0.75 * windowWidth;
  }
  return Math.round(size);
}