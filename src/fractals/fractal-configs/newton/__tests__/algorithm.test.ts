// import { Complex } from "../../../../types";
import { c } from "../maths-helpers";
import {
  newtonIterationTestable as newtonIteration,
  findNewtonAttractorTestable as findNewtonAttractor,
  findIndexOfAttractor,
  compareToKnownRoots
 } from "../duplicates";
import { Complex } from "../../../../types";
import { FlatComplexRootArray, compareToAttractors, evaluateDerivative, evaluatePolynomial, solve } from "../newton-algorithm";

type DerivativeInput = [number, number, number, number, number];
type PolynomialInput = [number, number, number, number, number, number];

describe('test', () => {
  it('test', () => {
    expect(0).toStrictEqual(0);
  });
});

describe('evaluateDerivative', () => {
  // x^5 + x^4 + x^3 + 3x^2 + 4x + c
  const userInputs = [4, 3, 1, 1, 1] as DerivativeInput;
  // x^3 + 4x + c
  const userInputsWithZeros = [4, 0, 1, 0, 0] as DerivativeInput;


  it('should return a callback that is the derivative of the original function (real numbers)', () => {
    expect(evaluateDerivative(c(1), ...userInputs)).toStrictEqual(c(22));
    expect(evaluateDerivative(c(2), ...userInputs)).toStrictEqual(c(140));
    expect(evaluateDerivative(c(4), ...userInputs)).toStrictEqual(c(1612));
  })

  it('should handle imaginary numbers as argument', () => {
    // x^5 + x^4 + x^3 + 3x^2 + 4x + c
    // 4 + 6 x + 3 x^2 + 4 x^3 + 5x^4
    const userInputs = [4, 3, 1, 1, 1] as DerivativeInput;

    expect(evaluateDerivative([0, 1], ...userInputs)).toStrictEqual([6, 2]);
  })

  it('should handle complex numbers as argument', () => {
    // x^5 + x^4 + x^3 + 3x^2 + 4x + c
    expect(evaluateDerivative([3, 1], ...userInputs)).toStrictEqual([258, 608]);
  })

  it('should return a callback that is the derivative of the original function if some coefficients are 0', () => {
    // x^3 + 4x + c
    expect(evaluateDerivative(c(1), ...userInputsWithZeros)).toStrictEqual(c(7));
    expect(evaluateDerivative(c(2), ...userInputsWithZeros)).toStrictEqual(c(16));
    expect(evaluateDerivative(c(4), ...userInputsWithZeros)).toStrictEqual(c(52));
  })
});

describe('getPolyFunction', () => {
  it('should return a callback the original function (real numbers)', () => {
    // 4x^5 + 3x^4 + x^3 + x^2 + x + 10
    const userInput = [10, 1 , 1, 1, 3, 4] as PolynomialInput;
    expect(evaluatePolynomial(c(1), ...userInput)).toStrictEqual(c(20));
    expect(evaluatePolynomial(c(2), ...userInput)).toStrictEqual(c(200));
    expect(evaluatePolynomial(c(4), ...userInput)).toStrictEqual(c(4958));
  })

  it('should handle complex numbers as argument', () => {
    // 4x^5 + 3x^4 + x^3 + x^2 + x + 10
    const userInput = [10, 1 , 1, 1, 3, 4] as PolynomialInput;
    expect(evaluatePolynomial([3, 1], ...userInput)).toStrictEqual([75, 1585]);
    expect(evaluatePolynomial([2, -3], ...userInput)).toStrictEqual([92, 2724]);
  })

  it('should handle imaginary numbers as argument', () => {
    // 4x^5 + 3x^4 + x^3 + x^2 + x + 10
    const userInput = [10, 1 , 1, 1, 3, 4] as PolynomialInput;
    expect(evaluatePolynomial([0, 1], ...userInput)).toStrictEqual([12, 4]);
    expect(evaluatePolynomial([0, -3], ...userInput)).toStrictEqual([244, -948]);

  })
});

describe('solve', () => {
  function compareFlattenedRoots(result: FlatComplexRootArray, e: Complex[]): void {
    const expected = e.sort();
    const r = result;
    const parsedResult = [[r[0], r[1]], [r[2], r[3]], [r[4], r[5]], [r[6], r[7]], [r[8], r[9]]]
    const l = expected.length > 5 ? 5 : expected.length;
    expect(parsedResult.slice(0, l)).toStrictEqual(expected.slice(0,l));
   ;
  }
  // to make sure the object produced by nroot is parsed correctly - couldn't find appropriate docs
  it('should provide roots for a polynomial with only real roots', () => {
    const expected: Complex[] = [[-2, 0], [2, 0]];
    const result = solve('x^2 - 4');
    compareFlattenedRoots(result, expected)
  })

  it('should provide roots for a polynomial with only imaginary roots', () => {
    const expected: Complex[] = [[0, -2], [0, 2]];
    const result = solve('x^2 + 4');
    compareFlattenedRoots(result, expected)
  })


  it('should provide roots for a polynomial with and imaginary roots', () => {
    const expected: Complex[] = [[-5, -12], [-5, 12]];
    const result = solve('x^2 + 10x + 169');
    compareFlattenedRoots(result, expected)
  })

  it('should provide roots for a polynomial with complex and imaginary roots', () => {
    const result = solve('x^6 + 1');
    const expected: Complex[] = [
      [-0.866, -0.5],
      [-0.866, 0.5],
      [0, -1],
      [0, 1],
      [0.866, -0.5],
      [0.866, 0.5],
    ];
    compareFlattenedRoots(result, expected);
  })

  it('should produce real and complex roots for a polynomial', () => {
    const result = solve('x^3+9');
    const expected: Complex[] = [[-2.08, 0], [1.04, -1.801], [1.04, 1.801]];
    compareFlattenedRoots(result, expected);
  })

  it('should produce all kinds of roots for a polynomial', () => {
    const result = (solve('x^8 - 1'))
    const expected: Complex[] = [
      [-0.7071, -0.7071],
      [-0.7071, 0.7071],
      [-1, 0],
      [0, -1],
      [0, 1],
      [0.7071, -0.7071],
      [0.7071, 0.7071],
      [ 1, 0],
    ];
    compareFlattenedRoots(result, expected);

  })

  it('should find roots for the most complex possible polynomial', () => {
    const expected: Complex[] = [
    [-0.9749, -1.237],
    [-0.9749,  1.237],
    [-1.212, 0],
    [ 1.081, -1.351],
    [ 1.081,  1.351],
    ];
    const result = solve('x^5+x^4+x^3+2*x^2+8*x+9');
    compareFlattenedRoots(result, expected);

  })
});

describe('newtonIteration', () => {
  // to make sure the object produced by nroot is parsed correctly - couldn't find appropriate docs
  it('should perform one iteration of Newton method - simple example', () => {
    // x^2 - 5
    const userInput = [-5, 0, 1, 0, 0, 0] as PolynomialInput;
    expect(newtonIteration(c(2.5), ...userInput )).toStrictEqual([2.25, 0]);
  });

  it('should perform one iteration of Newton method - complicated example', () => {
    // x^5 - 2x^4 + 2x^3 + 6x^2 - 10x + 1
    const userInput = [1, -10, 6, 2, -2, 1] as PolynomialInput;
    const input: Complex = [1.12, - 1.83];
    const ex: Complex = [1.1247, -1.8317];
    expect(newtonIteration(input, ...userInput)).toStrictEqual(ex);
  });
});

describe('findNewtonAttractor', () => {
  // find to which attractor from the array the orbit of the seed eventually tends

  // x^3 + x^2 - 3x + 2
  const attractors: FlatComplexRootArray = [-2.512, 0, 0.7558, - 0.4745, 0.7558, 0.4745, 0, 0, 0, 0];
  const userInput = [2, -3, 1, 1, 0, 0] as PolynomialInput;
  it('should return the index of the right attractor for values close to the root', () => {
    let res = findNewtonAttractor(
      -2.512, 0,
      0.7558, -4745,
      0.7558, 0.4745,
      0, 0,
      0, 0,
      [-2.5, 0],
      ...userInput
    );
    expect(res).toStrictEqual(0);
    expect(findNewtonAttractor(...attractors, [0.76, -0.47], ...userInput)).toStrictEqual(1);
    expect(findNewtonAttractor(...attractors, [0.7, 0.4], ...userInput)).toStrictEqual(2);
  });

  it('should return the index of the right attractor for values distant from the root', () => {
    expect(findNewtonAttractor(...attractors, [20, 0], ...userInput)).toStrictEqual(0);
    // expect(findNewtonAttractor(...attractors, [-60, 5], ...userInput)).toStrictEqual(0);

    // expect(findNewtonAttractor(...attractors, [12, -40], ...userInput)).toStrictEqual(1);
    // expect(findNewtonAttractor(...attractors, [10.78, -20], ...userInput)).toStrictEqual(1);

    // expect(findNewtonAttractor(...attractors, [12, 5], ...userInput)).toStrictEqual(2);
    // expect(findNewtonAttractor(...attractors, [10.78, 80], ...userInput)).toStrictEqual(2);
  });
});

describe('findIndexOfAttractor', () => {
  // find to which attractor from the array the orbit of the seed eventually tends

  // x^3 + x^2 - 3x + 2
  const attractors: FlatComplexRootArray = [-2.512, 0, 0.7558, - 0.4745, 0.7558, 0.4745, 0, 0, 0, 0];
  const userInput = [2, -3, 1, 1, 0, 0] as PolynomialInput;
  it('should return the index of the right attractor for values close to the root', () => {
    let res = findIndexOfAttractor(
      -2.512, 0,
      0.7558, -0.4745,
      0.7558, 0.4745,
      0, 0,
      0, 0,
      [-2.5, 0],
      ...userInput
    );
    expect(res).toStrictEqual(0);
    expect(findNewtonAttractor(...attractors, [0.756, -0.474], ...userInput)).toStrictEqual(1);
    expect(findNewtonAttractor(...attractors, [0.75583, 0.474], ...userInput)).toStrictEqual(2);
  });
});

describe('compareToAttractors', () => {
  it('should return -1 if the value is not close to any of the roots', () => {
    const val: Complex = [-2, -9];
    expect(compareToAttractors(val, 1.234, 3.876, 8.987, 6.8768, 0)).toStrictEqual(-1);
  });

  it('should return the index of the root if it has exactly the same value', () => {
    const val: Complex = [ 1.234, 3.876];
    expect(compareToAttractors(val, 1.234, 3.876, 8.987, 6.8768, 0)).toStrictEqual(0);
  });

  it('should return the index of the root if it a little larger', () => {
    const val: Complex = [ 1.23432, 3.876];
    expect(compareToAttractors(val, 1.234, 3.876, 8.987, 6.8768, 0)).toStrictEqual(0);
  });

  it('should return the index of the root if it is a litter smaller', () => {
    const val: Complex = [ 1.2339, 3.876];
    expect(compareToAttractors(val, 1.234, 3.876, 8.987, 6.8768, 0)).toStrictEqual(0);
  });

  it('should correctly return the index of the second root', () => {
    const val: Complex = [  8.987, 6.8768 ];
    expect(compareToAttractors(val, 1.234, 3.876, 8.987, 6.8768, 0)).toStrictEqual(1);
  });

  it('should correctly return the index of the first root in the next batch', () => {
    const val: Complex = [ 1.234, 3.876];
    expect(compareToAttractors(val, 1.234, 3.876, 8.987, 6.8768, 1)).toStrictEqual(2);
  });

  it('should correctly return the index of the second root in the next batch', () => {
    const val: Complex = [  8.987, 6.8768 ];
    expect(compareToAttractors(val, 1.234, 3.876, 8.987, 6.8768, 1)).toStrictEqual(3);
  });

  it('should correctly return the index of the first root in the third batch', () => {
    const val: Complex = [ 1.234, 3.876];
    expect(compareToAttractors(val, 1.234, 3.876, 8.987, 6.8768, 2)).toStrictEqual(4);
  });
})

describe('compareToKnownRoots', () => {
  const roots: FlatComplexRootArray = [1.234, 3.876, 8.987, 6.8768, -87.876898, 8.478, 5.9870, -7.987, 0, 0];
  it('should return -1 if the value is not closeto any roots', () => {
    const val: Complex = [-2, -9];
    expect(compareToKnownRoots(val, ...roots)).toStrictEqual(-1);
  });

  it('should return the index of the root if it is the same', () => {
    const val: Complex = [1.234, 3.876];
    expect(compareToKnownRoots(val, ...roots)).toStrictEqual(0);
  });

  it('should return the index of the root if it is close enough', () => {
    const val: Complex = [1.2339, 3.876];
    expect(compareToKnownRoots(val, ...roots)).toStrictEqual(0);
  });

  it('should return the index of the correct root', () => {
    const val: Complex = [-87.877, 8.4781112];
    expect(compareToKnownRoots(val, ...roots)).toStrictEqual(2);
  });
})