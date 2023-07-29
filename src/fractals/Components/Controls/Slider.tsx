import { Dispatch, ReactNode, SetStateAction, useState } from "react";

export type SliderProps = {
  delayed?: boolean;
  id?: string;
  inputRounding?: number;
  label: string | ReactNode;
  maxValue: number;
  minValue: number;
  setShowSliderInfo?: Dispatch<SetStateAction<boolean>>,
  setValue: Dispatch<SetStateAction<number>>
  stepSize?: number;
  tabIndex: number;
  value: number;
}

export function Slider(props: SliderProps) {
  const [localValue, setLocalValue] = useState(props.value)
  const step = props.stepSize || 1;

  function getValidValue(operation: "+" | "-") {
    const change = operation === "+" ? step : -step;
    const val = parseFloat((localValue + change).toFixed(props.inputRounding || 1));
    if (val > props.maxValue) {
      return props.maxValue;
    }
    if (val < props.minValue) {
      return props.minValue;
    }
    return val;
  }

  function acceptValue() {
    props.setValue(localValue);
    props.setShowSliderInfo && props.setShowSliderInfo(false);
  }

  function handleInput() {
    if (props.delayed) {
      props.setShowSliderInfo && props.setShowSliderInfo(true);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(parseFloat(e.currentTarget.value).toFixed(props.inputRounding || 1));
    setLocalValue(newValue);
    handleInput();
  }

  function handleKeyboardInput(e: React.KeyboardEvent<HTMLDivElement>) {
    if (["ArrowRight", "ArrowUp", "+"].includes(e.key)) {
      const newValue = getValidValue("+");
      if (props.delayed) {
        setLocalValue(newValue);
        handleInput();
      } else {
        e.preventDefault();
        setLocalValue(newValue);
        props.setValue(newValue)
      }
    }
    if (["ArrowLeft", "ArrowDown", "-"].includes(e.key)) {
      const newValue = getValidValue('-');
      if (props.delayed) {
        setLocalValue(newValue);
        handleInput();
      } else {
        e.preventDefault();
        setLocalValue(newValue);
        props.setValue(newValue)
      }
    }
    if (e.key === 'Enter' && props.delayed) {
      e.preventDefault();
      acceptValue();
    } else {
      handleInput();
    }
  }

  return (
    <div key={props.value} tabIndex={-1} >
      <div className="slider-input-container slider-grid" tabIndex={-1}>
        <input
          max={props.maxValue}
          min={props.minValue}
          onBlur={() => setLocalValue(props.value)}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyboardInput(e)}
          onMouseUp={acceptValue}
          tabIndex={props.tabIndex}
          type="number"
          step={step}
          value={localValue}
        />
        <div tabIndex={-1} className="right">{props.minValue}</div>
        <input
          className="slider-input"
          id={props.id}
          max={props.maxValue}
          min={props.minValue}
          name={props.id}
          onBlur={() => setLocalValue(props.value)}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyboardInput(e)}
          onMouseUp={acceptValue}
          step={step}
          tabIndex={props.tabIndex + 1}
          type="range"
          value={localValue}
        />
        <div tabIndex={-1}>{props.maxValue}</div>
      </div>
    </div>
  );
}
