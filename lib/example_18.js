import '../src/styles/style.css'
import { gsap } from 'gsap'

/** Pagination Exercise
 * removed splittext, put in debug code. removed slow.inout. 
 * slow inout was not the issue.
 */

function example_18() {
  console.log('example_18.js is working')

  function init() {
    console.log('example_18 init function is working')
    // Set initial state and animate in
    gsap.set('html', { autoAlpha: 0 });
    gsap.to('html', { duration: 0.5, autoAlpha: 1 });

    const pg_sections = document.querySelectorAll(".pg_section");
    const pg_images = document.querySelectorAll(".pg_bg");
    const pg_headings = gsap.utils.toArray(".pg_section-heading");
    const pg_outerWrappers = gsap.utils.toArray(".pg_outer");
    const pg_innerWrappers = gsap.utils.toArray(".pg_inner");

    console.log('Elements found:', {
      sections: pg_sections.length,
      images: pg_images.length,
      headings: pg_headings.length,
      outer: pg_outerWrappers.length,
      inner: pg_innerWrappers.length
    });

    let listening = false,
      direction = "down",
      current,
      next = 0;

    const touch = {
      startX: 0,
      startY: 0,
      dx: 0,
      dy: 0,
      startTime: 0,
      dt: 0
    };

    const tlDefaults = {
      // ease: "slow.inOut",
      duration: 1.25
    };

    console.log('Variables initialized')

    // Simple heading reveal without SplitText
    function revealSectionHeading() {
      console.log('revealSectionHeading called for index:', next);
      return gsap.to(pg_headings[next], {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      });
    }

    console.log('revealSectionHeading function defined')

    gsap.set(pg_outerWrappers, { yPercent: 100 });
    gsap.set(pg_innerWrappers, { yPercent: -100 });

    console.log('Initial gsap.set calls completed')

    // Slides a section in on scroll down
    function slideIn() {
      console.log('slideIn called - current:', current, 'next:', next);
      
      // The first time this function runs, current is undefined
      if (current !== undefined) gsap.set(pg_sections[current], { zIndex: 0 });

      gsap.set(pg_sections[next], { autoAlpha: 1, zIndex: 1 });
      gsap.set(pg_images[next], { yPercent: 0 });
      gsap.set(pg_headings[next], { autoAlpha: 0, y: 50 });

      const tl = gsap
        .timeline({
          paused: true,
          defaults: tlDefaults,
          onComplete: () => {
            console.log('slideIn timeline complete');
            listening = true;
            current = next;
          }
        })
        .to([pg_outerWrappers[next], pg_innerWrappers[next]], { yPercent: 0 }, 0)
        .from(pg_images[next], { yPercent: 15 }, 0)
        .add(revealSectionHeading(), 0);

      if (current !== undefined) {
        tl.add(
          gsap.to(pg_images[current], {
            yPercent: -15,
            ...tlDefaults
          }),
          0
        ).add(
          gsap
            .timeline()
            .set(pg_outerWrappers[current], { yPercent: 100 })
            .set(pg_innerWrappers[current], { yPercent: -100 })
            .set(pg_images[current], { yPercent: 0 })
            .set(pg_sections[current], { autoAlpha: 0 })
        );
      }

      tl.play(0);
    }

    // Slides a section out on scroll up
    function slideOut() {
      console.log('slideOut called - current:', current, 'next:', next);
      
      gsap.set(pg_sections[current], { zIndex: 1 });
      gsap.set(pg_sections[next], { autoAlpha: 1, zIndex: 0 });
      gsap.set(pg_headings[next], { autoAlpha: 0, y: 50 });
      gsap.set([pg_outerWrappers[next], pg_innerWrappers[next]], { yPercent: 0 });
      gsap.set(pg_images[next], { yPercent: 0 });

      gsap
        .timeline({
          defaults: tlDefaults,
          onComplete: () => {
            console.log('slideOut timeline complete');
            listening = true;
            current = next;
          }
        })
        .to(pg_outerWrappers[current], { yPercent: 100 }, 0)
        .to(pg_innerWrappers[current], { yPercent: -100 }, 0)
        .to(pg_images[current], { yPercent: 15 }, 0)
        .from(pg_images[next], { yPercent: -15 }, 0)
        .add(revealSectionHeading(), ">-1")
        .set(pg_images[current], { yPercent: 0 });
    }

    function handleDirection() {
      console.log('handleDirection called - direction:', direction, 'listening:', listening);
      listening = false;

      if (direction === "down") {
        next = current + 1;
        if (next >= pg_sections.length) next = 0;
        slideIn();
      }

      if (direction === "up") {
        next = current - 1;
        if (next < 0) next = pg_sections.length - 1;
        slideOut();
      }
    }

    function handleWheel(e) {
      console.log('handleWheel called - listening:', listening, 'wheelDeltaY:', e.wheelDeltaY);
      if (!listening) return;
      direction = e.wheelDeltaY < 0 ? "down" : "up";
      handleDirection();
    }

    function handleTouchStart(e) {
      if (!listening) return;
      const t = e.changedTouches[0];
      touch.startX = t.pageX;
      touch.startY = t.pageY;
    }

    function handleTouchMove(e) {
      if (!listening) return;
      e.preventDefault();
    }

    function handleTouchEnd(e) {
      if (!listening) return;
      const t = e.changedTouches[0];
      touch.dx = t.pageX - touch.startX;
      touch.dy = t.pageY - touch.startY;
      if (touch.dy > 10) direction = "up";
      if (touch.dy < -10) direction = "down";
      handleDirection();
    }

    // Add event listeners AFTER functions are defined
    document.addEventListener("wheel", handleWheel);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    console.log('Event listeners added')

    slideIn();
    console.log('slideIn() called - init complete')
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

example_18();