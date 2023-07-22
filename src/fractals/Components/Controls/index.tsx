import { ReactNode, useContext, useState } from "react";
import { ButtonPairControlProps } from "./ButtonControlPair";
import { ControlHeader } from "./ControlsHeader";
import { SliderControlProps } from "./SliderControl";
import { ControlsBody } from "./ControlsBody";
import { FullScreenContext } from "../ComplexPlane/ComplexPlane";
import { RadioControlProps } from "./RadioInput";

export type ControlProps = {
  sliders?: SliderControlProps[];
  buttonPairs?: ButtonPairControlProps[];
  radioInputs?: RadioControlProps[];
  altControls?: ReactNode;
  altTabIndex?: number;
  children?: ReactNode;
}

export function Controls(props: ControlProps) {
  const fullScreen = useContext(FullScreenContext);
  const [allVisible, setAllVisible] = useState(!fullScreen);
  const initTabIndex = fullScreen ? 3 : 10;
  return (
    <>
      <div className="control-header-wrapper">
        {fullScreen &&
          <ControlHeader
            allVisible={allVisible}
            setAllVisible={setAllVisible}
          />}
      </div>
      {props.children}
      <ControlsBody
        {...props}
        initTabIndex={initTabIndex}
        allVisible={allVisible}
        altTabIndex={props.altTabIndex}
      />
    </>
  );
}