import { getDerivativeAsCallback, solve } from "../algorithm";

describe('getDerivativeAsCallback', () => {
  it('should return a callback that is the derivative of the original function', () => {
    // x^5 + x^4 + x^3 + 3x^2 + 4x + c
    const callback = getDerivativeAsCallback(4, 3, 1, 1, 1) // 4 + 6 x + 3 x^2 + 4 x^3 + 5x^4
    expect(callback(1)).toBe(22);
    expect(callback(2)).toBe(140);
    expect(callback(4)).toBe(1612);
  })

  it('should return a callback that is the derivative of the original function if some coefficients are 0', () => {
    // x^3 + 4x + c
    const callback = getDerivativeAsCallback(4, 0, 1, 0, 0) // 4 + 3x^2
    expect(callback(1)).toBe(7);
    expect(callback(2)).toBe(16);
    expect(callback(4)).toBe(52);
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
      [1, 0],
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
})