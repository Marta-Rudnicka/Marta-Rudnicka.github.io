import { ACTIVE_AREA } from "../consts";
import { Point, QuadCurve, Rectangle, TempPixelMap } from "../types";

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
    if (withinRange(points[point], cursorPosition, ACTIVE_AREA)) return point;
  }
  return null;
}

export function withinRange(point: Point, cursorPosition: Point, range: number) {
  if (point[0] > cursorPosition[0] + range) return false;
  if (point[0] < cursorPosition[0] - range) return false;
  if (point[1] > cursorPosition[1] + range) return false;
  if (point[1] < cursorPosition[1] - range) return false;
  return true;
}

export function rescale(
  oldSize: number | null,
  newSize: number,
  points: Record<string, Point>
): Record<string, Point> {

  if (oldSize === null) return points;

  let newPoints = {} as Record<string, Point>;
  const ratio = newSize / oldSize;
  for (const p in points) {
    const newPoint = [points[p][0] * ratio, points[p][1] * ratio] as Point;
    newPoints[p] = newPoint;
  }
  return newPoints;
}

export function calculateActiveArea(point: Point, extent: number): Rectangle {
  return {
    a: [point[0] - extent, point[1] + extent],
    b: [point[0] + extent, point[1] + extent],
    c: [point[0] + extent, point[1] - extent],
    d: [point[0] - extent, point[1] - extent],
  }
}

export function highlightActiveArea(
  point: Point,
  ctx: CanvasRenderingContext2D,
  colour?: string
): void {
  const surroundingSquare = calculateActiveArea(point, ACTIVE_AREA)
  ctx.beginPath();
  const { a, b, c, d } = surroundingSquare;
  ctx.moveTo(...a);
  ctx.lineTo(...b);
  ctx.lineTo(...c);
  ctx.lineTo(...d);
  ctx.lineTo(...a);
  ctx.lineWidth = 1;
  ctx.strokeStyle = colour || '#5d1a5d';
  ctx.stroke();
}

export function getInitialPixelMap(canvasSize: number): TempPixelMap {
  const pixelMap: TempPixelMap = {};
  let x = 1;
  while (x <= canvasSize) {
    pixelMap[x] = {}
    let y = 1;
    while (y <= canvasSize) {
      pixelMap[x][y] = null;
      y++;
    }
    x++;
  }
  return pixelMap;
}

export function findLineEnd(start: Point, angle: number, length: number): Point {
  const width = Math.floor(Math.sin(angle) * length);
  const height = Math.floor(Math.cos(angle) * length);
  return [start[0] - width, start[1] - height];
}

export function getQuadraticCurveParams(
  start: Point,
  angle: number,
  length: number,
  heightRatio: number,
  distanceRatio: number,
  side: 'left' | 'right',
): QuadCurve {

  const rightAngle = side === 'left' ? angle + Math.PI / 2 : angle - Math.PI / 2;
  const [x, y] = findLineEnd(start, angle, length);
  const midPoint: Point = findLineEnd(start, angle, length * heightRatio);
  const [cpX, cpY] = findLineEnd(midPoint, angle + rightAngle, length * distanceRatio)
  return [cpX, cpY, x, y];
}

