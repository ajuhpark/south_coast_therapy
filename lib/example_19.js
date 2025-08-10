import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

/** Sticky Scroll interaciton. 
 * This one works with shorter sections. 
*/

gsap.registerPlugin(SplitText)
// gsap.registerPlugin(GSDevTools)
gsap.registerPlugin(ScrollTrigger)

// make the mobile size stay the same
ScrollTrigger.normalizeScroll(true);
// ScrollTrigger.config({
//   ignoreMobileResize: true,
// });


// Store original states globally
let splitInstances = [];
let originalContent = {};

function example_19() {
  console.log('example_19.js is working')

  // Function to wrap lines in container divs with overflow:hidden
  function wrapLines(lines) {
    lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.className = 'split-line-container';
      wrapper.style.overflow = 'hidden';
      
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
  }

  // Advanced cleanup function for SplitText
  function cleanupSplitText() {
    console.log("Cleaning up SplitText instances");
    
    splitInstances.forEach(instance => {
      if (instance && typeof instance.revert === 'function') {
        try {
          instance.revert();
        } catch (e) {
          console.warn("Error reverting SplitText:", e);
        }
      }
    });
    
    splitInstances = [];
    
    const wrappers = document.querySelectorAll('.split-line-container');
    wrappers.forEach(wrapper => {
      try {
        while (wrapper.firstChild) {
          wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
        }
        if (wrapper.parentNode) {
          wrapper.parentNode.removeChild(wrapper);
        }
      } catch (e) {
        console.warn("Error removing wrapper:", e);
      }
    });
    
    const lines = document.querySelectorAll('.split-line');
    lines.forEach(line => {
      try {
        while (line.firstChild) {
          line.parentNode.insertBefore(line.firstChild, line);
        }
        if (line.parentNode) {
          line.parentNode.removeChild(line);
        }
      } catch (e) {
        console.warn("Error removing line:", e);
      }
    });
  }

  function init() {
    console.log('example_19 init is working')

    // Clear previous states
    splitInstances = [];
    originalContent = {};
    
    gsap.set('html', { autoAlpha: 1 });

    

    // Add CSS for properly hiding split lines
    const styleId = 'split-line-styles';
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = `
        .split-line-container {
          overflow: hidden !important;
          display: block !important;
          position: relative !important;
        }
        .split-line {
          position: relative !important;
          display: block !important;
        }
      `;
      document.head.appendChild(styleElement);
    }

    // Register slideUp effect (FIXED VERSION)
    gsap.registerEffect({
      name: "slideUp", 
      extendTimeline: true,
      defaults: {
        y: "110%",
        x: 0,
        duration: 0.5  // Default duration, can be overridden
      },
      effect: (targets, config) => {
        let tl = gsap.timeline();
        tl.from(targets, {
          duration: config.duration,  // Now uses the passed duration
          x: config.x,
          y: config.y,
          opacity: 0,  // Start invisible
          stagger: {
            each: 0.2,
            ease: "power1.in"
          }
        });
        return tl;
      }
    });

    // Register slideDown effect (FIXED VERSION)
    gsap.registerEffect({
      name: "slideDown", 
      extendTimeline: true,
      defaults: {
        y: "110%",
        x: 0,
        duration: 0.5  // Default duration, can be overridden
      },
      effect: (targets, config) => {
        let tl = gsap.timeline();
        tl.to(targets, {  // Changed from .from() to .to()
          duration: config.duration,  // Now uses the passed duration
          x: config.x,
          y: config.y,
          opacity: 0,  // End invisible
          stagger: {
            each: 0.03,
            ease: "power1.out"
          }
        });
        return tl;
      }
    });

    const tr_sticky_wrap = document.querySelectorAll('.tr_sticky_wrap')

    tr_sticky_wrap.forEach( (element) => {
      
      // Get all the content divs and the trigger element
      const tr_sticky_track_content_1 = element.querySelectorAll('.tr_sticky_track_content_1');
      const tr_sticky_trigger = element.querySelector('.tr_sticky_trigger');
      const tr_sticky_element = element.querySelector('.tr_sticky_element')

      // Image scale animation timeline
      const tl_tr_sticky_image = gsap.timeline()
      tl_tr_sticky_image
        .fromTo(tr_sticky_element, {
          scale: 1,
          y:0
        },{
          scale: 0.7, 
          y:60
        })

      ScrollTrigger.create({
        trigger: tr_sticky_trigger,
        start: "top top",
        end: "bottom bottom",
        // markers: true,
        scrub: 1,
        animation: tl_tr_sticky_image,
      })





      // Set initial state - all content divs to opacity 0
      gsap.set(tr_sticky_track_content_1, { opacity: 0 });

      // Create separate timeline for each content section
      const tr_sticky_track_content_text_title = element.querySelector('.tr_sticky_track_content_text_title');
      const tr_sticky_track_content_text_body = element.querySelector('.tr_sticky_track_content_text_body');

      if (!tr_sticky_track_content_text_title || !tr_sticky_track_content_text_body) {
        console.log(`Text elements not found in content div ${index}`);
        return;
      }
      
      // Store original content for each card
      originalContent[`title`] = tr_sticky_track_content_text_title.innerHTML;
      originalContent[`body`] = tr_sticky_track_content_text_body.innerHTML;

      // SplitText elements with line wrapping
      let split_tr_sticky_track_content_text_title = new SplitText(tr_sticky_track_content_text_title, {
        type:"chars,words,lines",
        linesClass: "split-line",
      });

      let split_tr_sticky_track_content_text_body = new SplitText(tr_sticky_track_content_text_body, {
        type:"chars,words,lines",
        linesClass: "split-line",
      });

      // Store SplitText instances
      splitInstances.push(
        split_tr_sticky_track_content_text_title,
        split_tr_sticky_track_content_text_body,
      );

      // Apply wrappers to all text elements lines
      wrapLines(split_tr_sticky_track_content_text_title.lines);
      wrapLines(split_tr_sticky_track_content_text_body.lines);

      // Set initial state for this content div
      gsap.set(tr_sticky_track_content_1, { opacity: 0 });

      // Create individual timeline for each section
      const section_timeline = gsap.timeline({
        defaults: {
          ease: "power2.inOut"
        }
      });
      
      section_timeline
        .to(tr_sticky_track_content_1, { opacity: 1, duration: 0.1 })
        .slideUp(split_tr_sticky_track_content_text_title.lines, { duration: 0.6 }, 0.1)
        .slideUp(split_tr_sticky_track_content_text_body.lines, { duration: 0.6 }, 0.2)
        .to({}, { duration: 1 }) // Hold visible (reading time)
        

      ScrollTrigger.create({
        trigger: tr_sticky_trigger,
        start: "25% top",
        end: "100% top",
        scrub: 1,
        animation: section_timeline,
        // markers: true
      });
      })
      
    }

  // Kill and reset all animations and properties
  function killAll() {
    console.log('=== KILL ALL DEBUG ===')
    
    // Kill all ScrollTriggers first
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    
    // Clean up stored timelines
    for (let i = 0; i < 10; i++) {
      if (window[`section_timeline_${i}`]) {
        delete window[`section_timeline_${i}`];
      }
    }
    
    // Clean up SplitText instances
    cleanupSplitText()
    
    // Clear ALL GSAP properties to ensure clean slate
    gsap.set([
      '.tr_sticky_track_content_1',
      '.tr_sticky_track_content_text_title',
      '.tr_sticky_track_content_text_body',
      '.split-line',
      '.split-line-container',
      'html'
    ], {
      clearProps: "all"
    })
    
    // Force a reflow to ensure DOM is properly updated
    document.body.offsetHeight
    
    // Refresh ScrollTrigger to recalculate positions
    ScrollTrigger.refresh()
    
    console.log('=== END KILL ALL DEBUG ===\n')
    
    // Longer delay to ensure everything is properly reset
    gsap.delayedCall(0.5, () => {
      init()
    })
  }

  // This bit of code from stackoverflow is going to help us when resizing
  function debounce(func){
    var timer;
    return function(event){
      if(timer) clearTimeout(timer)
      timer = setTimeout(func,300,event)
    }
  }

  // Add resize listener with debounce
  window.addEventListener("resize", debounce(function(e){
    console.log("Resize detected - reinitializing");
    killAll();
  }))

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

// if (document.body.classList.contains('example_19')) {
  example_19();
// }

export default example_19