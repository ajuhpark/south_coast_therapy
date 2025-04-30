/** SJ Home 041925
 * Updated version with a single FLIP animation for the icon group
 * Make the Flip "scrub" smoothly forward and backward
 */
import "../src/styles/style.css";
import sj_menu from './sj_menu.js';
sj_menu();

import example_16 from './example_16';
example_16();

import colorModeToggle from './color_mode_toggle.js';

// Register ALL plugins
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);
gsap.registerPlugin(Flip);

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

  // (Optional) Remove or disable re‑init on scroll if not needed
  // You might not need the following if it keeps re‑initializing the animation:
  // let animationActive = true;

  function init() {
    console.log("small_joys_home init function is working");
    initDevTools();
    initGridAnimation();
    initFlipIconAnimation();
    initLogoToNavAnimation();
    watchIconGroupMovement();
  }
  
  function initDevTools() {
    const devTools = document.querySelector(".gs-dev-tools");
    if (devTools) devTools.style.zIndex = "100";
  }
  
  function initGridAnimation() {
    let tl_ap_grid = gsap.from("html", { duration: 0, autoAlpha: 0});
    tl_ap_grid.play();
    
    // Page scroll resets on refresh (using vanilla JS version is recommended)
    window.addEventListener('beforeunload', () => {
      document.body.style.display = "none";
      window.scrollTo(0, 0);
    });
  }

  function initFlipIconAnimation() {
    let iconGroup = document.querySelector("#sj_banner_icon_group");
    let targetContainer = document.querySelector("#sj_target_container_icon_group_contact_section");
    let originalParent = document.querySelector(".sj_banner_1_icon_group_origin");
  
    if (!iconGroup || !targetContainer || !originalParent) return;
  
    // Save original parent (only once)
    if (!originalElements.has(iconGroup)) {
      originalElements.set(iconGroup, originalParent);
    }
  
    // Capture initial state
    const initialState = Flip.getState(iconGroup);
  
    // Move the icon group to the target container only once.
    // This is the “final state” for the FLIP calculation.
    targetContainer.appendChild(iconGroup);
  
    // Create the Flip tween (paused, since we are going to update its progress manually)
    let flipTween = Flip.from(initialState, {
      absolute: true,
      ease: "none",
      duration: 1,
      paused: true  // Manually control progress via ScrollTrigger
    });
  
    // Create the ScrollTrigger that will update the tween’s progress.
    let st = ScrollTrigger.create({
      trigger: document.querySelector(".small_joys_home") || document.body,
      start: "top 0%",
      end: "bottom 100%",
      scrub: true,  // This scrub connects the scroll position to the tween.
      markers: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        flipTween.progress(self.progress);
        console.log("📈 Flip progress:", self.progress.toFixed(3));
      }
      
    });
  
    // Save the ScrollTrigger instance for potential later cleanup.
    scrollTriggers.flipIconGroup = st;

    console.log("🎬 Initializing Flip Icon Animation");

  }

  function watchIconGroupMovement() {
    const iconGroup = document.querySelector("#sj_banner_icon_group");
    if (!iconGroup) return;
  
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node === iconGroup) {
              console.log("🟥 Icon group added to:", mutation.target);
            }
          });
          mutation.removedNodes.forEach((node) => {
            if (node === iconGroup) {
              console.log("🟦 Icon group removed from:", mutation.target);
            }
          });
        }
      });
    });
  
    // Observe both possible parents
    const parent1 = document.querySelector(".sj_banner_1_icon_group_origin");
    const parent2 = document.querySelector("#sj_target_container_icon_group_contact_section");
    
    [parent1, parent2].forEach(parent => {
      if (parent) {
        observer.observe(parent, { childList: true });
      }
    });
  
    console.log("👁️ Watching icon group parent changes");
  }
  
  
  
  function initLogoToNavAnimation() {
    // Get elements
    let ap_grid_container = document.querySelector(".ap_grid_container.sj_process_section_1");
    let headerText = document.querySelectorAll(".sj_banner_1_header_text");
    let headerTextWrapper = document.querySelector(".sj_banner_1_header_text_wrapper");
    
    // Create tweens for the header texts
    let tweenSmallerText = gsap.to(headerText, {
      fontSize: "16px",
      lineHeight: "20px",
      ease: "none",
    });

    let tweenGap = gsap.to(headerTextWrapper, {
      rowGap: "2px",
      ease: "none",
    });
    
    // Create timeline for logo to nav
    let tl_logoToNav = gsap.timeline();
    tl_logoToNav
      .add(tweenSmallerText)
      .add(tweenGap, "<");

    scrollTriggers.logoToNav = ScrollTrigger.create({
      id: "logoToNavAnimation",
      trigger: ap_grid_container,
      start: "top 100%",
      end: "top 0%",
      animation: tl_logoToNav,
      scrub: 0.5,
      invalidateOnRefresh: true,
      fastScrollEnd: true
    });
  }

  // (Optional) Remove extra re-initialization on scroll if it conflicts with scrub animation.
  // The following event listener may cause jitter if it resets the Flip animation:
  /*
  window.addEventListener("scroll", debounce(function() {
    if (window.scrollY <= 10) {
      console.log("Near top of page, checking if animation needs reset");
      const iconGroup = document.querySelector("#sj_banner_icon_group");
      const originalParent = originalElements.get(iconGroup);
      
      if (iconGroup && originalParent && iconGroup.parentElement === originalParent && !scrollTriggers.flipIconGroup) {
        console.log("Reinitializing flip animation");
        initFlipIconAnimation();
      }
    }
  }));
  */
  
  // Kill only specific animations and reset specific elements
  function killFlipIconAnimation() {
    console.log("💀 Killing Flip Icon Animation");


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
  // window.addEventListener("scroll", debounce(function() {
  //   // Check if we're at the top of the page and animation should be active
  //   if (window.scrollY <= 10 && !animationActive) {
  //     console.log("Near top of page, checking if animation needs reset");
  //     const iconGroup = document.querySelector("#sj_banner_icon_group");
  //     const originalParent = originalElements.get(iconGroup);
      
  //     if (iconGroup && originalParent && iconGroup.parentElement === originalParent && !scrollTriggers.flipIconGroup) {
  //       console.log("Reinitializing flip animation");
  //       initFlipIconAnimation();
  //     }
  //   }
  // }));


  window.addEventListener("scroll", debounce(function () {
    const iconGroup = document.querySelector("#sj_banner_icon_group");
    const originalParent = originalElements.get(iconGroup);
    
    if (window.scrollY <= 10 && iconGroup && originalParent && iconGroup.parentElement === originalParent && !scrollTriggers.flipIconGroup) {
      console.log("🔁 Reinitializing flip animation from scroll event");
      initFlipIconAnimation();
    }
  }));
  
}


if (document.body.classList.contains("small_joys_home")) {
  small_joys_home();
}

export default small_joys_home;
