import { Button, Navbar } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { fractals } from "../../config/links";

export function Header() {
  return (
    <Navbar className="bp4-dark floating-box">
      <Navbar.Group align="left">
        <Link to="/"><Button className="bp4-minimal" icon="home" text="Home" tabIndex={1} /></Link>
        <Link to="/sierpinski"><Button className="bp4-minimal" text="Start" tabIndex={2} /></Link>
        <Navbar.Divider />
        <FractalMenu />
      </Navbar.Group>
    </Navbar>
  )
}

function FractalMenu() {
  const initTabIndex = 3;
  return (
    <>
      {fractals.map((f, index) => <Link to={f.url} key={f.url}><Button tabIndex={initTabIndex + index} text={f.label} /></Link>)}
    </>
  );
}
