import { Point } from "./types";

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
  let size = windowHeight < windowWidth ? windowHeight - 10 : windowWidth;
  if (!fullScreen) {
    const whitespace = 30;
    size = windowHeight - whitespace < 0.75 * windowWidth
      ? windowHeight - whitespace - 15
      : 0.75 * windowWidth;
  }
  return Math.round(size);
}

export function findAffectedPoint(
  points: Record<string, Point>, 
  cursorPosition: Point
): string | null {
  for (const point in points) {
    if (withinRange(points[point], cursorPosition, 30)) return point;
  }
  return null;
}

export function withinRange(point: Point, cursorPosition: Point, range: number) {
  if (point[0] > cursorPosition[0] + range) return false;
  if (point[0] < cursorPosition[0] - range) return false;
  if (point[1] > cursorPosition[1] + range) return false;
  if (point[1] < cursorPosition[1] - range) return false;
  return true  
}

export function rescale(
  oldSize: number | null,
  newSize: number,
  points: Record<string, Point>
): Record<string, Point> {

  if (oldSize === null ) return points;

  let newPoints = {} as Record<string, Point>;
  const ratio = newSize / oldSize;
  for (const p in points) {
    const newPoint = [points[p][0] * ratio, points[p][1] * ratio] as Point;
    newPoints[p] = newPoint;
  }
  return newPoints;
}