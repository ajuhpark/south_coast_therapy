/** SCT */
import "../src/styles/style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { GSDevTools } from "gsap/GSDevTools"; 
// import sj_menu from './sj_menu.js'
// sj_menu()
// import example_20 from './example_20.js'
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
// gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(GSDevTools)
// gsap.registerPlugin(Flip)

function sct_inner() {
  console.log('sct_inner.js is working')

  function init() {
    console.log('sct_inner init function is working')

    gsap.from("html", {duration: 0, autoAlpha:0})
    
    // example_17()


    // matter js - example_20.js
    // example_20()

    // sct menu.js
    sct_menu()

    // sct_gradient.js
    // sct_gradient() // Already called in sct_gradient.js line 90



  }

  // Initialize everything once the page has fully loaded
  window.addEventListener('load', function (event) {
    init()
  })
}

// Only run the code if we're on the correct page
if (document.body.classList.contains("sct_inner")) {
  sct_inner();
}

export default sct_inner;