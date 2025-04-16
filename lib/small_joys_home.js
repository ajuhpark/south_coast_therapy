/** SJS Mockups */

import "../src/styles/style.css";
// import { gsap } from "gsap";
// import { GSDevTools } from "gsap/GSDevTools"; 
import sj_menu from './sj_menu'
sj_menu()

import colorModeToggle from './color_mode_toggle.js'

// Register ALL plugins
// gsap.registerPlugin(ScrollTrigger, GSDevTools); 
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools)

function small_joys_home() {
  console.log("small_joys_home.js is working");

  function init() {
    console.log("small_joys_home init function is working");

    // high z-index for gsdevtools
    const devTools = document.querySelector(".gs-dev-tools");
    if (devTools) devTools.style.zIndex = "100";

    // Play the initial grid animation immediately
    let tl_ap_grid = gsap.from("html", { duration: 0, autoAlpha: 0});
    tl_ap_grid.play();
    // let tl_ap_grid = gsap.from("html", { duration: 0, autoAlpha: 0}, 'tl_ap_grid');

    
  }



  // Initialize everything once the page has fully loaded
  window.addEventListener("load", function (event) {
    init();
  });
}



// Only run the marquee code if we're on the correct page
// This prevents the code from running unnecessarily on other pages
if (document.body.classList.contains("small_joys_home")) {
  small_joys_home();
}

export default small_joys_home;