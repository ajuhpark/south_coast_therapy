/** SCT */
import "../src/styles/style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { GSDevTools } from "gsap/GSDevTools"; 
// import sj_menu from './sj_menu.js'
// sj_menu()
// import example_20 from './example_20.js'
import sct_menu from './sct_menu.js' 
import sct_gradient from './sct_gradient.js' 
// import example_17 from './example_17'


// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Register ALL plugins
// gsap.registerPlugin(ScrollTrigger, GSDevTools); 
// gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(GSDevTools)
// gsap.registerPlugin(Flip)

// Store original states globally
let splitInstances = [];
let originalContent = {};


function sct_inner() {
  console.log('sct_inner.js is working')

  function init() {
    console.log('sct_inner init function is working')

    // matter js - example_20.js
    // example_20()

    // sct menu.js
    sct_menu()

    // sct_gradient.js
    // sct_gradient() // Already called in sct_gradient.js line 90

    
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



    // nav elements
    let sct_logo_text = document.querySelectorAll(".sct_logo_text")    
    let sct_logo_drawing = document.querySelector(".sct_logo_drawing")

    // const menuElements = Array.from(document.querySelectorAll(".sct_mobile_menu_dropdown_row_container, .sj_menu_menu-link_container"))
    let nav_menu_link_elements = Array.from(document.querySelectorAll(".sj_banner_1_header_link, .sct_rounded_dropdown_arrow_2, #sct_nav_button"))
    let logo_elements = Array.from(document.querySelectorAll(".sct_logo_text, .sct_logo_drawing"))
    let sct_mobile_menu_button = Array.from(document.querySelector(".sj_menu_menu-open-btn_2"))


    // text
    let sct_inner_banner_header_text = document.querySelector(".sct_inner_banner_header_text")
    let sct_inner_banner_breadcrumbs_text = document.querySelectorAll(".sct_inner_banner_breadcrumbs_text")
    let sct_inner_banner_subheader_text = document.querySelectorAll(".sct_inner_banner_subheader_text")
    let sct_inner_page_body_text_wrapper = document.querySelectorAll(".sct_inner_page_body_text_wrapper")
    let sct_inner_page_label_wrapper = document.querySelectorAll(".sct_inner_page_label_wrapper")

    // image row 
    let sj_grid_container__train_1__row_image = document.querySelectorAll(".sj_grid_container.train_1.row_image")

    // gradient block
    let sct_inner_gradient_container = document.querySelector("#sct_inner_gradient_container")
    // let sct_card_gradient_block__background = document.querySelector("#sct_inner_gradient")

    // footer
    let ux_footer_container = document.querySelector("#ux_footer_container")

    // SplitText elements with line wrapping
    let split_sct_inner_banner_header_text = new SplitText(sct_inner_banner_header_text, {
      type:"words, lines",
      linesClass: "split-line",
    })    

    // Store SplitText instances
    splitInstances.push(
      split_sct_inner_banner_header_text,
      // split_sjs_banner_header,
      // split_sjs_logo_text
    );

    // Apply wrappers to all text elements lines
    wrapLines(split_sct_inner_banner_header_text.lines);
    // wrapLines(split_sjs_banner_header.lines);
    // wrapLines(split_sjs_logo_text.lines);

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


    const sct_inner_banner_tl = gsap.timeline();

    sct_inner_banner_tl
      // .from(nav_menu_link_elements, {
      //   // opacity: 0,
      //   y: 60,
      //   stagger: 0.05,
      //   duration: 0.75,
      //   ease: "power1.inOut",
      // },
      // "<",
      // )
      .from("html", { duration: 0, autoAlpha: 0}, "sct_inner_banner_tl_start")
      
      //breadcrumbs
      .slideUp(sct_inner_banner_breadcrumbs_text, {
        duration: 0.25, 
        stagger: {each: 0.15},
        ease: "power1.in"
      }, 
      "sct_inner_banner_tl_start+=0.2"
      )
      // header
      .slideUp(split_sct_inner_banner_header_text.words, {
        duration: 0.7, 
        stagger: {each: 0.2},
        ease: "power1.in"
      }, 
      "sct_inner_banner_tl_start+=0.5"
      )

      // gradient 
      // .from(sct_inner_gradient_container, {
      //   xPercent:-102, 
      //   ease:'power1.out', 
      //   duration: 1.1
      // }, "sct_inner_banner_tl_start+=0.8")

      // .from(sct_card_gradient_block__background, {
      //   xPercent:102, 
      //   ease:'power1.out', 
      //   duration: 1.1
      // }, "sct_inner_banner_tl_start+=0.8")

      .from(sct_inner_gradient_container, {
        opacity:"0",
        duration: 1, 
        ease: "power1.out"
      }, 
      "sct_inner_banner_tl_start+=0.4"
      )

      .from(sct_inner_banner_subheader_text, {
        duration:0.6,
        opacity: 0,
        ease:"power1.in"
      },
      "sct_inner_banner_tl_start+=0.7"
      )
      .from(sct_inner_page_label_wrapper, {
        duration:0.6,
        opacity: 0,
        ease:"power1.in"
      },
      "sct_inner_banner_tl_start+=0.7"
      )

      .from([sct_inner_page_body_text_wrapper, sj_grid_container__train_1__row_image, sct_inner_page_label_wrapper, ux_footer_container], {
        duration:0.4,
        opacity: 0,
        ease:"power1.in"
      },
      "sct_inner_banner_tl_start+=0.9"
      )
      


  }

  // Initialize everything once the page has fully loaded
  window.addEventListener('load', function (event) {
    init()
  })
}

// Only run the code if we're on the correct page
if (document.body.classList.contains("sct_inner")) {
  sct_inner();
}

export default sct_inner;