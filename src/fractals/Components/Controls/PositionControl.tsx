import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { ArrowDown } from "../../../components/icons/ArrowDown";
import { ArrowLeft } from "../../../components/icons/ArrowLeft";
import { ArrowRight } from "../../../components/icons/ArrowRight";
import { ArrowUp } from "../../../components/icons/ArrowUp";
import { Point } from "../../../types";
import './controls.css';

export type PositionControlProps = {
  children?: ReactNode;
  focused: boolean;
  id: string;
  inc: number,
  invisible?: boolean;
  nextFocus?: HTMLElement | null;
  prevFocus?: HTMLElement | null;
  setInFocus?: Dispatch<SetStateAction<string | null>>
  setPosition: (coords: Point | [number, number]) => void;
  tabIndex?: number;
  x: number,
  y: number,
}
export function PositionControl(props: PositionControlProps) {
  const [xPosition, setXPosition] = useState(props.x);
  const [yPosition, setYPosition] = useState(props.y);
  const [upClass, setUpClass] = useState('');
  const [downClass, setDownClass] = useState('');
  const [leftClass, setLeftClass] = useState('');
  const [rightClass, setRightClass] = useState('');

  function moveLeft() {
    const newX = xPosition - props.inc;
    setXPosition(newX);
    setLeftClass('active');
    document.getElementById(`${props.id}-arrow-left`)?.focus();
    props.setPosition([newX, yPosition]);
  }

  function moveRight() {
    const newX = xPosition + props.inc;
    setXPosition(newX);
    setRightClass('active');
    document.getElementById(`${props.id}-arrow-right`)?.focus();
    props.setPosition([newX, yPosition]);
  }

  function moveUp() {
    const newY = yPosition - props.inc;
    setYPosition(newY);
    setUpClass('active');
    document.getElementById(`${props.id}-arrow-up`)?.focus();
    props.setPosition([xPosition, newY]);
  }

  function moveDown() {
    const newY = yPosition + props.inc;
    setYPosition(newY);
    setDownClass('active');
    document.getElementById(`${props.id}-arrow-down`)?.focus();
    props.setPosition([xPosition, newY]);
  }

  function resetClasses() {
    setDownClass('');
    setUpClass('');
    setLeftClass('');
    setRightClass('');
  }

  function handleKeyboardInput(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!props.focused) {
      return;
    }
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault(); // prevent scrolling
      switch (e.key) {
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
        case "ArrowUp":
          moveUp();
          break;
        case "ArrowDown":
          moveDown();
          break;
      }
    }
    if (props.nextFocus && (e.key === "Tab" || e.key === "PageDown")) {
      e.preventDefault(); // prevent scrolling or focusing on the next key in the group
      props.nextFocus.focus();
    }
    if (props.prevFocus && e.key === "PageUp") {
      e.preventDefault(); // prevent scrolling or focusing on the next key in the group
      props.prevFocus.focus();
    }
  }

  function handleFocus() {
    if (props.setInFocus) {
      props.setInFocus(props.id)
    }
  }

  if (props.invisible) {
    return (
      <div
        className="position-control"
        onKeyDown={(e) => handleKeyboardInput(e)}
        onKeyUp={() => resetClasses()}
      >
        {props.children}
      </div>
    );
  }
  return (
    <div
      className="position-control"
      onKeyDown={(e) => handleKeyboardInput(e)}
      onKeyUp={() => resetClasses()}
      onFocus={handleFocus}
      tabIndex={props.tabIndex}
    >
      <div className="position-control-row">
        <button onClick={moveUp} className={upClass} id={`${props.id}-arrow-up`} tabIndex={-1}>
          <ArrowUp />
        </button>
      </div>
      <div className="position-control-row">
        <button onClick={moveLeft} className={leftClass} id={`${props.id}-arrow-left`} tabIndex={-1}>
          <ArrowLeft />
        </button>
        <button onClick={moveRight} className={rightClass} id={`${props.id}-arrow-right`} tabIndex={-1}>
          <ArrowRight />
        </button>
      </div>
      <div className="position-control-row">
        <button onClick={moveDown} className={downClass} id={`${props.id}-arrow-down`} tabIndex={-1}>
          <ArrowDown />
        </button>
      </div>
    </div>
  );
}
