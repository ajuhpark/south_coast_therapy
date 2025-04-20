/** SJ Home */

import "../src/styles/style.css";
// import { gsap } from "gsap";
// import { GSDevTools } from "gsap/GSDevTools"; 
import sj_menu from './sj_menu.js'
sj_menu()

import colorModeToggle from './color_mode_toggle.js'

// Register ALL plugins
// gsap.registerPlugin(ScrollTrigger, GSDevTools); 
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools)
gsap.registerPlugin(Flip)


function small_joys_home() {
  console.log("small_joys_home.js is working");
  // console.log(Flip);
  
  // Store references to elements and their original parents
  let originalElements = new Map();
  // Store original style properties for elements being animated
  let originalStyles = new Map();

  function init() {
    console.log("small_joys_home init function is working");

    // high z-index for gsdevtools
    const devTools = document.querySelector(".gs-dev-tools");
    if (devTools) devTools.style.zIndex = "100";

    // Play the initial grid animation immediately
    let tl_ap_grid = gsap.from("html", { duration: 0, autoAlpha: 0});
    tl_ap_grid.play();
    // let tl_ap_grid = gsap.from("html", { duration: 0, autoAlpha: 0}, 'tl_ap_grid');

    let sj_banner_1_header_text_line_1 = document.querySelector(".sj_banner_1_header_text.line_1");
    // console.log("sj_banner_1_header_text_line_1:", sj_banner_1_header_text_line_1);

    // gsap.from(sj_banner_1_header_text_line_1, {
    //   yPercent: 110, 
    //   ease: "power2.out",
    //   duration: 4,
    // })

    let sj_banner_1_icon_group_container = document.querySelector(".sj_banner_1_icon_group_container");
    let ap_grid_1_sj_process_section_1 = document.querySelector(".ap_grid_1.sj_process_section_1");
    // console.log("sj_banner_1_icon_group_container:", sj_banner_1_icon_group_container);
    // console.log("ap_grid_1_sj_process_section_1:", ap_grid_1_sj_process_section_1);

    let sj_banner_1_subheader_container = document.querySelector(".sj_banner_1_subheader_container")
    // console.log("ap_grid_container_sj_process_section_1:", ap_grid_container_sj_process_section_1);
    let sj_banner_1_icon_group_icon = document.querySelector(".sj_banner_1_icon_group_icon")
    let sj_banner_1_header_text_container = document.querySelector(".sj_banner_1_header_text_container")
    let sj_target_container_icon_group = document.querySelector(".sj_target_container_icon_group")

    // 1. Select the element to move
    let sj_banner_1_icon_group_icon_1 = document.querySelector("#w-node-_0b70cb18-2388-89ef-fff0-75b7f977beda-c738a86b")
    // console.log("sj_banner_1_icon_group_icon_1:", sj_banner_1_icon_group_icon_1);
    
    // Store original parent for reset purposes if not already stored
    if (!originalElements.has(sj_banner_1_icon_group_icon_1)) {
      originalElements.set(sj_banner_1_icon_group_icon_1, sj_banner_1_icon_group_icon_1.parentElement);
    }

    // 2. Get the initial state BEFORE any DOM changes
    // const state = Flip.getState(sj_banner_1_header_text_line_1);
    const state_sj_banner_1_icon_group_icon_1 = Flip.getState(sj_banner_1_icon_group_icon_1);

    // 3. Then make your DOM changes
    // Select the target container
    // const targetContainer_sj_banner_1_subheader_container = sj_banner_1_subheader_container;
    const targetContainer_sj_target_container_icon_group = sj_target_container_icon_group;
    // append the element
    // targetContainer_sj_banner_1_subheader_container.appendChild(sj_banner_1_icon_group_icon_1);
    targetContainer_sj_target_container_icon_group.appendChild(sj_banner_1_icon_group_icon_1);

    // Create a timeline variable to hold your animation (don't execute it yet)
    let tl_flip_icon_group = gsap.timeline();
    
    // 4. Finally, animate from the initial state to the new state
    // in this case, i'm also adding it to the tl_flip_icon_group timeline
    tl_flip_icon_group.add(
      Flip.from(state_sj_banner_1_icon_group_icon_1, {
        duration: 5,
        ease: "power1.inOut",
        absolute: true
      })
    )

    // elements for scrolltrigger
    let ap_grid_container_sj_process_section_1 = document.querySelector(".ap_grid_container.sj_process_section_1");

    // create scrolltrigger fo icon group flip
    ScrollTrigger.create({
      trigger: ap_grid_container_sj_process_section_1,
      start:"top 100%",
      end:"bottom 100%",
      // markers: true,
      ease: "power1.in",
      // on enter, on leave, on enter back, on leave back
      // toggleActions:"play none none reverse",
      animation: tl_flip_icon_group,
      scrub: 0.5
    })

    let sj_banner_1_header_text_group_container = document.querySelector("#sj_banner_1_header_text_group_container")
    // console.log("sj_banner_1_header_text_group_container:", sj_banner_1_header_text_group_container);

    let sj_banner_1_header_text_container_target = document.querySelector(".sj_banner_1_header_text_container_target")
    // console.log("sj_banner_1_header_text_container_target:", sj_banner_1_header_text_container_target);

    // 2. Get the initial state BEFORE any DOM changes
    // const state_sj_banner_1_header_text_group_container = Flip.getState(sj_banner_1_header_text_group_container);

    // 3. Then make your DOM changes
    // Select the target container
    // const targetContainer_sj_banner_1_header_text_container_target = sj_banner_1_header_text_container_target;
    // append the element
    // targetContainer_sj_banner_1_header_text_container_target.appendChild(sj_banner_1_header_text_group_container);

    // Create a timeline variable to hold your animation (don't execute it yet)
    // let tl_flip_logo = gsap.timeline();
    
    // 4. Finally, animate from the initial state to the new state
    // in this case, i'm also adding it to the tl_flip_icon_group timeline
    // tl_flip_logo.add(
    //   Flip.from(state_sj_banner_1_header_text_group_container, {
    //     duration: 5,
    //     ease: "power1.inOut",
    //     // absolute: true
    //   })
    // )

    // // elements for scrolltrigger
    // let ap_grid_container_sj_process_section_1 = document.querySelector(".ap_grid_container.sj_process_section_1");

    // create scrolltrigger for the logo flip
    // ScrollTrigger.create({
    //   trigger: ap_grid_container_sj_process_section_1,
    //   start:"top 100%",
    //   end:"top 0%",
    //   // markers: true,
    //   ease: "none",
    //   // on enter, on leave, on enter back, on leave back
    //   // toggleActions:"play none none reverse",
    //   animation: tl_flip_logo,
    //   scrub: true
    // })

    // Getting logo text to be smaller. declaring the variable here.
    let sj_banner_1_header_text = document.querySelectorAll(".sj_banner_1_header_text");
    
    // Store original font size and line height if not already stored
    if (!originalStyles.has('sj_banner_1_header_text')) {
      // Get computed styles of first element to use as reference
      const computedStyle = window.getComputedStyle(sj_banner_1_header_text[0]);
      originalStyles.set('sj_banner_1_header_text', {
        fontSize: computedStyle.fontSize,
        lineHeight: computedStyle.lineHeight
      });
    }

    // creating the gsap tween to make text size smaller
    let tween_smaller_sj_banner_1_header_text = gsap.to(sj_banner_1_header_text, {
      fontSize: "16px", // Target font size
      lineHeight:"20px",
      // ease: "power2.out"
      ease: "none",
    })

    // Getting logo text gap to be smaller. declaring the variable here.
    let sj_banner_1_header_text_wrapper = document.querySelector(".sj_banner_1_header_text_wrapper");
    
    // Store original row gap if not already stored
    if (!originalStyles.has('sj_banner_1_header_text_wrapper')) {
      const computedStyle = window.getComputedStyle(sj_banner_1_header_text_wrapper);
      originalStyles.set('sj_banner_1_header_text_wrapper', {
        rowGap: computedStyle.rowGap
      });
    }

    // creating the gsap tween to make gap betwen text smaller for logo
    let tween_gap_sj_banner_1_header_text = gsap.to(sj_banner_1_header_text_wrapper, {
      rowGap: "2px",
      // ease: "power2.out"
      ease: "none",
      // position: "relative"
      // onStart: () => {
      //   sj_banner_1_header_text_wrapper.style.position = "relative";
      // }
    })
    
    // create logo combined timeline. 
    let tl_logo_to_nav = gsap.timeline();
    tl_logo_to_nav
      .add(tween_smaller_sj_banner_1_header_text)
      .add(tween_gap_sj_banner_1_header_text, "<")

    // create scrolltrigger for logo going to nav
    ScrollTrigger.create({
      trigger: ap_grid_container_sj_process_section_1,
      start:"top 100%",
      end:"top 0%",
      markers: true,
      // ease: "power1.in",
      // on enter, on leave, on enter back, on leave back
      // toggleActions:"play none none reverse",
      animation: tl_logo_to_nav,
      scrub: true
    })

    // Getting button to be visible.
    let sj_1_button_1_sticky_nav = document.querySelector("#sj_1_button_1_sticky_nav");
    
    // Store original opacity if not already stored
    if (!originalStyles.has('sj_1_button_1_sticky_nav') && sj_1_button_1_sticky_nav) {
      const computedStyle = window.getComputedStyle(sj_1_button_1_sticky_nav);
      originalStyles.set('sj_1_button_1_sticky_nav', {
        opacity: computedStyle.opacity
      });
    }
    
    // trigger variable
    let sj_grid_container_nav_1_sticky_nav = document.querySelector(".sj_grid_container.nav_1.sticky_nav");
    // console.log("sj_grid_container_nav_1_sticky_nav:", sj_grid_container_nav_1_sticky_nav);

    // creating the gsap tween to make button appear in sticky nav
    let tween_sj_1_button_1_sticky_nav = gsap.from(sj_1_button_1_sticky_nav, {
      // yPercent: "110",
      opacity:"0",
      duration:1
    })

    // create scrolltrigger for button to appear in sticky nav
    ScrollTrigger.create({
      trigger: sj_grid_container_nav_1_sticky_nav,
      start:"top 0%",
      end:"top 100px",
      // markers: true,
      // ease: "power1.in",
      // on enter, on leave, on enter back, on leave back
      toggleActions:"play none none reverse",
      animation: tween_sj_1_button_1_sticky_nav,
      // scrub: true
    })
  }

  // we're trying to make it responsive.
  // this killAll function will properly reset elements and recreate animations
  function killAll() {
    // Kill all ScrollTrigger instances first
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Kill all GSAP animations
    gsap.killTweensOf("*");
    
    // Reset all elements to their original parents
    originalElements.forEach((originalParent, element) => {
      if (element && originalParent && element.parentElement !== originalParent) {
        originalParent.appendChild(element);
      }
    });
    
    // Reset original styles for header text elements
    if (originalStyles.has('sj_banner_1_header_text')) {
      const styles = originalStyles.get('sj_banner_1_header_text');
      const elements = document.querySelectorAll(".sj_banner_1_header_text");
      elements.forEach(el => {
        gsap.set(el, {
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight,
          clearProps: "transform,opacity"
        });
      });
    }
    
    // Reset original styles for text wrapper
    if (originalStyles.has('sj_banner_1_header_text_wrapper')) {
      const styles = originalStyles.get('sj_banner_1_header_text_wrapper');
      const element = document.querySelector(".sj_banner_1_header_text_wrapper");
      if (element) {
        gsap.set(element, {
          rowGap: styles.rowGap,
          clearProps: "transform,opacity"
        });
      }
    }
    
    // Reset original styles for button
    if (originalStyles.has('sj_1_button_1_sticky_nav')) {
      const styles = originalStyles.get('sj_1_button_1_sticky_nav');
      const element = document.querySelector("#sj_1_button_1_sticky_nav");
      if (element) {
        gsap.set(element, {
          opacity: styles.opacity,
          clearProps: "transform"
        });
      }
    }
    
    // Reset any other properties that might be animated
    gsap.set("*", { clearProps: "transform,opacity" });
    
    // Now reinitialize with elements in their starting positions
    setTimeout(() => {
      init();
    }, 50);
  }

  // Make killAll available globally for debugging
  window.killAll = killAll;

  // this bit of code from stackoverflow is going to help us when resizing
  function debounce(func) {
    var timer;
    return function(event) {
      if(timer) clearTimeout(timer);
      timer = setTimeout(func, 300, event);
    }
  }

  window.addEventListener("resize", debounce(function(e) {
    console.log("end of resizing");
    // we're going to run our code here once it debounces and resizes.
    killAll();
  }));

  // Initialize everything once the page has fully loaded
  window.addEventListener("load", function (event) {
    init();
  });
}

// Only run the code if we're on the correct page
// This prevents the code from running unnecessarily on other pages
if (document.body.classList.contains("small_joys_home")) {
  small_joys_home();
}

export default small_joys_home;