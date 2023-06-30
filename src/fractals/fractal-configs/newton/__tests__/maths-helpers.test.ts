import {
  cByC,
  getPolynomialStringForNroots,
  lengthNumArray,
  pow2,
  pow3,
  pow4,
  pow5,
  rp,
  rxC,
  sum2Complex
} from "../maths-helpers";
const Algebrite = require('algebrite');

describe('should correctly evaluate powers of complex numbers in array notation', () => {
  it('should correctly evaluate x^2', () => {
    expect(pow2([1, 0])).toStrictEqual([1, 0]);
    expect(pow2([-1, 0])).toStrictEqual([1, 0]);
    expect(pow2([0, 1])).toStrictEqual([-1, 0]);
    expect(pow2([0, -1])).toStrictEqual([-1, 0]);
    expect(pow2([2, 3])).toStrictEqual([-5, 12]);
    expect(pow2([2, -3])).toStrictEqual([-5, -12]);
    expect(pow2([-2, 3])).toStrictEqual([-5, -12]);
    expect(pow2([-2, -3])).toStrictEqual([-5, 12]);
  })

  it('should correctly evaluate x^3', () => {
    expect(pow3([1, 0])).toStrictEqual([1, 0]);
    expect(pow3([-1, 0])).toStrictEqual([-1, 0]);
    expect(pow3([0, 1])).toStrictEqual([0, -1]);
    expect(pow3([0, -1])).toStrictEqual([0, 1]);
    expect(pow3([2, 3])).toStrictEqual([-46, 9]);
    expect(pow3([2, -3])).toStrictEqual([-46, -9]);
    expect(pow3([-2, 3])).toStrictEqual([46, 9]);
    expect(pow3([-2, -3])).toStrictEqual([46, -9]);
  })


  it('should correctly evaluate x^4', () => {
    expect(pow4([1, 0])).toStrictEqual([1, 0]);
    expect(pow4([-1, 0])).toStrictEqual([1, 0]);
    expect(pow4([0, 1])).toStrictEqual([1, 0]);
    expect(pow4([0, -1])).toStrictEqual([1, 0]);
    expect(pow4([2, 3])).toStrictEqual([-119, -120]);
    expect(pow4([2, -3])).toStrictEqual([-119, 120]);
    expect(pow4([-2, 3])).toStrictEqual([-119, 120]);
    expect(pow4([-2, -3])).toStrictEqual([-119, -120]);
  })

  it('should correctly evaluate x^5', () => {
    expect(pow5([1, 0])).toStrictEqual([1, 0]);
    expect(pow5([-1, 0])).toStrictEqual([-1, 0]);
    expect(pow5([0, 1])).toStrictEqual([0, 1]);
    expect(pow5([0, -1])).toStrictEqual([0, -1]);
    expect(pow5([2, 3])).toStrictEqual([122, -597]);
    expect(pow5([2, -3])).toStrictEqual([122, 597]);
    expect(pow5([-2, 3])).toStrictEqual([-122, -597]);
    expect(pow5([-2, -3])).toStrictEqual([-122, 597]);
  })
});


describe('should correctly multiply real number as comples number represented by array', () => {
  it('should correctly multiply real number', () => {
    expect(rxC(4, [3, 0])).toStrictEqual([12, 0])
  });
  it('should correctly multiply imaginary number', () => {
    expect(rxC(4, [0, -2])).toStrictEqual([0, -8])
  });
  it('should correctly multiply complex number', () => {
    expect(rxC(3, [-1, 2])).toStrictEqual([-3, 6]);
  });
});

describe.skip('should sum an array of number as complex number represented by array', () => {
  it('should correctly add real numbers', () => {
    expect(sum2Complex([3, 0, 4, 0, 5, 0])).toStrictEqual([12, 0])
  });

  it('should correctly add imaginary numbers', () => {
    expect(sum2Complex([0, 3, 0, 5, 0, 60])).toStrictEqual([0, 68])
  });

  it('should correctly add complex numbers', () => {
    expect(sum2Complex([1, 3, 2, 5, 3, 60])).toStrictEqual([6, 68])
  });
});


describe('should divide numbers as complex numbers represented by array', () => {
  it('should correctly divide real numbers', () => {
    expect(cByC([10, 0], [5, 0])).toStrictEqual([2, 0]);
  });

  it('should correctly divide an imaginary numbers', () => {
    expect(cByC([0, 10], [0, 5])).toStrictEqual([2, 0]);
  });

  it('should correctly divide complex numbers', () => {
    expect(cByC([6, 10], [3, 5])).toStrictEqual([2, 0]);
  });
});

describe('length', () => {
  it('should return the length of the array', () => {
    expect(lengthNumArray([10, 0, 5, 0])).toStrictEqual(4);
  });
  it('should handle empty array', () => {
    expect(lengthNumArray([])).toStrictEqual(0);
  });
});

describe('getPolynomialString', () => {
  it('should create a polynomial string understood by nroots', () => {
    const constant = 13;
    const co1 = 1;
    const co2 = 2;
    const co3 = 3;
    const co4 = 4;
    const co5 = 5;
    const expected = '5x^5+4x^4+3x^3+2x^2+x+13';
    const equation = getPolynomialStringForNroots(constant, co1, co2, co3, co4, co5)
    expect(equation).toBe(expected);
    // solve to check if Algebrite throws errors
    const eq = Algebrite.run(equation)
    Algebrite.nroots(eq)
  });

  it('should handle zero coefficients', () => {
    const constant = 7;
    const co1 = 0;
    const co2 = 6;
    const co3 = 0;
    const co4 = 0;
    const co5 = 0;
    const expected = '6x^2+7';
    const equation = getPolynomialStringForNroots(constant, co1, co2, co3, co4, co5)
    expect(equation).toBe(expected);
    const eq = Algebrite.run(equation)
    Algebrite.nroots(eq)
  });

  it('should handle negative coefficients', () => {
    const constant = 7;
    const co1 = 0;
    const co2 = -6;
    const co3 = 3;
    const co4 = 0;
    const co5 = 0;
    const expected = '3x^3-6x^2+7';
    const equation = getPolynomialStringForNroots(constant, co1, co2, co3, co4, co5)
    expect(equation).toBe(expected);
    const eq = Algebrite.run(equation)
    Algebrite.nroots(eq)
  });
});

describe('rp', () => {
  it('should round a slightly larger number to desired precision', () => {
    expect(rp(3.1234, 2)).toStrictEqual(3.12);
  });
  it('should round a slightly smaller number to desired precision', () => {
    expect(rp(3.119, 2)).toStrictEqual(3.12);
  });
});
