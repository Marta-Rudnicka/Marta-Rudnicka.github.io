import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PositionControl } from "../../Components/Controls/PositionControl";
import { Point } from "../../../types";

type ComplexPlaneProps = {
  handleMouseUp: () => void;
  handleMouseDown: () => void;
  handleMouseMove: (p: Point) => void;
  canvasSize: number;
  setCursorPosition: Dispatch<SetStateAction<Point>>;
}
export function ComplexPlaneAltControls(props: ComplexPlaneProps) {
  const [tracking, setTracking] = useState(false);
  const [position, setPosition] = useState([0, 0] as Point)

  function handleKeyboardInput(e: React.KeyboardEvent<HTMLDivElement>) {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault(); // prevent scrolling
      if (!tracking) {
        startMovement();
      } else {
        props.handleMouseMove(position);
      }
    }
    if (["Tab", "Enter"].includes(e.key)) {
      setTracking(false);
      endMovement();
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

  useEffect(() => {
    props.setCursorPosition(position);
  })

  return (
    <div className="alt-controls">
      <p>Press and hold the arrows keys to move the image. Press 'Enter' when it is in he right position - this will show the missing parts of the image.</p>
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
          nextFocus={document.querySelector('.app-nav a') as HTMLElement | null}
        />
      </div>
    </div>
  );
}