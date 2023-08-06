import { ReactNode } from "react";
import { SierpinskiTriangle } from "../fractals/fractal-configs/1-sierpinski";
import { CantorSet } from "../fractals/fractal-configs/2-cantor";
import { Newton } from "../fractals/fractal-configs/3-newton";
import { MandelbrotSet } from "../fractals/fractal-configs/4-mandelbrot";
import { JuliaSet } from "../fractals/fractal-configs/5-julia";
import { HeighwayDragon } from "../fractals/fractal-configs/6-dragon";

type FractalConfig = {
  label: string,
  url: string,
  component: () => JSX.Element,
  c?: ReactNode,
}

export const fractals: FractalConfig[] = [
  {
    label: "Sierpiński triangle",
    url: '/sierpinski',
    component: SierpinskiTriangle,
  },
  {
    label: "Cantor set",
    url: '/cantor',
    component: CantorSet,
  },
  {
    label: "Newton's fractal",
    url: '/newton',
    component: Newton,
  },
  {
    label: "Mandelbrot set",
    url: '/mandelbrot',
    component: MandelbrotSet,
  },
  {
    label: "Julia set",
    url: '/julia',
    component: JuliaSet,
  },
  {
    label: "Heighway dragon",
    url: '/dragon',
    component: HeighwayDragon,
  },
];