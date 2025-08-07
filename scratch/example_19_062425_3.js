import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

/** Pagination Exercise 
 * this one has the description of what's going on.
*/

gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)
gsap.registerPlugin(ScrollTrigger)

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

    // Get all the content divs and the trigger element
    const tr_sticky_track_content_1 = document.querySelectorAll('.tr_sticky_track_content_1');
    const tr_sticky_trigger = document.querySelector('.tr_sticky_trigger');
    const tr_sticky_element = document.querySelector('.tr_sticky_element')
    const tr_sticky_wrap = document.querySelector('.tr_sticky_wrap')

    // Image scale animation timeline
    const tl_tr_sticky_image = gsap.timeline()
    tl_tr_sticky_image
      .from(tr_sticky_element, {
        scale: 0.25
      })

    ScrollTrigger.create({
      trigger: tr_sticky_wrap,
      start: "top top",
      end: "bottom bottom",
      markers: true,
      scrub: 1,
      animation: tl_tr_sticky_image,
    })

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
            each: 0.03,
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

    // Make sure elements exist before proceeding
    if (!tr_sticky_trigger || tr_sticky_track_content_1.length === 0) {
      console.log('Trigger or content divs not found');
      return;
    }
    
    console.log(`Found ${tr_sticky_track_content_1.length} content divs`);
    
    // Set initial state - all content divs to opacity 0
    gsap.set(tr_sticky_track_content_1, { opacity: 0 });

    // Create separate timeline for each content section
    tr_sticky_track_content_1.forEach((contentDiv, index) => {
      const tr_sticky_track_content_text_title = contentDiv.querySelector('.tr_sticky_track_content_text_title');
      const tr_sticky_track_content_text_body = contentDiv.querySelector('.tr_sticky_track_content_text_body');

      if (!tr_sticky_track_content_text_title || !tr_sticky_track_content_text_body) {
        console.log(`Text elements not found in content div ${index}`);
        return;
      }
      
      // Store original content for each card
      originalContent[`title_${index}`] = tr_sticky_track_content_text_title.innerHTML;
      originalContent[`body_${index}`] = tr_sticky_track_content_text_body.innerHTML;

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
      gsap.set(contentDiv, { opacity: 0 });

      // Create individual timeline for each section
      const section_timeline = gsap.timeline({
        defaults: {
          ease: "power2.inOut"
        }
      });

      // Define scroll positions for each section (as percentages of the trigger height)
      let startPos, endPos;
      
      if (index === 0) {
        // Youth Programs: 0% - 30% of trigger height
        startPos = "top top";
        endPos = "30% top";
        
        section_timeline
          .to(contentDiv, { opacity: 1, duration: 0.1 }) // Fade in container
          .slideUp(split_tr_sticky_track_content_text_title.chars, { duration: 0.6 }, 0.1) // Title slides up
          .slideUp(split_tr_sticky_track_content_text_body.chars, { duration: 0.6 }, 0.2) // Body slides up with stagger
          .to({}, { duration: 1 }) // Hold visible (reading time)
          .slideDown(split_tr_sticky_track_content_text_title.chars, { duration: 0.1 }, "-=0.1") // Title exits
          .slideDown(split_tr_sticky_track_content_text_body.chars, { duration: 0.1 }, "-=0.35") // Body exits
          .to(contentDiv, { opacity: 0, duration: 0.1 }, "-=0.1"); // Fade out container
          
      } else if (index === 1) {
        // Skills Academy: 35% - 65% of trigger height
        startPos = "35% top";
        endPos = "65% top";
        
        section_timeline
          .to(contentDiv, { opacity: 1, duration: 0.1 })
          .slideUp(split_tr_sticky_track_content_text_title.chars, { duration: 0.6 }, 0.1)
          .slideUp(split_tr_sticky_track_content_text_body.chars, { duration: 0.6 }, 0.2)
          .to({}, { duration: 1 }) // Hold visible (reading time)
          .slideDown(split_tr_sticky_track_content_text_title.chars, { duration: 0.1 }, "-=0.1")
          .slideDown(split_tr_sticky_track_content_text_body.chars, { duration: 0.1 }, "-=0.35")
          .to(contentDiv, { opacity: 0, duration: 0.1 }, "-=0.1");
          
      } else if (index === 2) {
        // Summer Camp: 70% - 100% of trigger height (stays visible longer)
        startPos = "70% top";
        endPos = "bottom top";
        
        section_timeline
          .to(contentDiv, { opacity: 1, duration: 0.1 })
          .slideUp(split_tr_sticky_track_content_text_title.chars, { duration: 0.6 }, 0.1)
          .slideUp(split_tr_sticky_track_content_text_body.chars, { duration: 0.6 }, 0.2)
          .to({}, { duration: 1.0 }); // Longer hold time - no exit animation
      }

      // Create ScrollTrigger for this individual timeline
      // Each section gets its own portion of the trigger element
      // let startPos, endPos;
      
      if (index === 0) {
        // Youth Programs: Start at top, end at 30% through
        startPos = "top top";
        endPos = "30% top";
      } else if (index === 1) {
        // Skills Academy: Start at 35%, end at 65%  
        startPos = "35% top";
        endPos = "65% top";
      } else if (index === 2) {
        // Summer Camp: Start at 70%, end at bottom
        startPos = "70% top";
        endPos = "bottom top";
      }

      ScrollTrigger.create({
        trigger: tr_sticky_trigger,
        start: startPos,
        end: endPos,
        scrub: 1,
        animation: section_timeline,
        id: `section-${index}`,
        markers: {
          startColor: index === 0 ? "green" : index === 1 ? "blue" : "red",
          endColor: index === 0 ? "green" : index === 1 ? "blue" : "red",
          fontSize: "12px",
          fontWeight: "bold",
          indent: 20 + (index * 40)
        },
        onUpdate: self => {
          console.log(`Section ${index} progress:`, self.progress.toFixed(3));
        }
      });
      
    });
      
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