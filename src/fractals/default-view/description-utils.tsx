import { Dialog, DialogBody } from "@blueprintjs/core";
import { ReactNode, useState } from "react";

type DefProps = {
  phrase: string;
  definition?: string;
  definitionObject?: ReactNode;
  tabIndex: number;
}

export function Def(props: DefProps) {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(open ? false : true);
  }

  function handleKeyboardInput(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === 'Enter') {
      toggleOpen();
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  }
  const def = props.definitionObject
    ? <div className="def-definition">{props.definitionObject}</div>
    : <span className="def-definition">( {props.definition}) </span>;
  return (
    <>
      <span
        className="def-phrase"
        onClick={toggleOpen}
        onKeyDown={(e) => handleKeyboardInput(e)}
        tabIndex={props.tabIndex}
      >{props.phrase} </span>
      {open && def}
    </>
  )
}

type MediaProps = {
  alt: string;
  src: string;
  tabIndex: number;
  video?: boolean;
}

export function Media(props: MediaProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleClick() {
    setDialogOpen(true);
  }
  function handleKeyboardInput(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      setDialogOpen(dialogOpen ? false : true);
    }
  }
  const windowWidth = window.innerWidth;
  return (
    <div className="image-container"
      onClick={handleClick}
      onKeyDown={handleKeyboardInput}
    >
      <div className="thumbnail-container" tabIndex={props.tabIndex}>
        <div className="img-instruction">Click or press enter to see larger media</div>
        {!props.video && <img alt={props.alt} className='img' src={props.src} />}
        {props.video && (<video width={windowWidth / 4} autoPlay muted><source src={props.src} type="video/mp4" /></video>)}
      </div>
      <Dialog
        autoFocus={true}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogBody>
          <p className="dialog-info">Press 'Esc' or click outside to close</p>
          {!props.video && <img alt={props.alt} src={props.src} className='dialog-img' />}
          {props.video && (<video controls><source src={props.src} type="video/mp4" /></video>)}
        </DialogBody>
      </Dialog>
    </div>
  );
}