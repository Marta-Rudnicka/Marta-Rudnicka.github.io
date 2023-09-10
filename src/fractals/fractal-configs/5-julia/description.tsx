import { MathJax } from "better-react-mathjax";
import { Media } from "../../default-view/description-utils";


type DescriptionProps = {
  ti: number;
}
export function Description(props: DescriptionProps) {
  const ti = props.ti + 1;
  return (
    <MathJax>
      <p>
      In the Mandelbrot set, the {`\\(z \\)`} is always {`\\(0 \\)`} in {`\\(z^2 + c \\)`}, and the value of the pixel decides about the {`\\(c \\)`}. We can also swap these: the {`\\(z \\)`} in the formula depends on the value of the pixel, and the {`\\(c \\)`} is constant. If we do this and leave the rest of the process the same, we get a Julia set, which you can see in the image. There is a little difference: the Mandelbrot set contains all the values <em>inside</em> the big blob, while the Julia sets contains the values at the edge of th shape. There are infinitely many Julia sets, one for each value of {`\\(c \\)`}, and they have different shapes. The one that this page starts with is called Douady rabbit because it looks a bit like a fractal rabbit head - with new rabbit heads growing out of each of the ears. </p>
      <p className="ex"> Use the sliders or number inputs to change the values of  {`\\(c \\)`}and see how the shape changes. Warning: start with very little changes, or you won't be able to track what is happening.</p>
      <h2>How Julia sets and Mandelbrot set are related</h2>
      <p>Obviously, the two sets are related by using the same formula and process, but the connection is more complex.</p>
      <p>
      Julia sets have an interesting property: all the numbers in the set are either all connected, or all disconnected, like numbers in the Cantor set. There are no Julia sets in three or forty "pieces": it's either one, or infinitely many.</p>
      <p>Some values of {`\\(c \\)`} make a Julia set in one piece, and some values of {`\\(c \\)`} make a Julia set in infinite many pieces - sounds like something we could mark on a complex plane with different colours. And this is how Mandelbrot was looking into when he discovered his set - all the {`\\(c \\)`}s inside the Mandelbrot set create a connected Julia set, and the ones outside create dust.</p>
      <p>There are other relationships between the sets. If you pick a value for your {`\\(c \\)`} somewhere in the Mandelbrot set, the patterns in Julia set with this {`\\(c \\)`} will look somewhat similar to the patterns in that area of the Mandelbrot set: </p>
      <Media src={require("./images/mandel-julia.png")} alt="Julia sets for the c of -0.24 + 0.84i and -0.47 -0.63i next to these values marked on the Mandelbrot set" tabIndex={ti}/>
    </MathJax>
  );
}