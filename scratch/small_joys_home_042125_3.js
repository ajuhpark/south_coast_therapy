/** SJ Home 041925
 * This version atleast has it scrolling down correctly. It just has issues when going back up. 
 * 
*/
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
  
  // Store references to elements and their original parents
  let originalElements = new Map();
  
  // Store ScrollTrigger instances
  let scrollTriggers = {
    flipIconGroup: null,
    logoToNav: null,
    buttonAppear: null
  };

  // Initialize everything
  function init() {
    console.log("small_joys_home init function is working");
    initDevTools();
    initGridAnimation();
    initFlipIconAnimation();
    initLogoToNavAnimation();
    initButtonAnimation();
  }
  
  function initDevTools() {
    const devTools = document.querySelector(".gs-dev-tools");
    if (devTools) devTools.style.zIndex = "100";
  }
  
  function initGridAnimation() {
    let tl_ap_grid = gsap.from("html", { duration: 0, autoAlpha: 0});
    tl_ap_grid.play();
  }

  function initFlipIconAnimation() {
    // Get elements
    let sj_banner_1_icon_group_1 = document.querySelector("#sj_banner_icon_group");
    let sj_target_container_icon_group_process_section = document.querySelector("#sj_target_container_icon_group_process_section");
    let sj_target_container_icon_group_contact_section = document.querySelector("#sj_target_container_icon_group_contact_section");
    let ap_grid_container_sj_process_section_1 = document.querySelector(".ap_grid_container.sj_process_section_1");
    let ap_grid_container_sj_contact_section_1 = document.querySelector(".ap_grid_container.sj_contact_section_1");
    
    // Store original parent
    if (!originalElements.has(sj_banner_1_icon_group_1)) {
      // originalElements.set(sj_banner_1_icon_group_1, sj_banner_1_icon_group_1.parentElement);
    const origin = document.querySelector(".sj_banner_1_icon_group_origin");
    if (origin) {
      originalElements.set(sj_banner_1_icon_group_1, origin);
}

    }
    console.log("sj_banner_1_icon_group_1.parentElement:", sj_banner_1_icon_group_1.parentElement)
    console.log("sj_banner_1_icon_group_1:", sj_banner_1_icon_group_1);

    // First animation: Move to process section
    // Create timeline for first animation
    let tl_flip_to_process = gsap.timeline({
      scrollTrigger: {
        id: "flipIconAnimation_pt1",
        trigger: ap_grid_container_sj_process_section_1,
        start: "top 100%",
        // Adjust to control when first animation completes
        end: "bottom 100%", 
        scrub: 0.5,
        // markers: true, 
        onEnter: () => {
          console.log("ENTER process section animation");
          // Only set up the animation the first time we enter
          if (sj_banner_1_icon_group_1.parentElement !== sj_target_container_icon_group_process_section) {
            // Capture initial state
            let initialState = Flip.getState(sj_banner_1_icon_group_1);
            
            // Move to first target
            sj_target_container_icon_group_process_section.appendChild(sj_banner_1_icon_group_1);
            
            // Set up the animation (the timeline will control it)
            tl_flip_to_process.add(
              Flip.from(initialState, {
                duration: 1, // This is relative to the scrollTrigger progress
                // scrub:true,
                ease: "power1.inOut",
                absolute: true
              })
            );
          }
        },
        onLeave:() => {
          console.log("LEAVE process section animation");

        },
        onLeaveBack: () => {
          console.log("LEAVE BACK from process section animation");
        
          // Only animate back if it's still in the process section
          if (sj_banner_1_icon_group_1.parentElement === sj_target_container_icon_group_process_section) {
            const currentState = Flip.getState(sj_banner_1_icon_group_1);
            const originalParent = originalElements.get(sj_banner_1_icon_group_1);
        
            if (originalParent) {
              originalParent.appendChild(sj_banner_1_icon_group_1);
        
              Flip.from(currentState, {
                duration: 0.5,
                ease: "power1.out",
                absolute: true
              });
            }
          }
        },
        
        onEnterBack: () => {
          console.log("ENTER BACK into process section animation");
          if (sj_banner_1_icon_group_1.parentElement === sj_target_container_icon_group_contact_section) {
            const currentState = Flip.getState(sj_banner_1_icon_group_1);
            sj_target_container_icon_group_process_section.appendChild(sj_banner_1_icon_group_1);
        
            Flip.from(currentState, {
              duration: 0.5,
              ease: "power1.out",
              absolute: true
            });
          }
        },
        
      }
    });
    
    // Track which timeline is currently active for the icon group
    scrollTriggers.flipIconGroup1 = tl_flip_to_process.scrollTrigger;
  
    // Second animation: Move from process section to contact section
    // Create timeline for second animation
    let tl_flip_to_contact = gsap.timeline({
      scrollTrigger: {
        id: "flipIconAnimation_pt2",
        trigger: ap_grid_container_sj_contact_section_1,
        start: "top 100%", // Start after we're fully in the first position
        end: "bottom 100%",
        scrub: 0.5,
        markers: true,
        onEnter: () => {
          console.log("ENTER contact section animation");
          // Only proceed if the element is in the process section
          if (sj_banner_1_icon_group_1.parentElement === sj_target_container_icon_group_process_section) {
            // Capture current state
            let midState = Flip.getState(sj_banner_1_icon_group_1);
            
            // Move to second target
            sj_target_container_icon_group_contact_section.appendChild(sj_banner_1_icon_group_1);
            
            // Set up the animation (the timeline will control it)
            tl_flip_to_contact.add(
              Flip.from(midState, {
                duration: 1, // This is relative to the scrollTrigger progress
                // scrub:true,
                ease: "power1.inOut",
                absolute: true
              })
            );
          }
        },
        onLeave: () => {
          console.log("LEAVE contact section animation");

        },
        // onEnterBack - When the bottom of the trigger, contact section, enters the viewport	
        onEnterBack: () => {
          console.log("ON ENTER BACK into contact section animation");
        
          if (sj_banner_1_icon_group_1.parentElement !== sj_target_container_icon_group_contact_section) {
            const currentState = Flip.getState(sj_banner_1_icon_group_1);
            sj_target_container_icon_group_contact_section.appendChild(sj_banner_1_icon_group_1);
        
            Flip.from(currentState, {
              duration: 0.5,
              ease: "power1.out",
              absolute: true,
              // scrub: true,
              // markers: true
            });
          }
        },
        
        // onLeaveBack - When the top of the trigger leaves the viewport
        onLeaveBack: () => {
          console.log("ON LEAVE BACK into contact section animation");
          // When scrolling back up past this trigger's start point
          if (sj_banner_1_icon_group_1.parentElement === sj_target_container_icon_group_contact_section) {
            // Capture current state before moving
            let currentState = Flip.getState(sj_banner_1_icon_group_1);
            
            // Move back to process section
            sj_target_container_icon_group_process_section.appendChild(sj_banner_1_icon_group_1);
            
            // Animate the transition
            // Flip.from(currentState, {
            //   duration: 0.5,
            //   ease: "power1.out",
            //   absolute: true,
            //   // scrub:true,
            //   markers:true
            // });
          }
        }
      }
    });
    
    // Keep track of the second ScrollTrigger
    scrollTriggers.flipIconGroup2 = tl_flip_to_contact.scrollTrigger;
  }

  function initLogoToNavAnimation() {
    // Get elements
    let ap_grid_container_sj_process_section_1 = document.querySelector(".ap_grid_container.sj_process_section_1");
    let sj_banner_1_header_text = document.querySelectorAll(".sj_banner_1_header_text");
    let sj_banner_1_header_text_wrapper = document.querySelector(".sj_banner_1_header_text_wrapper");
    
    // Create tweens
    let tween_smaller_sj_banner_1_header_text = gsap.to(sj_banner_1_header_text, {
      fontSize: "16px",
      lineHeight: "20px",
      ease: "none",
    });

    let tween_gap_sj_banner_1_header_text = gsap.to(sj_banner_1_header_text_wrapper, {
      rowGap: "2px",
      ease: "none",
    });
    
    // Create timeline
    let tl_logo_to_nav = gsap.timeline();
    tl_logo_to_nav
      .add(tween_smaller_sj_banner_1_header_text)
      .add(tween_gap_sj_banner_1_header_text, "<");

    // Create ScrollTrigger for logo to nav
    scrollTriggers.logoToNav = ScrollTrigger.create({
      id: "logoToNavAnimation",
      trigger: ap_grid_container_sj_process_section_1,
      start: "top 100%",
      end: "top 0%",
      // markers: true,
      animation: tl_logo_to_nav,
      scrub: 0.5,
      invalidateOnRefresh: true,
      fastScrollEnd: true
    });
  }

  function initButtonAnimation() {
    // Get elements
    let sj_1_button_1_sticky_nav = document.querySelector("#sj_1_button_1_sticky_nav");
    let sj_grid_container_nav_1_sticky_nav = document.querySelector(".sj_grid_container.nav_1.sticky_nav");
    
    // Create tween
    let tween_sj_1_button_1_sticky_nav = gsap.from(sj_1_button_1_sticky_nav, {
      opacity: "0",
      duration: 1
    });

    // Create ScrollTrigger
    scrollTriggers.buttonAppear = ScrollTrigger.create({
      id: "buttonAppearAnimation",
      trigger: sj_grid_container_nav_1_sticky_nav,
      start: "top 0%",
      end: "top 100px",
      toggleActions: "play none none reverse",
      animation: tween_sj_1_button_1_sticky_nav
    });
  }

  // Kill only specific animations and reset specific elements
  function killFlipIconAnimation() {
    // Kill ScrollTriggers
    if (scrollTriggers.flipIconGroup1) {
      scrollTriggers.flipIconGroup1.kill();
      scrollTriggers.flipIconGroup1 = null;
    }
    
    if (scrollTriggers.flipIconGroup2) {
      scrollTriggers.flipIconGroup2.kill();
      scrollTriggers.flipIconGroup2 = null;
    }
    
    // Reset element to original position
    let sj_banner_1_icon_group_1 = document.querySelector("#w-node-_0b70cb18-2388-89ef-fff0-75b7f977beda-c738a86b");
    if (sj_banner_1_icon_group_1 && originalElements.has(sj_banner_1_icon_group_1)) {
      const originalParent = originalElements.get(sj_banner_1_icon_group_1);
      if (originalParent && sj_banner_1_icon_group_1.parentElement !== originalParent) {
        originalParent.appendChild(sj_banner_1_icon_group_1);
        gsap.set(sj_banner_1_icon_group_1, { clearProps: "all" });
      }
    }
    
    // Reinitialize
    setTimeout(() => {
      initFlipIconAnimation();
    }, 50);
  }

  // This function only kills and resets the flip icon animation
  function resetFlipIconOnly() {
    // killFlipIconAnimation();
  }

  // Make functions available globally for debugging
  window.killFlipIconAnimation = killFlipIconAnimation;
  window.resetFlipIconOnly = resetFlipIconOnly;

  // Debounce function for resize events
  function debounce(func) {
    var timer;
    return function(event) {
      if(timer) clearTimeout(timer);
      timer = setTimeout(func, 300, event);
    }
  }

  // Handle resize - only reset the flip icon animation
  window.addEventListener("resize", debounce(function(e) {
    console.log("end of resizing - resetting flip icon only");
    resetFlipIconOnly();
  }));

  // Initialize everything once the page has fully loaded
  window.addEventListener("load", function (event) {
    init();
  });
}

// Only run the code if we're on the correct page
if (document.body.classList.contains("small_joys_home")) {
  small_joys_home();
}

export default small_joys_home;
