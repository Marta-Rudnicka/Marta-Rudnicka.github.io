import { Radio, RadioGroup } from "@blueprintjs/core";
import { InfoLabel } from "./InfoLabel";
import { Dispatch, SetStateAction } from "react";

export type RadioControlProps = {
  label: string;
  info?: string;
  setValue: Dispatch<SetStateAction<string>>;
  tabIndex: number;
  value: string,
  options: string[]
}


export function RadioInput(props: RadioControlProps) {
  const options = props.options.map(o => <Radio label={o} value={o} key={o}/>)

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
