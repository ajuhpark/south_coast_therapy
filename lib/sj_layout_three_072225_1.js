import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'
// import sj_menu from './sj_menu.js';
// sj_menu();

import sj_navbar_blur from './sj_navbar_blur.js';

import split_text_additional from './split_text_additional.js'
// split_text_additional()



gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)
gsap.registerPlugin(ScrollTrigger);


function sj_layout_three() {
  console.log('sj_layout_three.js is working')

  function init() {

    console.log('sj_layout_three init function is working')

    gsap.from("html", {duration: 0, autoAlpha:0})
      

    
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('sj_layout_three')) {
  sj_layout_three();
}

export default sj_layout_three
