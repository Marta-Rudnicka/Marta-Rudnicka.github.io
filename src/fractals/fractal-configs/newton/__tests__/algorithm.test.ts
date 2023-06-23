import { Complex } from "../../../../types";
import { findNewtonAttractor, getDerivativeAsCallback, getPolyFunction, newtonIteration, solve } from "../algorithm";
import { c } from "../maths-helpers";

describe('getDerivativeAsCallback', () => {
  it('should return a callback that is the derivative of the original function (real numbers)', () => {
    // x^5 + x^4 + x^3 + 3x^2 + 4x + c
    const callback = getDerivativeAsCallback(4, 3, 1, 1, 1) // 4 + 6 x + 3 x^2 + 4 x^3 + 5x^4
    expect(callback(c(1))).toStrictEqual(c(22));
    expect(callback(c(2))).toStrictEqual(c(140));
    expect(callback(c(4))).toStrictEqual(c(1612));
  })

  it('should handle imaginary numbers as argument', () => {
    // x^5 + x^4 + x^3 + 3x^2 + 4x + c
    const callback = getDerivativeAsCallback(4, 3, 1, 1, 1) // 4 + 6 x + 3 x^2 + 4 x^3 + 5x^4
    expect(callback([0, 1])).toStrictEqual([6, 2]);
  })

  it('should handle complex numbers as argument', () => {
    // x^5 + x^4 + x^3 + 3x^2 + 4x + c
    const callback = getDerivativeAsCallback(4, 3, 1, 1, 1) // 4 + 6 x + 3 x^2 + 4 x^3 + 5x^4
    expect(callback([3, 1])).toStrictEqual([258, 608]);
  })

  it('should return a callback that is the derivative of the original function if some coefficients are 0', () => {
    // x^3 + 4x + c
    const callback = getDerivativeAsCallback(4, 0, 1, 0, 0) // 4 + 3x^2
    expect(callback(c(1))).toStrictEqual(c(7));
    expect(callback(c(2))).toStrictEqual(c(16));
    expect(callback(c(4))).toStrictEqual(c(52));
  })
});


describe('getPolyFunction', () => {
  it('should return a callback the original function (real numbers)', () => {
    // 4x^5 + 3x^4 + x^3 + x^2 + x + 10
    const callback = getPolyFunction(10,1 , 1, 1, 3, 4);
    expect(callback(c(1))).toStrictEqual(c(20));
    expect(callback(c(2))).toStrictEqual(c(200));
    expect(callback(c(4))).toStrictEqual(c(4958));
  })

  it('should handle complex numbers as argument', () => {
    // 4x^5 + 3x^4 + x^3 + x^2 + x + 10
    const callback = getPolyFunction(10, 1 , 1, 1, 3, 4);
    expect(callback([3, 1])).toStrictEqual([75, 1585]);
    expect(callback([2, -3])).toStrictEqual([92, 2724]);

  })

  it('should handle imaginary numbers as argument', () => {
    // 4x^5 + 3x^4 + x^3 + x^2 + x + 10
    const callback = getPolyFunction(10, 1 , 1, 1, 3, 4);
    expect(callback([0, 1])).toStrictEqual([12, 4]);
    expect(callback([0, -3])).toStrictEqual([244, -948]);

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
    const poly = getPolyFunction(-5, 0, 1, 0, 0, 0);
    const der = getDerivativeAsCallback(0, 1, 0, 0, 0)
    expect(newtonIteration(poly, der, c(2.5))).toStrictEqual([2.25, 0]);
  });
  it('should perform one iteration of Newton method - complicated example', () => {
    // x^5 - 2x^4 + 2x^3 + 6x^2 - 10x + 1
    const poly = getPolyFunction(1, -10, 6, 2, -2, 1);
    const der = getDerivativeAsCallback(-10, 6, 2, -2, 1);
    const input: Complex = [1.12, - 1.83];
    
    const ex: Complex = [1.125, -1.832];
    expect(newtonIteration(poly, der, input)).toStrictEqual(ex);
  });
});

describe('findNewtonAttractor', () => {
  // find to which attractor from the array the orbit of the seed eventually tends

  // x^3 + x^2 - 3x + 2
  const attractors: Complex[] = [[-2.512, 0], [0.7558, - 0.4745], [0.7558, 0.4745]];
  const poly = getPolyFunction(2, -3, 1, 1, 0, 0);
  const der = getDerivativeAsCallback(-3, 1, 1, 0, 0)
  it('should return the index of the right attractor for values close to the root', () => {
    expect(findNewtonAttractor(attractors, [-2.5, 0], poly, der)).toStrictEqual(0);
    expect(findNewtonAttractor(attractors, [0.7, -0.4], poly, der)).toStrictEqual(1);
    expect(findNewtonAttractor(attractors, [0.7, 0.4], poly, der)).toStrictEqual(2);
  });

  it('should return the index of the right attractor for values distant from the root', () => {
    expect(findNewtonAttractor(attractors, [20, 0], poly, der)).toStrictEqual(0);
    expect(findNewtonAttractor(attractors, [-60, 5], poly, der)).toStrictEqual(0);

    expect(findNewtonAttractor(attractors, [12, -40], poly, der)).toStrictEqual(1);
    expect(findNewtonAttractor(attractors, [10.78, -20], poly, der)).toStrictEqual(1);

    expect(findNewtonAttractor(attractors, [12, 5], poly, der)).toStrictEqual(2);
    expect(findNewtonAttractor(attractors, [10.78, 80], poly, der)).toStrictEqual(2);
  });
});