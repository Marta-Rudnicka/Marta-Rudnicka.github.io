import { Button, Navbar } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { fractals } from "../config/links";

export function Header() {  
  return (
<Navbar className="bp4-dark floating-box">
  <Navbar.Group align="left">
    <Navbar.Heading>Navigation bar</Navbar.Heading>
    <Navbar.Divider />
    <Link to="/"><Button className="bp4-minimal" icon="home" text="Home"/></Link>
    <Button className="bp4-minimal" text="Start" />
    <Button className="bp4-minimal" text="Jump to" />
    <div>
      {fractals.map(f=> <a key={f.url} href={f.url}>{f.label}</a>)}
    </div>
  </Navbar.Group>
</Navbar>
  )
}

