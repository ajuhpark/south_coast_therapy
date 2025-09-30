/** 
 * matter js test
*/


import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'


gsap.registerPlugin(SplitText)
// gsap.registerPlugin(GSDevTools)
gsap.registerPlugin(ScrollTrigger)

// make the mobile size stay the same
ScrollTrigger.normalizeScroll(true);
// ScrollTrigger.config({
//   ignoreMobileResize: true,
// });


function example_20() {
  console.log('example_20.js is working')

  function init() {
    console.log('example_20 init is working')

    const matterContainer = document.querySelector("#matter-container")
    const thickness = 60 

    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite;

    // create an engine
    var engine = Engine.create();

    // create a renderer
    var render = Render.create({
        element: matterContainer,
        engine: engine,
        options: {
          width: matterContainer.clientWidth,
          height: matterContainer.clientHeight,
          // background: "transparent",
          // wireframes: true, 
          // showAngleIndicator: true
        }
    });

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);

for (let i = 0; i < 20; i++) {
  // circle paramaters are position x and y and then radius
  // let circle = Bodies.circle(i, 10, 30, {
  let circle = Bodies.circle(i, 10, 100, {
    friction: 0.3,
    frictionAir: 0.00001,
    restitution: 0.8
  })
  Composite.add(engine.world, circle)
}

    var ground = Bodies.rectangle(
      // x position
      matterContainer.clientWidth / 2, 
      // y position
      matterContainer.clientHeight + thickness / 2, 
      // width
      // matterContainer.clientWidth, 
      // set it to random large number instead
      27184,
      // height
      thickness, 
      // options
      { isStatic: true }
    );

    // walling up our containers
    let leftWall = Bodies.rectangle(
      0 - thickness / 2,
      matterContainer.clientHeight / 2,
      thickness,
      matterContainer.clientHeight * 5,
      {
        isStatic: true
      }
    )

    let rightWall = Bodies.rectangle(
      matterContainer.clientWidth + thickness / 2,
      matterContainer.clientHeight /2,
      thickness,
      matterContainer.clientHeight * 5,
      { isStatic:true }
    )

    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ground, leftWall, rightWall]);
    
    let mouse = Matter.Mouse.create(render.canvas)
    let mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2, 
        render: {
          visible: true
        }
      }
    })

    // now we can pick up our boxes.
    Composite.add(engine.world, mouseConstraint)

    // allow scroll through the canvas
    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      mouseConstraint.mouse.mousewheel
    )
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel
    )

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    function handleResize(matterContainer) {
      // set canvas size to new values
      render.canvas.width = matterContainer.clientWidth;
      render.canvas.height = matterContainer.clientHeight;

      // reposition ground
      Matter.Body.setPosition(
        ground,
        Matter.Vector.create(
          matterContainer.clientWidth / 2,
          matterContainer.clientHeight + thickness / 2
        )
      )

      // reposition left wall
      Matter.Body.setPosition(
        ground, 
        Matter.Vector.create(
          matterContainer.clientWidth / 2,
          matterContainer.clientHeight + thickness / 2
        )
      )

      // reposition right wall
      Matter.Body.setPosition(
        rightWall,
        Matter.Vector.create(
          matterContainer.clientWidth + thickness / 2,
          matterContainer.clientHeight / 2
        )
      )
    }

    window.addEventListener("resize", ()=> handleResize(matterContainer))


    }




  window.addEventListener("load", function(event) { 
    init(); 
  });
}

// if (document.body.classList.contains('example_20')) {
  example_20();
// }

export default example_20