export function Description() {
  return (
    <>
      <p>
        Just like in Newton’s fractal, the image on the left is created by repeating the same operation over and over again, and finding out what eventually happens depending on the number you start with. Again, we have a complex plane, where each number is a seed, and we are observing the orbit of a function under the seed. If you zoom in, you will see the image is very intricate, even more than the Newton’s fractal. What is the function that produces such a complicated image?
      </p>
      <p>
        {`\\(z^2 + c \\)`}
      </p>
      <h3>What exactly are we plotting?</h3>
      <p>
        In case of Newton’t fractal, the orbits were observing sooner or later gravitated towards one of the solutions of the equation, and each solution was denoted by a colour. In Mandelbrot set we are following only two options: a cycle or escaping to infinity, which will be explained below.
        For every orbit, the seed, or the z in {`\\(z^2 + c \\)`}, is equal to 0. What changes is the value of c – each pixel represents one complex number that will be used as c.
        For example, to get through the first few steps in finding the orbit for c = 1:</p>
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
      <p> So we know that the orbit starts with: 1, 2, 5, 26, 677.</p>
      <p>
        We can see tell that the following numbers will grow larger and larger, an if go through an infinite number of iteration, we will reach infinity. We can say that the orbit of {`\\(z^2 + 1 \\)`} under 0 tends to infinity.
      </p>
      <p>
        But let us try a different c, let’s say -1.</p>
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
        In this case, no matter how many iterations we go through, the orbit consists of two numbers repeating forever: -1, 0, -1, 0, -1, 0…
        This is a cyclical, or periodic orbit.
      </p><p>
        In the image on the left, if the number produces a periodic orbit when used as c in z^2 + c, it is white. If the orbit escapes, or tends to infinity, it is black.
      </p>
      <h3>The discovery of Mandelbrot set</h3>
      <p>
        The mathematical operations needed to generate this image are very simple, even performed on complex numbers but the sheer number of calculations needed is overwhelming. No wonder a computer was needed to discover it.</p><p>
        In 1979, in an IBM research centre, a mathematician called Benoit Mandelbrot tried using the latest technology to investigate iterative functions – the computer was a perfect tool to speed up repeated calculations. As he investigated in z^2 + c, he discovered how intricate patterns appear of you zoom on the edge of the shape.
        Mandelbrot was also the person who coined the term fractal, and he spend a lot of his career on researching fractals and related subjects.
      </p>
      <h3>More on cycles.</h3>
    </>
  );
}