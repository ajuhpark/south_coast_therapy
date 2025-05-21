/** SJ Home 041925
 * Updated version with a single FLIP animation for the icon group
 * Make the Flip "scrub" smoothly forward and backward
 */
import "../src/styles/style.css";
import sj_menu from './sj_menu.js';
sj_menu();

// Import the icon flip animation module (it will auto-initialize if on home page)
// import sj_home_flip_icon from './sj_home_flip_icon.js';
// sj_home_flip_icon();
// console.log("Flip Icon Module initialized:", !!flipIconModule);

// example 16 has the stacking cards
// import example_16 from './example_16';
// example_16();

// fixed icon group animation
import sj_fixed_icon_st from './sj_fixed_icon_st'
sj_fixed_icon_st()

import colorModeToggle from './color_mode_toggle.js';

// Register ALL plugins
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);
gsap.registerPlugin(Flip);
gsap.registerPlugin(ScrollSmoother);

ScrollTrigger.normalizeScroll(true);
ScrollTrigger.config({
  ignoreMobileResize: true,
});

console.log("ScrollSmoother registered:", !!ScrollSmoother);

function small_joys_home() {
  console.log("small_joys_home.js is working");
  
  // Store ScrollTrigger instances
  let scrollTriggers = {
    logoToNav: null,
    buttonAppear: null,
    bannerImageParallax: null,
    bladeImageParallax: null
  };



  function init() {
    console.log("small_joys_home init function is working");
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
    
    // Page scroll resets on refresh (using vanilla JS version is recommended)
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
      console.log("Missing elements for logo animation:", {
        container: !!ap_grid_container,
        headerText: headerText.length,
        wrapper: !!headerTextWrapper
      });
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
      scrub: 0.5,
      // markers: true,
      invalidateOnRefresh: true,
      fastScrollEnd: true
    });
    
    console.log("Logo to Nav animation initialized");
  }

  function ImageParallax() {
    // Get elements
    let sj_home_banner = document.querySelector("#sj_home_banner")
    let sj_banner_1_image = document.querySelector(".sj_banner_1_image")
    
    // Create timeline for logo to nav
    let tl_bannerImageParallax = gsap.timeline()
    .fromTo(sj_banner_1_image, 
      { 
        y: "-10%" 
      }, 
      { 
        y:"10%" 
      }
    );

    scrollTriggers.bannerImageParallax = ScrollTrigger.create({
      id: "bannerImageParallax",
      trigger: sj_home_banner,
      start: "top 0%",
      end: "bottom 0%",
      animation: tl_bannerImageParallax,
      scrub: 0.5,
      // markers: true,
      invalidateOnRefresh: true,
      fastScrollEnd: true
    });
    

    let sj_home_blade = document.querySelectorAll(".ap_grid_1.train_1")

    sj_home_blade.forEach( (element) => {
      console.log(element)

      // for the current blade we're looping through, we're going to find that image in there
      let sjs_train_1_blade_image = element.querySelectorAll(".sjs_train_1_blade_image")

      let tl_bladeImageParallax = gsap.timeline()
      .fromTo(sjs_train_1_blade_image, 
      { 
        y: "-15%" 
      }, 
      { 
        y:"15%" 
      }
      );

      scrollTriggers.bladeImageParallax = ScrollTrigger.create({
      id: "bladeImageParallax",
      // trigger: sj_home_blade,
      trigger: element,
      start: "top 100%",
      end: "bottom 0%",
      animation: tl_bladeImageParallax,
      scrub: 0.5,
      // markers: true,
      invalidateOnRefresh: true,
      fastScrollEnd: true
    });

    })

  }

  // Add this near the end of your small_joys_home function

  // Listen for animation reset events
  window.addEventListener('sj_animation_reset', function() {
    console.log("Animation reset event received - reinitializing logoToNav");
    // Reinitialize logoToNav animation
    initLogoToNavAnimation();
    ImageParallax();

  });

  // Initialize everything once the page has fully loaded
  window.addEventListener("load", function (event) {
    init();
  });
}


// Only initialize if we're on the correct page
if (document.body.classList.contains("small_joys_home")) {
  small_joys_home();
}

export default small_joys_home;