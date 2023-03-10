import { MouseEventHandler, ReactElement } from "react"
import { DrawFunc, Parameters } from "../../types";
import { Canvas } from "../Canvas";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { AppNav } from "./AppNav";
import './default-view.css';

type DefaultLayoutProps = {
  draw: DrawFunc;
  conrols: ReactElement;
  title: string;
  description: string[];
  extraControls?: ReactElement;
  prevLink?: string;
  nextLink?: string;
  parameters: Parameters;
  handleClick: MouseEventHandler;
  canvasSize: number;
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
            fullScreen={false}
            id="canvas"
            draw={props.draw}
            parameters={props.parameters}
            handleClick={props.handleClick}
            size={props.canvasSize}
          />
        </div>
        <div className="controls floating-box">
          {props.conrols}
        </div>
        <div className="description floating-box">
          {props.description.map(p => <p>{p}</p>)}
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