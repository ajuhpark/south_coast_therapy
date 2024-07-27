// import '../src/styles/style.css'

import { gsap } from 'gsap'

import example_7 from './example_7'
example_7()

console.log('homepage.js is working. this is npm run dev working.')



function init(){

    gsap.from("html", {duration: 0, autoAlpha:0})

}



// Addressing the Flash of unstyled content issue
window.addEventListener("load", function(event) { 
init(); // do stuff
// GSDevTools.create({animation: home_tl});
});

