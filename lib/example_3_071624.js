import '../src/styles/style.css'

import { gsap } from 'gsap'

// importing the gsdevtools
{/* <script src="https://uploads-ssl.webflow.com/64e3f970ea8b5a18219f286f/66941a3b8f89ae0468a8ed24_GSDevTools.txt"></script> */}


// gsap.registerPlugin(SplitText)
// gsap.registerPlugin(GSDevTools)
gsap.registerPlugin(SplitText)
// console.log('example_3.js is working outside of function')

// console.log(SplitText)

function example_3() {
  console.log('example_3.js is working')
  // console.log(gsap)

  function init(){
    console.log('example_3 init function is working')

    let elements_container = document.querySelectorAll(".linkhover_text_container");
    // Check the length of NodeList
    console.log("Number of elements_container selected:", elements_container.length);


    let elements = document.querySelectorAll(".linkhover_text");
    console.log(elements)

    // Check the length of NodeList
    console.log("Number of elements selected:", elements.length);

    // Loop through each element to inspect them individually
    // elements.forEach((element, index) => {
    //   console.log(`Element ${index}:`, element);
    // });

    let elements_hover = document.querySelectorAll(".linkhover_text_2");
    console.log(elements)
    // Check the length of NodeList
    console.log("Number of elements selected:", elements_hover.length);




    // trying out the elements_container
    elements_container.forEach((element) => {

    // Split text into words and chars
    let split = new SplitText(element, { type: "words, chars" });

    // Splitting the second set of text
    let split_hover = new SplitText(elements_hover, { type: "words, chars" });

    /** 
     * The isHovered flag ensures the animations are triggered only once 
     * when the mouse enters the element. 
    */
    let isHovered = false;

    element.addEventListener("mouseenter", () => {
      if (!isHovered) {
        isHovered = true;


        gsap.to(split.chars, {
          // yPercent: -100,
          y: -140,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.inOut",
        });

        // gsap.to(split_hover.chars, {
        //   yPercent: -50,
        //   stagger: 0.1,
        //   duration: 0.6,
        //   ease: "power3.inOut",
        // });
      }
    });

    element.addEventListener("mouseleave", () => {
      if (isHovered) {
        isHovered = false;

        gsap.to(split.chars, {
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.inOut",
        });

        // gsap.to(split_hover.chars, {
        //   yPercent: 0,
        //   stagger: 0.1,
        //   duration: 0.6,
        //   ease: "power3.inOut",
        // });
      }
    });






    // GSDevTools.create({})

  })
}



  // addressing the Flash of unstyled content issue.
  window.addEventListener("load", function(event) { 
    init(); //do stuff
    // GSDevTools.create({animation:tl})
   });
}

if ($('body').hasClass('example_3')) {
  example_3();
}


export default example_3
