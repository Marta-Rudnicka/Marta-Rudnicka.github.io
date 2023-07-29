import { draw } from "./draw";
import { Description } from "./description";
import { createImageData } from "./algorithm";
import { ComplexPlaneFractalDisplay } from "../../Components/ComplexPlane/ComplexPlane";
import { useContext, useMemo } from "react";
import { NavTabContext } from "../../../App";

export function MandelbrotSet() {

  const description = useMemo(() => Description(), []);
  const navTabIndex = useContext(NavTabContext);

  return (<ComplexPlaneFractalDisplay
    createImageData={createImageData}
    description={description}
    descriptionTabIndex={navTabIndex + 6}
    draw={draw}
    nextLink="/#/julia"
    prevLink="/#/newton"
    range={3}
    startValue={[-2, -1.5]}
    title="Mandelbrot Set"
    xImaginary={0}
    xReal={0}
  />
  );
}
