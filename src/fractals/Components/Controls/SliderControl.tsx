import { Collapse } from "@blueprintjs/core";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Info } from "../../../components/icons/Info";
import { Slider } from "./Slider";

export type SliderControlProps = {
  label: string | ReactNode;
  minValue: number;
  maxValue: number;
  value: number;
  info: string | ReactNode;
  setValue: Dispatch<SetStateAction<number>>
  labelStepSize? : number
  stepSize?: number;
  tabIndex: number;
  id?: string;
}

export function roundInput(i: number, stepSize: number) {
  let fixedVal = 0;
  const log = Math.log10(stepSize);
  if (log < 0) {
    fixedVal = Math.abs(log -1);
  }
  return parseFloat(i.toFixed(fixedVal));
}

export function SliderControl(props: SliderControlProps){
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
      <div className='slider-label'>
        <span onClick={toggleIsOpen}><Info /></span>
        <Collapse isOpen={isOpen}>{props.info}</Collapse>
        <label htmlFor={props.id}>{props.label}</label>
      </div>
      <div>
        <Slider
          minValue={props.minValue}
          maxValue={props.maxValue}
          value={props.value}
          setValue={props.setValue}
          stepSize={props.stepSize || 1}
          tabIndex={props.tabIndex}
          label={props.label}
          id={props.id}
        />
        </div>
    </div>
  );
}
