/** SJ Home 041925
 * Updated version with a single FLIP animation for the icon group
 * Fixed reset functionality when scrolling back up
 */
import "../src/styles/style.css";
// import { gsap } from "gsap";
// import { GSDevTools } from "gsap/GSDevTools"; 
import sj_menu from './sj_menu.js'
sj_menu()

import example_16 from './example_16'
example_16()


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

  // Flag to track animation state
  let animationActive = true;

  // Initialize everything
  function init() {
    console.log("small_joys_home init function is working");
    initDevTools();
    initGridAnimation();
    initFlipIconAnimation();
    initLogoToNavAnimation();
  }
  
  function initDevTools() {
    const devTools = document.querySelector(".gs-dev-tools");
    if (devTools) devTools.style.zIndex = "100";
  }
  
  function initGridAnimation() {
    let tl_ap_grid = gsap.from("html", { duration: 0, autoAlpha: 0});
    tl_ap_grid.play();
    
    // this gets the page to scroll to the top after refresh.
    $(window).on('beforeunload', function() {
      $('body').hide();
      $(window).scrollTop(0);
    });

    
  }

  function initFlipIconAnimation() {
    // Get elements
    let sj_banner_1_icon_group_1 = document.querySelector("#sj_banner_icon_group");
    let sj_target_container_icon_group_contact_section = document.querySelector("#sj_target_container_icon_group_contact_section");
    
    // Store original parent if not already stored
    if (!originalElements.has(sj_banner_1_icon_group_1)) {
      const origin = document.querySelector(".sj_banner_1_icon_group_origin");
      if (origin) {
        originalElements.set(sj_banner_1_icon_group_1, origin);
      }
    }
    
    console.log("sj_banner_1_icon_group_1.parentElement:", sj_banner_1_icon_group_1.parentElement);
    console.log("sj_banner_1_icon_group_1:", sj_banner_1_icon_group_1);

    // Create a timeline for the single FLIP animation
    let tl_flip_icon_group = gsap.timeline();
    
    // Don't add animation if already in target container
    if (sj_banner_1_icon_group_1.parentElement === sj_target_container_icon_group_contact_section) {
      console.log("Icon already in target container, skipping FLIP setup");
      return;
    }
    
    // Capture initial state before any changes
    let initialState = Flip.getState(sj_banner_1_icon_group_1);
    
    // Create a clone to keep in the original position
    const originalParent = originalElements.get(sj_banner_1_icon_group_1);
    
    // Move to target container in contact section
    sj_target_container_icon_group_contact_section.appendChild(sj_banner_1_icon_group_1);
    
    // Add the FLIP animation to the timeline
    tl_flip_icon_group.add(
      Flip.from(initialState, {
        duration: 1,
        ease: "power1.inOut",
        absolute: true
      })
    );
    
    // Create ScrollTrigger for the FLIP animation
    scrollTriggers.flipIconGroup = ScrollTrigger.create({
      trigger: document.querySelector(".small_joys_home") || document.body, // Using the body class as trigger or fallback to body
      start: "top 0%",
      end: "bottom 100%",
      // markers: true,
      ease: "power1.in",
      animation: tl_flip_icon_group,
      scrub: 0.5,
      onUpdate: (self) => {
        // Track progress for debugging
        // console.log("Progress:", self.progress.toFixed(2));
      },
      onEnter: () => {
        console.log("ENTER flip icon animation");
        animationActive = true;
      },
      onLeave: () => {
        console.log("LEAVE flip icon animation");
      },
      onEnterBack: () => {
        console.log("ENTER BACK flip icon animation");
        animationActive = true;
      },
      onLeaveBack: () => {
        console.log("LEAVE BACK flip icon animation");
        
        // When scrolling all the way back up, return to original position
        if (sj_banner_1_icon_group_1.parentElement !== originalElements.get(sj_banner_1_icon_group_1)) {
          const originalParent = originalElements.get(sj_banner_1_icon_group_1);
          if (originalParent) {
            console.log("Returning icon to original parent");
            animationActive = false;
            
            const currentState = Flip.getState(sj_banner_1_icon_group_1);
            originalParent.appendChild(sj_banner_1_icon_group_1);
            
            Flip.from(currentState, {
              duration: 0.5,
              ease: "power1.out",
              absolute: true,
              onComplete: () => {
                // Kill current ScrollTrigger to avoid conflicts
                if (scrollTriggers.flipIconGroup) {
                  scrollTriggers.flipIconGroup.kill();
                  scrollTriggers.flipIconGroup = null;
                }
                
                // Re-initialize the animation with a slight delay
                setTimeout(() => {
                  if (!scrollTriggers.flipIconGroup) {
                    initFlipIconAnimation();
                  }
                }, 100);
              }
            });
          }
        }
      }
    });
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


  // Kill only specific animations and reset specific elements
  function killFlipIconAnimation() {
    // Kill ScrollTrigger
    if (scrollTriggers.flipIconGroup) {
      scrollTriggers.flipIconGroup.kill();
      scrollTriggers.flipIconGroup = null;
    }
    
    // Reset element to original position
    let sj_banner_1_icon_group_1 = document.querySelector("#sj_banner_icon_group");
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
    killFlipIconAnimation();
  }

  // Make functions available globally for debugging
  window.killFlipIconAnimation = killFlipIconAnimation;
  window.resetFlipIconOnly = resetFlipIconOnly;
  window.reInitFlipAnimation = initFlipIconAnimation; // Add for manual re-init if needed

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

  // Additional scroll event listener to help with edge cases
  window.addEventListener("scroll", debounce(function() {
    // Check if we're at the top of the page and animation should be active
    if (window.scrollY <= 10 && !animationActive) {
      console.log("Near top of page, checking if animation needs reset");
      const iconGroup = document.querySelector("#sj_banner_icon_group");
      const originalParent = originalElements.get(iconGroup);
      
      if (iconGroup && originalParent && iconGroup.parentElement === originalParent && !scrollTriggers.flipIconGroup) {
        console.log("Reinitializing flip animation");
        initFlipIconAnimation();
      }
    }
  }));
}

// Only run the code if we're on the correct page
if (document.body.classList.contains("small_joys_home")) {
  small_joys_home();
}

export default small_joys_home;