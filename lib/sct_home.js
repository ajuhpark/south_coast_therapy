/** SCT */
import "../src/styles/style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { GSDevTools } from "gsap/GSDevTools"; 
// import sj_menu from './sj_menu.js'
// sj_menu()
import example_20 from './example_20.js'
import sct_menu from './sct_menu.js' 
import sct_gradient from './sct_gradient.js'
import sct_text_decoration_svg from './sct_text_decoration_svg.js'
// import sct_swiper_js from './sct_swiper_js.js'
// import example_17 from './example_17'

// Register ALL plugins
// gsap.registerPlugin(ScrollTrigger, GSDevTools); 
gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(GSDevTools)
// gsap.registerPlugin(Flip)

// ScrollTrigger.normalizeScroll(true);
// ScrollTrigger.config({
//   ignoreMobileResize: true,
// });

// Store original states globally
let splitInstances = [];
let originalContent = {};

function sct_home() {
  console.log('sct_home.js is working')

  // Debounce function for resize events
  function debounce(func) {
    let timer;
    return function(event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, 300, event);
    }
  }

  // Advanced cleanup function for SplitText
  function cleanupSplitText() {
    console.log("Cleaning up SplitText instances");

    // Revert all SplitText instances
    splitInstances.forEach(instance => {
      if (instance && typeof instance.revert === 'function') {
        try {
          instance.revert();
        } catch (e) {
          console.warn("Error reverting SplitText:", e);
        }
      }
    });

    // Clear the array
    splitInstances = [];

    // Remove all wrapper containers
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

    // Remove any remaining split-line elements
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

  // Recreate SplitText instances for responsive behavior
  function recreateSplitText() {
    console.log('=== RECREATING SPLITTEXT ===');

    // Clean up existing SplitText instances
    cleanupSplitText();

    // Get text elements again (they exist in the DOM)
    let sct_logo_large_text = document.querySelectorAll(".sct_logo_large_text");
    let sct_banner_header_text_1 = document.querySelector(".sct_banner_header_text_1");
    let sct_banner_body_text_1 = document.querySelector(".sct_banner_body_text_1");

    // Recreate SplitText instances with new line breaks
    let split_sjs_logo_large_text = new SplitText(sct_logo_large_text, {
      type: "words, lines",
      linesClass: "split-line",
    });

    let split_sct_banner_header_text_1 = new SplitText(sct_banner_header_text_1, {
      type: "words, lines",
      linesClass: "split-line",
    });

    let split_sct_banner_body_text_1 = new SplitText(sct_banner_body_text_1, {
      type: "lines",
      linesClass: "split-line",
    });

    // Store new instances
    splitInstances.push(
      split_sct_banner_header_text_1,
      split_sct_banner_body_text_1,
      split_sjs_logo_large_text
    );

    // Apply wrappers to lines
    wrapLines(split_sct_banner_body_text_1.lines);
    wrapLines(split_sjs_logo_large_text.lines);

    console.log('=== SPLITTEXT RECREATED ===\n');
  }

  // Kill and reset for resize events
  function killAll() {
    console.log('=== KILL ALL FOR RESIZE ===');

    // Just recreate SplitText - don't reinitialize everything
    recreateSplitText();

    console.log('=== RESIZE COMPLETE ===\n');
  }

  function init() {
    console.log('sct_home init function is working')

    // matter js - example_20.js
    example_20()

    // sct menu.js
    sct_menu()

    // sct_gradient.js
    sct_gradient()

    // sct_text_decoration_svg.js - get the SVG elements array
    const sct_decoration_svg_elements = sct_text_decoration_svg()
    console.log('sct_decoration_svg_elements count:', sct_decoration_svg_elements.length);
    console.log('sct_decoration_svg_elements:', sct_decoration_svg_elements);

    // Check initial opacity BEFORE gsap.set
    console.log('BEFORE gsap.set - checking opacity:');
    sct_decoration_svg_elements.forEach((el, i) => {
      console.log(`  SVG ${i} (${el.id}): opacity = ${window.getComputedStyle(el).opacity}`);
    });

    // Clear previous states
    splitInstances = [];
    originalContent = {};

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



    // nav elements
    let sct_logo_text = document.querySelectorAll(".sct_logo_text")    
    let sct_logo_drawing = document.querySelector(".sct_logo_drawing")
    let sct_logo_large_text = document.querySelectorAll(".sct_logo_large_text")    


    // const menuElements = Array.from(document.querySelectorAll(".sct_mobile_menu_dropdown_row_container, .sj_menu_menu-link_container"))
    let nav_menu_link_elements = Array.from(document.querySelectorAll(".sj_banner_1_header_link, .sct_rounded_dropdown_arrow_2, #sct_nav_button"))
    let logo_elements = Array.from(document.querySelectorAll(".sct_logo_text, .sct_logo_drawing_current_color"))
    let sct_banner_language_change = document.querySelectorAll(".sct_banner_language_change")    

    // nav elements for mobile.
    // splittext for sjs_logo_large_text 
    let split_sjs_logo_large_text = new SplitText(sct_logo_large_text, {
      type:"words, lines",
      linesClass: "split-line",
    })    

    let logo_elements_mobile = [
      ...split_sjs_logo_large_text.words,
      ...document.querySelectorAll(".sct_large_logo_drawing")
    ];

    let sct_mobile_menu_button = document.querySelector(".sj_menu_menu-open-btn_2")

    // top bar 
    // let sct_top_bar_text = document.querySelectorAll(".sct_top_bar_text")
    // let sct_top_bar_icon = document.querySelectorAll(".sct_top_bar_icon")
    let topbar_elements = Array.from(document.querySelectorAll(".sct_top_bar_text, .sct_top_bar_icon"))
    let sct_navbar_line = document.querySelector(".sct_navbar_line")


    // header and subheader text and buttons
    let sct_banner_header_text_1 = document.querySelector(".sct_banner_header_text_1")
    let sct_banner_body_text_1 = document.querySelector(".sct_banner_body_text_1")
    let sct_subheader_button = document.querySelector("#sct_subheader_button")
    let sct_banner_button_display_1 = document.querySelector(".sct_banner_button_display_1")

    // banner 
    let sct_banner_image_wrapper_3 = document.querySelector(".sct_banner_image_wrapper_3")
    let sct_banner_image_container_3 = document.querySelector(".sct_banner_image_container_3")
    let sct_banner_image_3 = document.querySelector(".sct_banner_image_3")
    let sct_banner_image_3_holder = document.querySelector(".sct_banner_image_3_holder")
    

    // image treatments - diamonds 
    let sct_banner_image_gradient_sticker_container = document.querySelectorAll(".sct_banner_image_gradient_sticker_container")

    // gradient in banner and more
    
    let sct_color_block_spacer_grid_container = document.querySelectorAll(".sct_color_block_spacer_grid_container")

    let sct_banner_elements = [
      ...split_sjs_logo_large_text.words,
      ...document.querySelectorAll(".sct_large_logo_drawing")
    ];

    // rest of content on homepage
    let sct_grid_container__home_sections_container = document.querySelector(".sct_grid_container.home_sections_container")



    // SplitText elements with line wrapping
    let split_sct_banner_header_text_1 = new SplitText(sct_banner_header_text_1, {
      // type:"chars, words, lines",
      type:"words, lines",
      linesClass: "split-line",
    })    

    let split_sct_banner_body_text_1 = new SplitText(sct_banner_body_text_1, {
      // type:"chars, words, lines",
      type:"lines",
      linesClass: "split-line",
    })    

    // let split_sjs_nav_text_link_text = new SplitText(sjs_nav_text_link_text, {
    //   type:"chars, words, lines",
    //   linesClass: "split-line",
    // })    

    // Store SplitText instances
    splitInstances.push(
      split_sct_banner_header_text_1,
      split_sct_banner_body_text_1,
      split_sjs_logo_large_text
    );

    // Apply wrappers to all text elements lines
    // wrapLines(split_sct_banner_header_text_1.lines);
    wrapLines(split_sct_banner_body_text_1.lines);
    wrapLines(split_sjs_logo_large_text.lines);

    // Register slideUp effect
    gsap.registerEffect({
      name:"slideUp", 
      extendTimeline:true,
      defaults:{
        y:"110%",
        x:0,
        duration:0.3,
        stagger:{
          each:0.15,
          ease:"power2.in"
        }
      },
      effect: (targets, config) => {
        let tl = gsap.timeline();
        tl.from(targets, {
          duration:config.duration,
          x:config.x,
          y:config.y,
          stagger:config.stagger
        });
        return tl;
      }
    });

    gsap.registerEffect({
      name:"jelly",
      defaults:{
        // stagger:0.03,
        stagger:0.1,
        duration:1.8
      },
      extendTimeline:true,
      effect: (target, config) => {
        gsap.set(target, {
          transformOrigin:"50% 50%"
        })
        let tl = gsap.timeline()
        tl.from(target, {
          scale:0.8, 
          duration:config.duration, 
          stagger:config.stagger, 
          ease:"elastic"
        })
        tl.from(target, {
          opacity:0, 
          duration:0.01, 
          stagger:config.stagger
        }, 0)
      return tl
      }
    })

    // let tl = gsap.timeline({delay:0.5})
    //   // this targets each group inside of numbers.
    //   // that's the good thing about reusable effects
    //   .jelly("#numbers > g", {stagger:0.2})
    //   // and then that same effect happens with the text.
    //   .jelly("#text", "-=0.6")


    const sct_banner_tl = gsap.timeline();

    // Expose timeline globally for Puppeteer recording
    if (typeof window !== 'undefined') {
      window.sct_banner_tl = sct_banner_tl;
    }

    // Set initial state for SVG decoration elements to hide them
    console.log('⚙️ About to run gsap.set() to hide', sct_decoration_svg_elements.length, 'SVG elements');
    gsap.set(sct_decoration_svg_elements, { opacity: 0 });

    // Verify they're hidden AFTER gsap.set
    console.log('AFTER gsap.set - checking opacity:');
    sct_decoration_svg_elements.forEach((el, i) => {
      const computed = window.getComputedStyle(el).opacity;
      const inline = el.style.opacity;
      console.log(`  SVG ${i} (${el.id}): computed=${computed}, inline=${inline}, inDOM=${document.body.contains(el)}`);
    });

    sct_banner_tl
      .from("html", { duration: 0, autoAlpha: 0}, "sct_banner_tl_start")
      
      // top bar
      .slideUp(topbar_elements, {
        duration: .4, 
        stagger: {each: .1},
        ease: "power1.in"
      }, 
      "sct_banner_tl_start+=.2"
      )

      // nav line
      .from(sct_navbar_line, {
        duration:1.2,
        width: "0%"
      }, "sct_banner_tl_start+=.2")

      
      // logo elements for desktop and mobile
      .slideUp(logo_elements, {
        duration: .4, 
        stagger: {each: 0.1},
        ease: "power1.in"
      }, 
      "sct_banner_tl_start+=.3"
      )
      .slideUp(logo_elements_mobile, {
        duration: .4, 
        stagger: {each: 0.1},
        ease: "power1.in"
      }, 
      "sct_banner_tl_start+=.3"
      )
      .from(sct_mobile_menu_button, {
        duration:0.4,
        opacity: 0,
        ease:"power1.in"
      }, 
      "sct_banner_tl_start+=0.8"
      )
      .slideUp(nav_menu_link_elements, {
        duration: 0.25, 
        stagger: {each: 0.075}
      }, "sct_banner_tl_start+=0.5")

      // banner header
      .jelly(split_sct_banner_header_text_1.words, {
        duration:2,
        stagger: {each: 0.15},
        ease:"power1.in"
      }, "sct_banner_tl_start+=0.8")
      
      // banner header
      .jelly(sct_banner_button_display_1, {
        duration:1,
        ease:"power1.in"
      }, "sct_banner_tl_start+=2.2")

      // // banner swiper section
      // .from(sct_banner_image_wrapper_2_mask, {
      //   // display:"block",
      //   opacity:"0",
      //   duration: 0.6,
      //   ease:'power1.out', 
      // }, "sct_banner_tl_start+=0.9")


      // banner image
      .from(sct_banner_image_3_holder, {
        xPercent:-102, 
        ease:'power1.out', 
        duration: 1.1
      }, "sct_banner_tl_start+=0.7")
      .from(sct_banner_image_container_3, {
        xPercent:102, 
        ease:'power1.out', 
        duration: 1.1
      }, "sct_banner_tl_start+=0.7")

      // banner language change for mobile
      .from(sct_banner_language_change, {
        duration:0.7,
        opacity: 0,
        ease:"power1.in"
      }, 
      "sct_banner_tl_start+=0.7"
      )
      // subheader
      .slideUp(split_sct_banner_body_text_1.lines, {
        duration: 0.7, 
        stagger: {each: 0.2}
      // }, "sct_banner_tl_start+=0.7")
      }, "sct_banner_tl_start+=1.1")

      // subheader button
      .slideUp(sct_subheader_button, {
        duration: 0.8, 
        // stagger: {each: 0.15}
      // }, "sct_banner_tl_start+=0.9")
      }, "sct_banner_tl_start+=1.3")

      // rest of page
      .from([sct_grid_container__home_sections_container, sct_banner_image_gradient_sticker_container, sct_color_block_spacer_grid_container], {
        // display:"block",
        opacity:"0",
        duration: 1,
        ease:'power1.out',
      }, "sct_banner_tl_start+=1.5")

      // svgs
      .fromTo([...sct_decoration_svg_elements],
      {
        opacity: 0,
      },
      {
        opacity: 0.7,
        duration: 1,
        ease:'power1.out',
        onStart: () => {
          console.log('🎬 SVG fromTo animation STARTING at sct_banner_tl_start+=1.5');
        },
        onComplete: () => {
          console.log('✅ SVG fromTo animation COMPLETE');
        }
      }, "sct_banner_tl_start+=1.5")


      // .from([sct_inner_body_content, sct_inner_footer_content, sct_banner_image_gradient_sticker_container], {
      //   duration:0.4,
      //   opacity: 0,
      //   ease:"power1.in"
      // },
      // "sct_inner_banner_tl_start+=0.9"
      // )
      

    // Initialize Swiper
    // sct_swiper_js();

  }

  // Initialize everything once the page has fully loaded
  window.addEventListener('load', function (event) {
    init()
  })

  // Handle window resize to make SplitText responsive (desktop only)
  // Skip on mobile to prevent scroll-induced resize events from address bar hiding/showing
  window.addEventListener('resize', debounce(function(e) {
    const currentWidth = window.innerWidth;
    const isMobile = currentWidth <= 768;

    // Skip resize handling on mobile to prevent scroll interference
    if (isMobile) {
      console.log('📱 Mobile resize ignored - preventing scroll interference');
      return;
    }

    console.log('🖥️ Desktop resize detected - reinitializing SplitText');
    killAll();
  }))
}

// Only run the code if we're on the correct page
if (document.body.classList.contains("sct_home")) {
  sct_home();
}

export default sct_home;