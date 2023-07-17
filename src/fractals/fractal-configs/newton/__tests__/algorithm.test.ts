// import { Complex } from "../../../../types";
import { c } from "../maths-helpers";
import { Complex } from "../../../../types";
import { FlatComplexRootArray, compareToAttractors, compareToKnownRoots, evaluateDerivative, evaluatePolynomial, findIndexOfAttractor, findNewtonAttractor, newtonIteration, solve } from "../newton-algorithm";

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
  // to make sure the object produced by nroot is parsed correctly - couldn't find appropriate docs
  it('should provide roots for a polynomial with only real roots', () => {
    const expected: FlatComplexRootArray = [-2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2]
    const result = solve('x^2 - 4');
    expect(result).toStrictEqual(expected)
  })

  it('should provide roots for a polynomial with only imaginary roots', () => {
    // const expected: Complex[] = [[0, -2], [0, 2]];
    const expected: FlatComplexRootArray = [0, -2, 0, 2, 0, 0, 0, 0, 0, 0, 2]
    const result = solve('x^2 + 4');
    expect(result).toStrictEqual(expected)
  })


  it('should provide roots for a polynomial with and imaginary roots', () => {
    const expected: FlatComplexRootArray = [-5, -12, -5, 12, 0, 0, 0, 0, 0, 0, 2];
    const result = solve('x^2 + 10x + 169');
    expect(result).toStrictEqual(expected)
  })

  it('should provide roots for a polynomial with complex and imaginary roots', () => {
    const result = solve('x^6 + 1');
    const expected: FlatComplexRootArray = [
      -0.866, -0.5,
      -0.866, 0.5,
      0, -1,
      0, 1,
      0.866, -0.5,
      6,
    ];
    expect(result).toStrictEqual(expected)
  })

  it('should produce real and complex roots for a polynomial', () => {
    const result = solve('x^3+9');
    const expected: FlatComplexRootArray = [-2.08, 0, 1.04, -1.801, 1.04, 1.801, 0, 0, 0, 0, 3];
    expect(result).toStrictEqual(expected)
  })

  it('should produce all kinds of roots for a polynomial', () => {
    const result = (solve('x^8 - 1'))
    const expected: FlatComplexRootArray = [
      -0.7071, -0.7071,
      -0.7071, 0.7071,
      -1, 0,
      0, -1,
      0, 1,
      8
    ];
    expect(result).toStrictEqual(expected)
  })

  it('should find roots for the most complex possible polynomial', () => {
    const expected: FlatComplexRootArray = [
    -0.9749, -1.237,
    -0.9749,  1.237,
    -1.212, 0,
     1.081, -1.351,
     1.081,  1.351,
     5
    ];
    const result = solve('x^5+x^4+x^3+2*x^2+8*x+9');
    expect(result).toStrictEqual(expected)


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
    const ex: Complex = [1.12469335393556, -1.8316699565802588];
    expect(newtonIteration(input, ...userInput)).toStrictEqual(ex);
  });
});

describe('findNewtonAttractor', () => {
  // find to which attractor from the array the orbit of the seed eventually tends

  // x^3 + x^2 - 3x + 2
  const attractors: FlatComplexRootArray = [-2.512, 0, 0.7558, - 0.4745, 0.7558, 0.4745, 0, 0, 0, 0, 3];
  const userInput = [2, -3, 1, 1, 0, 0] as PolynomialInput;
  it('should return the index of the right attractor for values close to the root', () => {
    let res = findNewtonAttractor(
      -2.512, 0,
      0.7558, -4745,
      0.7558, 0.4745,
      0, 0,
      0, 0,
      3,
      [-2.5, 0],
      ...userInput
    );
    expect(res).toStrictEqual(0);
    expect(findNewtonAttractor(...attractors, [0.76, -0.47], ...userInput)).toStrictEqual(1);
    expect(findNewtonAttractor(...attractors, [0.7, 0.4], ...userInput)).toStrictEqual(2);
  });

  it('should return the index of the right attractor for values distant from the root', () => {
    expect(findNewtonAttractor(...attractors, [20, 0], ...userInput)).toStrictEqual(0);
    expect(findNewtonAttractor(...attractors, [-60, 5], ...userInput)).toStrictEqual(0);

    expect(findNewtonAttractor(...attractors, [12, -40], ...userInput)).toStrictEqual(1);
    expect(findNewtonAttractor(...attractors, [10.78, -20], ...userInput)).toStrictEqual(1);

    expect(findNewtonAttractor(...attractors, [12, 5], ...userInput)).toStrictEqual(2);
    expect(findNewtonAttractor(...attractors, [10.78, 80], ...userInput)).toStrictEqual(2);
  });

  it('should not mistake placeholder zeros for a root', () => {
    const testAttractors: FlatComplexRootArray = [-0.8550, - 1.4809, 1.7100, 0, -0.8550, 1.4809, 0,0,0,0, 3]
    const testUserInput: PolynomialInput = [0, 0, 2, 0, 0, 5];
    expect(findNewtonAttractor(...testAttractors, [-1.565, -2.678], ...testUserInput)).not.toBe(3); // change to a correct value
  });
});

describe('findIndexOfAttractor', () => {
  // find to which attractor from the array the orbit of the seed eventually tends

  // x^3 + x^2 - 3x + 2
  const attractors: FlatComplexRootArray = [-2.512, 0, 0.7558, - 0.4745, 0.7558, 0.4745, 0, 0, 0, 0, 3];
  const userInput = [2, -3, 1, 1, 0, 0] as PolynomialInput;
  it('should return the index of the right attractor for values close to the root', () => {
    expect(findIndexOfAttractor(...attractors,[-2.5, 0],...userInput)).toStrictEqual([0, -2.511627906976744, 0 ]);
    expect(findIndexOfAttractor(...attractors, [0.756, -0.474], ...userInput)).toStrictEqual([1, 0.7557732808238844, -0.47447690644666407]);
    expect(findIndexOfAttractor(...attractors, [0.75583, 0.474], ...userInput)).toStrictEqual([2, 0.7557734444675728, 0.4744770080203389]);
  });

  it('should return not include placeholder zeroes', () => {
    expect(findIndexOfAttractor(...attractors,[-0.001, 0],...userInput)).toStrictEqual([-1, 0.6662228516550818, 0 ]);
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
  const roots: FlatComplexRootArray = [1.234, 3.876, 8.987, 6.8768, -87.876898, 8.478, 5.9870, -7.987, 0, 0, 4];
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

  it('should not consider trailing zeros as a possible (4 roots)', () => {
    const val: Complex = [0.0001, 0];
    expect(compareToKnownRoots(val, ...roots)).toStrictEqual(-1);
  });

  it('should not consider trailing zeros as a possible (3 roots)', () => {
    const roots3: FlatComplexRootArray = [1.234, 3.876, 8.987, 6.8768, -87.876898, 8.478, 0, 0, 0, 0, 3];
    const val: Complex = [0.0001, 0];
    expect(compareToKnownRoots(val, ...roots3)).toStrictEqual(-1);
  });

  it('should not consider trailing zeros as a possible (2 roots)', () => {
    const roots2: FlatComplexRootArray = [1.234, 3.876, 8.987, 6.8768, 0, 0, 0, 0, 0, 0, 2];

    const val: Complex = [0.0001, 0];
    expect(compareToKnownRoots(val, ...roots2)).toStrictEqual(-1);
  });
})