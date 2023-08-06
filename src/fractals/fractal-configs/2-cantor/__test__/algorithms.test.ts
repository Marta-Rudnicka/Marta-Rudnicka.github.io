import { getInnerMargin } from "../algorithm2d";

describe('getInnerMargin', () => {
  it('should correctly get a margin for size for less than 4 iterations', () => {
    expect(getInnerMargin(80)).toBe(0);
  });

  it('should correctly get a margin for size for 4 iterations', () => {
    expect(getInnerMargin(100)).toBe(10);
  });

  it('should correctly get a margin for size for 5 iterations', () => {
    expect(getInnerMargin(263)).toBe(10);
  });

  it('should correctly get a margin for max size for 5 iterations', () => {
    expect(getInnerMargin(728)).toBe(243);
  });

  it('should correctly get a margin for size for 6 iterations', () => {
    expect(getInnerMargin(800)).toBe(36);
  });

  it('should correctly get a margin for max size for 6 iterations', () => {
    expect(getInnerMargin(2180)).toBe(726);
  });

  it('should correctly get a margin for very large screen', () => {
    expect(getInnerMargin(2180)).toBe(726);
  });
});