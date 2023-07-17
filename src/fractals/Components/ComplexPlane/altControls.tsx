import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { PositionControl } from "../../Components/Controls/PositionControl";
import { Point } from "../../../types";

type ComplexPlaneProps = {
  handleMouseUp: () => void;
  handleMouseDown: () => void;
  handleMouseMove: (p: Point) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  canvasSize: number;
  setCursorPosition: Dispatch<SetStateAction<Point>>;
  children: ReactNode;
}
export function ComplexPlaneAltControls(props: ComplexPlaneProps) {
  const [tracking, setTracking] = useState(false);
  const [position, setPosition] = useState([0, 0] as Point)

  function handleKeyboardInput(e: React.KeyboardEvent<HTMLDivElement>) {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault(); // prevent scrolling
      props.handleMouseMove(position);
      if (!tracking) {
        startMovement();
      }
    }
    if (e.key === '+') {
      props.zoomIn();
    }
    if (e.key === '-') {
      props.zoomOut();
    }
  }

  function startMovement() {
    setTracking(true);
    props.handleMouseDown();
  }

  function endMovement() {
    setTracking(false);
    props.handleMouseUp()
  }

  const inc = Math.round(props.canvasSize / 80);

  return (
    <div
      onKeyDown={(e) => handleKeyboardInput(e)}
      onKeyUp={endMovement}
    >
      <PositionControl
        id="pan"
        inc={inc}
        setPosition={setPosition}
        x={position[0]}
        y={position[1]}
        invisible
      >
        {props.children}
      </PositionControl>
    </div>
  );
}