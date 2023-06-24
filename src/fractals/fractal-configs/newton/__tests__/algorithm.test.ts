import { Complex } from "../../../../types";
import { c } from "../maths-helpers";
import { 
  newtonIterationTestable as newtonIteration,
  findNewtonAttractorTestable as findNewtonAttractor
 } from "../duplicates";
import { evaluateDerivative, evaluatePolynomial, solve } from "../newton-algorithm";

type DerivativeInput = [number, number, number, number, number];
type PolynomialInput = [number, number, number, number, number, number];


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
    expect(solve('x^2 - 4').sort()).toStrictEqual([[-2, 0], [2, 0]]);
  })

  it('should provide roots for a polynomial with only imaginary roots', () => {
    expect(solve('x^2 + 4').sort()).toStrictEqual([[0, -2], [0, 2]]);
  })

  it('should provide roots for a polynomial with only complex roots', () => {
    expect(solve('x^2 + 4').sort()).toStrictEqual([[0, -2], [0, 2]]);
  })

  it('should provide roots for a polynomial with real and imaginary roots', () => {
    expect(solve('x^2 + 10x + 169').sort()).toStrictEqual([[-5, -12], [-5, 12] ]);
  })

  it('should provide roots for a polynomial with complex and imaginary roots', () => {
    expect(solve('x^6 + 1').sort()).toStrictEqual([
      [-0.866, -0.5],
      [-0.866, 0.5],
      [0, -1], 
      [0, 1],
      [0.866, -0.5],
      [0.866, 0.5]
    ]);
  })
  it('should produce real and complex roots for a polynomial', () => {
    expect(solve('x^3+9').sort()).toStrictEqual([[-2.08, 0], [1.04, -1.801], [1.04, 1.801]]);
  })

  it('should produce all kinds of roots for a polynomial', () => {
    expect(solve('x^8 - 1').sort()).toStrictEqual([
      [-0.7071, -0.7071],
      [-0.7071, 0.7071],
      [-1, 0],
      [0, -1], 
      [0, 1],
      [0.7071, -0.7071],
      [0.7071, 0.7071],
      [ 1, 0],
    ]);    
  })

  it('should find roots for the most complex possible polynomial', () => {
    const solutions = [
     [-0.9749, -1.237],
     [-0.9749,  1.237],
     [-1.212, 0],
     [ 1.081, -1.351],
     [ 1.081,  1.351],
    ]
    expect(solve('x^5+x^4+x^3+2*x^2+8*x+9').sort()).toStrictEqual(solutions);
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
    const ex: Complex = [1.125, -1.832];
    expect(newtonIteration(input, ...userInput)).toStrictEqual(ex);
  });
});

describe('findNewtonAttractor', () => {
  // find to which attractor from the array the orbit of the seed eventually tends

  // x^3 + x^2 - 3x + 2
  const attractors: Complex[] = [[-2.512, 0], [0.7558, - 0.4745], [0.7558, 0.4745]];
  const userInput = [2, -3, 1, 1, 0, 0] as PolynomialInput;
  it('should return the index of the right attractor for values close to the root', () => {
    expect(findNewtonAttractor(attractors, [-2.5, 0], ...userInput)).toStrictEqual(0);
    expect(findNewtonAttractor(attractors, [0.7, -0.4], ...userInput)).toStrictEqual(1);
    expect(findNewtonAttractor(attractors, [0.7, 0.4], ...userInput)).toStrictEqual(2);
  });

  it('should return the index of the right attractor for values distant from the root', () => {
    expect(findNewtonAttractor(attractors, [20, 0], ...userInput)).toStrictEqual(0);
    expect(findNewtonAttractor(attractors, [-60, 5], ...userInput)).toStrictEqual(0);

    expect(findNewtonAttractor(attractors, [12, -40], ...userInput)).toStrictEqual(1);
    expect(findNewtonAttractor(attractors, [10.78, -20], ...userInput)).toStrictEqual(1);

    expect(findNewtonAttractor(attractors, [12, 5], ...userInput)).toStrictEqual(2);
    expect(findNewtonAttractor(attractors, [10.78, 80], ...userInput)).toStrictEqual(2);
  });
});