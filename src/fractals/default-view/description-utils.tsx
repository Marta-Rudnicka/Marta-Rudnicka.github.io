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

type ImageProps = {
  alt: string;
  src: string;
  tabIndex: number;
}

export function Img(props: ImageProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleClick() {
    setDialogOpen(true);
  }
  function handleKeyboardInput(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      setDialogOpen(dialogOpen ? false : true);
    }
  }
  return (
    <div className="image-container">
      <div className="thumbnail-container">
        <div className="img-instruction">Click or press enter to better see the image</div>
        <img
          alt={props.alt}
          className='img'
          onClick={handleClick}
          onKeyDown={handleKeyboardInput}
          src={props.src}
          tabIndex={props.tabIndex}
        />
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
          <img alt={props.alt} src={props.src} className='dialog-img' />
        </DialogBody>
      </Dialog>
    </div>
  );
}