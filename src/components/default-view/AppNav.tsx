import { ChevronLeft } from "../icons/ChevronLeft";
import { ChevronRight } from "../icons/ChevronRight";

type FooterProps = {
  prevLink?: string,
  nextLink?: string;
}

export function AppNav(props: FooterProps) {
  const { prevLink, nextLink } = props;

  return (
    <div className="app-nav">
      {prevLink && <div><a href={prevLink}><ChevronLeft/>Previous fractal</a></div>}
      {nextLink && <div><a href={nextLink}>Next fractal <ChevronRight/></a></div>}
    </div>
  );
}