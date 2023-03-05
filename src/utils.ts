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
  const whitespace = 30;
  let size = windowHeight < windowWidth ? windowHeight : windowWidth;
  if (!fullScreen) {
    size = windowHeight - whitespace < 0.75 * windowWidth
      ? windowHeight - whitespace - 15
      : 0.75 * windowWidth;
  }
  return Math.round(size);
}

export function getIterationsNumber(fullScreen: boolean | undefined): number {
  const size = getSize(fullScreen);
  return Math.round((Math.log(size) / Math.log(2)) - 2);
}