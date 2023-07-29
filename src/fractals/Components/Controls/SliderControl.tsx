import { Dispatch, ReactNode, SetStateAction } from "react";
import { Slider } from "./Slider";
import { InfoLabel } from "./InfoLabel";

export type SliderControlProps = {
  delayed?: boolean;
  id?: string;
  info?: string | ReactNode;
  inputRounding?: number,
  label: string | ReactNode;
  labelStepSize?: number
  maxValue: number;
  minValue: number;
  setShowSliderInfo?: Dispatch<SetStateAction<boolean>>,
  setValue: Dispatch<SetStateAction<number>>
  stepSize?: number;
  tabIndex: number;
  value: number;
}

export function SliderControl(props: SliderControlProps) {
  return (
    <div className="slider-container">
      <div className='slider-label'>
        <InfoLabel info={props.info?.toString()} />
        <label htmlFor={props.id}>{props.label}</label>
      </div>
      <div>
        <Slider
          delayed={props.delayed}
          id={props.id}
          inputRounding={props.inputRounding}
          label={props.label}
          maxValue={props.maxValue}
          minValue={props.minValue}
          setShowSliderInfo={props.setShowSliderInfo}
          setValue={props.setValue}
          stepSize={props.stepSize || 1}
          tabIndex={props.tabIndex}
          value={props.value}
        />
      </div>
    </div>
  );
}
