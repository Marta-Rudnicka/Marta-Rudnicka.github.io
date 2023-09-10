import { MathJax } from "better-react-mathjax";
import { Media } from "../../default-view/description-utils";

type DescriptionProps = {
  ti: number;
}
export function Description(props: DescriptionProps) {
  const ti = props.ti + 1;
  return (
    <MathJax>
      <p>Let us leave the abstract realm of complex planes and imaginary numbers an get back to something more mundane: folding strips of paper.</p>
      <p>What happens if we fold paper, but recursively? If you fold paper once, and then open it so the folds are at the right angles, nothing exciting happens. If you fold it once, and then fold your folded paper again, you will arrive at a different, though not very interesting shape. But it slowly gets more interesting.</p>
      <p>Watch the video below to observe the first four iterations of the process - in real life, with real paper!</p>
      <Media video src={require("./images/clip.mp4")} alt="video of folding paper" tabIndex={ti}/>
      <p>One could expect a simple pattern of bends to emerge from such a simple process, but the shape of the paper becomes more and more intricate the more iterations we add - it turns out it's a fractal. The generated image shows the idealised version of the shape achieved by folding paper more times. Of course, in real life, nobody would fold paper that neatly.</p>
      <p className="ex">Add the number of iterations one by one to see the emerging shape. You may also go through the first four to see see how the image mirror what was shown on the video.</p>
      <p>This curve, Heighway dragon is an example of a dragon curve - a group of similar fractal shapes</p>
    </MathJax>
  );
}