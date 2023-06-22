import { Complex, PixelValue } from "../../../types";
import { GPU, IKernelRunShortcut } from "gpu.js";
import { convertKernelToImgData, distanceSq, getColor, getComplexPartsForPixels, getMultiplier, xSqrPlusY } from "../../gpu-utils";
import { parse, simplify } from "mathjs";
import { Solution, Solutions } from "../../../types-algebrite";
const Algebrite = require('algebrite');

export function processPixel(
  x: number[],
  iterations: number,
  cReal: number,
  cImaginary: number,
): PixelValue {

  let val = xSqrPlusY(x, [cReal, cImaginary]);
  for (let i = 0; i <= iterations; i++) {
    val = xSqrPlusY(val, [cReal, cImaginary])
    const cr = distanceSq(val, x);
    if (cr > 4) {
      return getColor(i);
    }
  }
  return [255, 255, 255, 255];
}

export function getKernel(
  size: number,
  xReal: number,
  xImaginary: number,
  ): IKernelRunShortcut {
  const gpu = new GPU();

  gpu.addFunction(getComplexPartsForPixels);
  gpu.addFunction(xSqrPlusY);
  gpu.addFunction(processPixel);
  gpu.addFunction(distanceSq);
  gpu.addFunction(getColor);
  gpu.addFunction(getMultiplier);

  const kernel = gpu.createKernel(function (
    startValueX: number,
    startValueY: number,
    inc: number,
    xReal: number,
    xImaginary: number,
  ) {
    const values = getComplexPartsForPixels(
      this.thread.x,
      this.thread.y,
      startValueX,
      startValueY,
      inc);

    const res = processPixel(values, 200, xReal, xImaginary)
    return res;
  }).setOutput([size, size]);
  return kernel;
}

export function createImageData(
  size: number,
  // startValue: Complex,
  // range: number,
  // xReal: number,
  // xImaginary: number,
) {
  // const inc = range / size;
  // const startReal = startValue.re;
  // const startImaginary = startValue.im;
  // const kernel = getKernel(size, xReal, xImaginary);
  const kernelDump = [[[100, 100, 100, 100]]];
  return convertKernelToImgData(kernelDump, size)
}

export function removeZeroMultipliers(polynomial: string): string {
  const f = parse(polynomial);
  return simplify(f).toString();
}

type DerivativeCallback = (x: number) => number;

export function getDerivativeAsCallback(
  co1: number, 
  co2: number, 
  co3: number, 
  co4: number, 
  co5: number, 
): DerivativeCallback {

  // the obvious return vaue would be '(x) => d.evaluate({ 'x': x }) but this would not work on GPUjs'
//  console.dir(d, {depth:10})
  return (x: number) => {
    return  co1 + 2*co2*x + 3*co3*Math.pow(x, 2) + 4* co4*Math.pow(x, 3) + 5*co5*Math.pow(x, 4);
  };
}

export function parseSolution(solutionObject: Solution ): Complex {
  // real
  if (solutionObject.d) {
    return [ parseFloat(solutionObject.d.toPrecision(4)), 0];
  }
  //complex
  if (solutionObject.cons.cdr.cons.cdr?.cons?.car?.cons?.cdr?.cons?.car?.d) {
    const solutions = solutionObject.cons.cdr.cons;
    const real = solutions.car.d;
    const imaginary = solutions.cdr.cons.car.cons.cdr.cons.car.d;
    return [parseFloat(real.toPrecision(4)), parseFloat(imaginary.toPrecision(4))];
  }
  //imaginary
  const imaginary = solutionObject.cons.cdr.cons.car.d
  return [0, parseFloat(imaginary.toPrecision(4))]; 
}

export function solve(equation: string): Complex[] {
  const eq = Algebrite.run(equation)
  const sol: Solutions = Algebrite.nroots(eq)  
  return sol.tensor.elem.map((e) => parseSolution(e));
}
