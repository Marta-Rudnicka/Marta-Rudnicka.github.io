import { ReactElement } from "react"
import { DrawFunc } from "../../types";
import { Canvas } from "../Canvas";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { AppNav } from "./AppNav";
import './default-view.css';

type DefaultLayoutProps = {
  draw: DrawFunc;
  conrols: ReactElement;
  title: string;
  description: string;
  extraControls?: ReactElement;
  prevLink?: string;
  nextLink?: string;
}

export function DefaultLayout(props: DefaultLayoutProps, parameters: unknown) {
  return (
    <div className="defaultLayout">
      <Header />
      <h1>{props.title}</h1>
      <div className="defaultLayoutInner">
        <div className="canvas">
          <Canvas
            fullScreen={false}
            id="canvas"
            draw={props.draw}
            parameters={parameters}
          />
        </div>
        <div className="controls">
          {props.conrols}
        </div>
        <div className="description">
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