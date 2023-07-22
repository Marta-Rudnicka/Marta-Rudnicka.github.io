import React from "react";
import { Tooltip2 } from "@blueprintjs/popover2";
import { ChevronUp } from "../../../components/icons/ChevronUp";
import { ChevronDown } from "../../../components/icons/ChevronDown";

type ControlHeaderProps = {
  allVisible: boolean;
  setAllVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ControlHeader(props: ControlHeaderProps) {
  const tooltipText = props.allVisible ? 'hide' : 'show';
  function toggleVisible(): void {
    props.allVisible ? props.setAllVisible(false) : props.setAllVisible(true)
  }
  function handleKeyboardInput(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      toggleVisible();
    }
    if (e.key === 'ArrowDown') {
      props.setAllVisible(true);
    }
    if (e.key === 'ArrowUp') {
      props.setAllVisible(false);
    }
  }
  return (
    <div className='control-header'>
      <Tooltip2
        content={<div className="tooltip-bottom"> {tooltipText}</div>}
        hoverOpenDelay={500}
      >
        <h2
          onClick={toggleVisible}
          onKeyDown={(e) => handleKeyboardInput(e)}
        > Controls {
            props.allVisible
              ? <ChevronUp width={25} height={25} />
              : <ChevronDown width={25} height={25} />}
        </h2>
      </Tooltip2>
    </div>
  )
}