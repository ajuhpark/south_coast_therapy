import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

function example_3() {
  console.log('example_3.js is working')

  var hoverIn_tl = gsap.timeline()
  var hoverOut_tl = gsap.timeline()

  function init() {
    console.log('example_3 init function is working')

    let elements_container = document.querySelectorAll(".linkhover_text_container");
    console.log("Number of elements_container selected:", elements_container.length);

    elements_container.forEach((link_element) => {
      // Split text into words and chars within the specific link_element
      let split = new SplitText(link_element.querySelector(".linkhover_text"), { type: "words, chars" });
      let split_hover = new SplitText(link_element.querySelector(".linkhover_text_2"), { type: "words, chars" });

      let isHovered = false;

      link_element.addEventListener("mouseenter", () => {
        if (!isHovered) {
          isHovered = true;

          hoverIn_tl
            .to(split.chars, {
              y: -140,
              stagger: 0.1,
              duration: 0.6,
              ease: "power3.inOut",
            })
            .to(split_hover.chars, {
              y: -140,
              stagger: 0.1,
              duration: 0.6,
              ease: "power3.inOut",
            }, '<');
        }
      });

      link_element.addEventListener("mouseleave", () => {
        if (isHovered) {
          isHovered = false;

          hoverOut_tl
            .to(split.chars, {
              y: 0,
              stagger: 0.1,
              duration: 0.6,
              ease: "power3.inOut",
            })
            .to(split_hover.chars, {
              y: 0,
              stagger: 0.1,
              duration: 0.6,
              ease: "power3.inOut",
            }, '<');
        }
      });
    });
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('example_3')) {
  example_3();
}

export default example_3
