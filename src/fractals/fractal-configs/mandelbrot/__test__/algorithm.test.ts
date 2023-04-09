import { xSqrPlusY } from "../algorithm";
// import { processPixel } from "../algorithm";

describe('xSqrPlusY', () => {
  it('should calculate result for real numbers', () => {
    const x = [2, 0];
    const y = [3, 0];
    const expected = [7, 0];
    expect(xSqrPlusY(x, y)).toStrictEqual(expected);
  });
  it('should calculate result for imaginary numbers', () => {
    const x = [0, 2];
    const y = [0, 3];
    const expected = [-4, 3];
    expect(xSqrPlusY(x, y)).toStrictEqual(expected);
  });
  it('should calculate result for complex numbers', () => {
    const x = [2, 1];
    const y = [3, 2];
    const expected = [6, 6];
    expect(xSqrPlusY(x, y)).toStrictEqual(expected);
  });
});

export {};