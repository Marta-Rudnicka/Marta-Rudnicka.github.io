import { Dispatch, ReactNode, SetStateAction } from "react";

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
}

export function Slider(props: SliderProps) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    ) {
    const newValue = parseFloat(parseFloat(e.currentTarget.value).toFixed(props.inputRounding || 1));
    props.setValue(newValue);
  }

  function handleKeyboardInput(e: React.KeyboardEvent<HTMLDivElement>) {
    if (["ArrowRight", "+"].includes(e.key)) {
      const step = props.stepSize || 1;
      const newValue = parseFloat((props.value + step).toFixed(props.inputRounding || 1));
      e.preventDefault();
      props.setValue(newValue);
    }
    if (["ArrowLeft", "-"].includes(e.key)) {
      const step = props.stepSize || 1;
      const newValue = parseFloat((props.value - step).toFixed(props.inputRounding || 1));
      e.preventDefault();
      props.setValue(newValue);
    }
  }

  return (
    <div key={props.value} tabIndex={-1} >
      <div className="slider-input-container slider-grid" tabIndex={-1}>
        <input
          type="number"
          value={props.value}
          tabIndex={props.tabIndex}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyboardInput(e)}
          step={props.stepSize}
        />
        <div tabIndex={-1} className="right">{props.minValue}</div>
        <input
          onKeyDown={(e) => handleKeyboardInput(e)}
          type="range"
          min={props.minValue}
          max={props.maxValue}
          step={props.stepSize}
          onChange={(e) => handleChange(e)}
          tabIndex={props.tabIndex + 1}
          value={props.value}
          className="slider-input"
          id={props.id}
          name={props.id}
        />
        <div tabIndex={-1}>{props.maxValue}</div>
      </div>
    </div>
  );
}
