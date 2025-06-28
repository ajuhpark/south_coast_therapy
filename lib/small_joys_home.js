/** SJ Home 062325
 * Trying to clean up
 */
import "../src/styles/style.css";
import sj_menu from './sj_menu.js';
sj_menu();

import sj_navbar_blur from './sj_navbar_blur.js';

// Register ALL plugins
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.normalizeScroll(true);
// ScrollTrigger.config({
//   ignoreMobileResize: true,
// });

// console.log("ScrollSmoother registered:", !!ScrollSmoother);


// Store original states globally
let splitInstances = [];
let originalContent = {};

function small_joys_home() {
  console.log("small_joys_home.js is working");
  
  // Store ScrollTrigger instances
  let scrollTriggers = {
    logoToNav: null,
    bannerImageParallax: null,
    bladeImageParallax: null
  };



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
    console.log("small_joys_home init function is working");

    // Clear previous states
    splitInstances = [];
    originalContent = {};

    initDevTools();
    initGridAnimation();
    initLogoToNavAnimation();
    ImageParallax();
  }
  
  function initDevTools() {
    const devTools = document.querySelector(".gs-dev-tools");
    if (devTools) devTools.style.zIndex = "100";
  }
  
  function initGridAnimation() {

    // Page scroll resets on refresh (using vanilla JS version is recommended)
    window.addEventListener('beforeunload', () => {
      document.body.style.display = "none";
      window.scrollTo(0, 0);
    });

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
        ease: "none",
        // Default duration, can be overridden
        duration: 0.5,  
        // stagger: {
        //   each: 0.2,
        //   ease:"power1.in"
        // }

      },
      effect: (targets, config) => {
        let tl = gsap.timeline();
        tl.from(targets, {
          duration: config.duration,  // Now uses the passed duration
          x: config.x,
          y: config.y,
          opacity: 0,  // Start invisible
          // stagger:{
          //   each:config.each,
          //   ease:config.staggerEase,
            // from:config.from
          // }
          stagger: config.stagger
        //   stagger: {
        //   each: 0.2,
        //   ease:"power1.in"
        // }

        });
        return tl;
      }
    });



    let sj_banner_1_image = document.querySelector(".sj_banner_1_image")
    let sj_banner_1_image_wrapper = document.querySelector(".sj_banner_1_image_wrapper")

    let sj_banner_1_header_text = document.querySelectorAll(".sj_banner_1_header_text");
    let sj_banner_1_subheader_text = document.querySelectorAll(".sj_banner_1_subheader_text");
    let sjs_layout_top_bar_dropdown_container = document.querySelector(".sjs_layout_top_bar_dropdown_container")
    let sj_1_button_1_wrapper = document.querySelector(".sj_1_button_1_wrapper")
    let sj_menu_menu_container = document.querySelector(".sj_menu_menu_container")

    // Store original content for each card
    originalContent[`title`] = sj_banner_1_header_text.innerHTML;
    originalContent[`body`] = sj_banner_1_subheader_text.innerHTML;

    // SplitText elements with line wrapping
    let split_sj_banner_1_header_text = new SplitText(sj_banner_1_header_text, {
      type:"chars,words,lines",
      linesClass: "split-line",
    });

    // SplitText elements with line wrapping
    let split_sj_banner_1_subheader_text = new SplitText(sj_banner_1_subheader_text, {
      type:"chars,words,lines",
      linesClass: "split-line",
    });

    // Store SplitText instances
    splitInstances.push(
      split_sj_banner_1_header_text,
      split_sj_banner_1_subheader_text,
    );

    // Apply wrappers to all text elements lines
    wrapLines(split_sj_banner_1_header_text.lines);
    wrapLines(split_sj_banner_1_subheader_text.lines);


    let tl_ap_grid = gsap.timeline()
    .from("html", { duration: 0, autoAlpha: 0}, "banner_tl_start")
    .from(sj_banner_1_image, {
      scale:2, 
      ease:"sine.out", 
      duration:1.2
    }, "banner_tl_start+=0.2")
    .to(sj_banner_1_image_wrapper, {
      clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
      ease:"sine.out", 
      duration:1.2}, "<")
    .to(sj_banner_1_image_wrapper, {
      scale:0.95, 
      duration:2.1, 
      ease:"sine.out"
    },"banner_tl_start+=1.2")
    .slideUp(split_sj_banner_1_header_text.chars, { 
      // duration: 0.6,
      stagger: {
        each: 0.1,
        ease: "none"
      }
    }, "banner_tl_start+=0.2")
    .slideUp(split_sj_banner_1_subheader_text.chars, { 
      // duration: 0.1,
      stagger: {
        each: 0.02,
        ease: "none"
      }
      // stagger: 0.3
    }, "banner_tl_start+=0.6")
    .from(sjs_layout_top_bar_dropdown_container, {
      opacity: 0,
      duration:1
    }, "banner_tl_start+=1.5")
    .from(sj_menu_menu_container, {
      opacity: 0, 
      duration:1
    }, "<")
    .from(sj_1_button_1_wrapper, {
      opacity: 0,
      duration:1
    }, "<")
    
    
    tl_ap_grid.play();
    

  }
  
  function initLogoToNavAnimation() {
    // Get elements
    let ap_grid_container = document.querySelector(".ap_grid_container.sj_process_section_1");
    let headerText = document.querySelectorAll(".sj_banner_1_header_text");
    let headerTextWrapper = document.querySelector(".sj_banner_1_header_text_wrapper");
    let sj_home_banner = document.querySelector("#sj_home_banner")

    if (!ap_grid_container || !headerText.length || !headerTextWrapper) {
      console.log("Missing elements for logo animation:", {
        container: !!ap_grid_container,
        headerText: headerText.length,
        wrapper: !!headerTextWrapper
      });
      return;
    }
    
    // Create tweens for the header texts
    let tweenSmallerText = gsap.to(headerText, {
      fontSize: "16px",
      lineHeight: "20px",
      ease: "none",
    });

    let tweenGap = gsap.to(headerTextWrapper, {
      rowGap: "2px",
      ease: "none",
    });
    
    // Create timeline for logo to nav
    let tl_logoToNav = gsap.timeline();
    tl_logoToNav
      .add(tweenSmallerText)
      .add(tweenGap, "<");

    scrollTriggers.logoToNav = ScrollTrigger.create({
      id: "logoToNavAnimation",
      trigger: sj_home_banner,
      start: "top 0%",
      end: "bottom 5%",
      animation: tl_logoToNav,
      scrub: 0.5,
      // markers: true,
      invalidateOnRefresh: true,
      // im trying to comment this out to see if it's recalculating too much
//       fastScrollEnd: true
    });
    
    console.log("Logo to Nav animation initialized");
  }

  function ImageParallax() {
    // Get elements
    let sj_home_banner = document.querySelector("#sj_home_banner")
    let sj_banner_1_image = document.querySelector(".sj_banner_1_image")
    let sj_banner_1_image_container = document.querySelector(".sj_banner_1_image_container")
    let sj_banner_1_image_wrapper = document.querySelector(".sj_banner_1_image_wrapper")

    gsap.set(sj_banner_1_image, {
      y:"-5%"
    })

    // Create timeline for banner image
    let tl_bannerImageParallax = gsap.timeline()
    .fromTo(sj_banner_1_image, 
      { 
        y: "-5%" 
      }, 
      { 
        y:"20%" 
      }
    );

    scrollTriggers.bannerImageParallax = ScrollTrigger.create({
      id: "bannerImageParallax",
      // trigger: sj_home_banner,
      // trigger: sj_banner_1_image_container,
      trigger: sj_banner_1_image_wrapper,
      start: "top 120px",
      end: "bottom 120px",
    // end: "bottom 0%",
      animation: tl_bannerImageParallax,
      scrub: 0.5,
      // markers: true,
      invalidateOnRefresh: true,
//       fastScrollEnd: true
    });
    

    let sj_home_blade = document.querySelectorAll(".ap_grid_1.train_1")
    let sjs_train_1_blade_image_wrapper = document.querySelectorAll(".sjs_train_1_blade_image_wrapper")

    sjs_train_1_blade_image_wrapper.forEach( (element) => {
      console.log(element)

      // for the current blade we're looping through, we're going to find that image in there
      let sjs_train_1_blade_image = element.querySelectorAll(".sjs_train_1_blade_image")

      let tl_bladeImageParallax = gsap.timeline()
      .fromTo(sjs_train_1_blade_image, 
      { 
        y: "-10%" 
      }, 
      { 
        y:"10%" 
      }
      );

      scrollTriggers.bladeImageParallax = ScrollTrigger.create({
      id: "bladeImageParallax",
      // trigger: sj_home_blade,
      trigger: element,
      start: "top 100%",
      end: "bottom 0%",
      animation: tl_bladeImageParallax,
      scrub: 0.5,
      // markers: true,
      invalidateOnRefresh: true,
//       fastScrollEnd: true
    });

    })

    /* sj home headers interaction */
    let triggers_sj_grid_container = gsap.utils.toArray(".sj_grid_container")
    /* 
    we're going to loop through the triggers and we're going 
    to find the target .heading-3d inside the trigger inside 
    the current iteration of the loop.
    */

    triggers_sj_grid_container.forEach((trigger, index) =>{
      let target = trigger.querySelector(".sj_heading_3d")
      gsap.set(target, {
      transformPerspective:800,
        	// rotationX:-90 is going to show the top of the header.
        rotationX:-90
      })

      ScrollTrigger.create({
        trigger:trigger,
        start:"top 60%", 
        end:"top 10%",
        // markers:true,
        onEnter:()=> gsap.to(target, {rotationX:0}),
        onLeave:()=> gsap.to(target, {rotationX:90}),
        onEnterBack:()=> gsap.to(target, {rotationX:0}),
        onLeaveBack :()=> gsap.to(target, {rotationX:-90}) 
      })

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

  // Listen for animation reset events
  window.addEventListener('sj_animation_reset', function() {
    console.log("Animation reset event received - reinitializing logoToNav");
    // Reinitialize logoToNav animation
    initLogoToNavAnimation();
    ImageParallax();

  });

  // Initialize everything once the page has fully loaded
  window.addEventListener("load", function (event) {
    init();
  });
}


// Only initialize if we're on the correct page
if (document.body.classList.contains("small_joys_home")) {
  small_joys_home();
}

export default small_joys_home;