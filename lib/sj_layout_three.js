import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'
// import sj_menu from './sj_menu.js';
// sj_menu();

import sj_navbar_blur from './sj_navbar_blur.js';

import split_text_additional from './split_text_additional.js'
// split_text_additional()



gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)
gsap.registerPlugin(ScrollTrigger);

// Store original states globally
let splitInstances = [];
let originalContent = {};


function sj_layout_three() {
  console.log('sj_layout_three.js is working')

  function init() {

    console.log('sj_layout_three init function is working')

    // Clear previous states
    splitInstances = [];
    originalContent = {};


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




    gsap.from("html", {duration: 0, autoAlpha:0})
    // slider elements
    let sjs_team_1_slider_arrow = document.querySelectorAll(".sjs_team_1_slider_arrow")
    let slide_nav = document.querySelector(".slide-nav")
    
    // nav elements
    let sjs_logo_image = document.querySelector(".sjs_logo_image")    
    let sjs_logo_text = document.querySelector(".sjs_logo_text")
    let sjs_banner_3_nav_line = document.querySelector(".sjs_banner_3_nav_line")
    let sjs_nav_text_link_text = document.querySelectorAll(".sjs_nav_text_link_text")
    let sjs_mobile_menu_button = document.querySelector(".sjs_mobile_menu_button")
   
    // banner text
    let sjs_banner_header = document.querySelector(".sjs_banner_header")
    let sjs_banner_subheader = document.querySelector(".sjs_banner_subheader")
    let sjs_banner_button = document.querySelector("#sjs_banner_button")
    

    // banner images
    let sjs_banner_3_image_container = document.querySelector(".sjs_banner_3_image_container")
    let sjs_banner_3_image_image = document.querySelector(".sjs_banner_3_image_image")
    let sj_image_container__banner_3_grain = document.querySelector("#sj_image_container_grain_sj_grain")

    let sjs_image_overlay = document.querySelector(".sjs_image_overlay")
    let sjs_banner_3_color_block = document.querySelector(".sjs_banner_3_color_block")
    let sj_home_duotone_image_wrapper = document.querySelectorAll(".sj_home_duotone_image_wrapper")
    let sj_home_duotone_image_container = document.querySelectorAll(".sj_home_duotone_image_container")

    // SplitText elements with line wrapping
    let split_sjs_banner_header = new SplitText(sjs_banner_header, {
      type:"chars, words, lines",
      linesClass: "split-line",
    })    
    let split_sjs_banner_subheader = new SplitText(sjs_banner_subheader, {
      type:"chars, words, lines",
      linesClass: "split-line",
    })    
    let split_sjs_logo_text = new SplitText(sjs_logo_text, {
      type:"chars, words, lines",
      linesClass: "split-line",
    })    
    let split_sjs_nav_text_link_text = new SplitText(sjs_nav_text_link_text, {
      type:"chars, words, lines",
      linesClass: "split-line",
    })    

    // Store SplitText instances
    splitInstances.push(
      split_sjs_banner_subheader,
      split_sjs_banner_header,
      split_sjs_logo_text
    );

    // Apply wrappers to all text elements lines
    wrapLines(split_sjs_banner_subheader.lines);
    wrapLines(split_sjs_banner_header.lines);
    wrapLines(split_sjs_logo_text.lines);

    // Register slideUp effect
    gsap.registerEffect({
      name:"slideUp", 
      extendTimeline:true,
      defaults:{
        y:"110%",
        x:0,
        duration:1,
        stagger:{
          each:0.1,
          ease:"power1.in"
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


    //setting states
    gsap.set(sjs_logo_image, {
      opacity:0
    })
    gsap.set(sjs_image_overlay, {
      opacity: "0%"
    })
    
    let banner_tl = gsap.timeline()



    banner_tl
      .to({}, {
        // short delay
        duration: 0.5
      })
      // nav elements
      .slideUp(split_sjs_logo_text.lines, {
        duration:0.5,
        stagger:0.25
      }, "banner_tl_start")
      .to(sjs_logo_image, {
        opacity:1, 
        duration:1
      }, "<")
      .slideUp(split_sjs_nav_text_link_text.lines, {
        duration:0.6,
        stagger:0.3
      }, "<")
      .from(sjs_banner_3_nav_line, {
        duration:1.2,
        width: "0%"
      }, "banner_tl_start+=0.2")
      .from(sjs_mobile_menu_button, {
        duration:0.8,
        opacity: 0
      }, "banner_tl_start+=0.2")

      // banner text and button
      .slideUp(split_sjs_banner_header.lines, {}, "banner_tl_start+=0.4")
      .slideUp(split_sjs_banner_subheader.lines, {}, "banner_tl_start+=0.6")
      .from(sjs_banner_button, {
        opacity:0,
        duration:0.3
      }, "banner_tl_start+=0.9")
      

      // banner image
      .from(sjs_banner_3_image_container, {
        xPercent:-102, 
        ease:'power1.out', 
        duration: 1.1
      }, "banner_tl_start+=0.2")
      // .from(sjs_banner_3_image_image, {
      //   xPercent:102, 
      //   ease:'power1.out', 
      //   duration: 1.1
      // }, "banner_tl_start+=0.2")
      .from(sj_image_container__banner_3_grain, {
        xPercent:102, 
        ease:'power1.out', 
        duration: 1.1
      }, "banner_tl_start+=0.2")
      .to(sjs_image_overlay, {
        // display:"block",
        opacity:"10%",
        duration: .3
      }, "banner_tl_start+=1.8")

      // smaller banner images 
      .from(sj_home_duotone_image_wrapper, {
        xPercent:-102, 
        ease:'power1.out', 
        duration: 1.5
      }, "banner_tl_start+=0.4")
      .from(sj_home_duotone_image_container, {
        xPercent:102, 
        ease:'power1.out', 
        duration: 1.5
      }, "banner_tl_start+=0.4")

      // color block 
      .from(sjs_banner_3_color_block, {
        width: "0%",
        ease:'power1.out', 
        duration:1.1
      }, "banner_tl_start+=0.3")

      // gallery elements
      .from(sjs_team_1_slider_arrow, {
        opacity:0,
        duration:0.3
      }, "banner_tl_start+=0.7")
      .from(slide_nav, {
        opacity:0,
        duration:0.3
      }, "banner_tl_start+=0.8")



  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('sj_layout_three')) {
  sj_layout_three();
}

export default sj_layout_three
