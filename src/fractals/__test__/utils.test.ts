import { Point, Rectangle, Triangle } from "../../types";
import { roundInput } from "../Components/Controls/SliderControl";
import { calculateActiveArea, findAffectedPoint, getCanvasSize, rescale, withinRange } from "../utils"

describe('getSize', () => {
  it('should return width if the width is smaller than height', () => {
    const height = 1024;
    const width = 870;
    expect(getCanvasSize(height, width, true)).toBe(870);
  });

  it('should return height - 10 if the height is smaller than width', () => {
    const height = 1024;
    const width = 1056;
    expect(getCanvasSize(height, width, true)).toBe(1014);
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
    a: [334, 64],
    b: [33, 656],
    c: [656, 652]
  };

  it('should return a', () => {
    const cursor = [330, 72] as Point;
    expect(findAffectedPoint(points, cursor)).toBe('a');
  });

  it('should return b', () => {
    const cursor = [29, 648] as Point;
    expect(findAffectedPoint(points, cursor)).toBe('b');
  });

  it('should return c', () => {
    const cursor = [650, 655] as Point;
    expect(findAffectedPoint(points, cursor)).toBe('c');
  });

  it('should return null', () => {
    const cursor = [100, 300] as Point;
    expect(findAffectedPoint(points, cursor)).toBe(null);
  });
});

describe('rescale', () => {
  const points = {
    a: [100, 200] as Point,
    b: [10, 80] as Point,
    c: [400, 800] as Point,
    d: [0, 100] as Point
  };

  it('should not affect the shape if previous size is null shape', () => {
    const output = rescale(null, 1000, points);
    expect(JSON.stringify(output)).toBe(JSON.stringify(points));
  });

  it('should correctly shrink a shape', () => {
    const expected = {
      a: [50, 100],
      b: [5, 40],
      c: [200, 400],
      d: [0, 50]
    };
    const output = rescale(2000, 1000, points);
    expect(JSON.stringify(output)).toBe(JSON.stringify(expected));
  });

  it('should correctly expand a shape', () => {
    const expected = {
      a: [300, 600],
      b: [30, 240],
      c: [1200, 2400],
      d: [0, 300]
    };
    const output = rescale(500, 1500, points);
    expect(JSON.stringify(output)).toBe(JSON.stringify(expected));
  });
});;

describe('calculateActiveArea', () => {
  it('should calculate a square around a point', () => {
    const expected = {
      a: [70, 230],
      b: [130, 230],
      c: [130, 170],
      d: [70, 170]
    } as Rectangle;
    const output = calculateActiveArea([100, 200], 30);
    expect(JSON.stringify(output)).toBe(JSON.stringify(expected));
  })
});

describe('roundInput', () => {
  it('should round input according to step size', () => {
    expect(roundInput(3.89798, 0.1)).toBe(3.9);
    expect(roundInput(3.89798, 1)).toBe(4);
    expect(roundInput(3.49798, 0.5)).toBe(3.5);
  })
});
