import { DefaultLayout } from "../../components/default-view/DefaultLayout";
import { draw } from "./draw";
import { description } from "./description";
import { useEffect, useState } from "react";
import { getIterationsNumber, getSize } from "../../utils";
import { FullScreenLayout } from "../../components/full-screen-view/FullScreenLayout";
import { SliderControlProps } from "../../components/SliderControl";
import { ControlsWrapper } from "../../components/ControlsWrapper";

export function SierpinskiTriangle() {
  const [iterations, setIterations] = useState(5)
  const [fullScreen, setFullScreen] = useState(false);
  const [size, setSize ] = useState(getSize(fullScreen))
  const [maxIterations, setMaxIterations] = useState(getIterationsNumber(false));

  function handleResize(): void{
    setSize(getSize(fullScreen));
    setMaxIterations(getIterationsNumber(fullScreen));
    if (iterations > maxIterations){
      setIterations(maxIterations);
    }
  }

  function handleChangeViewIconClick(){
    if(fullScreen){
      setFullScreen(false)
    } else {
      setFullScreen(true);
      document.documentElement.requestFullscreen();
    }

  }

  const sliders:SliderControlProps[] = [{
    defaultValue: 5,
    info: "dummy info",
    label: "iterations",
    maxValue: maxIterations,
    minValue: 1,
    setValue: setIterations,
  }];

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  if (fullScreen) {
    return (
      <FullScreenLayout
        draw={draw}
        parameters={{ iterations }}
        handleClick={handleChangeViewIconClick}
        canvasSize={size}
        controls={<ControlsWrapper
          sliders={sliders}
          fullScreen={fullScreen}
        />}
      />
    );
  }

  return (
    <DefaultLayout
      draw={draw}
      parameters={{ iterations }}
      handleClick={handleChangeViewIconClick}
      conrols={<ControlsWrapper
        sliders={sliders}
        fullScreen={fullScreen}
      />}
      title="Sierpiński triangle - work in progress"
      description={description}
      prevLink="/#/dummy"
      nextLink="/#/dummy"
      canvasSize={size}
    />
  );
}