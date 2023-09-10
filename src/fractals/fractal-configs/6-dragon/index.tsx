import { draw } from "./draw";
import { Description } from "./description";
import { useContext, useEffect, useMemo, useState } from "react";
import { FractalDisplay } from "../../Components/FractalDisplay";
import { getSize } from "../../utils";
import { FullScreenContext } from "../../Components/ComplexPlane/ComplexPlane";
import { SliderControlProps } from "../../Components/Controls/SliderControl";
import { NavTabContext } from "../../../App";
import { RadioControlProps } from "../../Components/Controls/RadioInput";

function getMaxIterations(size: number) {
  return 20;
}

export function HeighwayDragon() {
  const [fullScreen, setFullScreen] = useState(false);
  const [canvasSize, setCanvasSize] = useState(getSize(fullScreen));
  const [iterations, setIterations] = useState(11);
  const [animate, setAnimate] = useState("on");

  const maxIterations = getMaxIterations(canvasSize);
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
    maxValue: maxIterations,
    minValue: 0,
    setValue: setIterations,
    tabIndex: 0,
  }];

  const radio: RadioControlProps[] = [{
    label: "Add each iteration with a delay (animate)",
    options: ["on", "off"],
    setValue: setAnimate,
    tabIndex: 2,
    value: animate,
  }]
  const description = useMemo(() => <Description ti={navTabIndex + 13} />, [navTabIndex]);

  return (
    <FullScreenContext.Provider value={fullScreen} >
      <FractalDisplay
        canvasInputs={{ key: iterations.toString() }}
        canvasSize={canvasSize}
        description={description}
        descriptionTabIndex={navTabIndex + 13}
        draw={draw}
        drawParameters={{ iterations, animate }}
        nextLink="/#/julia"
        prevLink="/#/l-system"
        radio={radio}
        setFullScreen={setFullScreen}
        sliders={sliders}
        title="Heighway dragon"
      />
    </FullScreenContext.Provider>

  );
}
