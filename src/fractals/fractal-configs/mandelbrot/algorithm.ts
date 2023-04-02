import { Complex, complex, multiply, add } from "mathjs";
import { PixelValue, Point } from "../../../types";
import { getDistance } from "../../utils";
import { ComplexPlaneMap } from "../../default-view/classes";

export function xSqrPlusY(prevValue: Complex, c: Complex): Complex { 
  const squared = multiply(prevValue, prevValue);
  return add(squared, c) as Complex;
};

export function escapeCriterion(val: Complex, c: Complex): boolean {
  // treating complex numbers as ordinary coordinates on the plane
  // false if lies outside the circle with r=2 from the value
  const valPoint: Point = [val.re, val.im];
  const cPoint: Point = [c.re, c.im];
  return getDistance(valPoint, cPoint) > 2;
}

export function orbitIsBounded(c: Complex, iterations: number): PixelValue {
  const seed = complex(0, 0);
  let val = xSqrPlusY(seed, c);
  for(let i = 0; i <= iterations; i++ ) {
    val = xSqrPlusY(val, c)
    if (escapeCriterion(val, c)) return [255, 255, 255, 255];
  }
  return [0, 0, 0, 255] ;
}

export class MandelbrotPixelMap extends ComplexPlaneMap {

  cacheNumber(num: Complex, val: PixelValue): void {
    if (this.cache[num.re] && this.cache[num.re][num.im] !== undefined) {
      return 
    }
      this.cache[num.re] = this.cache[num.re] || {};
      this.cache[num.re][num.im] = val;
  }

  processNumber(x: string, y: string, num: Complex): void {
    if (this.cache[num.re] && this.cache[num.re][num.im]) {
      this.map[x][y] = this.cache[num.re][num.im];
      return;
    }
    const val: PixelValue = orbitIsBounded(num, 50);
    this.cacheNumber(num, val);
    this.map[x][y] = val;
  }
}
