import { Complex, complex, multiply, add } from "mathjs";
import { ComplexPlane, NumberCache, PixelMap, PixelValue, Point, TempPixelMap } from "../../../types";
import { getDistance, getInitialPixelMap, mapPixelsToComplexPlane } from "../../utils";

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

export function orbitIsBounded(c: Complex, iterations: number): boolean {
  const seed = complex(0, 0);
  let val = xSqrPlusY(seed, c);
  let i = 1;
  while(i <= iterations ) {
    val = xSqrPlusY(val, c)
    if (escapeCriterion(val, c)) return false;
    i++;
  }
  return true;
}

export class MandelbrotPixelMap {
    canvasSize: number;
    startValue: Complex;
    range: number;
    map: PixelMap | TempPixelMap;
    complexPlane: ComplexPlane;
    cache: NumberCache;
    numberList: Complex[];

  constructor(
    canvasSize: number,
    startValue: Complex,
    range: number,
    cache?: NumberCache,
  ) {
    this.canvasSize = canvasSize;
    this.startValue = startValue;
    this.range = range;
    this.map = getInitialPixelMap(canvasSize);
    const { complexPlane, mappedNumbers } = mapPixelsToComplexPlane(
      this.map, 
      canvasSize,
      startValue,
      range
    );
    this.cache = cache ?? {};
    this.numberList = mappedNumbers ;
    this.complexPlane = complexPlane;
  }

  cacheNumbers(): void {
    const lastCAche = this.cache;
    this.numberList.forEach(num => {
      if (! (lastCAche[num.re] && this.cache[num.re][num.im] !== undefined)) {
        const val = orbitIsBounded(num, 100);
        this.cache[num.re] = this.cache[num.re] || {};
        this.cache[num.re][num.im] = val;
      }
    });
  }

  printCache(): void {
    let count = 0;
    Object.keys(this.cache).forEach(keyX => {
      Object.keys(this.cache[keyX]).forEach(keyY => {
        const val = this.cache[keyX][keyY]
        if (val) console.log([keyX, keyY], val)
        count ++;
      });
    });
    console.log('cache count: ', count)
  }

  printMap(): void {
    console.log('printing map');
    let count = 0;
    Object.keys(this.map).forEach(keyX => {
      Object.keys(this.map[keyX]).forEach(keyY => {
        const val = this.map[keyX][keyY]
        console.log([keyX, keyY], val)
        count ++;
      });
    });
    console.log('count: ', count)
  }

  printComplexPlane(): void {
    console.log('printing complex plane')
    Object.keys(this.complexPlane).forEach(keyX => {
      Object.keys(this.complexPlane[keyX]).forEach(keyY => {
        const num = this.complexPlane[keyX][keyY]
        console.log([keyX, keyY], [num.re, num.im])
      });
    });
  }

  addValuesToPixelMap(): void {
    for (const keyX in this.map) {
      for (const keyY in this.map[keyX]) {
        const number = this.complexPlane[keyX][keyY];
        const value: PixelValue = this.cache[number.re][number.im] 
        ? [0, 0, 0, 255]
        : [255, 255, 255, 255];
        this.map[keyX][keyY] = value;
      }
    }
  }
}
