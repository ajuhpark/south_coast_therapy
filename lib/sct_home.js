/** SJ Contact */
import "../src/styles/style.css";
// import { gsap } from "gsap";
// import { GSDevTools } from "gsap/GSDevTools"; 
// import sj_menu from './sj_menu.js'
// sj_menu()

// import colorModeToggle from './color_mode_toggle.js'
// import sj_navbar_blur from './sj_navbar_blur.js';

// Register ALL plugins
// gsap.registerPlugin(ScrollTrigger, GSDevTools); 
gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(GSDevTools)
// gsap.registerPlugin(Flip)

function sct_home() {
  console.log('sct_home.js is working')

  function init() {
    console.log('sct_home init function is working')


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