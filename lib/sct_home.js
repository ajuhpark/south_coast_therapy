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
gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(GSDevTools)
// gsap.registerPlugin(Flip)

ScrollTrigger.normalizeScroll(true);
// ScrollTrigger.config({
//   ignoreMobileResize: true,
// });

// Store original states globally
let splitInstances = [];
let originalContent = {};

function sct_home() {
  console.log('sct_home.js is working')

  function init() {
    console.log('sct_home init function is working')

    // matter js - example_20.js
    example_20()

    // sct menu.js
    sct_menu()

    // sct_gradient.js
    sct_gradient()

    
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
    let sct_logo_large_text = document.querySelectorAll(".sct_logo_large_text")    


    // const menuElements = Array.from(document.querySelectorAll(".sct_mobile_menu_dropdown_row_container, .sj_menu_menu-link_container"))
    let nav_menu_link_elements = Array.from(document.querySelectorAll(".sj_banner_1_header_link, .sct_rounded_dropdown_arrow_2, #sct_nav_button"))
    let logo_elements = Array.from(document.querySelectorAll(".sct_logo_text, .sct_logo_drawing"))
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

    // header and subheader text and buttons
    let sct_banner_name_word_text = document.querySelector(".sct_banner_name_word_text")
    let sjs_banner_subheader = document.querySelector(".sjs_banner_subheader")
    let sct_subheader_button = document.querySelector("#sct_subheader_button")
    
    //banner swiper
    let swiper_sct_banner_1_images_1 = document.querySelector(".swiper.sct_banner_1_images")
    let sw_card_wrapper = document.querySelector(".sw_card_wrapper")

    // rest of content on homepage
    let sct_grid_container__home_sections_container = document.querySelector(".sct_grid_container.home_sections_container")



    // SplitText elements with line wrapping
    let split_sct_banner_name_word_text = new SplitText(sct_banner_name_word_text, {
      // type:"chars, words, lines",
      type:"words, lines",
      linesClass: "split-line",
    })    

    let split_sjs_banner_subheader = new SplitText(sjs_banner_subheader, {
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
      split_sct_banner_name_word_text,
      split_sjs_banner_subheader,
      split_sjs_logo_large_text
    );

    // Apply wrappers to all text elements lines
    wrapLines(split_sct_banner_name_word_text.lines);
    wrapLines(split_sjs_banner_subheader.lines);
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

    sct_banner_tl
      .from("html", { duration: 0, autoAlpha: 0}, "sct_banner_tl_start")
      // logo elements for desktop and mobile
      .slideUp(logo_elements, {
        duration: 0.15, 
        stagger: {each: 0.15},
        ease: "power1.in"
      }, 
      "sct_banner_tl_start+=.2"
      )
      .slideUp(logo_elements_mobile, {
        duration: 0.15, 
        stagger: {each: 0.15},
        ease: "power1.in"
      }, 
      "sct_banner_tl_start+=.2"
      )
      .from(sct_mobile_menu_button, {
        duration:0.7,
        opacity: 0,
        ease:"power1.in"
      }, 
      "sct_banner_tl_start+=0.3"
      )
      .slideUp(nav_menu_link_elements, {
        duration: 0.2, 
        stagger: {each: 0.1}
      }, "sct_banner_tl_start+=0.4")

      //
      .jelly(split_sct_banner_name_word_text.words, {}, "sct_banner_tl_start+=0.8")

      // banner swiper section
      .from(swiper_sct_banner_1_images_1, {
        // display:"block",
        opacity:"0",
        duration: 0.6,
        ease:'power1.out', 
      }, "sct_banner_tl_start+=0.9")

      // banner language change for mobile
      .from(sct_banner_language_change, {
        duration:0.7,
        opacity: 0,
        ease:"power1.in"
      }, 
      "sct_banner_tl_start+=0.7"
      )
      // subheader
      .slideUp(split_sjs_banner_subheader.lines, {
        duration: 0.3, 
        stagger: {each: 0.15}
      // }, "sct_banner_tl_start+=0.7")
      }, "sct_banner_tl_start+=1.3")

      // subheader button
      .slideUp(sct_subheader_button, {
        duration: 0.3, 
        stagger: {each: 0.15}
      // }, "sct_banner_tl_start+=0.9")
      }, "sct_banner_tl_start+=1.5")

      // rest of page
      .from(sct_grid_container__home_sections_container, {
        // display:"block",
        opacity:"0",
        duration: 1,
        ease:'power1.out', 
      }, "sct_banner_tl_start+=1.7")



    // swiper 
    // so it's looking for the .swiper element.
    const swiper_sct_banner_1_images = new Swiper('.swiper.sct_banner_1_images', {
      // Add this line to enable the modules
      modules: [Navigation, Pagination, Autoplay],
      autoplay: {
      delay: 2000, // 2 seconds
      centeredSlides: true,
      disableOnInteraction: false, // Keep autoplay after user interaction
      },
      slidesPerView: 'auto',
      speed: 1400,
      spaceBetween: 0,
      // one slide visible by default so that applies to mobile.
      // slidesPerView: 1.1,
      slidesPerView: 1,
      // this gets it to first slide after it reaches the last
      // rewind:1,
      loop:true,
      navigation: {
        // nextEl: '.swiper.sj_sports_cards .swiper-arrow-card.is-next',
        // prevEl: '.swiper.sj_sports_cards .swiper-arrow-card.is-prev',
        nextEl: '.swiper-arrow-card.is-next',
        prevEl: '.swiper-arrow-card.is-prev',
      },
      // keyboard: {
      //   enabled: true,
      //   // only when swiper instance is in viewport
      //   onlyInViewport: true,
      // },
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 768px
        768: {
          // slidesPerView: 1,          
          slidesPerView: 'auto',
          spaceBetween: 0,
          // spaceBetween: '0%',

          centeredSlides: true,

        },
        // when window width is >= 991px
        991: {
          // slidesPerView: 'auto',
          // slidesPerView: 1.2,
          // spaceBetween: 20
          spaceBetween: '-45%',
          // spaceBetween: '0%',
          centeredSlides: true,
          slidesPerView: 1.01,

        }
      }
    });



    // swiper 
    // so it's looking for the .swiper element.
    const swiper_sct_banner_1_bg = new Swiper('.swiper.sct_banner_1_bg', {
      // Add this line to enable the modules
      modules: [Navigation, Pagination, Autoplay],
      autoplay: {
      reverseDirection: true,
      // delay: 5400, // 2:1 ratio
      delay:9000, // 3:1 ratio
      centeredSlides: true,
      disableOnInteraction: false, // Keep autoplay after user interaction
      },
      slidesPerView: 'auto',
      speed: 1400,
      spaceBetween: 0,
      // one slide visible by default so that applies to mobile.
      slidesPerView: 1,
      // this gets it to first slide after it reaches the last
      // rewind:1,
      loop:true,
      navigation: {
        // nextEl: '.swiper.sj_sports_cards .swiper-arrow-card.is-next',
        // prevEl: '.swiper.sj_sports_cards .swiper-arrow-card.is-prev',
        nextEl: '.swiper-arrow-card.is-next',
        prevEl: '.swiper-arrow-card.is-prev',
      },
      // keyboard: {
      //   enabled: true,
      //   // only when swiper instance is in viewport
      //   onlyInViewport: true,
      // },
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 768px
        768: {
          slidesPerView: 1,
          // spaceBetween: 30
          spaceBetween: '0%',
          centeredSlides: true,

        },
        // when window width is >= 991px
        991: {
          // slidesPerView: 'auto',
          slidesPerView: 1,
          // spaceBetween: 20
          spaceBetween: '0%',
          centeredSlides: true,
          // reverseDirection: true,
        }
      }
    });


    // Debug the instance
    console.log('Swiper instance:', swiper_sct_banner_1_images);
    console.log('Swiper slides count:', swiper_sct_banner_1_images.slides.length);
    console.log('Active slide index:', swiper_sct_banner_1_images.activeIndex);

  }

  // Initialize everything once the page has fully loaded
  window.addEventListener('load', function (event) {
    init()
  })
}

// Only run the code if we're on the correct page
if (document.body.classList.contains("sct_home")) {
  sct_home();
}

export default sct_home;