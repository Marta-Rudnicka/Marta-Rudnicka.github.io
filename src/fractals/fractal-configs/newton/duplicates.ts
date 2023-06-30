/*
  This file contains duplicates of deeply nested functions that cannot
  be easily extracted from the GPU kernel for testing. The kernel throws 
  an error if they get out of sync to ensure the unit tests are up do date.
*/

import { Complex } from "../../../types";
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
): number {
  let i = compareToAttractors(val, r0r, r0i, r1r, r1i, 0);
  if (i !== -1) return i;
  i = compareToAttractors(val, r2r, r2i, r3r, r3i, 1);
  if (i !== -1) return i;
  return compareToAttractors(val, r4r, r4i, 0, 0, 2);
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
  input: Complex,
  constant: number,
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number,
): number[] {
  let val = input;
  val = newtonIterationTestable(input, constant, co1, co2, co3, co4, co5);
  const i = compareToKnownRoots(val, r0r, r0i, r1r, r1i, r2r, r2i, r3r, r3i, r4r, r4i);
  return [i, val[0], val[1]];
}

export function findNewtonAttractorTestable(
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
  while (index === -1) {
    const res = findIndexOfAttractor(
      r0r, r0i,
      r1r, r1i,
      r2r, r2i,
      r3r, r3i,
      r4r, r4i,
      value, constant, co1, co2, co3, co4, co5);
      index = res[0]
      value = [res[1], res[2]];
  }
  return index;
}
