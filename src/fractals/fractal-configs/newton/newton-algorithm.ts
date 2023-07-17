import { Complex } from "../../../types";
import { parse, simplify } from "mathjs";
import { Solution, Solutions } from "../../../types-algebrite";
import { pow2, pow3, pow4, pow5, rp, rxC, cByC, sum2Complex } from "./maths-helpers";
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

export type FlatComplexRootArray = [
  number, number, // root 1
  number, number, // root 2
  number, number, // root 3
  number, number, // root 4
  number, number, // root 5
  number // actual number of roots
]

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
  const deg2 = rxC(co2, pow2(x));
  const deg3 = rxC(co3, pow3(x));
  const deg4 = rxC(co4, pow4(x));
  const deg5 = rxC(co5, pow5(x));

  // // because longer arrays are not accepted :-(
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
  const numOfRoots = roots.length;
  res.push(...roots.flat())
  res.push(...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  res = res.slice(0, 10)
  res.push(numOfRoots)
  return res as FlatComplexRootArray;
}

export function compareToAttractors(
  input: Complex,
  a0r: number,
  a0i: number,
  a1r: number,
  a1i: number,
  batch: number
): number {

  if (rp(input[0], 1) === rp(a0r, 1) && rp(input[1], 1) === rp(a0i, 1)) {
    return 0 + 2 * batch;
  }
  if (rp(input[0], 1) === rp(a1r, 1) && rp(input[1], 1) === rp(a1i, 1)) {
    return 1 + 2 * batch;
  }
  return -1;
}

export function newtonIteration(
  val: Complex,
  constant: number,
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number,
): Complex {
  const num = evaluatePolynomial(val, constant, co1, co2, co3, co4, co5);
  const den = evaluateDerivative(val, co1, co2, co3, co4, co5);
  const div = rxC(-1, cByC(num, den));
  const sum = sum2Complex([val[0], val[1], div[0], div[1]]);
  return [sum[0], sum[1]];
}

export function compareToKnownRoots(
  val: Complex,
  r0r: number,
  r0i: number,
  r1r: number,
  r1i: number,
  r2r: number,
  r2i: number,
  r3r: number,
  r3i: number,
  r4r: number,
  r4i: number,
  numOfRoots: number,
): number {
  let i = compareToAttractors(val, r0r, r0i, r1r, r1i, 0);
  if (i !== -1) return i;
  i = compareToAttractors(val, r2r, r2i, r3r, r3i, 1);
  if (i > numOfRoots -1) return -1;
  if (i !== -1) {
    return i;
  }
  i = compareToAttractors(val, r4r, r4i, 0, 0, 2);
  if (i > numOfRoots -1) return -1;
  return i;
}

export function findIndexOfAttractor(
  r0r: number,
  r0i: number,
  r1r: number,
  r1i: number,
  r2r: number,
  r2i: number,
  r3r: number,
  r3i: number,
  r4r: number,
  r4i: number,
  numOfRoots: number,
  input: Complex,
  constant: number,
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number,
): number[] {
  let val = input;
  val = newtonIteration(input, constant, co1, co2, co3, co4, co5);
  const i = compareToKnownRoots(val, r0r, r0i, r1r, r1i, r2r, r2i, r3r, r3i, r4r, r4i, numOfRoots);
  return [i, val[0], val[1]];
}

export function findNewtonAttractor(
  r0r: number,
  r0i: number,
  r1r: number,
  r1i: number,
  r2r: number,
  r2i: number,
  r3r: number,
  r3i: number,
  r4r: number,
  r4i: number,
  numOfRoots: number,
  input: Complex,
  constant: number,
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number,
): number {

  let index = -1;
  let value = input;
  let i = 0;

  while (index === -1 && i < 200) {
    const res = findIndexOfAttractor(
      r0r, r0i,
      r1r, r1i,
      r2r, r2i,
      r3r, r3i,
      r4r, r4i,
      numOfRoots,
      value,
      constant, co1, co2, co3, co4, co5
    );
      index = res[0]
      value = [res[1], res[2]];
      i ++;
  }
  return index;
}

