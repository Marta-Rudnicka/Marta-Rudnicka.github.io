import { MathJax } from "better-react-mathjax";
import { Def, Media } from "../../default-view/description-utils";

type DescriptionProps = {
  ti: number;
}
export function Description(props: DescriptionProps) {
  const ti = props.ti + 1;

  const degreeDef = <MathJax>Degree of an equation relates to the highest power of the {`\\(x\\)`}. For example {`\\(x^2 + 7 = 0\\)`} is an equation of the second degree (or quadratic equation), and {`\\(x^6 + 7x^5 + x = 32\\)`} is an equation of the sixth degree.</MathJax>;

  const cubicEqDef = <MathJax>An equation of the third degree, or one with a {`\\(x ^ 3\\)`} as the highest power of {`\\(x\\)`}</MathJax>

  const coefficientDef = <MathJax>In the expression {`\\(3x^5 + 4x ^ 3 -2x\\)`}, {`\\(3\\)`} is the coefficient for {`\\(x^5\\)`}, {`\\(4\\)`} is the coefficient for {`\\(x^3\\)`}, and {`\\(-2\\)`} is the coefficient for {`\\(x\\)`} </MathJax>

  return (
    <MathJax>
      <p>
        When we intentionally draw nested similar shapes, it's no surprise we get nested similar shapes - or a fractal. But the really interesting thing about fractals is that they also to show up in less obvious unexpected circumstances. We will explore three mathematical procedures that produce a fractals. The one on the left is created by solving equations of <Def phrase="at least the third degree" definitionObject={degreeDef} tabIndex={ti} />. It will take a moment to explain, but it’s worth it!
      </p>
      <p>The fractal you see is a plot. First, we will explain what process the plot illustrates. Then, we will explain what we are plotting on, and finally, we will explain what the colours mean.</p>
      <h2>The process</h2>
      <h3>The problem with finding roots</h3>
      <p>
        How much is {`\\(\\sqrt{5}\\)`}? We know that it is an <Def phrase="irrational number" definition="you cannot represent it as a simple fraction, and it has an infinite number of decimal places if you write it as a decimal" tabIndex={ti} />, so our answer will never be completely precise. If mathematicians want to be exact, they just represent it as {`\\(\\sqrt{5}\\)`} in, but sometimes a less exact, but more understandable solution is needed. After all, measuring out {`\\(\\sqrt{5}\\)`} inches of string would be a puzzling task.</p>
      <p>So, how can we go about finding out the approximate number?</p>
      <p> We need {`\\(x^2 \\)`} to equal {`\\(5\\)`}.
        We know that {`\\(2^2 = 4 \\)`}, and {`\\(3^2 = 9 \\)`}. This means that {`\\( 2\\)`} is too little, but {`\\( 3\\)`} is too much, so the answer is somewhere in between . Let’s try {`\\( 2.5\\)`}:
      </p>
      {`\\(2.5^2 = 6.25 \\)`}
      <p>It’s still too much, so maybe let’s try a bit less:</p>
      {`\\(2.2^2 = 4.84 \\)`}
      <p>
        Now, it’s too little, so we need something between {`\\(2.2\\)`} and {`\\(2.5\\)`} - and we'll keep doing the same thing all over again (recursion!), until it's precise enough for our purpose. It will eventually work, but guessing is not too efficient, is it?
      </p>
      <h3>Newton’s method</h3>
      <p>
        To make the process quicker, we need a way to produce better guesses – it will take fewer iterations to get the precision we need. Isaac Newton found it around 1670, and later Joseph Raphson, another mathematician, made it simpler to use. The method works for all kinds of roots, but here, we will only follow the example of a square root - enough to get the idea where the fractal comes from. There is a more detailed explanation below if you're familiar with function derivatives.</p>
      <p>
        We'll stay with {`\\(\\sqrt{5}\\)`}.
      </p>
      <p>
        We are trying to solve {`\\(x ^ 2 = 5 \\)`}, but now we want a zero on one side, and all the {`\\(x\\)`}s and other numbers on the other, so let's make it {`\\(x ^ 2 – 5 = 0 \\)`}.
      </p>
      <p>
        Again, we are starting with a reasonable guess of {`\\( 2.5\\)`}. We substitute  {`\\( 2.5\\)`} for  {`\\( x\\)`} and get:
        {`\\(2.5^ 2 – 5 = 1.25 \\)`}
      </p>
      <p>
        So far nothing new, we only wrote it differently. But now, we will use Newton’s method to make a much better next guess. For a simple square root, when {`\\(x ^ 2 – c = 0\\)`} you use your first guess as the {`\\(x\\)`} and calculate:
        {`\\[x - \\frac{x^2 - c}{2x}\\]`}</p>
      <p> In our example, our  {`\\( c = 5\\)`}, and our first guess  {`\\( x = 2.5\\)`}, so we get:</p>
      {`\\[2.5 - \\frac{2.5^2 - 5}{2\\times2.5} = 2.25\\]`}
      <p>But let’s say we want to know the root to four decimal places. What’s next? We take the new guess,  {`\\( 2.5\\)`}, make it our  {`\\( x\\)`}, and repeat the process:</p>
      {`\\[2.25 - \\frac{2.25^2 - 5}{2\\times2.25} = 2.236111...\\]`}
      <p>
        But how accurate is it? Let’s check:</p>
      {`\\(2.2361 ^ 2 = 5.00014321\\)`}
      <p>
        That’s pretty close to 5, and we just went through two iterations! And what if we went through another one? </p>
      {`\\[2.236111... - \\frac{2.5^2 - 5}{2\\times2.236111...} = 2.236067977915804\\]`}
      <p>And to check accuracy:</p>
      {`\\(2.236067977915804 ^ 2 = 5.0000000018604736\\)`}
      <p>It is worth noting that the formula for finding a square root used above had been known since the ancient times. The new thing in Newton's method is creating a procedure to find similar formulae for different equations.</p>
      <h2>What we are plotting on</h2>
      <h3>Complex numbers and complex plane</h3>
      <p>
        The next piece of the puzzle are complex numbers. They are used in physics, engineering and computer graphics, but we can’t really relate them to real life experience – so don’t worry if it seems too abstract.
        We know that {`\\(\\sqrt{1} = 1\\)`} or {`\\(- 1\\)`}, but how much is {`\\(\\sqrt{-1}\\)`}? You might have heard negative numbers don't have square roots, but this is not exactly true. There is a square root of {`\\(- 1\\)`}, it’s just not a <em>real</em> number. It’s an <strong>imaginary</strong> number called {`\\( i\\)`}, and this is all you need to know to understand the image. While you can eat {`\\( 3\\)`} or even {`\\( 3.5\\)`} apples, you can’t eat {`\\( i\\)`} apples. Imaginary numbers won't make any if you try to apply them to everyday experience.</p>
        <p>{`\\( i\\)`} is also used as a basic imaginary unit. We know that:</p>
        {`\\(\\sqrt{4} = 2\\)`} or {`\\(- 2\\)`}
        <p>and by analogy: </p>{`\\(\\sqrt{-4} = 2i\\)`} or {`\\(- 2i\\)`}.
        <p>But not all numbers are either real or imaginary. There are numbers that have both real and imaginary part: for example in {`\\(4 - 7i\\)`} , {`\\(4\\)`} is the real part, and {`\\(- 7i\\)`} is the imaginary part. Many quadratic and higher degree equations, which seem to have no solutions, actually have complex solutions.</p>
        <p>
        Now, imagine two-dimensional Cartesian coordinate system (the most common boring one). Your {`\\(x\\)`}-axis show the real part of a number, and the {`\\(y\\)`}-axis shows the imaginary part, like this:</p>
      <Media src={require('./images/complex-plane.png')} alt="Complex plane with examples of real, imaginary and complex numbers" tabIndex={ti}/>

      <p>This is called a complex plane, and this is where a few very interesting fractals live.</p>
      <h2>What the image means</h2>
      <h3>Orbits</h3>
      <p>Let's back to finding the square root of 5 using the Newton't method. We started with {`\\(2.5\\)`}, and with each iteration of the process we produced a number closer to the solution. These numbers formed the following sequence:</p>
        <ul>
          <li>{`\\(2.5\\)`}</li>
          <li>{`\\(2.25\\)`}</li>
          <li>{`\\(2.236111...\\)`}</li>
          <li>{`\\(2.236067977915804\\)`}</li>
          <li>{`\\(2.23606797749979\\)`}</li>
          <li>...</li>
        </ul>
      <p>Such a sequence is called an orbit, in this case the orbit of {`\\( 2.5\\)`} under {`\\[f(x)= x - \\frac{x^2 - c}{2x} \\]`}</p>
      <p>When you start with a number, perform an operation on it, then perform the same operation on the result you got, and so on, the orbit will be the sequence of all the results (we are dealing with recursion and iterations again). The first number you feed into the whole process is called <strong>the seed</strong>.
      </p>


      <h3>The image</h3>
      <p>
        As mentioned above, Newton’s method can be used for approximating all kinds of roots. Our example was for {`\\(x ^ 2 = 5\\)`}, but the general method will also work for something like {`\\(x ^ 4 + 2x ^ 2 – 3x + 1 = 0\\)`}. To get a colourful fractal, we need to use Newton’s method for at least a <Def phrase="cubic equation" definitionObject={cubicEqDef} tabIndex={ti}/>.
      </p>
      <p>
        Newton’s method has a problem. If your starting guess (seed) is reasonably close to the solution, every iteration gets you a better approximation. This is OK for a simple {`\\(x^2 = 5 \\)`}, but how would you even go about guessing a solution to something like {`\\(-3.05x ^ 4 + 2.78x ^ 2 – 3.16x + 1.94 = 0\\)`}? If you pick a random starting point, you will eventually approach a solutions, but if you pick wrong, you might follow a long winding orbit before finally getting “sucked into” an area close to a root. Also, if you start far from the solution, you can't predict which neighbourhood it will take you to.
      </p>
      <p>Let's look what happens when we solve {`\\(x^3 - 8 = 0 \\)`} This is what the fractal on the screen is about, unless you've already played around with the sliders. You can get it back by reloading the page.</p>
      <p>It has three solutions: {`\\(2\\)`} (that's the easy one), {`\\(-1 - i \\sqrt{3}\\)`}, and {`\\(-1 - i \\sqrt{3}\\)`}. The complex solutions can be approximated as {`\\(-1 - 1.73205080756888 i\\)`} and  {`\\(-1 - 1.73205080756888 i\\)`}.</p>
      <p>To solve this equation with Newton's method, we need a different formula:</p>
      {`\\[x - \\frac{x^3 - 8}{3x^2}\\]`}
      <p>
        Let's see how it goes when we start close to a solution. We'll pick a familiar real number for a beginning: {`\\(-2.5\\)`}. The orbit is approximately:
        </p>
        <ul>
          <li>{`\\(2.5\\)`}</li>
          <li>{`\\(2.09333...\\)`}</li>
          <li>{`\\(2.004099512714061\\)`}</li>
          <li>{`\\(2.0000083800954678\\)`}</li>
          <li>{`\\(2.000000000035113\\)`}</li>
          <li>{`\\(2\\)`}</li>
          <li>{`\\(2\\)`}</li>
          <li>...</li>
        </ul>
      <p>
        Indeed, we started close, got closer with each step, and even landed on the exact solution.
      </p>
      <p>OK, so let's pick a complex number, say {`\\(5.5 - 0.2i\\)`}. This orbit will be easier to follow on the complex plane:</p>
        <Media src={require('./images/r5_5in0_2.png')} alt="Orbit plotted on the complex plane with the approximate numbers: 5.5 -0.2i, 3.7545 -0.1269i, 2.6915 -0.0719i, 2.1617 -0.0283i, 2.0115 -0.0039i, 2" tabIndex={ti}/>
      <p>Nothing special here - it's obviously approaching {`\\(2\\)`}, just like the previous one, only with fancier numbers on the way.</p>
      <p>OK, so let's try {`\\(3.34 - 5.01i\\)`}. The orbit for this number is completely different on the complex plane:</p>
        <Media src={require('./images/r_3_34_in5_01.png')} alt="Orbit plotted on the complex plane with the approximate numbers: 3.34 -5.01i, 2.1984 -3.2721i, 1.4007 -2.0225i, 0.7789 -0.9359i, 0.1925 +1.1448i, -1.7416 +0.1159i, -0.2935 +0.1933i, 8.3287 +19.9635i, 5.5485 +13.305i, 3.69 +8.860i" tabIndex={ti}/>
        <p>We marked the results of eight iterations, and we still can't even tell where it's going. It changes direction and even makes a loop.</p>
      <p>And now the best part. We'll take the previous seed ({`\\(3.34 - 5.01i\\)`}) and only round it to the first decimal place: {`\\(3.3 - 5i\\)`}. Will the orbit be similar? Not really...</p>
        <Media src={require('./images/r3_3i-5.png')} alt="Orbit plotted on the complex plane with the approximate numbers: 3.3, -5.0, 2.1708 -3.265, 1.3801 -2.0167, 0.7583 -0.9282, 0.1354 +1.2, -1.6924 +0.3925,-0.3351 +0.6506, -1.4742 +2.2291,-2.1075 +3.0753, -3.1144 +4.4873" tabIndex={ti}/>
       <p>We changed the value only a little bit, and it followed a completely different path. This is how it's so hard to predict where an initial guess leads.</p>
      <p>
        Newton’s fractal illustrates which solution each number lands on. The image is a complex plane, where every pixel represents a complex number. Each colour represents one solution to the equation. In other words, all the number with the same colour in the image will lead to the same solution. Of course, Newton and Raphson had no idea that the images that are produced like that - imagine trying to make it without a computer or even a calculator!
      </p>
      <p>{`\\(5.5 - 0.2i\\)`} and {`\\(2.5\\)`}, the numbers with relatively straight orbits, lie in the middle of a patch of the same colour:</p>
      <Media src={require('./images/simple-orbit-seeds.png')} alt="2.5 and 5.5 -0.2i marked as black dots on the fractal" tabIndex={ti}/>
      <p>The numbers with more complicated orbits tend to lie near the borders between colours: both {`\\(3.34 - 5.01i\\)`} and {`\\(3.3 - 5i\\)`} lie somewhere within the black dot:</p>
      <Media src={require('./images/chaotic-orbit-seeds.png')} alt="Black dot on them fractal representing the area within which 3.34-5.01i and 3.3-5i lie" tabIndex={ti}/>
      <p className="ex">
        Zoom in and out of the fractal image to see the how the structures look in different scales. You can either use the buttons, or you can focus on the image and use "+" and '-' keys. Drag the image to see another part of the plot or use arrow keys to do it.</p>
      <p className="ex">Use the sliders or number inputs to change the equation - you can get very different images. At the moment it is an only a 3rd degree equation - try the fourth and fifth degrees by changing the <Def phrase="coefficients" definitionObject={coefficientDef} tabIndex={ti} /> for {`\\(x^4\\)`} and {`\\(x^5\\)`} to something else than zero.
      </p>
      <hr />
      <h2>Newton's method - the details</h2>
      <p>This is an extra section for more advanced readers who want to learn or brush up the details of the Newton's method - it is not necessary to understand the idea behind the fractal.</p>
      <p>The general process is described above, but what was not explained is how we arrive at the main formula we use for each iteration. The answer is:</p>
      {`\\[x_{n+1} = 1 - \\frac{f(x_n)}{f'(x_n)}\\]`}
      <p>When we are looking for roots of the polynomial,we start with the yhe number {`\\(x_n\\)`} a to find our next (hopefully closer) approximation {`\\(x_{n+1}\\)`} we are using the formula above, where {`\\(f(x)\\)`} is our polynomial evaluated for {`\\(x_n\\)`}, and {`\\(f'(x)\\)`} is the derivative of our polynomial evaluated for {`\\(x_n\\)`}.</p>
    </MathJax>
  );
}
