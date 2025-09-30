/** 
 * matter js test
 * fewer shapes. this one has resize boundaries set correctly.
 * fills have color.
 * this has a smaller and less shapes
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
    
    matter_container_1()
    matter_container_2()
    matter_container_3()
    matter_container_4()

    function matter_container_1(){
      const matterContainer = document.querySelector("#matter-container")
      if (!matterContainer) return;
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


    }
    



    function matter_container_2(){
      // new matter js container - get all instances
      const matter_container_2_elements = document.querySelectorAll(".matter_container_2")
      if (matter_container_2_elements.length === 0) return;

      // Loop through each container and initialize
      matter_container_2_elements.forEach(function(matter_container_2) {
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
                  // background: '#F5F7F9'  // Add this line
                  background: 'transparent',  // Add this line
                  // showBounds: false,
                  // canvas: {
                  //  style: 'border: none;'
                  // }
                  
              }
          });

          // Start the renderer
          Render.run(render);

          // Create and start the runner - this is the game loop that updates physics
          var runner = Runner.create();
          Runner.run(runner, engine);

          // Create the boundaries of our world (walls and floor/ceiling)
          World.add(world, [
              // Top wall (ceiling)
              Bodies.rectangle(
                matter_container_2.clientWidth / 2, 
                0, 
                matter_container_2.clientWidth, 
                50, 
                { isStatic: true }),    
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
                      var forceMagnitude = 0.03 * body.mass; // Increase from 0.05 for stronger explosions

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

          // Define color palette - shuffle on each load
          var colors = [
            // '#EFEDE1',
            '#CDE5ED',
            '#439E99',
            '#FF8084',
            '#D0CDED'
          ];

          // Shuffle the colors array for additional randomness
          colors = colors.sort(() => Math.random() - 0.5);

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
            2,                                          // rows (number of shapes vertically)
            20,                                          // columnGap (horizontal spacing between shapes)
            140,                                         // rowGap (vertical spacing between shapes)
            function(x, y) {
              // Circle radius relative to container size (2-8% of container width) - with fresh randomness
              var minRadius = matter_container_2.clientWidth * 0.13;
              var maxRadius = matter_container_2.clientWidth * 0.28;
              var randomRadius = minRadius + (Math.random() * (maxRadius - minRadius));
              var randomColor = colors[Math.floor(Math.random() * colors.length)];
              var circleOptions = Object.assign({}, bodyOptions, {
                  render: { fillStyle: randomColor }
              });
              return Bodies.circle(x, y, randomRadius, circleOptions);
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
              // Create options with random color for each shape using fresh Math.random
              var randomColor = colors[Math.floor(Math.random() * colors.length)];
              var shapeOptions = Object.assign({}, bodyOptions, {
                  render: { fillStyle: randomColor }
              });

              // Randomly choose between rectangles and polygons using Math.random
              var shapeType = Math.floor(Math.random() * 2);
              switch (shapeType) {
              case 0:
                  // 80% chance of normal rectangle, 20% chance of long thin rectangle
                  if (Math.random() < 0.8) {
                      // Square rectangles: 3-12% of container width/height
                      var minSize = matter_container_2.clientWidth * 0.05;
                      var maxSize = matter_container_2.clientWidth * 0.3;
                      var randomWidth = minSize + (Math.random() * (maxSize - minSize));
                      var randomHeight = minSize + (Math.random() * (maxSize - minSize));
                      return Bodies.rectangle(x, y, randomWidth, randomHeight, shapeOptions);
                  } else {
                      // Long thin rectangles: width 5-15%, height 2-6% of container
                      var minWidth = matter_container_2.clientWidth * 0.05;
                      var maxWidth = matter_container_2.clientWidth * 0.2;
                      var minHeight = matter_container_2.clientHeight * 0.02;
                      var maxHeight = matter_container_2.clientHeight * 0.07;
                      var randomWidth = minWidth + (Math.random() * (maxWidth - minWidth));
                      var randomHeight = minHeight + (Math.random() * (maxHeight - minHeight));
                      return Bodies.rectangle(x, y, randomWidth, randomHeight, shapeOptions);
                  }
              case 1:
                  // Create random polygon with 4-8 sides, radius 2-8% of container width
                  var minRadius = matter_container_2.clientWidth * 0.03;
                  var maxRadius = matter_container_2.clientWidth * 0.18;
                  var randomSides = Math.floor(Math.random() * 5) + 4; // 4-8 sides
                  var randomRadius = minRadius + (Math.random() * (maxRadius - minRadius));
                  return Bodies.polygon(x, y, randomSides, randomRadius, shapeOptions);
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
          // var matter_container_3 = Bodies.rectangle(matter_container_2.clientWidth / 2, 0, matter_container_2.clientWidth, 50, { isStatic: true });
          var bottomWall_2 = Bodies.rectangle(
            // x position
            matter_container_2.clientWidth / 2,
            // y position
            matter_container_2.clientHeight + thickness_2 / 2 + 1,
            // width
            // matter_container_2.clientWidth,
            // set it to random large number instead
            27184,
            // height
            thickness_2 + 1,
            // options
            { isStatic: true }
          );

          // right wall
          var rightWall_2 = Bodies.rectangle(
            // x position. 
            matter_container_2.clientWidth + thickness_2 / 2 + 1,
            // y position
            matter_container_2.clientHeight / 2,
            // width
            thickness_2 + 1,
            // height
            matter_container_2.clientHeight * 5,
            // options
            { isStatic: true }
          );

          // left wall
          var leftWall_2 = Bodies.rectangle(
            // x position
            0 - thickness_2 / 2 - 1,
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
            // matter_container_3, 
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
              //     matter_container_3,
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
                  // Matter.Vector.create(x, y) - Creates a vector with x and y coordinates
                  Matter.Vector.create(
                      matter_container_2.clientWidth / 2 + 1,
                      matter_container_2.clientHeight + thickness_2 / 2 + 1
                  )
              );

              // Reposition right wall
              Matter.Body.setPosition(
                  rightWall_2,
                  Matter.Vector.create(
                      matter_container_2.clientWidth + thickness_2 / 2 + 1,
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
      }); // Close forEach loop
    }



    function matter_container_3(){
      // new matter js container - get all instances
      const matter_container_3_elements = document.querySelectorAll(".matter_container_3")
      if (matter_container_3_elements.length === 0) return;

      // Loop through each container and initialize
      matter_container_3_elements.forEach(function(matter_container_3) {
      const thickness_3 = 60


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

          // Add timestamp-based randomness to ensure different results on each page load
          var timeBasedRandom = Date.now() % 1000;
          

          // Create the physics engine - this handles all physics calculations
          var engine = Engine.create(),
              world = engine.world;          // Get reference to the world

          // Reduce gravity for floating effect while still allowing bouncing
          engine.world.gravity.y = 0.1;     // Default is 1, lower value = less gravity

          // Create the renderer - this draws everything on screen
          var render = Render.create({
              element: matter_container_3,   // Attach to your specific container
              engine: engine,                // Link to our physics engine
              options: {
                  width: matter_container_3.clientWidth,   // Canvas width matches container
                  height: matter_container_3.clientHeight, // Canvas height matches container
                  wireframes: false,          // Show filled shapes, not just outlines
                  // background: '#F5F7F9'  // Add this line
                  background: 'transparent',  // Add this line
                  // showBounds: false,
                  // canvas: {
                  //  style: 'border: none;'
                  // }
                  
              }
          });

          // Start the renderer
          Render.run(render);

          // Create and start the runner - this is the game loop that updates physics
          var runner = Runner.create();
          Runner.run(runner, engine);

          // Create the boundaries of our world (walls and floor/ceiling)
          World.add(world, [
              // Top wall (ceiling)
              Bodies.rectangle(
                matter_container_3.clientWidth / 2,  // x position (center horizontally)
                0,                                   // y position (top of container)
                matter_container_3.clientWidth / 2,      // width (full container width)
                50,                                  // height (50px thick)
                { isStatic: true }                   // options (static = doesn't move)
              ),

              
              // Bottom wall (floor)
              Bodies.rectangle(
                matter_container_3.clientWidth / 2, // x position (center horizontally)
                matter_container_3.clientHeight, // y position (top of container)
                matter_container_3.clientWidth, // width (full container width)
                50, // height (50px thick)
                { isStatic: true }),  // options (static = doesn't move)

              // Right wall
              Bodies.rectangle(
                matter_container_3.clientWidth, // x position (center horizontally)
                matter_container_3.clientHeight / 2, // y position (top of container)
                50, // width (full container width)
                matter_container_3.clientHeight, // height 
                { isStatic: true }),  // options (static = doesn't move)
              // Left wall
              Bodies.rectangle(
                0, // x position (center horizontally)
                matter_container_3.clientHeight / 2, // y position (top of container)
                50,  // width (full container width)
                matter_container_3.clientHeight, // height 
                { isStatic: true })     // options (static = doesn't move)
          ]);


          // Define color palette - shuffle on each load
          var colors = [
            // '#EFEDE1',
            '#CDE5ED',
            '#439E99',
            '#FF8084',
            '#D0CDED'
          ];

          // Shuffle the colors array for additional randomness
          colors = colors.sort(() => Math.random() - 0.5);

          // Physics properties for the objects we'll create
          var bodyOptions = {
              frictionAir: 0,       // No air resistance
              // frictionAir: 0.01,       // Add air resistance to slow down items
              // friction: 0.0001,     // Very low surface friction
              friction: 0.01,       // Reduced surface friction for smoother movement
              restitution: 1.04     // Higher bounciness to maintain energy (0 = no bounce, 1 = perfect bounce)
          };

          // Create a grid of small bouncy circles - spawned from center of container
          World.add(world, Composites.stack(
            matter_container_3.clientWidth / 2 - 100, // x position (starting X coordinate)
            matter_container_3.clientHeight / 2 - 150, // y position (starting Y coordinate - center)
            3,                                          // columns (number of shapes horizontally)
            4,                                          // rows (number of shapes vertically)
            40,                                          // columnGap (horizontal spacing between shapes)
            140,                                         // rowGap (vertical spacing between shapes)
            function(x, y) {
              // Circle radius relative to container size (2-8% of container width) - with fresh randomness
              var minRadius = matter_container_3.clientWidth * 0.03;
              var maxRadius = matter_container_3.clientWidth * 0.12;
              var randomRadius = minRadius + (Math.random() * (maxRadius - minRadius));
              var randomColor = colors[Math.floor(Math.random() * colors.length)];
              var circleOptions = Object.assign({}, bodyOptions, {
                  render: { fillStyle: randomColor }
              });
              return Bodies.circle(x, y, randomRadius, circleOptions);
          }));

          // Create larger random objects - spawned from center of container
          World.add(world, Composites.stack(
              matter_container_3.clientWidth / 2 - 100,  // x position (starting X coordinate)
              matter_container_3.clientHeight / 2 - 50,   // y position (starting Y coordinate - center)
              6,                                         // columns (number of shapes horizontally)
              2,                                         // rows (number of shapes vertically)
              40,                                         // columnGap (horizontal spacing between shapes)
              100,                                         // rowGap (vertical spacing between shapes)
              function(x, y) {
              // Create options with random color for each shape using fresh Math.random
              var randomColor = colors[Math.floor(Math.random() * colors.length)];
              var shapeOptions = Object.assign({}, bodyOptions, {
                  render: { fillStyle: randomColor }
              });

              // Randomly choose between rectangles and polygons using Math.random
              var shapeType = Math.floor(Math.random() * 2);
              switch (shapeType) {
              case 0:
                  // 80% chance of normal rectangle, 20% chance of long thin rectangle
                  if (Math.random() < 0.8) {
                      // Square rectangles: 3-12% of container width/height
                      var minSize = matter_container_3.clientWidth * 0.03;
                      var maxSize = matter_container_3.clientWidth * 0.13;
                      var randomWidth = minSize + (Math.random() * (maxSize - minSize));
                      var randomHeight = minSize + (Math.random() * (maxSize - minSize));
                      return Bodies.rectangle(x, y, randomWidth, randomHeight, shapeOptions);
                  } else {
                      // Long thin rectangles: width 5-15%, height 2-6% of container
                      var minWidth = matter_container_3.clientWidth * 0.08;
                      var maxWidth = matter_container_3.clientWidth * .02;
                      var minHeight = matter_container_3.clientHeight * 0.08;
                      var maxHeight = matter_container_3.clientHeight * 0.2;
                      var randomWidth = minWidth + (Math.random() * (maxWidth - minWidth));
                      var randomHeight = minHeight + (Math.random() * (maxHeight - minHeight));
                      return Bodies.rectangle(x, y, randomWidth, randomHeight, shapeOptions);
                  }
              case 1:
                  // Create random polygon with 4-8 sides, radius 2-8% of container width
                  var minRadius = matter_container_3.clientWidth * 0.03;
                  var maxRadius = matter_container_3.clientWidth * 0.1;
                  var randomSides = Math.floor(Math.random() * 5) + 4; // 4-8 sides
                  var randomRadius = minRadius + (Math.random() * (maxRadius - minRadius));
                  return Bodies.polygon(x, y, randomSides, randomRadius, shapeOptions);
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

          // Add initial random velocities to all shapes for movement
          setTimeout(function() {
              var allBodies = world.bodies;
              for (var i = 0; i < allBodies.length; i++) {
                  var body = allBodies[i];
                  // Skip static bodies (walls)
                  if (!body.isStatic) {
                      // Apply random initial velocity using Math.random for fresh randomness
                      var randomVelX = (Math.random() - 0.5) * 320; // -160 to 160
                      var randomVelY = (Math.random() - 0.5) * 320; // -160 to 160
                      Matter.Body.setVelocity(body, {
                          x: randomVelX,  // Random horizontal velocity
                          y: randomVelY   // Random vertical velocity
                      });
                  }
              }
          }, 100); // Small delay to ensure all bodies are created

          // Set the camera view to show the entire scene
          Render.lookAt(render, {
              min: { x: 0, y: 0 },      // Top-left corner
              max: { x: matter_container_3.clientWidth, y: matter_container_3.clientHeight}   // Bottom-right corner

          });

          // Store references to walls for resize handling
          // this one has a ceiling
          var matter_container_3_3 = Bodies.rectangle(
            // x position
            matter_container_3.clientWidth / 2,
            // y position - positioned right above container like bottom wall is right below
            -thickness_3 / 2 - 1,
            // width
            // matter_container_3.clientWidth,
            // set it to random large number instead
            27184,
            // height
            thickness_3,
            { isStatic: true }
          );


          var bottomWall_3 = Bodies.rectangle(
            // x position
            matter_container_3.clientWidth / 2,
            // y position
            matter_container_3.clientHeight + thickness_3 / 2 + 1,
            // width
            // matter_container_3.clientWidth,
            // set it to random large number instead
            27184,
            // height
            thickness_3 + 1,
            // options
            { isStatic: true }
          );

          // right wall
          var rightWall_3 = Bodies.rectangle(
            // x position. 
            matter_container_3.clientWidth + thickness_3 / 2 + 1,
            // y position
            matter_container_3.clientHeight / 2,
            // width
            thickness_3 + 1,
            // height
            matter_container_3.clientHeight * 5,
            // options
            { isStatic: true }
          );

          // left wall
          var leftWall_3 = Bodies.rectangle(
            // x position
            0 - thickness_3 / 2 - 1,
            // y position
            matter_container_3.clientHeight / 2,
            // width
            thickness_3,
            // height
            matter_container_3.clientHeight * 5,
            // options
            { isStatic: true }
          );

          // Replace the previous wall creation with our stored references
          World.remove(world, world.bodies.slice(-4)); // Remove the walls we just added
          World.add(world, [
            matter_container_3_3, 
            bottomWall_3, 
            rightWall_3, 
            leftWall_3
          ]);

          // Resize handler for the second Matter.js world
          function handleResize2(matter_container_3) {
              // Set canvas size to new values
              render.canvas.width = matter_container_3.clientWidth;
              render.canvas.height = matter_container_3.clientHeight;

              // Update render bounds
              render.bounds.max.x = matter_container_3.clientWidth;
              render.bounds.max.y = matter_container_3.clientHeight;
              render.options.width = matter_container_3.clientWidth;
              render.options.height = matter_container_3.clientHeight;

              // Reposition top wall
              Matter.Body.setPosition(
                  matter_container_3_3,
                  Matter.Vector.create(
                      matter_container_3.clientWidth / 2,
                      -thickness_3 / 2 - 1
                  )
              );

              // Reposition bottom wall
              Matter.Body.setPosition(
                  bottomWall_3,
                  Matter.Vector.create(
                      matter_container_3.clientWidth / 2,
                      matter_container_3.clientHeight + thickness_3 / 2
                  )
              );

              // Reposition left wall
              Matter.Body.setPosition(
                  // leftWall_3,
                  bottomWall_3,
                  // Matter.Vector.create(x, y) - Creates a vector with x and y coordinates
                  Matter.Vector.create(
                      matter_container_3.clientWidth / 2 + 1,
                      matter_container_3.clientHeight + thickness_3 / 2 + 1
                  )
              );

              // Reposition right wall
              Matter.Body.setPosition(
                  rightWall_3,
                  Matter.Vector.create(
                      matter_container_3.clientWidth + thickness_3 / 2 + 1,
                      matter_container_3.clientHeight / 2 
                  )
              );

              // Update camera view
              Render.lookAt(render, {
                  min: { x: 0, y: 0 },
                  max: { x: matter_container_3.clientWidth, y: matter_container_3.clientHeight }
              });
          }

          // Add resize event listener
          window.addEventListener("resize", () => handleResize2(matter_container_3));

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

      // Initialize the third Matter.js world
      if (matter_container_3) {
          Example.timescale();
      }
      }); // Close forEach loop
    }

    function matter_container_4(){
      // new matter js container - get all instances
      const matter_container_4_elements = document.querySelectorAll(".matter_container_4")
      if (matter_container_4_elements.length === 0) return;

      // Loop through each container and initialize
      matter_container_4_elements.forEach(function(matter_container_4) {
      const thickness_4 = 60


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

          // Add timestamp-based randomness to ensure different results on each page load
          var timeBasedRandom = Date.now() % 1000;
          

          // Create the physics engine - this handles all physics calculations
          var engine = Engine.create(),
              world = engine.world;          // Get reference to the world

          // Reduce gravity for floating effect while still allowing bouncing
          engine.world.gravity.y = 0.1;     // Default is 1, lower value = less gravity

          // Create the renderer - this draws everything on screen
          var render = Render.create({
              element: matter_container_4,   // Attach to your specific container
              engine: engine,                // Link to our physics engine
              options: {
                  width: matter_container_4.clientWidth,   // Canvas width matches container
                  height: matter_container_4.clientHeight, // Canvas height matches container
                  wireframes: false,          // Show filled shapes, not just outlines
                  // background: '#F5F7F9'  // Add this line
                  background: 'transparent',  // Add this line
                  // showBounds: false,
                  // canvas: {
                  //  style: 'border: none;'
                  // }
                  
              }
          });

          // Start the renderer
          Render.run(render);

          // Create and start the runner - this is the game loop that updates physics
          var runner = Runner.create();
          Runner.run(runner, engine);

          // Create the boundaries of our world (walls and floor/ceiling)
          World.add(world, [
              // Top wall (ceiling)
              Bodies.rectangle(
                matter_container_4.clientWidth / 2,  // x position (center horizontally)
                0,                                   // y position (top of container)
                matter_container_4.clientWidth / 2,      // width (full container width)
                50,                                  // height (50px thick)
                { isStatic: true }                   // options (static = doesn't move)
              ),

              
              // Bottom wall (floor)
              Bodies.rectangle(
                matter_container_4.clientWidth / 2, // x position (center horizontally)
                matter_container_4.clientHeight, // y position (top of container)
                matter_container_4.clientWidth, // width (full container width)
                50, // height (50px thick)
                { isStatic: true }),  // options (static = doesn't move)

              // Right wall
              Bodies.rectangle(
                matter_container_4.clientWidth, // x position (center horizontally)
                matter_container_4.clientHeight / 2, // y position (top of container)
                50, // width (full container width)
                matter_container_4.clientHeight, // height 
                { isStatic: true }),  // options (static = doesn't move)
              // Left wall
              Bodies.rectangle(
                0, // x position (center horizontally)
                matter_container_4.clientHeight / 2, // y position (top of container)
                50,  // width (full container width)
                matter_container_4.clientHeight, // height 
                { isStatic: true })     // options (static = doesn't move)
          ]);


          // Define color palette - shuffle on each load
          var colors = [
            // '#EFEDE1',
            '#CDE5ED',
            '#439E99',
            '#FF8084',
            '#D0CDED'
          ];

          // Shuffle the colors array for additional randomness
          colors = colors.sort(() => Math.random() - 0.5);

          // Physics properties for the objects we'll create
          var bodyOptions = {
              frictionAir: 0,       // No air resistance
              // frictionAir: 0.01,       // Add air resistance to slow down items
              // friction: 0.0001,     // Very low surface friction
              friction: 0.01,       // Reduced surface friction for smoother movement
              restitution: 1.04     // Higher bounciness to maintain energy (0 = no bounce, 1 = perfect bounce)
          };

          // Create a grid of small bouncy circles - spawned from center of container
          World.add(world, Composites.stack(
            matter_container_4.clientWidth / 2 - 100, // x position (starting X coordinate)
            matter_container_4.clientHeight / 2 - 150, // y position (starting Y coordinate - center)
            3,                                          // columns (number of shapes horizontally)
            4,                                          // rows (number of shapes vertically)
            40,                                          // columnGap (horizontal spacing between shapes)
            140,                                         // rowGap (vertical spacing between shapes)
            function(x, y) {
              // Circle radius relative to container size (2-8% of container width) - with fresh randomness
              var minRadius = matter_container_4.clientWidth * 0.03;
              var maxRadius = matter_container_4.clientWidth * 0.12;
              var randomRadius = minRadius + (Math.random() * (maxRadius - minRadius));
              var randomColor = colors[Math.floor(Math.random() * colors.length)];
              var circleOptions = Object.assign({}, bodyOptions, {
                  render: { fillStyle: randomColor }
              });
              return Bodies.circle(x, y, randomRadius, circleOptions);
          }));

          // Create larger random objects - spawned from center of container
          World.add(world, Composites.stack(
              matter_container_4.clientWidth / 2 - 100,  // x position (starting X coordinate)
              matter_container_4.clientHeight / 2 - 50,   // y position (starting Y coordinate - center)
              6,                                         // columns (number of shapes horizontally)
              2,                                         // rows (number of shapes vertically)
              40,                                         // columnGap (horizontal spacing between shapes)
              100,                                         // rowGap (vertical spacing between shapes)
              function(x, y) {
              // Create options with random color for each shape using fresh Math.random
              var randomColor = colors[Math.floor(Math.random() * colors.length)];
              var shapeOptions = Object.assign({}, bodyOptions, {
                  render: { fillStyle: randomColor }
              });

              // Randomly choose between rectangles and polygons using Math.random
              var shapeType = Math.floor(Math.random() * 2);
              switch (shapeType) {
              case 0:
                  // 80% chance of normal rectangle, 20% chance of long thin rectangle
                  if (Math.random() < 0.8) {
                      // Square rectangles: 3-12% of container width/height
                      var minSize = matter_container_4.clientWidth * 0.03;
                      var maxSize = matter_container_4.clientWidth * 0.13;
                      var randomWidth = minSize + (Math.random() * (maxSize - minSize));
                      var randomHeight = minSize + (Math.random() * (maxSize - minSize));
                      return Bodies.rectangle(x, y, randomWidth, randomHeight, shapeOptions);
                  } else {
                      // Long thin rectangles: width 5-15%, height 2-6% of container
                      var minWidth = matter_container_4.clientWidth * 0.08;
                      var maxWidth = matter_container_4.clientWidth * .02;
                      var minHeight = matter_container_4.clientHeight * 0.08;
                      var maxHeight = matter_container_4.clientHeight * 0.2;
                      var randomWidth = minWidth + (Math.random() * (maxWidth - minWidth));
                      var randomHeight = minHeight + (Math.random() * (maxHeight - minHeight));
                      return Bodies.rectangle(x, y, randomWidth, randomHeight, shapeOptions);
                  }
              case 1:
                  // Create random polygon with 4-8 sides, radius 2-8% of container width
                  var minRadius = matter_container_4.clientWidth * 0.03;
                  var maxRadius = matter_container_4.clientWidth * 0.1;
                  var randomSides = Math.floor(Math.random() * 5) + 4; // 4-8 sides
                  var randomRadius = minRadius + (Math.random() * (maxRadius - minRadius));
                  return Bodies.polygon(x, y, randomSides, randomRadius, shapeOptions);
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

          // Add initial random velocities to all shapes for movement
          setTimeout(function() {
              var allBodies = world.bodies;
              for (var i = 0; i < allBodies.length; i++) {
                  var body = allBodies[i];
                  // Skip static bodies (walls)
                  if (!body.isStatic) {
                      // Apply random initial velocity using Math.random for fresh randomness
                      var randomVelX = (Math.random() - 0.5) * 320; // -160 to 160
                      var randomVelY = (Math.random() - 0.5) * 320; // -160 to 160
                      Matter.Body.setVelocity(body, {
                          x: randomVelX,  // Random horizontal velocity
                          y: randomVelY   // Random vertical velocity
                      });
                  }
              }
          }, 100); // Small delay to ensure all bodies are created

          // Set the camera view to show the entire scene
          Render.lookAt(render, {
              min: { x: 0, y: 0 },      // Top-left corner
              max: { x: matter_container_4.clientWidth, y: matter_container_4.clientHeight}   // Bottom-right corner

          });

          // Store references to walls for resize handling
          // this one has a ceiling
          var topWall_4 = Bodies.rectangle(
            // x position
            matter_container_4.clientWidth / 2,
            // y position - positioned right above container like bottom wall is right below
            -thickness_4 / 2 - 1,
            // width
            // matter_container_4.clientWidth,
            // set it to random large number instead
            27184,
            // height
            thickness_4,
            { isStatic: true }
          );


          var bottomWall_4 = Bodies.rectangle(
            // x position
            matter_container_4.clientWidth / 2,
            // y position
            matter_container_4.clientHeight + thickness_4 / 2 + 1,
            // width
            // matter_container_4.clientWidth,
            // set it to random large number instead
            27184,
            // height
            thickness_4 + 1,
            // options
            { isStatic: true }
          );

          // right wall
          var rightWall_4 = Bodies.rectangle(
            // x position. 
            matter_container_4.clientWidth + thickness_4 / 2 + 1,
            // y position
            matter_container_4.clientHeight / 2,
            // width
            thickness_4 + 1,
            // height
            matter_container_4.clientHeight * 5,
            // options
            { isStatic: true }
          );

          // left wall
          var leftWall_4 = Bodies.rectangle(
            // x position
            0 - thickness_4 / 2 - 1,
            // y position
            matter_container_4.clientHeight / 2,
            // width
            thickness_4,
            // height
            matter_container_4.clientHeight * 5,
            // options
            { isStatic: true }
          );

          // Replace the previous wall creation with our stored references
          World.remove(world, world.bodies.slice(-4)); // Remove the walls we just added
          World.add(world, [
            topWall_4, 
            bottomWall_4, 
            rightWall_4, 
            leftWall_4
          ]);

          // Resize handler for the second Matter.js world
          function handleResize2(matter_container_4) {
              // Set canvas size to new values
              render.canvas.width = matter_container_4.clientWidth;
              render.canvas.height = matter_container_4.clientHeight;

              // Update render bounds
              render.bounds.max.x = matter_container_4.clientWidth;
              render.bounds.max.y = matter_container_4.clientHeight;
              render.options.width = matter_container_4.clientWidth;
              render.options.height = matter_container_4.clientHeight;

              // Reposition top wall
              Matter.Body.setPosition(
                  topWall_4,
                  Matter.Vector.create(
                      matter_container_4.clientWidth / 2,
                      -thickness_4 / 2 - 1
                  )
              );

              // Reposition bottom wall
              Matter.Body.setPosition(
                  bottomWall_4,
                  Matter.Vector.create(
                      matter_container_4.clientWidth / 2,
                      matter_container_4.clientHeight + thickness_4 / 2
                  )
              );

              // Reposition left wall
              Matter.Body.setPosition(
                  // leftWall_4,
                  bottomWall_4,
                  // Matter.Vector.create(x, y) - Creates a vector with x and y coordinates
                  Matter.Vector.create(
                      matter_container_4.clientWidth / 2 + 1,
                      matter_container_4.clientHeight + thickness_4 / 2 + 1
                  )
              );

              // Reposition right wall
              Matter.Body.setPosition(
                  rightWall_4,
                  Matter.Vector.create(
                      matter_container_4.clientWidth + thickness_4 / 2 + 1,
                      matter_container_4.clientHeight / 2 
                  )
              );

              // Update camera view
              Render.lookAt(render, {
                  min: { x: 0, y: 0 },
                  max: { x: matter_container_4.clientWidth, y: matter_container_4.clientHeight }
              });
          }

          // Add resize event listener
          window.addEventListener("resize", () => handleResize2(matter_container_4));

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

      // Initialize the third Matter.js world
      if (matter_container_4) {
          Example.timescale();
      }
      }); // Close forEach loop
    }

    } // Close init() function





  window.addEventListener("load", function(event) { 
    init(); 
  });
}

// if (document.body.classList.contains('example_20')) {
  example_20();
// }

export default example_20