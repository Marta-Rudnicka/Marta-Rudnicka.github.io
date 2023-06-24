import { Complex } from "../../../types";
import { parse, simplify } from "mathjs";
import { Solution, Solutions } from "../../../types-algebrite";
import { c, pow2, pow3, pow4, pow5, rp, rxC, sumComplex } from "./maths-helpers";
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

  // return 4* co4*Math.pow(x, 3) + 5*co5*Math.pow(x, 4);
  return sumComplex([
    c(co1),
    deg2,
    deg3,
    deg4,
    deg5
  ])
};


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

  return sumComplex([
    c(constant),
    deg1,
    deg2,
    deg3,
    deg4,
    deg5
  ])
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

export function solve(equation: string): Complex[] {
  const eq = Algebrite.run(equation)
  const sol: Solutions = Algebrite.nroots(eq)
  return sol.tensor.elem.map((e) => parseSolution(e));
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
