import { Dispatch, SetStateAction } from "react";

export type SliderProps = {
  minValue: number;
  maxValue: number;
  value: number;
  setValue: Dispatch<SetStateAction<number>>
  stepSize?: number;
  tabIndex: number;
  label: string;
}

export function roundInput(i: number, stepSize: number) {
  let fixedVal = 0;
  const log = Math.log10(stepSize);
  if (log < 0) {
    fixedVal = Math.abs(log - 1);
  }
  return parseFloat(i.toFixed(fixedVal));
}

export function Slider(props: SliderProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(e.currentTarget.value);
    props.setValue(newValue);
  }
  return (
    <div key={props.value}>
      <div className="slider-input-container">
        <div>{props.minValue}</div>
        <input
          type="range"
          min={props.minValue}
          max={props.maxValue}
          step={props.stepSize}
          onChange={handleChange}
          tabIndex={props.tabIndex}
          value={props.value}
          className="slider-input"
          id={props.label}
        />
        <div>{props.maxValue}</div>
      </div>
      <div className="slider-input-container">{props.value}</div>
    </div>
  );
}
