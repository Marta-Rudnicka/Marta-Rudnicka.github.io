import { getCanvasSize } from "../utils"

describe('getSize', () => {
  it('should return width if the width is smaller than height', () => {
    const height = 1024;
    const width = 870;
    expect(getCanvasSize(height, width, true)).toBe(870);
  });

  it('should return height if the height is smaller than width', () => {
    const height = 1024;
    const width = 1056;
    expect(getCanvasSize(height, width, true)).toBe(1024);
  });

  it('should return 623', () => {
    const height = 1024;
    const width = 870;
    expect(getCanvasSize(height, width, false)).toBe(653);
  });

  it('should return 738', () => {
    const height = 1024;
    const width = 2048;
    expect(getCanvasSize(height, width, false)).toBe(979);
  });
});