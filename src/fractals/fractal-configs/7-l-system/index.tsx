import { draw } from "./draw";
import { Description } from "./description";
import { useContext, useEffect, useMemo, useState } from "react";
import { FractalDisplay } from "../../Components/FractalDisplay";
import { getSize } from "../../utils";
import { FullScreenContext } from "../../Components/ComplexPlane/ComplexPlane";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { NavTabContext } from "../../../App";


export function LSystem() {
  const [fullScreen, setFullScreen] = useState(false);
  const [canvasSize, setCanvasSize] = useState(getSize(fullScreen));
  const [iterations, setIterations] = useState(14);
  const navTabIndex = useContext(NavTabContext);

  useEffect(() => {
    const func = () => {
      const newSize = getSize(fullScreen);
      setCanvasSize(newSize);
    };
    window.addEventListener("resize", func);
    return () => window.removeEventListener("resize", func);
  }, [fullScreen, canvasSize]);

  const sliders: SliderControlProps[] = [{
    value: iterations,
    label: "iterations",
    maxValue: 16,
    minValue: 1,
    setValue: setIterations,
    tabIndex: 0,
  },
  ];

  const description = useMemo(() => <Description ti={navTabIndex + 13} />, [navTabIndex]);

  return (
    <FullScreenContext.Provider value={fullScreen} >
      <FractalDisplay
        canvasInputs={{key: iterations.toString()}}
        canvasSize={canvasSize}
        description={description}
        descriptionTabIndex={navTabIndex + 13}
        draw={draw}
        drawParameters={{ iterations }}
        nextLink="/#/dummy"
        prevLink="/#/dragon"
        setFullScreen={setFullScreen}
        sliders={sliders}
        title="L-system demo"
      />
    </FullScreenContext.Provider>
  );
}
