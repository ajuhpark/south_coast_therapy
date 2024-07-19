import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

/** O'Shane Howard Tutorial */

gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)

var howard_tl_1 = gsap.timeline({ defaults: { } });
var howard_tl_2 = gsap.timeline({ defaults: { } });


function example_5() {
  console.log('example_5.js is working')

  function init() {

    console.log('example_5 init function is working')

    howard_tl_1
      .from("html", {duration: 0, autoAlpha:0}, 'howardTl_1')
      .set(".howard_navbar", { y: -150 }, '<')
      .set(".howard_h1", { opacity: 0 }, '<')
      .set(".howard_preloader", { opacity: 0 }, '<')
    gsap.to(".howard_preloader", { opacity: 100, duration: 5, ease: "power1.inOut", })

    const digit1 = document.querySelector(".digit-1");
    const digit2 = document.querySelector(".digit-2");
    const digit3 = document.querySelector(".digit-3");

    function splitTextIntoSpans(selector) {
      var element = document.querySelector(selector);
      if (element) {
        var text = element.innerText;
        var splitText = text
          .split("")
          .map((char) => `<span>${char}</span>`)
          .join("");
        element.innerHTML = splitText;
      }
    }

    splitTextIntoSpans(".howard_h1");

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.className = "num";
        div.textContent = j;
        digit3.appendChild(div);
      }
    }

    const finalDigit = document.createElement("div");
    finalDigit.className = "num";
    finalDigit.textContent = "0";
    digit3.appendChild(finalDigit);

    function animate(digit, duration, delay = 1) {
      const numHeight = digit.querySelector(".num").clientHeight;
      const totalDistance =
        (digit.querySelectorAll(".num").length - 1) * numHeight;
      gsap.to(digit, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: "power2.inOut",
      });
    }

    animate(digit3, 5);
    animate(digit2, 6);
    animate(digit1, 2, 5);

    howard_tl_2
      .to(".progress-bar", {
        width: "20%",
        duration: .75,
        ease: "power4.inOut",
        delay: 6,
      }, 'howardTl_2')
      .to(".progress-bar", {
      width: "100%",
      opacity: 0,
      duration: .75,
      delay: .5,
      ease: "power3.out",
      onComplete: () => {
        gsap.set(".howard_preloader", {
          display: "none",
        })
      },
      }, 
      // 'howardTl_2+=1.5'
    )

    gsap.to(".howard_img", {
      clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
      duration: 1,
      ease: "power4.inOut",
      stagger: 0.25,
      delay: 8,
    });

    gsap.to(".howard_hero", {
      scale: 1.3,
      duration: 3,
      ease: "power3.inOut",
      delay: 8,
    });

    gsap.to(".howard_navbar", {
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 10,
    });

    gsap.to(".howard_h1", {
      opacity: 100, 
      top: "0px",
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      delay: 10,
    });

    GSDevTools.create({})

    
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('example_5')) {
  example_5();
}

export default example_5
