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


function sj_layout_two() {
  console.log('sj_layout_two.js is working')

  function init() {

    console.log('sj_layout_two init function is working')

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
      

    let sjs_logo_text = document.querySelector(".sjs_logo_text")
    let sjs_nav_text_link_text = document.querySelector(".sjs_nav_text_link_text")

    
    // SplitText elements with line wrapping
    let split_sjs_train_banner_subheader = new SplitText(sjs_train_banner_subheader, {
      type:"chars, words, lines",
      linesClass: "split-line",
    })    

    // Store SplitText instances
    splitInstances.push(
      split_sjs_train_banner_subheader
    );

    // Apply wrappers to all text elements lines
    wrapLines(split_sjs_train_banner_subheader.lines);

        // Register slideUp effect
    gsap.registerEffect({
      name:"slideUp", 
      extendTimeline:true,
      defaults:{
        y:"110%",
        x:0
      },
      effect: (targets, config) => {
        let tl = gsap.timeline();
        tl.from(targets, {
          duration:1,
          x:config.x,
          y:config.y,
          stagger:{
            each:0.1,
            ease:"power1.in"
          }
        });
        return tl;
      }
    });


    //setting states
    gsap.set(sj_banner_1_icon_group_icon, {
      opacity:0
    })
    gsap.set(sjs_image_overlay, {
      // display:"none",
      opacity: "0%"
    })
    
    let banner_tl = gsap.timeline()



    banner_tl
      .to({}, {
        // short delay
        duration: 0.5
      })
      //text
      .slideUp(split_sjs_logo_text.lines, {
        stagger:{
          each:1.2,
          ease:"power1.in"
        } 
      }, "banner_tl_start")
      
    
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('sj_layout_two')) {
  sj_layout_two();
}

export default sj_layout_two
