import { ReactElement, ReactNode } from "react"
import { Canvas } from "../Components/Canvas";
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
  descriptionTabIndex: number;
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
          <div className="canvas floating-box" tabIndex={-1}>
            <Canvas
              canvasInputs={props.canvasInputs}
              draw={props.draw}
              drawParameters={props.drawParameters}
              handleClick={props.handleClick}
              size={props.canvasSize}
              setInFocus={props.setInFocus}
            />
          </div>
          <div className="controls floating-box" tabIndex={10} onFocus={() => props.setInFocus('controls')}>
            {props.controls}
          </div>
          <div className="description" tabIndex={props.descriptionTabIndex} onFocus={() => props.setInFocus('description')}>
            {props.description}
          </div>
        </div>
        <div className="extra-controls" onFocus={() => props.setInFocus('extra-control')}>
          {props.extraControls &&
            props.extraControls
          }
          <AppNav descriptionTabIndex={props.descriptionTabIndex}
            prevLink={props.prevLink}
            nextLink={props.nextLink}
          />
        </div>
      </div>
    </div>
  );
}