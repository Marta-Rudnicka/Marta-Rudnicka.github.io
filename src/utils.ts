export function getSize(fullScreen: boolean | undefined): number {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const whitespace = 30;
  let size = windowHeight < windowWidth ? windowHeight : windowWidth;
  if (fullScreen) {
    size = windowHeight - whitespace < 0.75 * windowWidth
      ? windowHeight - whitespace - 15
      : 0.75 * windowWidth;
  }
  return size;
}