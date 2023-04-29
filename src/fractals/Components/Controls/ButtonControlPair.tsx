import { Button, Collapse,  } from "@blueprintjs/core";
import { useState } from "react";
import { Info } from "../../../components/icons/Info";

export type ButtonPairControlProps = {
  label1: string;
  label2: string;
  info: string;
  handleClick1: () => void;
  handleClick2: () => void;
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
          <Button onClick={props.handleClick1}>{props.label1}</Button>
          <Button onClick={props.handleClick2}>{props.label2}</Button>
        </div>
    </div>
  );
}
