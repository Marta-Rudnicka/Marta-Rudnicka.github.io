import { Dispatch, ReactNode, SetStateAction, useState } from "react";

export type SliderProps = {
  minValue: number;
  maxValue: number;
  value: number;
  setValue: Dispatch<SetStateAction<number>>
  stepSize?: number;
  tabIndex: number;
  label: string | ReactNode;
  id?: string;
  inputRounding?: number;
  setShowSliderInfo?: Dispatch<SetStateAction<boolean>>,
  delayed?: boolean;
}

export function Slider(props: SliderProps) {
  const [localValue, setLocalValue ] = useState(props.value)
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
    if(props.delayed) {
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
          type="number"
          value={localValue}
          tabIndex={props.tabIndex}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyboardInput(e)}
          min={props.minValue}
          max={props.maxValue}
          step={step}
          onMouseUp={acceptValue}
          onBlur={() => setLocalValue(props.value)}
        />
        <div tabIndex={-1} className="right">{props.minValue}</div>
        <input
          onKeyDown={(e) => handleKeyboardInput(e)}
          type="range"
          min={props.minValue}
          max={props.maxValue}
          step={step}
          onChange={(e) => handleChange(e)}
          tabIndex={props.tabIndex + 1}
          value={localValue}
          className="slider-input"
          id={props.id}
          name={props.id}
          onMouseUp={acceptValue}
          onBlur={() => setLocalValue(props.value)}
        />
        <div tabIndex={-1}>{props.maxValue}</div>
      </div>
    </div>
  );
}
