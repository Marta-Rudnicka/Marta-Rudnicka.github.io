import { Direction } from "../../../../types";
import { CanvasFigure } from "../CanvasFigure";

describe('centreImageCoords', () => {
  const edges: Record<Direction, number> = {
    W: 120,
    E: 400,
    N: 120,
    S: 550,
  }

  const ctx = new CanvasRenderingContext2D()
  const cf = new CanvasFigure(ctx, 10, 500);

  it('should return zeroes if the image is within canvas', () => {
    cf.size = 600;
    cf.edges = edges;
    expect(cf.centreImageCoords()).toStrictEqual({ x: 0, y: 0 });
  });

  it('should move up if the coordinates go beyond the bottom edge', () => {
    cf.size = 500;
    cf.edges = edges;
    expect(cf.centreImageCoords()).toStrictEqual({ x: 0, y: -52 });
  });

  it('should move down if the coordinates go beyond the top edge', () => {
    cf.edges = { ...edges, N: -40 };
    cf.size = 500;
    expect(cf.centreImageCoords()).toStrictEqual({ x: 0, y: 42 });
  });

  it('should move left if the coordinates go beyond the right edge', () => {
    cf.edges = { ...edges, E: 630 };
    cf.size = 560
    expect(cf.centreImageCoords()).toStrictEqual({ x: -72, y: 0 });
  });

  it('should move right if the coordinates go beyond the left edge', () => {
    cf.edges = { ...edges, W: -30 };
    cf.size = 560;
    expect(cf.centreImageCoords()).toStrictEqual({ x: 32, y: 0 });
  });
});