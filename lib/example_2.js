import '../src/styles/style.css'

import { gsap } from 'gsap'

// importing the gsdevtools
{/* <script src="https://uploads-ssl.webflow.com/64e3f970ea8b5a18219f286f/66941a3b8f89ae0468a8ed24_GSDevTools.txt"></script> */}


// gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)

// console.log('example_2.js is working outside of function')


function example_2() {
  console.log('example_2.js is working')
  // console.log(gsap)

  function init(){

    /** 
    const content = document.querySelector(".distort_section")
    let currentPos = window.scrollY

    const callDistort = function() {
      const newPos = window.scrollY
      const diff = newPos - currentPos
      const speed = diff * 0.45

      content.style.transform = "skewY(" + speed + "deg)"
      currentPos = newPos
      requestAnimationFrame(callDistort)
    }
    */


    const body = document.body,
        scrollWrap = document.getElementsByClassName("smooth-scroll-wrapper")[0],
        height = scrollWrap.getBoundingClientRect().height - 1,
        speed = 0.03;

    var offset = 0;

    body.style.height = Math.floor(height) + "px";

    function smoothScroll() {
        offset += (window.scrollY - offset) * speed;

        var scroll = "translateY(-" + offset + "px) translateZ(0)";
        scrollWrap.style.transform = scroll;

        let callScroll = requestAnimationFrame(smoothScroll);
    }

    smoothScroll();
    const content = document.querySelector(".distort_section");
    let currentPos = window.scrollY;

    const callDistort = function () {
        const newPos = window.scrollY;
        const diff = newPos - currentPos;
        const speed = diff * 0.35;

        content.style.transform = "skewY(" + speed + "deg)";
        currentPos = newPos;
        requestAnimationFrame(callDistort);
    };

    callDistort();

    // GSDevTools.create({})

  }



  // addressing the Flash of unstyled content issue.
  window.addEventListener("load", function(event) { 
    init(); //do stuff
    // GSDevTools.create({animation:tl})
   });
}

if ($('body').hasClass('example_2')) {
  example_2();
}


export default example_2
