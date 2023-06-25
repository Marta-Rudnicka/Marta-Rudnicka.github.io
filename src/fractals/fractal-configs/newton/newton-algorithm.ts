import { Complex } from "../../../types";
import { parse, simplify } from "mathjs";
import { Solution, Solutions } from "../../../types-algebrite";
import { c, pow2, pow3, pow4, pow5, rp, rxC, sum2Complex } from "./maths-helpers";
const Algebrite = require('algebrite');

export type NewtonInputs = {
  constant: number,
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number, 
}

export function removeZeroMultipliers(polynomial: string): string {
  const f = parse(polynomial);
  return simplify(f).toString();
}

export function evaluateDerivative(
  x: Complex,
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number,
): Complex {

  // the obvious return vaue would be '(x) => d.evaluate({ 'x': x }) but this would not work on GPUjs'
  //  console.dir(d, {depth:10})

  const deg2 = rxC(2 * co2, x);
  const deg3 = rxC(3 * co3, pow2(x));
  const deg4 = rxC(4 * co4, pow3(x));
  const deg5 = rxC(5 * co5, pow4(x));

  const args1 = [co1, 0, deg2[0], deg2[1]];
  const args2 = [deg3[0], deg3[1], deg4[0], deg4[1]];
  const args3 = [deg5[0], deg5[1], 0, 0 ];
  const sum1 = sum2Complex(args1);
  const sum2 = sum2Complex(args2);
  const sum3 = sum2Complex(args3);

  let sum = sum2Complex([sum1[0], sum1[1], sum2[0], sum2[1]])
  return sum2Complex([sum[0], sum[1], sum3[0], sum3[1]]);
};

export type FlatComplexRootArray = [number, number, number, number, number, number, number, number, number, number, ]

export function evaluatePolynomial(
  x: Complex,
  constant: number,
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number,
): Complex {

  // the obvious return vaue would be '(x) => d.evaluate({ 'x': x }) but this would not work on GPUjs'
  //  console.dir(d, {depth:10})

  const deg1 = rxC(co1, x);
  const deg2 = [2, 3]// rxC(co2, pow2(x));
  const deg3 = rxC(co3, pow3(x));
  const deg4 = rxC(co4, pow4(x));
  const deg5 = rxC(co5, pow5(x));

  // because longer arrays are not accepted :-(
  const args1 = [constant, 0, deg1[0], deg1[1]];
  const args2 = [deg2[0], deg2[1], deg3[0], deg3[1]];
  const args3 = [deg4[0], deg4[1], deg5[0], deg5[1]];
  const sum1 = sum2Complex(args1);
  const sum2 = sum2Complex(args2);
  const sum3 = sum2Complex(args3);

  let sum = sum2Complex([sum1[0], sum1[1], sum2[0], sum2[1]])
  return sum2Complex([sum[0], sum[1], sum3[0], sum3[1]]);
};


export function parseSolution(solutionObject: Solution): Complex {
  // real
  if (solutionObject.d) {
    return [parseFloat(solutionObject.d.toPrecision(4)), 0];
  }
  //complex
  if (solutionObject.cons?.cdr?.cons?.cdr?.cons?.car?.cons?.cdr?.cons?.car?.d) {
    const solutions = solutionObject.cons.cdr.cons;
    const real = solutions.car.d;
    const imaginary = solutions.cdr.cons.car.cons.cdr.cons.car.d;
    return [parseFloat(real.toPrecision(4)), parseFloat(imaginary.toPrecision(4))];
  }
  //imaginary
  const imaginary = solutionObject.cons?.cdr?.cons?.car?.d || 0;
  return [0, parseFloat(imaginary.toPrecision(4))];
}

export function solve(equation: string): FlatComplexRootArray {
  let res = [];
  const eq = Algebrite.run(equation)
  const sol: Solutions = Algebrite.nroots(eq)
  const roots =  sol.tensor.elem.map((e) => parseSolution(e)).sort();
  res.push(...roots.flat())
  res.push(...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  res = res.slice(0, 10)
  return res as FlatComplexRootArray;
}

export function compareToAttractors(input: Complex, attractors: Complex[]): number {
  for (const a of attractors) {
    if (
      rp(input[0], 4) === rp(a[0], 4)
      && rp(input[1], 4) === rp(a[1], 4)
    ) {
      return attractors.indexOf(a)
    }
  }
  return -1;
}
