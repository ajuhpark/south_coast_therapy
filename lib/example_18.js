import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

/** Pagination Exercise */

gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)


function example_18() {
  console.log('example_18.js is working')

  function init() {
    console.log('example_18 init is working')

    gsap.set('html', { autoAlpha: 1 });

    // ==================== DOM ELEMENT SELECTION ====================
    // Select all the main sections that will be animated
    const pg_sections = document.querySelectorAll(".pg_section");
    // Select all background elements (these will have parallax effects)
    const pg_images = document.querySelectorAll(".pg_bg");
    // Convert NodeList to array for easier manipulation with GSAP
    const pg_headings = gsap.utils.toArray(".pg_section-heading");
    // Select the outer and inner wrapper elements used for the slide effect
    const pg_outerWrappers = gsap.utils.toArray(".pg_outer");
    const pg_innerWrappers = gsap.utils.toArray(".pg_inner");

    // ==================== EVENT LISTENERS ====================
    // Set up event listeners for both mouse wheel and touch events
    document.addEventListener("wheel", handleWheel);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    // ==================== STATE VARIABLES ====================
    // Controls whether the system is ready to accept new scroll inputs
    let listening = false,
        // Tracks scroll direction ("up" or "down")
        direction = "down",
        // Index of the currently visible section
        current,
        // Index of the next section to show (starts at 0 for first section)
        next = 0;

    // ==================== TOUCH TRACKING ====================
    // Object to store touch gesture data for mobile devices
    const touch = {
      startX: 0,    // Initial touch X position
      startY: 0,    // Initial touch Y position
      dx: 0,        // Horizontal distance moved
      dy: 0,        // Vertical distance moved
      startTime: 0, // Timestamp when touch started
      dt: 0         // Duration of touch
    };

    // ==================== ANIMATION DEFAULTS ====================
    // Default settings for all GSAP timeline animations
    const tlDefaults = {
      ease: "slow.inOut",  // Smooth easing function
      duration: 1.25       // 1.25 second animation duration
    };

    // ==================== TEXT ANIMATION SETUP ====================
    // Use SplitText plugin to break each heading into individual characters
    // This allows for staggered character animations
    const pg_splitHeadings = pg_headings.map((pg_heading) => {
      return new SplitText(pg_heading, {
        type: "chars, words, lines",
        linesClass: "clip-text"  // CSS class for line clipping effects
      });
    });

    // ==================== HEADING REVEAL ANIMATION ====================
    // Creates a staggered character animation for section headings
    function revealSectionHeading() {
      return gsap.to(pg_splitHeadings[next].chars, {
        autoAlpha: 1,     // Fade in (opacity + visibility)
        yPercent: 0,      // Move to original position
        duration: 1,      // 1 second duration
        ease: "power2",   // Smooth easing
        stagger: {
          each: 0.02,     // 0.02s delay between each character
          from: "random"  // Random order instead of left-to-right
        }
      });
    }

    // ==================== INITIAL SETUP ====================
    // Position all outer wrappers below viewport (100% down)
    gsap.set(pg_outerWrappers, { yPercent: 100 });
    // Position all inner wrappers above viewport (100% up)
    gsap.set(pg_innerWrappers, { yPercent: -100 });
    // This creates the "reveal" effect where content slides in from both directions

    // ==================== SLIDE IN ANIMATION (SCROLL DOWN) ====================
    function slideIn() {
      // On first run, current is undefined, so skip this step
      if (current !== undefined) gsap.set(pg_sections[current], { zIndex: 0 });
      
      // Prepare the next section to be visible and on top
      gsap.set(pg_sections[next], { autoAlpha: 1, zIndex: 1 });
      gsap.set(pg_images[next], { yPercent: 0 });
      // Hide heading characters and position them below (for slide-up effect)
      gsap.set(pg_splitHeadings[next].chars, { autoAlpha: 0, yPercent: 100 });

      // Create the main animation timeline
      const tl = gsap
        .timeline({
          paused: true,        // Don't start automatically
          defaults: tlDefaults, // Use default timing settings
          onComplete: () => {
            listening = true;   // Re-enable scroll listening when animation completes
            current = next;     // Update current section index
          }
        })
        // Animate both wrappers to center position (creates slide-in effect)
        .to([pg_outerWrappers[next], pg_innerWrappers[next]], { yPercent: 0 }, 0)
        // Add subtle parallax effect to background image
        .from(pg_images[next], { yPercent: 15 }, 0)
        // Trigger the heading text animation
        .add(revealSectionHeading(), 0);

      // If there's a current section, animate it out while new one slides in
      // if (current !== undefined) {
      //   tl.add(
      //     // Move current section's background image up (parallax effect)
      //     gsap.to(pg_images[current], {
      //       yPercent: -15,
      //       ...tlDefaults
      //     }),
      //     0  // Start at the same time as slide-in
      //   ).add(
      //     // After animation, reset the previous section's positions
      //     gsap
      //       .timeline()
      //       .set(pg_outerWrappers[current], { yPercent: 100 })   // Move wrapper down
      //       .set(pg_innerWrappers[current], { yPercent: -100 })  // Move wrapper up
      //       .set(pg_images[current], { yPercent: 0 })            // Reset image position
      //       .set(pg_sections[current], { autoAlpha: 0 })         // Hide section
      //   );
      // }

      // Start the animation
      tl.play(0);
    }

    // ==================== SLIDE OUT ANIMATION (SCROLL UP) ====================
    function slideOut() {
      // Set z-index so current section slides out over the next one
      // gsap.set(pg_sections[current], { zIndex: 1 });
      // gsap.set(pg_sections[next], { autoAlpha: 1, zIndex: 0 });
      
      // Prepare next section's heading for animation
      // gsap.set(pg_splitHeadings[next].chars, { autoAlpha: 0, yPercent: 100 });
      // Ensure next section's wrappers are in position
      // gsap.set([pg_outerWrappers[next], pg_innerWrappers[next]], { yPercent: 0 });
      // gsap.set(pg_images[next], { yPercent: 0 });

      // Create reverse slide animation
      gsap
        .timeline({
          defaults: tlDefaults,
          onComplete: () => {
            listening = true;   // Re-enable scroll listening
            current = next;     // Update current section
          }
        })
        // Slide current section's wrappers out of view
        .to(pg_outerWrappers[current], { yPercent: 100 }, 0)   // Down
        .to(pg_innerWrappers[current], { yPercent: -100 }, 0)  // Up
        // Parallax effect on current section's background
        .to(pg_images[current], { yPercent: 15 }, 0)
        // Parallax effect on next section's background (reverse)
        .from(pg_images[next], { yPercent: -15 }, 0)
        // Animate in the heading text (start 1 second before timeline ends)
        // .add(revealSectionHeading(), ">-1")
        // Reset current section's background position
        .set(pg_images[current], { yPercent: 0 });
    }

    // ==================== DIRECTION HANDLER ====================
    function handleDirection() {
      // Disable scroll listening during animation
      listening = false;

      if (direction === "down") {
        // Calculate next section index (with wrap-around)
        next = current + 1;
        if (next >= pg_sections.length) next = 0;  // Loop back to first
        slideIn();
      }

      if (direction === "up") {
        // Calculate previous section index (with wrap-around)
        next = current - 1;
        if (next < 0) next = pg_sections.length - 1;  // Loop to last
        slideOut();
      }
    }

    // ==================== MOUSE WHEEL HANDLER ====================
    function handleWheel(e) {
      // Ignore scroll events during animations
      if (!listening) return;
      
      // Determine scroll direction based on wheel delta
      // Negative wheelDeltaY = scrolling down, positive = scrolling up
      direction = e.wheelDeltaY < 0 ? "down" : "up";
      handleDirection();
    }

    // ==================== TOUCH EVENT HANDLERS ====================
    function handleTouchStart(e) {
      if (!listening) return;
      
      // Record starting touch position
      const t = e.changedTouches[0];
      touch.startX = t.pageX;
      touch.startY = t.pageY;
    }

    function handleTouchMove(e) {
      if (!listening) return;
      
      // Prevent default scrolling behavior during our custom handling
      e.preventDefault();
    }

    function handleTouchEnd(e) {
      if (!listening) return;
      
      // Calculate touch distance and determine swipe direction
      const t = e.changedTouches[0];
      touch.dx = t.pageX - touch.startX;  // Horizontal distance
      touch.dy = t.pageY - touch.startY;  // Vertical distance
      
      // Determine direction based on vertical swipe distance
      // Swipe down (positive dy) = go to previous section
      if (touch.dy > 10) direction = "up";
      // Swipe up (negative dy) = go to next section
      if (touch.dy < -10) direction = "down";
      
      handleDirection();
    }

    // ==================== INITIALIZATION ====================
    // Start the experience by sliding in the first section
    slideIn();


    
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

// if (document.body.classList.contains('example_18')) {
  example_18();
// }

export default example_18
