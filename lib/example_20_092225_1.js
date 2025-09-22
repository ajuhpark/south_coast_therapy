/** 
 * matter js test
 * fewer shapes. this one has resize boundaries set correctly.
 * fills have color.
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
    // this thickness variable is used to get things to the edge of containers.
    // without it, the ground and sides are hard coded to 60 .
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

    var ground_1 = Bodies.rectangle(
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
    let leftWall_1 = Bodies.rectangle(
      // x position
      0 - thickness / 2,
      // y position
      matterContainer.clientHeight / 2,
      // width
      thickness,
      // height
      matterContainer.clientHeight * 5,
      // options
      { isStatic: true }
    )

    let rightWall_1 = Bodies.rectangle(
      // x position
      matterContainer.clientWidth + thickness / 2,
      // y position
      matterContainer.clientHeight /2,
      // height
      thickness, 
      // height
      matterContainer.clientHeight * 5,
      // options
      { isStatic:true }
    )

    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ground_1, leftWall_1, rightWall_1]);
    
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
        ground_1,
        Matter.Vector.create(
          matterContainer.clientWidth / 2,
          matterContainer.clientHeight + thickness / 2
        )
      )

      // reposition left wall
      Matter.Body.setPosition(
        ground_1, 
        Matter.Vector.create(
          matterContainer.clientWidth / 2,
          matterContainer.clientHeight + thickness / 2
        )
      )

      // reposition right wall
      Matter.Body.setPosition(
        rightWall_1,
        Matter.Vector.create(
          matterContainer.clientWidth + thickness / 2,
          matterContainer.clientHeight / 2
        )
      )
    }

    window.addEventListener("resize", ()=> handleResize(matterContainer))






    // new matter js container 
    const matter_container_2 = document.querySelector("#matter_container_2")
    const thickness_2 = 60 


    // Matter.js - http://brm.io/matter-js/
    // This example demonstrates time scaling effects (bullet-time slow motion)
    var Example = Example || {};

    Example.timescale = function() {
        // Import all the Matter.js modules we need
        var Engine = Matter.Engine,        // Physics engine
            Render = Matter.Render,        // Rendering system
            Runner = Matter.Runner,        // Game loop runner
            Body = Matter.Body,            // Individual physics body operations
            Events = Matter.Events,        // Event system
            Composite = Matter.Composite,  // Collections of bodies
            Composites = Matter.Composites,// Predefined composite shapes
            Common = Matter.Common,        // Utility functions
            MouseConstraint = Matter.MouseConstraint, // Mouse interaction
            Mouse = Matter.Mouse,          // Mouse input
            World = Matter.World,          // World container for all bodies
            Bodies = Matter.Bodies;        // Factory for creating bodies

        // Create the physics engine - this handles all physics calculations
        var engine = Engine.create(),
            world = engine.world;          // Get reference to the world

        // Create the renderer - this draws everything on screen
        var render = Render.create({
            element: matter_container_2,   // Attach to your specific container
            engine: engine,                // Link to our physics engine
            options: {
                width: matter_container_2.clientWidth,   // Canvas width matches container
                height: matter_container_2.clientHeight, // Canvas height matches container
                wireframes: false,          // Show filled shapes, not just outlines
                background: '#F5F7F9'  // Add this line
            }
        });

        // Start the renderer
        Render.run(render);

        // Create and start the runner - this is the game loop that updates physics
        var runner = Runner.create();
        Runner.run(runner, engine);

        // Create the boundaries of our world (walls and floor/ceiling)
        World.add(world, [
            Bodies.rectangle(matter_container_2.clientWidth / 2, 0, matter_container_2.clientWidth, 50, { isStatic: true }),    // Top wall (ceiling)
            Bodies.rectangle(matter_container_2.clientWidth / 2, matter_container_2.clientHeight, matter_container_2.clientWidth, 50, { isStatic: true }),  // Bottom wall (floor)
            Bodies.rectangle(matter_container_2.clientWidth, matter_container_2.clientHeight / 2, 50, matter_container_2.clientHeight, { isStatic: true }),  // Right wall
            Bodies.rectangle(0, matter_container_2.clientHeight / 2, 50,matter_container_2.clientHeight, { isStatic: true })     // Left wall
        ]);

        // Function that creates an "explosion" effect by applying upward forces
        var explosion = function(engine) {
            // Get all bodies in the world
            var bodies = Composite.allBodies(engine.world);

            // Loop through each body
            for (var i = 0; i < bodies.length; i++) {
                var body = bodies[i];

                // Only affect non-static bodies that are near the bottom
                if (!body.isStatic && body.position.y >= matter_container_2.clientHeight * 0.8) {
                    // Calculate force magnitude based on body mass
                    // var forceMagnitude = 0.05 * body.mass; // Increase from 0.05 for stronger explosions
                    // var forceMagnitude = 0.02 * body.mass; // Increase from 0.05 for stronger explosions
                    var forceMagnitude = 0.1 * body.mass; // Increase from 0.05 for stronger explosions

                    // Apply random force in X direction and upward force in Y direction
                    Body.applyForce(body, body.position, {
                        x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]), // Random left/right
                        y: -forceMagnitude + Common.random() * -forceMagnitude  // Always upward with some randomness
                    });
                }
            }
        };

        // Variables for controlling time scaling effect
        var timeScaleTarget = 1,  // Target time scale (1 = normal speed, 0.05 = very slow)
            counter = 0;          // Counter to track when to trigger effects

        // Event listener that runs after each physics update
        Events.on(engine, 'afterUpdate', function(event) {
            // Smoothly interpolate towards the target time scale (creates smooth transitions)
            engine.timing.timeScale += (timeScaleTarget - engine.timing.timeScale) * 0.05;

            counter += 1;  // Increment our counter

            // Every 1.5 seconds (60 FPS * 1.5 = 90 frames)
            // if (counter >= 60 * 1.5) {
            // Every 1.5 seconds (60 FPS * 1.5 = 90 frames)
            // if (counter >= 60 * 10 = 600 frames) {
            if (counter >= 60 * 6) {
                // Toggle between normal speed and slow motion
                if (timeScaleTarget < 1) {
                    timeScaleTarget = 1;      // Switch to normal speed
                } else {
                    // timeScaleTarget = 0.05;   // Switch to bullet-time (very slow)
                    timeScaleTarget = 0.3;   // Switch to bullet-time (very slow)
                }

                // Trigger an explosion effect
                explosion(engine);

                // Reset the counter
                counter = 0;
            }
        });

        // Define color palette
        var colors = [
          // '#EFEDE1', 
          '#CDE5ED', 
          '#439E99', 
          '#FF8084', 
          '#D0CDED'
        ];

        // Physics properties for the objects we'll create
        var bodyOptions = {
            frictionAir: 0,       // No air resistance
            // frictionAir: 0.01,       // Add air resistance to slow down items
            // friction: 0.0001,     // Very low surface friction
            friction: 0.05,     // Very low surface friction
            restitution: 0.8      // High bounciness (0 = no bounce, 1 = perfect bounce)
        };
        
        // Create a grid of small bouncy circles - centered, size relative to container
        // Reference to "Swordfish" - a movie with bullet-time effects
        World.add(world, Composites.stack(
          matter_container_2.clientWidth / 2 - 100, // x position (starting X coordinate)
          -500,                                         // y position (starting Y coordinate)
          3,                                          // columns (number of shapes horizontally)
          6,                                          // rows (number of shapes vertically)
          20,                                          // columnGap (horizontal spacing between shapes)
          140,                                         // rowGap (vertical spacing between shapes)
          function(x, y) {
            // Circle radius relative to container size (2-8% of container width)
            var minRadius = matter_container_2.clientWidth * 0.03;
            var maxRadius = matter_container_2.clientWidth * 0.18;
            var circleOptions = Object.assign({}, bodyOptions, {
                render: { fillStyle: Common.choose(colors) }
            });
            return Bodies.circle(x, y, Common.random(minRadius, maxRadius), circleOptions);
        }));

        // Create larger random objects - centered, size relative to container
        World.add(world, Composites.stack(
            matter_container_2.clientWidth / 2 - 100,  // x position (starting X coordinate)
            -400,                                        // y position (starting Y coordinate)
            3,                                         // columns (number of shapes horizontally)
            2,                                         // rows (number of shapes vertically)
            30,                                         // columnGap (horizontal spacing between shapes)
            150,                                         // rowGap (vertical spacing between shapes)
            function(x, y) {
            // Create options with random color for each shape
            var shapeOptions = Object.assign({}, bodyOptions, {
                render: { fillStyle: Common.choose(colors) }
            });

            // Randomly choose between rectangles and polygons
            switch (Math.round(Common.random(0, 1))) {
            case 0:
                // 80% chance of normal rectangle, 20% chance of long thin rectangle
                if (Common.random() < 0.8) {
                    // Square rectangles: 3-12% of container width/height
                    var minSize = matter_container_2.clientWidth * 0.05;
                    var maxSize = matter_container_2.clientWidth * 0.3;
                    return Bodies.rectangle(x, y, Common.random(minSize, maxSize), Common.random(minSize, maxSize), shapeOptions);
                } else {
                    // Long thin rectangles: width 5-15%, height 2-6% of container
                    var minWidth = matter_container_2.clientWidth * 0.05;
                    var maxWidth = matter_container_2.clientWidth * 0.2;
                    var minHeight = matter_container_2.clientHeight * 0.02;
                    var maxHeight = matter_container_2.clientHeight * 0.07;
                    return Bodies.rectangle(x, y, Common.random(minWidth, maxWidth), Common.random(minHeight, maxHeight), shapeOptions);
                }
            case 1:
                // Create random polygon with 4-8 sides, radius 2-8% of container width
                var minRadius = matter_container_2.clientWidth * 0.03;
                var maxRadius = matter_container_2.clientWidth * 0.18;
                return Bodies.polygon(x, y, Math.round(Common.random(4, 8)), Common.random(minRadius, maxRadius), shapeOptions);
            }
        }));

        // Add mouse interaction - allows user to grab and drag objects
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,    // How rigid the mouse constraint is
                    render: {
                        visible: false  // Don't draw the constraint line
                    }
                }
            });

        // Add the mouse constraint to the world
        World.add(world, mouseConstraint);

        // Keep mouse in sync with rendering system
        render.mouse = mouse;

        // Set the camera view to show the entire scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },      // Top-left corner
            max: { x: matter_container_2.clientWidth, y: matter_container_2.clientHeight}   // Bottom-right corner

        });

        // Store references to walls for resize handling
        // no ceiling
        // var topWall = Bodies.rectangle(matter_container_2.clientWidth / 2, 0, matter_container_2.clientWidth, 50, { isStatic: true });
        var bottomWall_2 = Bodies.rectangle(
          // x position
          matter_container_2.clientWidth / 2, 
          // y position
          matter_container_2.clientHeight + thickness_2 / 2, 
          // width
          // matter_container_2.clientWidth, 
          // set it to random large number instead
          27184,
          // height
          thickness_2, 
          // options
          { isStatic: true }
        );

        // right wall
        var rightWall_2 = Bodies.rectangle(
          // x position
          matter_container_2.clientWidth + thickness_2 / 2, 
          // y position
          matter_container_2.clientHeight / 2, 
          // width
          thickness_2, 
          // height
          matter_container_2.clientHeight * 5, 
          // options
          { isStatic: true }
        );

        // left wall
        var leftWall_2 = Bodies.rectangle(
          // x position
          0 - thickness_2 / 2, 
          // y position
          matter_container_2.clientHeight / 2, 
          // width
          thickness_2, 
          // height
          matter_container_2.clientHeight * 5, 
          // options
          { isStatic: true }
        );

        // Replace the previous wall creation with our stored references
        World.remove(world, world.bodies.slice(-4)); // Remove the walls we just added
        World.add(world, [
          // topWall, 
          bottomWall_2, 
          rightWall_2, 
          leftWall_2
        ]);

        // Resize handler for the second Matter.js world
        function handleResize2(matter_container_2) {
            // Set canvas size to new values
            render.canvas.width = matter_container_2.clientWidth;
            render.canvas.height = matter_container_2.clientHeight;

            // Update render bounds
            render.bounds.max.x = matter_container_2.clientWidth;
            render.bounds.max.y = matter_container_2.clientHeight;
            render.options.width = matter_container_2.clientWidth;
            render.options.height = matter_container_2.clientHeight;

            // Reposition top wall
            // Matter.Body.setPosition(
            //     topWall,
            //     Matter.Vector.create(
            //         matter_container_2.clientWidth / 2,
            //         0
            //     )
            // );

            // Reposition bottom wall
            Matter.Body.setPosition(
                bottomWall_2,
                Matter.Vector.create(
                    matter_container_2.clientWidth / 2,
                    matter_container_2.clientHeight + thickness_2 / 2
                )
            );

            // Reposition left wall
            Matter.Body.setPosition(
                // leftWall_2,
                bottomWall_2,
                Matter.Vector.create(
                    matter_container_2.clientWidth / 2,
                    matter_container_2.clientHeight + thickness_2 / 2
                )
            );

            // Reposition right wall
            Matter.Body.setPosition(
                rightWall_2,
                Matter.Vector.create(
                    matter_container_2.clientWidth + thickness_2 / 2,
                    matter_container_2.clientHeight / 2
                )
            );

            // Update camera view
            Render.lookAt(render, {
                min: { x: 0, y: 0 },
                max: { x: matter_container_2.clientWidth, y: matter_container_2.clientHeight }
            });
        }

        // Add resize event listener
        window.addEventListener("resize", () => handleResize2(matter_container_2));

        // Return the context object for the demo framework
        return {
            engine: engine,
            runner: runner,
            render: render,
            canvas: render.canvas,
            stop: function() {
                Matter.Render.stop(render);
                Matter.Runner.stop(runner);
            }
        };
    };

    // Initialize the second Matter.js world
    if (matter_container_2) {
        Example.timescale();
    }
    }




  window.addEventListener("load", function(event) { 
    init(); 
  });
}

// if (document.body.classList.contains('example_20')) {
  example_20();
// }

export default example_20