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
        This image has a few things in common with Newton's fractal. It also represents a complex plane, and the colours also show what happens to the orbit when the number on the plane is the seed. The image might not look the most impressive at the first glance, but if you zoom in on one of the edges of the white shape, you will discover how complex it is.</p>
        <p className="ex">Spend some time exploring the patters by zooming and panning (using the same methods as in the previous image)</p>
        <p>This is even more complex that Newton't fractal. So what is the function that produces such a complicated image?</p>
      <p>
        {`\\(z^2 + c \\)`}
      </p>
      <h3>What exactly is plotted in the image</h3>
      <p>
        In case of Newton’t fractal, the orbits gravitated towards one of the solutions of the equation. The higher the degree of the equation, the more solutions and more colours the fractal has Here, we are following only two options: the orbit creating a cycle, or the orbit escaping to infinity.</p>
      <p>In the orbits we're following here, the seed, or the {`\\(z\\)`} in {`\\(z^2 + c \\)`}, is equal to {`\\(0\\)`}. What changes is the value of {`\\(c\\)`} – each pixel represents a number that becomes the {`\\(c\\)`}. To illustrate what happens, we will follow the beginning of the orbit for {`\\(c = 1\\)`}:</p>
      <table className="iteration-table">
        <tr>
          <td>Step 1</td><td>{`\\(0^2 + 1 = 1 \\)`}</td>
        </tr>
      </table>
      <p>Now, we’re taking result of the first iteration, and use it as z:</p>
      <table className="iteration-table">
        <tr><td>Step 2</td><td>{`\\(1^2 + 1 = 2 \\)`}</td></tr>
      </table>
      <p>And so on:</p>
      <table className="iteration-table">
        <tr><td>Step 3</td><td>{`\\(2^2 + 1 = 5 \\)`}</td></tr>
        <tr><td>Step 4</td><td>{`\\(5^2 + 1 = 26 \\)`}</td></tr>
        <tr><td>Step 5</td><td>{`\\(26^2 + 1 = 677 \\)`}</td></tr>
      </table>
      <p> This gives us an orbit starting with {`\\( 1, 2, 5, 26, 677\\)`}. We can easily tell that the following numbers will only grow larger and larger; in other words, the orbit of {`\\(z^2 + 1 \\)`} under  {`\\(0\\)`} tends to infinity.
      </p>
      <p>
        But let's try a different c:  {`\\(-1\\)`}.</p>
      <table className="iteration-table">
        <tr><td>Step 1</td><td>{`\\(0^2 - 1 = -1 \\)`}</td></tr>
        <tr><td>Step 2</td><td>{`\\(-1^2 - 1 = 0 \\)`}</td></tr>
        <tr><td>Step 3</td><td>{`\\(0^2 - 1 = -1 \\)`}</td></tr>
        <tr><td>Step 4</td><td>{`\\(-1^2 - 1 = 0 \\)`}</td></tr>
        <tr><td>Step 5</td><td>{`\\(0^2 - 1 = -1 \\)`}</td></tr>
        <tr><td>Step 6</td><td>{`\\(-1^2 - 1 = 0 \\)`}</td></tr>
        <tr><td>Step 7</td><td>{`\\(0^2 - 1 = -1 \\)`}</td></tr>
        <tr><td>Step 8</td><td>{`\\(-1^2 - 1 = 0 \\)`}</td></tr>
      </table>
      <p>
        This one loops, with two numbers repeating forever:  {`\\( 1, 0, -1, 0, -1, 0...\\)`}. This is called a cyclical, or periodic orbit.
      </p>
      <p>
        In the image, if the number produces a periodic orbit when used as {`\\(c\\)`} in {`\\(z^2 + 1 \\)`}, it is white. If the orbit escapes, or tends to infinity, it is black.
      </p>
      <h3>The discovery of Mandelbrot set</h3>
      <p>
        The mathematical operations needed for this image are simple, even with complex numbers, but the sheer number of calculations is overwhelming. Just like with Newton's fractal, it would be really tedious to plot it by hand. No wonder it was discovered with the help of computers.</p><p>
        In 1979, in an IBM research centre, a mathematician called Benoit Mandelbrot tried using the latest technology to investigate iterative functions – the computer was a perfect tool to speed up repeated calculations. As he investigated into
         {`\\(z^2 + 1 \\)`}, he discovered how intricate patterns appear of you zoom on the edge of the shape.
        Mandelbrot was also the person who coined the term fractal, and he spend a lot of his career on researching fractals and related subjects.
      </p>
      <h3>More on cycles and escaping orbits.</h3>
      <p>The example orbits described above are fairly simple, but there can always be more complicated cases. Firstly, the cycles can have different length: the one above is a 2-cycle, becaus the are two numbers repeating. In the Newton's fractal page, we saw a 1-cycle - there was an orbit approaching  {`\\(2\\)`}, and once it reached  {`\\(2\\)`}, every next step produced another  {`\\(2\\)`}. The orbit can also meander through different values before is starts cycling.</p>
      <p>On the first glance, it may not always be obvious if n orbit would tend to infinity. Fortunately, in Mandelbrot set it is easy to tell - if any number on the orbit is further from the seed than {`\\(2\\)`}, we know it will eventually escape. To explain it more visually, if you drew a circle with the radius of {`\\(2\\)`} around the seed, whenever the orbit leaves the circle, we know it will tend to infinity. This is referred as <strong>the escape criterion</strong>.</p>
      <p>Some images of the Mandelbrot set are very colourful - the colours usually show how long it takes for an orbit to start cycling or fulfil the escape criterion.</p>
      <h3>Cycles and bulbs</h3>
      <p>The Mandelbrot set has many interesting properties, and we will look into a simple example. If you zoom anywhere on the edge of the set, you will see a lot of round shapes "growing" out of the main body, often called bulbs. Yes - there is whole terminology to describe parts and areas of the Mandelbrot set! These bulbs often have an "antenna" growing out of it, branching into several others. The exact number of the branches depends on the orbit of the number in the middle of the bulbl for example, if the orbit ends up cycling over four numbers, then the antenna growing out of the bulb will have four branches (including the one growing out of the bulb). Below, there are three example bulbs compared to the orbits their middle point makes.</p>
      <Media src={require("./bulbs.png")} alt="Values of c in the middle of the bulbs, and the orbits of those values" tabIndex={ti}/>
      <p>The top-left bulb has {`\\(0.12 + 0.75 i\\)`} in the middle, which creates a 3-cycle. The antenna on top of it branches into two smaller ones, giving us three branches. The top-right bulb has a 4-cycle related to it, and grows an antenna with four branches etc.</p>
    </MathJax>
  );
}