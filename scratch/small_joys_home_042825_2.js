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
    let iconGroup = document.querySelector("#sj_banner_icon_group");
    let targetContainer = document.querySelector("#sj_target_container_icon_group_contact_section");
    let originalParent = document.querySelector(".sj_banner_1_icon_group_origin");
  
    if (!iconGroup || !targetContainer || !originalParent) return;
  
    // Save original position
    if (!originalElements.has(iconGroup)) {
      originalElements.set(iconGroup, originalParent);
    }
  
    // Capture the initial state
    const initialState = Flip.getState(iconGroup);
  
    // 🔥 Move it to the target for real (this triggers the visual move)
    targetContainer.appendChild(iconGroup);
  
    // Create timeline
    let tl_flip = gsap.timeline({
      scrollTrigger: {
        trigger: document.querySelector(".small_joys_home") || document.body,
        start: "top 0%",
        end: "bottom 100%",
        scrub: true,
        markers: true,
        invalidateOnRefresh: true
      }
    });
  
    // Use Flip.from based on the initialState
    tl_flip.add(
      Flip.from(initialState, {
        absolute: true,
        ease: "none",
        duration: 1
      })
    );
  
    // Save the ScrollTrigger for cleanup
    scrollTriggers.flipIconGroup = tl_flip.scrollTrigger;
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