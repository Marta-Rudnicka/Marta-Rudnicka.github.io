import { useState } from "react";
import { ArrowDown } from "../../../components/icons/ArrowDown";
import { ArrowLeft } from "../../../components/icons/ArrowLeft";
import { ArrowRight } from "../../../components/icons/ArrowRight";
import { ArrowUp } from "../../../components/icons/ArrowUp";
import { Point } from "../../../types";
import './controls.css';

type PositionControlProps = {
  x: number,
  y: number,
  inc: number,
  setPosition: (coords: Point) => void;
  id: string;
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

  return (
    <div
      className="position-control"
      onKeyDown={(e) => handleKeyboardInput(e)}
      onKeyUp={() => resetClasses()}
    >
      <div className="position-control-row">
        <button onClick={moveUp} className={upClass} id={`${props.id}-arrow-up`}>
          <ArrowUp />
        </button>
      </div>
      <div className="position-control-row">
        <button onClick={moveLeft} className={leftClass} id={`${props.id}-arrow-left`}>
          <ArrowLeft />
        </button>
        <button onClick={moveRight} className={rightClass} id={`${props.id}-arrow-right`}>
          <ArrowRight />
        </button>
      </div>
      <div className="position-control-row">
        <button onClick={moveDown} className={downClass} id={`${props.id}-arrow-down`}>
          <ArrowDown />
        </button>
      </div>
    </div>
  );
}
