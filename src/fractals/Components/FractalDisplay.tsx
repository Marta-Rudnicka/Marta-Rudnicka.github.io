import { DefaultLayout } from "../default-view/DefaultLayout";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { FullScreenLayout } from "../full-screen-view/FullScreenLayout";
import { canvasInputs, DrawFuncArgs, MainFractalControlProps, Parameters } from "../../types";
import { Controls } from "./Controls";
import { FullScreenContext } from "./ComplexPlane/ComplexPlane";

export type FractalDisplayProps = MainFractalControlProps & {
  altTabIndex?: number;
  canvasInputs: canvasInputs;
  canvasSize: number;
  descriptionTabIndex: number;
  draw: (args: DrawFuncArgs) => void;
  drawParameters: Parameters;
  footerTabIndex?: number;
  inFocus?: boolean;
  prevCanvasSize?: number | null,
  setFullScreen: Dispatch<SetStateAction<boolean>>
  setInFocus?: Dispatch<SetStateAction<string | null>>;
}

export function FractalDisplay(props: FractalDisplayProps) {
  const { adjustPropertiesToScreenSize, canvasSize } = props;
  const [inFocus, setInFocus] = useState(null as null | string);
  const fullScreen = useContext(FullScreenContext);


  function handleChangeViewIconClick() {
    if (fullScreen) {
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
  }, []);

  const controls = <Controls
    sliders={props.sliders}
    buttonPairs={props.buttonPairs}
    radioInputs={props.radio}
    altControls={props.altControls}
    children={props.controlsChildren}
    altTabIndex={props.altTabIndex}
  />;

  // prevent focusing on MathJax equations
  const equations = document.querySelectorAll('.MathJax');
  equations.forEach(element => {
    element.setAttribute('tabIndex', '-1');
  });

  if (fullScreen) {
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
      altControls={props.altControls}
      canvasInputs={props.canvasInputs}
      canvasSize={canvasSize}
      controls={controls}
      description={props.description}
      descriptionTabIndex={props.descriptionTabIndex}
      draw={props.draw}
      drawParameters={props.drawParameters}
      handleClick={handleChangeViewIconClick}
      nextLink={props.nextLink}
      prevLink={props.prevLink}
      setInFocus={props.setInFocus || setInFocus}
      title={props.title}
    />
  );
}
