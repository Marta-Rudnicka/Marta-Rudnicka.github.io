import { ReactElement, ReactNode } from "react"
import { Canvas } from "../Components/Canvas";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { AppNav } from "./AppNav";
import { FullScreenLayoutProps } from "../full-screen-view/FullScreenLayout";
import './default-view.css';

type DefaultLayoutProps = FullScreenLayoutProps & {
  title: string;
  description: ReactNode;
  extraControls?: ReactElement;
  prevLink?: string;
  nextLink?: string;
}

export function DefaultLayout(props: DefaultLayoutProps) {

  if (document.fullscreenElement) {
    document.exitFullscreen();
  }

  const height = props.canvasSize + 30 + "px";
  return (
    <div className="default-layout">
      <Header />
      <h1>{props.title}</h1>
      <div className="default-layout-inner">
        <div className="top-row" style={{ height:height}}>
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
            {props.controls}
          </div>
          <div className="description floating-box">
            {props.description}
          </div>
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