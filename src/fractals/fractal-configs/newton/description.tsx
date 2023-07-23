import { MathJax } from "better-react-mathjax";

export function Description() {
  return (
    <MathJax>
      <h2>Netwon’t Fractal</h2>
      <p>
        Drawing smaller and smaller self-similar shapes can make pictures pleasant to the eyes, but there is nothing surprising in the fact that it results in a fractal. The real interesting thing about fractals is that they tend to show up in rather unexpected places. If you plot the results of certain mathematical operations, the images you get turn out to be very intricate fractal shapes, and we will present three of them. The one on the left, for example, depicts what happens when you use Newton’s method of finding roots. It will take a moment to explain, but it’s worth it!
        Netwon’t Fractal
      </p>
      <p>
        Drawing smaller and smaller self-similar shapes can make pictures pleasant to the eyes, but there is nothing surprising in the fact that it results in a fractal. The real interesting thing about fractals is that they tend to show up in rather unexpected places. If you plot the results of certain mathematical operations, the images you get turn out to be very intricate fractal shapes, and we will present three of them. The one on the left, for example, depicts what happens when you use Newton’s method of finding roots. It will take a moment to explain, but it’s worth it!
      </p>
      <h3>What is finding roots about?</h3>
      <p>
        How much is {`\\(\\sqrt{5}\\)`}? We know that it is an irrational number, which means you cannot represent it as a simple fraction, and it has an infinite number of decimal places if you write it as a decimal. It is often just represented as {`\\(\\sqrt{5}\\)`}in mathematics, but sometimes you just need to know approximately, how much it is –for example, you can’t measure {`\\(\\sqrt{5}\\)`} inches of string. So, how could you go about finding out?
        Well, we know that {`\\(2^2 = 4 \\)`}, so {`\\( 2\\)`} is too little, but {`\\(3^2 = 9 \\)`}, so {`\\( 3\\)`} is too much. So the number must be something between {`\\( 2\\)`} and {`\\( 3\\)`}three. Let’s try {`\\( 2.5\\)`}:
      </p>
      {`\\(2.5^2 = 6.25 \\)`}
      <p>It’s still too much, so maybe let’s try a bit less:</p>
      {`\\(2.2^2 = 4.84 \\)`}
      <p>
        Now, it’s too little, so we need a larger number. We can go on like that until we find a number that is precise enough for our purpose – but this kind of guesswork is not too efficient.
      </p>
      <h3>Newton’s method</h3>
      <p>
        The overall process of finding root in most methods is more or less the same – you guess a number, square it to see if it is too little or too much, and then try to correct your guess accordingly. The main thing you can do to improve the process is to find a way to produce better guesses – and this is what Newton did. The method is very general and works for all kinds of roots, but you do not need to know the details to understand how Newton’s fractal works.If you are curious and know about function derivatives, you can read about it below. Here, we will only explain an example with a square root.
        Let us stay with the examples of {`\\(\\sqrt{5}\\)`}.
      </p>
      <p>
        We know that {`\\(\\sqrt{5} = x\\)`} means the same as {`\\(x^2 = 5 \\)`}. But for the Newton’s method, we want all the xs and numbers on the left hand size, and a zero on the rght - hand side, or:
      </p>
      {`\\(x ^ 2 – 5 = 0 \\)`}.
      <p>
        Again, we are starting with a reasonable guess that this is something around {`\\( 2.5\\)`}. So we substitute  {`\\( 2.5\\)`} for  {`\\( x\\)`} and get:
      </p>
      {`\\(2.5^ 2 – 5 = 1.25 \\)`}
      <p>
        So far nothing new, we just wrote it a bit differently: the result is too much by  {`\\( 1.25\\)`}. But now, we will use Newton’s method to make a much better guess. For a simple square root, when:
      </p>
      {`\\(\\sqrt{x} = c \\)`} or  {`\\(x ^ 2 – c = 0\\)`}
      <p> you make x your first guess, and calculate:</p>
        {`\\[x - \\frac{x^2 - c}{2x}\\]`}
      <p> In our example, our  {`\\( c = 5\\)`}, and our first guess  {`\\( x = 2.5\\)`}, so we get:</p>
      {`\\[2.5 - \\frac{2.5^2 - 5}{2\\times2.5} = 2.25\\]`}
      <p> But let’s say we want to know the root to four decimal places. What’s next? We take the new guess,  {`\\( 2.5\\)`}, make it our  {`\\( x\\)`}, and repeat the process:</p>
      {`\\[2.25 - \\frac{2.25^2 - 5}{2\\times2.25} = 2.236\\overline{1}\\]`}
      <p>
        But how accurate is it? Let’s check:</p>
      {`\\(2.2361 ^ 2 = 5.00014321\\)`}
      <p>
        That’s pretty close to 5, and we just went through two iterations! And what if we went through another one? </p>
      {`\\[2.236\\overline{1} - \\frac{2.5^2 - 5}{2\\times2.236\\overline{1}} = 2.236067977915804\\]`}
      <p>And to check accuracy:</p>
      {`\\(2.236067977915804 ^ 2 = 5.0000000018604736\\)`}


      <h3>Orbits</h3>
      <p>
        We have just seen our first example of an orbit. Of course, we are not talking about planets revolving around the sun – we are talking about mathematics here.
        If you take a number, perform some calculation on it, take the result, perform exactly the same calculation on it, then take the new results and perform this calculation again, the set of all the results will be the orbit of your number under whatever calculation you did. In our example, we had an initial numberof {`\\( 2.5\\)`}, a function: {`\\[f(x)= x - \\frac{x^2 - c}{2x} \\]`} and we got:  {`\\( 2.5\\)`},  {`\\( 2.236(1)\\)`}, and  {`\\( 2.236067977915804\\)`}2.236067977915804 (and the next numbers would be []).In other words, the orbit of {`\\( 2.5\\)`} under {`\\x – ((x ^ 2 - c) / (2x))\\`} is {`\\( 2.5\\)`}, {`\\( 2.235(1)\\)`}, {`\\( 2.236067977915804\\)`}….
        If there is something familiar about it, it is because we are using recursion here.
        The first number you feed into the whole process is called seed.This will be very important in understanding the following two fractals.
      </p>

      <h3>Complex numbers and complex plane</h3>
      <p>
        The next piece of the puzzle to understand Newton’t fractal(and the next two fractals) are complex numbers.Complex numbers are very useful in physics, engineering and computer graphics, but they can’t really relate them to life experience – so don’t worry if it seems completely abstract – it is.
        We know that {`\\(\\sqrt{1} = 1\\)`} or {`\\(- 1\\)`}, but how much is {`\\(\\sqrt{-1}\\)`}? Someone might have told you can’t have a square root of a negative number, but this is not exactly true.There is a square root of {`\\(- 1\\)`}, it’s just not a real number. It’s an imaginary number called {`\\( i\\)`}. There isn’t much more to {`\\( i\\)`} – you just need to accept that {`\\i = sqrt(-1)\\`}, and while you can eat {`\\( 3\\)`} apples, you can’t eat {`\\( i\\)`} apples because imaginary numbers don’t make any sense in everyday experience.
        {`\\( i\\)`} is also used as a basic imaginary unit, so when {`\\(\\sqrt{4} = 2\\)`} or {`\\(- 2\\)`}, {`\\(\\sqrt{-4} = 2i\\)`} or {`\\(- 2i\\)`}.
        But not all numbers are either real(the “normal numbers” familiar from real life), or imaginary.There are numbers that have both real and imaginary part: for example in {`\\(4 - 7i\\)`} , {`\\(4\\)`} is the real part, and {`\\(- 7i\\)`} is the imaginary part. Many high degree equations, which seem to not have solutions, actually have solutions which are complex numbers.
        Now, imagine two - dimensional Cartesian coordinate system, that is, the normal boring one you see everywhere, with an x and y axis.Your x - axis denotes the real part, and the y - axis denotes the imaginary part, like this: [img]
        This is called a complex plane, and this is where a few very interesting fractals live.
      </p>
      <h3>The image</h3>
      <p>
        As mentioned above, Newton’s method can be used for approximating all kinds of roots. Our example was for {`\\(x ^ 2 = 5\\)`}, but the general method will also work for something like {`\\(x ^ 4 + 2x ^ 2 – 3x + 1 = 0\\)`}. To get a colourful fractal, we need to use Newton’s method for at least a cubic equation(one that has a {`\\x ^ 3\\)`} somewhere in it).
      </p>
      <p>
        Newton’s method has one problem – when your seed(the starting guess) is reasonably close to the solution, with every iteration you get closer and closer to the solution and it’s fine.The orbit we observed for 2.5 could be drawn as [image]. However, it’s not easy to make an educated guess for something  {`\\(x ^ 4 + 2x ^ 2 – 3x + 1 = 0\\)`}, and for equations that have complex solutions, it’s even harder.With Newton’s method, you will eventually arrive close to one of the solutions, but if your seed is far away from any of the solutions, its seed will jump around before landing close enough to be “sucked into” one of the solutions. Also, it’s impossible to predict on which solution it will end.
      </p>
      <p>
        For example {`\\(x ^ 3 + 8 = 0\\)`} has three solutions: the real number {`\\( - 2\\)`}, and two complex numbers: 1 – i sqrt(3) and 1 – i sqrt(3).If we start with -2.5, we’ll be getting closer and closer to - 2. The orbit will be: [].
        But what if we start with 13 + 6i, the rbit will be[] – that’s a long way before getting close to[].
        And this is what Newton’s fractal illustrates.The image is a complex plane, which means every pixel represents a complex number.Each colour represents one solution to the equation – the solution that this number will end up on if you use it as a starting point for Newton’s method.In other words, all the complex number with the same colour will lead to the same solution.
      </p>
      <p>
        You can zoom in and out of the image using the buttons, and drag the image to see another part of the plot.You can also use sliders to change  the equation – you can get a completely different fractal! You can also focus on the image and use + and – keys to zoom in and out, and arrow keys to move the image.

        And if you zoom in deeper and deeper, you will see that the image is self - similar.Newton had no idea he accidentally created a formula for a fractal!
      </p>
    </MathJax>
  );
}
