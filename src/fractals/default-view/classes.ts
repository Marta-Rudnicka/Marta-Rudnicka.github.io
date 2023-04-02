import { Complex, complex } from "mathjs";
import { ComplexPlane, NumberCache, PixelMap, TempPixelMap } from "../../types";
import { getInitialPixelMap } from "../utils";

export class ComplexPlaneMap {
  canvasSize: number;
  startValue: Complex;
  range: number;
  map: PixelMap | TempPixelMap;
  complexPlane: ComplexPlane;
  numberList: Complex[];
  cache: NumberCache;

  constructor(
    canvasSize: number,
    startValue: Complex,
    range: number,
  ) {
    this.canvasSize = canvasSize;
    this.startValue = startValue;
    this.range = range;
    this.complexPlane = {};
    this.numberList = [];
    this.cache = {}
    this.map = getInitialPixelMap(canvasSize);
    this.mapPixelsToComplexPlane();
  }

  print2DArray(
    property: Record<string, Record<string, unknown>>,
    propertyName: string)
    : void {
    let count = 0;
    Object.keys(property).forEach(keyX => {
      Object.keys(property[keyX]).forEach(keyY => {
        const val = property[keyX][keyY]
        if (val) console.log([keyX, keyY], val)
        count++;
      });
    });
    console.log(`${propertyName} count: ${count}`)
  }

  printComplexPlane(): void {
    this.print2DArray(this.complexPlane, 'complexPlane');
  }

  printMap(): void {
    this.print2DArray(this.map, 'map');
  }

  printCache(): void {
    this.print2DArray(this.cache, 'cache')
  }
  
  processNumber(x: string, y: string, val: Complex): void {
    throw new Error('processNumber not implemented yet')
  }

  getComplexValue(
    keyX: string,
    keyY: string,
    startValue: Complex,
    inc: number
  ): Complex {
    const x = Number(keyX);
    const y = Number(keyY);
    if (x === 1 && y === 1) {
      return startValue;
    }
    const re = startValue.re + (Number(x) - 1) * inc;
    const im = startValue.im + (Number(y) - 1) * inc;
    return complex(re, im);
  }

  mapPixelsToComplexPlane(): void {
    const pixelIncrement = this.range / (this.canvasSize - 1);
    const x = Object.keys(this.map);
    for (let i = 0; i < x.length;  i++) {
      const y = Object.keys(this.map[x[i]]);
      for (let j = 0; j < x.length;  j++) {
        const val = this.getComplexValue(x[i], y[j], this.startValue, pixelIncrement)
        this.processNumber(x[i], y[j], val);
      }
    }
  }
}