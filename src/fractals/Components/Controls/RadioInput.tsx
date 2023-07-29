import { Radio, RadioGroup } from "@blueprintjs/core";
import { InfoLabel } from "./InfoLabel";
import { Dispatch, SetStateAction } from "react";

export type RadioControlProps = {
  info?: string;
  label: string;
  options: string[]
  setValue: Dispatch<SetStateAction<string>>;
  tabIndex: number;
  value: string,
}


export function RadioInput(props: RadioControlProps) {
  const options = props.options.map((o, index) => <Radio label={o} value={o} key={o} tabIndex={props.tabIndex + index} />)
  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    props.setValue(e.currentTarget.value)

  }
  return (
    <div className="slider-container">
      <InfoLabel info={props.info} />
      <div>
        <RadioGroup
          label={props.label}
          onChange={e => handleChange(e)}
          selectedValue={props.value}
        >
          {options}
        </RadioGroup>
      </div>
    </div>
  );
}
