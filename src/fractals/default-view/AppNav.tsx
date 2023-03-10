import { ChevronLeft } from "../../components/icons/ChevronLeft";
import { ChevronRight } from "../../components/icons/ChevronRight";

type FooterProps = {
  prevLink?: string,
  nextLink?: string;
}

export function AppNav(props: FooterProps) {
  const { prevLink, nextLink } = props;

  return (
    <div className="app-nav">
      {prevLink && <div className="floating-box"><a href={prevLink}><ChevronLeft/>Previous fractal</a></div>}
      {nextLink && <div className="floating-box"><a href={nextLink}>Next fractal <ChevronRight/></a></div>}
    </div>
  );
}