import { Button, Menu, MenuDivider, MenuItem, Navbar } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { fractals } from "../../config/links";
import { Popover2 } from "@blueprintjs/popover2";

export function Header() {
  return (
    <Navbar className="bp4-dark floating-box">
      <Navbar.Group align="left">
        <Navbar.Heading>Go to</Navbar.Heading>
        <Navbar.Divider />
        <Link to="/"><Button className="bp4-minimal" icon="home" text="Home" /></Link>
        <Link to="/sierpinski"><Button className="bp4-minimal" text="Start" /></Link>
        <FractalMenu />
      </Navbar.Group>
    </Navbar>
  )
}

function FractalMenu() {
  return (
    <Popover2 interactionKind="hover" content={
      <Menu>
        {fractals.map(f => <Link to={f.url} key={f.url}> <MenuItem icon="new-object" text={f.label} /></Link>)}
        <MenuDivider />
      </Menu>
    }>
      <Button className="bp4-minimal" text="Jump to..." />
    </Popover2>
  );
}
