import { Button, Collapse,  } from "@blueprintjs/core";
import { useState } from "react";
import { Info } from "../../../components/icons/Info";

export type ButtonPairControlProps = {
  label1: string;
  label2: string;
  info: string;
  handleClick1: () => void;
  handleClick2: () => void;
  tabIndex: number;
}

export function ButtonPairControl(props: ButtonPairControlProps){
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen(){
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <div className="slider-container">
      <label><span onClick={toggleIsOpen}><Info/></span></label>
      <Collapse isOpen={isOpen}>{props.info}</Collapse>
        <div>
          <Button onClick={props.handleClick1} tabIndex={props.tabIndex}>{props.label1}</Button>
          <Button onClick={props.handleClick2} tabIndex={props.tabIndex + 1}>{props.label2}</Button>
        </div>
    </div>
  );
}
