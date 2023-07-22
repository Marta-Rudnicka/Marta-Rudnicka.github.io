import { Dispatch, ReactNode, SetStateAction } from "react";
import { Slider } from "./Slider";
import { InfoLabel } from "./InfoLabel";

export type SliderControlProps = {
  label: string | ReactNode;
  minValue: number;
  maxValue: number;
  value: number;
  info?: string | ReactNode;
  setValue: Dispatch<SetStateAction<number>>
  labelStepSize? : number
  stepSize?: number;
  tabIndex: number;
  id?: string;
}

export function SliderControl(props: SliderControlProps){
  return (
    <div className="slider-container">
      <div className='slider-label'>
        <InfoLabel info={props.info?.toString()} />
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
