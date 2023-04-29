import { MouseEventHandler, ReactElement, ReactNode } from "react"
import { canvasInputs, DrawFunc, Parameters } from "../../types";
import { Canvas } from "../Components/Canvas";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { AppNav } from "./AppNav";
import './default-view.css';

type DefaultLayoutProps = {
  draw: DrawFunc;
  conrols: ReactElement;
  title: string;
  description: ReactNode;
  extraControls?: ReactElement;
  prevLink?: string;
  nextLink?: string;
  drawParameters: Parameters;
  handleClick: MouseEventHandler;
  canvasSize: number;
  canvasInputs?: canvasInputs;
}

export function DefaultLayout(props: DefaultLayoutProps) {

  if (!window.screenTop && !window.screenY) { // check if in full screen
    document.exitFullscreen();
  }

  return (
    <div className="default-layout">
      <Header />
      <h1>{props.title}</h1>
      <div className="default-layout-inner">
        <div className="canvas floating-box">
          <Canvas
            canvasInputs={props.canvasInputs}
            fullScreen={false}
            draw={props.draw}
            drawParameters={props.drawParameters}
            handleClick={props.handleClick}
            size={props.canvasSize}
          />
        </div>
        <div className="controls floating-box">
          {props.conrols}
        </div>
        <div className="description floating-box">
          {props.description}
        </div>
        <div className="extra-controls">
          {props.extraControls &&
            props.extraControls
          }
          <AppNav
            prevLink={props.prevLink}
            nextLink={props.nextLink}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}