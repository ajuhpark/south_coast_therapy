/** SJ Home 053125 - trying out Claude solution for jitter
 * Updated version with proper ScrollTrigger cleanup and optimization
 */
import "../src/styles/style.css";
import sj_menu from './sj_menu.js';
sj_menu();

import sj_navbar_blur from './sj_navbar_blur.js';
import sj_fixed_icon_st from './sj_fixed_icon_st'
sj_fixed_icon_st()

import colorModeToggle from './color_mode_toggle.js';

// Register ALL plugins
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);
gsap.registerPlugin(Flip);

// Optimize ScrollTrigger config for smoother performance
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" // Reduce auto-refresh events
});

// Remove normalizeScroll if causing issues, or make it conditional
// ScrollTrigger.normalizeScroll(true);

function small_joys_home() {
  console.log("small_joys_home.js is working");
  
  // Store ScrollTrigger instances with better organization
  let scrollTriggers = {
    logoToNav: null,
    buttonAppear: null,
    bannerImageParallax: null,
    bladeImageParallax: [] // Array for multiple blade instances
  };

  // Cleanup function to kill all ScrollTriggers
  function killAllScrollTriggers() {
    // Kill individual triggers
    if (scrollTriggers.logoToNav) {
      scrollTriggers.logoToNav.kill();
      scrollTriggers.logoToNav = null;
    }
    
    if (scrollTriggers.bannerImageParallax) {
      scrollTriggers.bannerImageParallax.kill();
      scrollTriggers.bannerImageParallax = null;
    }
    
    // Kill all blade triggers
    scrollTriggers.bladeImageParallax.forEach(trigger => {
      if (trigger) trigger.kill();
    });
    scrollTriggers.bladeImageParallax = [];
    
    console.log("All ScrollTriggers cleaned up");
  }

  function init() {
    console.log("small_joys_home init function is working");
    
    // Clean up any existing triggers first
    killAllScrollTriggers();
    
    initDevTools();
    initGridAnimation();
    initLogoToNavAnimation();
    ImageParallax();
  }
  
  function initDevTools() {
    const devTools = document.querySelector(".gs-dev-tools");
    if (devTools) devTools.style.zIndex = "100";
  }
  
  function initGridAnimation() {
    let tl_ap_grid = gsap.from("html", { duration: 0, autoAlpha: 0});
    tl_ap_grid.play();
    
    // Page scroll resets on refresh
    window.addEventListener('beforeunload', () => {
      document.body.style.display = "none";
      window.scrollTo(0, 0);
    });
  }
  
  function initLogoToNavAnimation() {
    // Get elements
    let ap_grid_container = document.querySelector(".ap_grid_container.sj_process_section_1");
    let headerText = document.querySelectorAll(".sj_banner_1_header_text");
    let headerTextWrapper = document.querySelector(".sj_banner_1_header_text_wrapper");
    let sj_home_banner = document.querySelector("#sj_home_banner")

    if (!ap_grid_container || !headerText.length || !headerTextWrapper) {
      console.log("Missing elements for logo animation");
      return;
    }
    
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
      trigger: sj_home_banner,
      start: "top 0%",
      end: "bottom 0%",
      animation: tl_logoToNav,
      scrub: 1, // Increased scrub value for smoother animation
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      refreshPriority: -1 // Lower priority for performance
    });
    
    console.log("Logo to Nav animation initialized");
  }

  function ImageParallax() {
    // Banner parallax
    let sj_home_banner = document.querySelector("#sj_home_banner")
    let sj_banner_1_image = document.querySelector(".sj_banner_1_image")
    let sj_banner_1_image_wrapper = document.querySelector(".sj_banner_1_image_wrapper")

    if (!sj_banner_1_image || !sj_banner_1_image_wrapper) {
      console.log("Banner parallax elements not found");
      return;
    }

    gsap.set(sj_banner_1_image, {
      y: "-5%"
    });

    let tl_bannerImageParallax = gsap.timeline()
      .fromTo(sj_banner_1_image, 
        { y: "-5%" }, 
        { 
          y: "20%",
          ease: "none" // Add explicit ease for smoother animation
        }
      );

    scrollTriggers.bannerImageParallax = ScrollTrigger.create({
      id: "bannerImageParallax",
      trigger: sj_banner_1_image_wrapper,
      start: "top 120px",
      end: "bottom 0%",
      animation: tl_bannerImageParallax,
      scrub: 1, // Increased scrub value
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      refreshPriority: -1
    });

    // Blade parallax with proper cleanup
    let sjs_train_1_blade_image_wrapper = document.querySelectorAll(".sjs_train_1_blade_image_wrapper");
    
    sjs_train_1_blade_image_wrapper.forEach((element, index) => {
      let sjs_train_1_blade_image = element.querySelectorAll(".sjs_train_1_blade_image");
      
      if (!sjs_train_1_blade_image.length) return;

      let tl_bladeImageParallax = gsap.timeline()
        .fromTo(sjs_train_1_blade_image, 
          { y: "-15%" }, 
          { 
            y: "15%",
            ease: "none"
          }
        );

      // Store each blade trigger in the array
      let bladeTrigger = ScrollTrigger.create({
        id: `bladeImageParallax_${index}`,
        trigger: element,
        start: "top 100%",
        end: "bottom 0%",
        animation: tl_bladeImageParallax,
        scrub: 1, // Increased scrub value
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        refreshPriority: -1
      });
      
      scrollTriggers.bladeImageParallax.push(bladeTrigger);
    });

    console.log(`Created ${scrollTriggers.bladeImageParallax.length} blade parallax triggers`);
  }

  // Improved animation reset handler
  window.addEventListener('sj_animation_reset', function() {
    console.log("Animation reset event received - reinitializing");
    
    // Use requestAnimationFrame to ensure smooth re-initialization
    requestAnimationFrame(() => {
      killAllScrollTriggers();
      
      // Small delay to ensure cleanup is complete
      setTimeout(() => {
        initLogoToNavAnimation();
        ImageParallax();
        ScrollTrigger.refresh(); // Refresh after re-initialization
      }, 50);
    });
  });

  // Initialize everything once the page has fully loaded
  window.addEventListener("load", function (event) {
    // Add small delay to ensure all elements are properly rendered
    setTimeout(() => {
      init();
      ScrollTrigger.refresh(); // Initial refresh for proper positioning
    }, 100);
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    killAllScrollTriggers();
  });
}

// Only initialize if we're on the correct page
if (document.body.classList.contains("small_joys_home")) {
  small_joys_home();
}

export default small_joys_home;