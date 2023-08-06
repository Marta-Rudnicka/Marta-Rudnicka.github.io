import { MathJax } from "better-react-mathjax";

type DescriptionProps = {
  ti: number;
}
export function Description(props: DescriptionProps) {
  const ti = props.ti + 1;
  return (
    <MathJax>
      <p>No description yet.</p>
    </MathJax>
  );
}