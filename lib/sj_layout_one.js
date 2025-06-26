import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'
// import sj_menu from './sj_menu.js';
// sj_menu();

import split_text_additional from './split_text_additional.js'
// split_text_additional()

import { CSSPlugin } from "gsap/CSSPlugin";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";



// for the sticky scroll interaction
import example_19 from './example_19.js';
example_19();

import sj_navbar_blur from './sj_navbar_blur.js';

gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)

// Store original states globally
let splitInstances = [];
let originalContent = {};

function sj_layout_one() {
  console.log('sj_layout_one.js is working')

  function init() {

    console.log('sj_layout_one init function is working')

    // Clear previous states
    splitInstances = [];
    originalContent = {};


    // Function to wrap lines in container divs with overflow:hidden

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

    let sjs_train_2_banner_header = document.querySelector(".sjs_train_2_banner_header")
    let sjs_logo_text = document.querySelector(".sjs_logo_text")
    let sjs_nav_text_link_text = document.querySelector(".sjs_nav_text_link_text")
    let sjs_train_banner_subheader = document.querySelector(".sjs_train_banner_subheader")

    let split_sjs_train_2_banner_header = new SplitText(sjs_train_2_banner_header, {type:"chars, words, lines"})    
    let split_sjs_logo_text = new SplitText(sjs_logo_text, {type:"chars, words, lines"})    
    let split_sjs_nav_text_link_text = new SplitText(sjs_nav_text_link_text, {type:"chars, words, lines"})    


    let sj_banner_1_icon_group_icon  = document.querySelector(".sj_banner_1_icon_group_icon ")

    let sjs_banner_train_1_image_container = document.querySelector(".sjs_banner_train_1_image_container")
    let sjs_banner_1_image_image = document.querySelector(".sjs_banner_1_image_image")
    let sjs_image_overlay = document.querySelector(".sjs_image_overlay")

    let sj_home_duotone_image_wrapper = document.querySelectorAll(".sj_home_duotone_image_wrapper")
    let sj_home_duotone_image_container = document.querySelectorAll(".sj_home_duotone_image_container")

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

    
    gsap.registerEffect({
      name:"burnIn",
      extendTimeline:true,
      defaults:{
        y:0,
        x:0,
        duration:0.4,
        ease:"none"
      }, 
      effect: (targets, config) => {
        
        gsap.set(targets, {filter:"blur(0px) brightness(1)"})
        let tl = gsap.timeline()
        tl.from(targets, {
          filter:"blur(20px) brightness(6)", 
          scale:0.8, 
          rotation:-10, 
          duration:config.duration, 
          ease:config.ease, 
          x:config.x, 
          y:config.y, 
          stagger:{
            each:0.05,
            ease:"none"
          }
        })
        tl.from(targets, {duration:0.1, opacity:0, ease:"none", stagger:{
          each:0.03,
          ease:"power2"
        }
        }, 0)
      return tl
      }
    })


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
      .to(sj_banner_1_icon_group_icon, {
        opacity:1, 
        duration:1
      }, "<")
      .slideUp(split_sjs_nav_text_link_text.lines, {}, "<")

      // banner image
      .from(sjs_banner_train_1_image_container, {
        yPercent:102, 
        ease:'power1.out', 
        duration: 1.1
      }, "banner_tl_start+=0.2")
      .from(sjs_banner_1_image_image, {
        yPercent:-102, 
        ease:'power1.out', 
        duration: 1.1
      }, "banner_tl_start+=0.2")
      .to(sjs_image_overlay, {
        // display:"block",
        opacity:"10%",
        duration: .3
      }, "banner_tl_start+=2")

      // smaller banner images 
      .from(sj_home_duotone_image_wrapper, {
        yPercent:102, 
        ease:'power1.out', 
        duration: 1.1,
        stagger:0.2
      }, "banner_tl_start+=0.4")
      .from(sj_home_duotone_image_container, {
        yPercent:-102, 
        ease:'power1.out', 
        duration: 1.1,
        // stagger:{
        //   each:1.5,
        //   ease:"power2.in"
        // }
        stagger:0.2
      }, "banner_tl_start+=0.4")

      // more text  
      .burnIn(split_sjs_train_2_banner_header.chars, {
        x:-10
      }, "banner_tl_start+=0.4")
      .slideUp(split_sjs_train_banner_subheader.lines, {}, "banner_tl_start+=0.6")




    // GSDevTools.create({animation:banner_tl});


    
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('sj_layout_one')) {
  sj_layout_one();
}

export default sj_layout_one
