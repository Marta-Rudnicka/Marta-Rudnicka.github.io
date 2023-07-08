import { draw } from "./draw";
import { Description } from "./description";
import { useState } from "react";
import { FractalDisplay } from "../../Components/FractalDisplay";
import { getSize } from "../../utils";

export function CantorSet() {
  const [fullScreen, setFullScreen] = useState(false);
  const [canvasSize, setCanvasSize] = useState(getSize(fullScreen));

  return (<FractalDisplay
    canvasInputs={{}}
    canvasSize={canvasSize}
    description={Description()}
    draw={draw}
    drawParameters={{}}
    fullScreen={fullScreen}
    nextLink="/#/newton"
    prevLink="/#/sierpinski"
    setFullScreen={setFullScreen}
    title="Cantor set - placeholder"
    descriptionTabIndex={6}
  />
  );
}
