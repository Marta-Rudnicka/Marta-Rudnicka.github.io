/*
  This file contains duplicates of deeply nested functions that cannot
  be easily extracted from the GPU kernel for testing. The kernel throws 
  an error if they get out of sync to ensure the unit tests are up do date.
*/

import { Complex } from "../../../types";
import { FunctionCallback } from "./algorithm";
import { cByC, rp, rxC, sumComplex } from "./maths-helpers";
import { compareToAttractors, evaluateDerivative } from "./newton-algorithm";

export function newtonIterationTestable(
  val: Complex,
  evaluate: FunctionCallback, 
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number,
): Complex {
  const num = evaluate(val);
  const den = evaluateDerivative(val, co1, co2, co3, co4, co5);
  const div = rxC(-1, cByC(num, den));
  const [real, imaginary] = sumComplex([val, div]);
  return [rp(real, 4), rp(imaginary, 4)];
}

export function newtonRecursionTestable(
  attractors: Complex[],
  input: Complex,
  evaluate: FunctionCallback,
  index: number,
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number,
): number {
  if (index !== -1) {
    return index;
  }
  let val = input;
  val = newtonIterationTestable(input, evaluate, co1, co2, co3, co4, co5);
  index = compareToAttractors(val, attractors);
  return newtonRecursionTestable(attractors, val, evaluate, index, co1, co2, co3, co4, co5);
}

export function findNewtonAttractorTestable(
  attractors: Complex[],
  input: Complex,
  evaluate: FunctionCallback,
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number,
): number {

  const res = newtonRecursionTestable(attractors, input, evaluate, -1, co1, co2, co3, co4, co5)
  return res;
}