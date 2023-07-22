import { draw } from "./draw";
import { Description } from "./description";
import { useState } from "react";
import { FractalDisplay } from "../../Components/FractalDisplay";
import { getSize } from "../../utils";
import { FullScreenContext } from "../../Components/ComplexPlane/ComplexPlane";

export function CantorSet() {
  const [fullScreen, setFullScreen] = useState(false);
  const [canvasSize, setCanvasSize] = useState(getSize(fullScreen));

  return (
    <FullScreenContext.Provider value={fullScreen} >
      <FractalDisplay
        canvasInputs={{}}
        canvasSize={canvasSize}
        description={Description()}
        draw={draw}
        drawParameters={{}}
        nextLink="/#/newton"
        prevLink="/#/sierpinski"
        setFullScreen={setFullScreen}
        title="Cantor set - placeholder"
        descriptionTabIndex={6}
      />
    </FullScreenContext.Provider>

  );
}
