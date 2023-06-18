import { ReactNode, useState } from "react";
import { ButtonPairControlProps } from "./ButtonControlPair";
import { ControlHeader } from "./ControlsHeader";
import { SliderControlProps } from "./SliderControl";
import { ControlsBody } from "./ControlsBody";

export type ControlProps = {
  sliders: SliderControlProps[];
  buttonPairs: ButtonPairControlProps[];
  altControls?: ReactNode;
  fullScreen?: boolean;
  accessible?: boolean;
  children?: ReactNode;
}

export function Controls(props: ControlProps) {
  const [allVisible, setAllVisible] = useState(!props.fullScreen);

  return (
    <>
      <div className="control-header-wrapper">
        {props.fullScreen &&
          <ControlHeader
            allVisible={allVisible}
            setAllVisible={setAllVisible}
          />}
      </div>
      {props.children}
      <ControlsBody
        {...props}
        allVisible={allVisible}
      />
    </>
  );
}