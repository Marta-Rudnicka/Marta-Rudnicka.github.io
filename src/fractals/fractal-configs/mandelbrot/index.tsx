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
    range={3}
    startValue={[-2, -1.5]}
    description={description}
    draw={draw}
    nextLink="/#/julia"
    prevLink="/#/newton"
    title="Mandelbrot Set"
    xReal={0}
    xImaginary={0}
    descriptionTabIndex={navTabIndex + 6}
  />
  );
}
