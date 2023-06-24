/*
  This file contains duplicates of deeply nested functions that cannot
  be easily extracted from the GPU kernel for testing. The kernel throws 
  an error if they get out of sync to ensure the unit tests are up do date.
*/

import { Complex } from "../../../types";
import { FunctionCallback } from "./algorithm";
import { cByC, rp, rxC, sum2Complex } from "./maths-helpers";
import { compareToAttractors, evaluateDerivative, evaluatePolynomial } from "./newton-algorithm";

export function newtonIterationTestable(
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
  return [rp(sum[0], 4), rp(sum[1], 4)];
}

export function findIndexOfAttractor(
  // attractors: Complex[],
  input: Complex,
  index: number,
  constant: number,
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number,
): number {
  // if (index !== -1) {
  //   return i;
  // }
  let val = input;
  val = newtonIterationTestable(input, constant, co1, co2, co3, co4, co5);
  // i = compareToAttractors(val, attractors);
  // return findIndexOfAttractor(attractors, val, i, constant, co1, co2, co3, co4, co5);
  return 1;
}

export function findNewtonAttractorTestable(
  // attractors: Complex[],
  input: Complex,
  constant: number,
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number,
): number {

  let index = -1;
  while (index === -1) {
    index = findIndexOfAttractor(input, index, constant, co1, co2, co3, co4, co5);
  }
  return index;
}
