import { Point, Triangle } from "../types";
import { findAffectedPoint, getCanvasSize, withinRange } from "../utils"

describe('getSize', () => {
  it('should return width if the width is smaller than height', () => {
    const height = 1024;
    const width = 870;
    expect(getCanvasSize(height, width, true)).toBe(870);
  });

  it('should return height if the height is smaller than width', () => {
    const height = 1024;
    const width = 1056;
    expect(getCanvasSize(height, width, true)).toBe(1024);
  });

  it('should return 623', () => {
    const height = 1024;
    const width = 870;
    expect(getCanvasSize(height, width, false)).toBe(653);
  });

  it('should return 738', () => {
    const height = 1024;
    const width = 2048;
    expect(getCanvasSize(height, width, false)).toBe(979);
  });
});

describe('withinRange', () => {
  it('should return true if cursor coordinates are slightly higher', () => {
    const p = [70, 120] as Point;
    const cursor = [74, 122] as Point;
    expect(withinRange(p, cursor, 10)).toBe(true);
  });

  it('should return true if cursor coordinates are slightly lower', () => {
    const p = [70, 120] as Point;
    const cursor = [65, 114] as Point;
    expect(withinRange(p, cursor, 10)).toBe(true);
  });

  it('should return false if one coordinate is too high', () => {
    const p = [70, 120] as Point;
    const cursor = [90, 114] as Point;
    expect(withinRange(p, cursor, 10)).toBe(false);
  });

  it('should return false if one coordinate is too low', () => {
    const p = [70, 120] as Point;
    const cursor = [65, 98] as Point;
    expect(withinRange(p, cursor, 10)).toBe(false);
  });
});

describe('findAffectedPoint', () => {
  const points: Triangle = {
    a: [ 334, 64 ],
    b: [33, 656],
    c: [ 656, 652 ]
  };

  it('should return a', () => {
    const cursor = [330, 72] as Point;
    expect(findAffectedPoint(points, cursor)).toBe('a');
  });

  it('should return b', () => {
    const cursor = [29,648] as Point;
    expect(findAffectedPoint(points, cursor)).toBe('b');
  });

  it('should return c', () => {
    const cursor = [650, 655] as Point;
    expect(findAffectedPoint(points, cursor)).toBe('c');
  });

  it('should return null', () => {
    const cursor = [100,300] as Point;
    expect(findAffectedPoint(points, cursor)).toBe(null);
  });

});