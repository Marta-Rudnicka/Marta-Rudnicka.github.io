import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export type SliderProps = {
  minValue: number;
  maxValue: number;
  value: number;
  setValue: Dispatch<SetStateAction<number>>
  stepSize?: number;
  tabIndex: number;
  label: string;
  inputRounding?: number
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
    if (inputRef?.current) inputRef.current.focus();
  }

  const inputRef = useRef(document.getElementById(props.label));

  useEffect(() => {
    if (inputRef?.current) inputRef.current.focus();
  }, []);

  function handleKeyboardInput(e: React.KeyboardEvent<HTMLDivElement>) {
    if (["ArrowRight", "+"].includes(e.key)) {
      const step = props.stepSize || 1;
      const newValue = parseFloat((props.value + step).toFixed(props.inputRounding || 1));
      e.preventDefault(); // prevent scrolling
      props.setValue(newValue)
      console.log('+')
    }
    if (["ArrowLeft", "-"].includes(e.key)) {
      const step = props.stepSize || 1;
      const newValue = parseFloat((props.value - step).toFixed(props.inputRounding || 1));
      e.preventDefault(); // prevent scrolling
      props.setValue(newValue);
      console.log('-')
    }
  }

  return (
    <div key={props.value} tabIndex={-1}>
      <div className="slider-input-container" tabIndex={-1}>
        <div tabIndex={-1}>{props.minValue}</div>
        <input
          onKeyDown={handleKeyboardInput}
          type="range"
          min={props.minValue}
          max={props.maxValue}
          step={props.stepSize}
          onChange={handleChange}
          tabIndex={props.tabIndex}
          value={props.value}
          className="slider-input"
          id={props.label}
          name={props.label}
        />
        <div tabIndex={-1}>{props.maxValue}</div>
      </div>
    </div>
  );
}
