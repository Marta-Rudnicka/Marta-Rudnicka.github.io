import { Complex } from "../../../types";

export function c(r: number): Complex {
  //return a real number in array notation for complex numbers
  return [r, 0];
}
/*powers of complex numbers, where both input and output is the array [realPart, imaginaryPart] */

export function rp(n: number, p: number): number {
  const precision = Math.pow(10, p)
  let res = n * precision;
  res = Math.round(res) / precision;
  return res;
}

export function pow2(x: Complex): Complex {
  // fallback to 0 to avoid getting -0
  let real = (Math.pow(x[0], 2)) - Math.pow(x[1], 2)
  let imaginary = 2 * x[0] * x[1];
  if (real === -0) {
    real = 0;
  }
  if (imaginary === -0) {
    imaginary = 0;
  }
  return [ real, imaginary ];
}

export function pow3(x: Complex): Complex {
  let real =
    Math.pow(x[0], 3)
    - 3 * x[0] * Math.pow(x[1], 2);
  let imaginary =
    - Math.pow(x[1], 3)
    + 3 * Math.pow(x[0], 2) * x[1];
  if (real === -0) {
    real = 0;
  }
  if (imaginary === -0) {
    imaginary = 0;
  }
  return [real, imaginary];
}

export function pow4(x: Complex): Complex {
  let real =
    Math.pow(x[0], 4)
    - 6 * Math.pow(x[0], 2) * Math.pow(x[1], 2)
    + Math.pow(x[1], 4);
  let imaginary =
    4 * Math.pow(x[0], 3) * x[1]
    - 4 * x[0] * Math.pow(x[1], 3);
  if (real === -0) {
    real = 0;
  }
  if (imaginary === -0) {
    imaginary = 0;
  }
  return [real, imaginary];
}

export function pow5(x: Complex): Complex {
  let real =
    Math.pow(x[0], 5)
    - 10 * Math.pow(x[0], 3) * Math.pow(x[1], 2)
    + 5 * x[0] * Math.pow(x[1], 4);
  let imaginary =
    + Math.pow(x[1], 5)
    + 5 * Math.pow(x[0], 4) * x[1]
    - 10 * Math.pow(x[0], 2) * Math.pow(x[1], 3);
  if (real === -0) {
    real = 0;
  }
  if (imaginary === -0) {
    imaginary = 0;
  }
  return [real, imaginary];
}

export function cByC(num: Complex, den: Complex): Complex {
  const constDiv = den[0] * den[0] + den[1] * den[1];

  const real = (num[0]*den[0] + num[1] * den[1]) / constDiv;
  const imaginary = (num[1]*den[0] - num[0]*den[1]) / constDiv;
  return [real, imaginary]
}

export function rxC(r: number, c: Complex): Complex {
  return [r* c[0], r * c[1]];
}
export function lengthNumArray(array: number[]): number {
  let i = 0;
  while (array[i] === 0 || array[i] < 0 || array[i] > 0) {
    i = i + 1
  }
  return i;
}

export function sum2Complex(nums: number[]): Complex {
  // reduce or variable-lenghth arrays not compatible with gpu
  return [nums[0] + nums[2], nums[1] + nums[3]]
}

function addExpressionToPolynomial(poly: string, coefficient: number, degree: number): string {
  let expr: string = '';
  if (coefficient === 0) {
    return poly + expr;
  }
  if (poly && coefficient > 0) {
    expr = '+';
  }
  if (coefficient !== 0) {
    expr = expr + coefficient * 10;
  }
  expr = expr + 'x';
  if (degree !== 1) {
    expr = expr + '^' + degree;
  }
  return poly + expr;
}

export function getPolynomialStringForNroots(
  // assuming up to 5th degree polynomial
  c: number,
  co1: number,
  co2: number,
  co3: number,
  co4: number,
  co5: number,
) : string {
  let poly = '';
  poly = addExpressionToPolynomial(poly, co5, 5);
  poly = addExpressionToPolynomial(poly, co4, 4);
  poly = addExpressionToPolynomial(poly, co3, 3);
  poly = addExpressionToPolynomial(poly, co2, 2);
  poly = addExpressionToPolynomial(poly, co1, 1);
  if (c) {
    const constantStr = c > 0 ? `+${c*10}` : c*10;
    poly = poly + constantStr;
  }
  return poly;
}