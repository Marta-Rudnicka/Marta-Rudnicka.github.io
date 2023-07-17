import { DefaultLayout } from "../default-view/DefaultLayout";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FullScreenLayout } from "../full-screen-view/FullScreenLayout";
import { canvasInputs, DrawFuncArgs, MainFractalControlProps, Parameters } from "../../types";
import { Controls } from "./Controls";

export type FractalDisplayProps = MainFractalControlProps & {
  canvasInputs: canvasInputs;
  canvasSize: number;
  draw: (args: DrawFuncArgs) => void;
  drawParameters: Parameters;
  fullScreen: boolean;
  prevCanvasSize?: number | null,
  setFullScreen: Dispatch<SetStateAction<boolean>>
  descriptionTabIndex: number;
  inFocus?: boolean;
  setInFocus?: Dispatch<SetStateAction<string | null>>;
}

export function FractalDisplay(props: FractalDisplayProps) {
  const { fullScreen, adjustPropertiesToScreenSize, canvasSize } = props;
  const [inFocus, setInFocus ] = useState(null as null | string )


  function handleChangeViewIconClick() {
    if (props.fullScreen) {
      props.setFullScreen(false)
    } else {
      props.setFullScreen(true);
      document.documentElement.requestFullscreen();
    }
  }

  useEffect(() => {
    function handleResize(): void {
      adjustPropertiesToScreenSize && props.prevCanvasSize && adjustPropertiesToScreenSize(
        props.prevCanvasSize,
        props.canvasSize
      );
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fullScreen]);

  const controls = <Controls
    sliders={props.sliders || []}
    buttonPairs={props.buttonPairs || []}
    altControls={props.altControls}
    fullScreen={props.fullScreen}
    children={props.controlsChildren}
  />;

  if (props.fullScreen) {
    return (
      <FullScreenLayout
        draw={props.draw}
        drawParameters={props.drawParameters}
        handleClick={handleChangeViewIconClick}
        canvasSize={canvasSize}
        canvasInputs={props.canvasInputs}
        controls={controls}
        altControls={props.altControls}
        setInFocus={props.setInFocus || setInFocus}
      />
    );
  }

  return (
    <DefaultLayout
      draw={props.draw}
      drawParameters={props.drawParameters}
      handleClick={handleChangeViewIconClick}
      controls={controls}
      altControls={props.altControls}
      title={props.title}
      description={props.description}
      prevLink={props.prevLink}
      nextLink={props.nextLink}
      canvasSize={canvasSize}
      canvasInputs={props.canvasInputs}
      descriptionTabIndex={props.descriptionTabIndex}
      setInFocus={props.setInFocus || setInFocus}
      />
  );
}
