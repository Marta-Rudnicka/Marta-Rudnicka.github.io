import { LineSegment } from "../../../../types";
import { Direction, addIteration, centreImageCoords, getDirection } from "../algorithm";

describe('getDirection', () => {
  it('should correctly predict E direction', () => {
    const seg: LineSegment = { a: [10, 10], b: [30, 10]}
    expect(getDirection(seg)).toBe('E');
  });

  it('should correctly predict S direction', () => {
    const seg: LineSegment = { a: [10, 10], b: [10, 40]}
    expect(getDirection(seg)).toBe('S');
  });

  it('should correctly predict W direction', () => {
    const seg: LineSegment = { a: [30, 10], b: [10, 10]}
    expect(getDirection(seg)).toBe('W');
  });

  it('should correctly predict N direction', () => {
    const seg: LineSegment = { a: [10, 40], b: [10, 10]}
    expect(getDirection(seg)).toBe('N');
  });
});

describe('addIteration', () => {
  const first = [true];
  const second = [true, true, false];
  const third = [true, true, false, true, true, false, false];
  const fourth = ([true, true, false, true, true, false, false, true, true, true, false, false, true, false, false]);
  const fifth = [true, true, false, true, true, false, false, true, true, true, false, false, true, false, false,  true,  true, true, false, true, true, false, false, false, true, true, false, false, true, false, false, ]

  it('should create second iteration', () => {
    const res = [...first, ...addIteration(first) ]
    expect(res).toStrictEqual(second);
  });

  it('should create third iteration', () => {
    const res = [...second, ...addIteration(second) ]
    expect(res).toStrictEqual(third)
  });

  it('should create fourth iteration', () => {
    const res = [...third, ...addIteration(third) ]
    expect(res).toStrictEqual(fourth);
  });

  it('should create fifth iteration', () => {
    const res = [...fourth, ...addIteration(fourth) ]
    expect(res).toStrictEqual(fifth);
  });
});

describe('centreImageCoords', () => {
  const edges: Record<Direction, number> = {
    W: 120,
    E: 400,
    N: 120,
    S: 550,
  }
  it('should return zeroes if the image is within canvas', () => {
    expect(centreImageCoords(edges, 600)).toStrictEqual({x: 0, y: 0});
  });

  it('should move up if the coordinates go beyond the bottom edge', () => {
    expect(centreImageCoords(edges, 500)).toStrictEqual({x: 0, y: -52});
  });

  it('should move down if the coordinates go beyond the top edge', () => {
    const testEdges = {...edges, N: -40}
    expect(centreImageCoords(testEdges, 500)).toStrictEqual({x: 0, y: 42});
  });

  it('should move left if the coordinates go beyond the right edge', () => {
    const testEdges = {...edges, E: 630}
    expect(centreImageCoords(testEdges, 560)).toStrictEqual({x: -72, y: 0});
  });

  it('should move right if the coordinates go beyond the left edge', () => {
    const testEdges = {...edges, W: -30}
    expect(centreImageCoords(testEdges, 560)).toStrictEqual({x: 32, y: 0});
  });
});