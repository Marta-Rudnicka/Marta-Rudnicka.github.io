import { draw } from "./draw";
import { Description } from "./description";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { complex } from "mathjs";
import { createImageData } from "./algorithm";
import { ComplexPlaneFractalDisplay } from "../../Components/ComplexPlane/ComplexPlane";

export function MandelbrotSet() {

  const sliders: SliderControlProps[] = [];

  return (<ComplexPlaneFractalDisplay
    createImageData={createImageData}
    range={3}
    startValue={complex(-2, -1.5)}
    description={Description()}
    draw={draw}
    nextLink="/#/dummy"
    prevLink="/#/example"
    sliders={sliders}
    title="Mandelbrot Set - demo"
  />
  );
}
