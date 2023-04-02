import { complex} from "mathjs";
import { MandelbrotPixelMap, escapeCriterion, orbitIsBounded, xSqrPlusY } from "../algorithm";
import { NumberCache } from "../../../../types";

describe('xSqrPlusY', () => {
  it('should calculate result for real numbers', () => {
    const x = complex(2, 0);
    const y = complex(3, 0);
    const expected = complex(7, 0);
    expect(xSqrPlusY(x, y)).toStrictEqual(expected);
  });
  it('should calculate result for imaginary numbers', () => {
    const x = complex(0, 2);
    const y = complex(0, 3);
    const expected = complex(-4, 3);
    expect(xSqrPlusY(x, y)).toStrictEqual(expected);
  });
  it('should calculate result for complex numbers', () => {
    const x = complex(2, 1);
    const y = complex(3, 2);
    const expected = complex(6, 6);
    expect(xSqrPlusY(x, y)).toStrictEqual(expected);
  });
});

describe('escapeCriterion', () => {
  it('should return true', () => {
    const x = complex(1, 3);
    const y = complex(-10, -7);
    expect(escapeCriterion(x, y)).toBe(true);
  });
  it('should return false', () => {
    const x = complex(1, -1);
    const y = complex(0, -0.07);
    expect(escapeCriterion(x, y)).toBe(false);
  })
})

describe.only('orbitTendsToInfinity', () => {
  //random values from the Mandelbrot set
  it('val1', () => {
    const num = complex(-0.25, 0.1);
    expect(orbitIsBounded(num, 100)).toBe(true);
  });
  it('val2', () => {
    const num = complex(-1.00000897, 0.500012546546);
    expect(orbitIsBounded(num, 100)).toBe(false);
  });
  it('val3', () => {
    const num = complex(0, 0);
    expect(orbitIsBounded(num, 100)).toBe(true);
  });
  it('val4', () => {
    const num = complex(-1, -1);
    expect(orbitIsBounded(num, 100)).toBe(false);
  });
});

describe('cacheNumbers', () => {
  const obj = new MandelbrotPixelMap(2, complex(0,0), 2)
  const expectedCache: NumberCache = {
    '-0.25': { 0.1: false },
    '-1': { 0.5: true },
  };
  it('should create the first cache', () => {
    obj.numberList = [
      complex(-0.25, 0.1),
      complex(-1, 0.5),
    ];

    obj.cacheNumbers();
    expect(obj.cache).toStrictEqual(expectedCache);
  });

  it('should not add anything to the cache', () => {
    const numbers = [
      complex(-0.25, 0.1),
      complex(-1, 0.5),
    ];
    obj.numberList.push(...numbers);
    expect(obj.cache).toStrictEqual(expectedCache);
  });
});


export {};