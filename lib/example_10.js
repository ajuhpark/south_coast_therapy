import '../src/styles/style.css'
import { gsap } from 'gsap'
import example_17 from './example_17'

// import { SplitText } from 'gsap/SplitText'

/** Futuristic Hover */

// gsap.registerPlugin(SplitText)
// gsap.registerPlugin(GSDevTools)
// gsap.registerPlugin(ScrollTrigger)

function example_10() {
  console.log('example_10.js is working')

  function init() {
    console.log('example_10 init function is working')

    gsap.from('html', { duration: 0, autoAlpha: 0 }, 'fut_hover')

    // Select the item to apply hover effects
    const item = document.querySelector('.future_item')

    // Handle mouse enter (hover in)
    item.addEventListener('mouseenter', () => {
      // Animate future_item-img_image
      gsap.to(item.querySelector('.future_item-img_image'), {
        scale: 1.5,
        filter: 'grayscale(0.5) sepia(0.75) brightness(0.75)',
        duration: 0.5,
        ease: 'power2.out',
      })

      // Animate future_shape
      gsap.to(item.querySelector('.future_shape'), {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      })
    })

    // Handle mouse leave (hover out)
    item.addEventListener('mouseleave', () => {
      // Reset future_item-img_image
      gsap.to(item.querySelector('.future_item-img_image'), {
        scale: 1,
        filter: 'grayscale(0) sepia(0) brightness(1)',
        duration: 0.5,
        ease: 'power2.out',
      })

      // Reset future_shape
      gsap.to(item.querySelector('.future_shape'), {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    })

    /** 
    document.querySelectorAll(".future_item").forEach((item) => {
      item.addEventListener("mouseenter", function () {
        gsap.set(this.querySelectorAll("span"), { opacity: 0 });
        gsap.to(this.querySelectorAll("span"), {
          opacity: 1,
          duration: 0.075,
          stagger: {
            from: "random",
            each: 0.02,
          },
          ease: "power2.out",
        });
      });

      item.addEventListener("mouseleave", function () {
        gsap.to(this.querySelectorAll("span"), {
          opacity: 0,
          duration: 0.075,
          stagger: {
            from: "random",
            each: 0.02,
          },
          ease: "power2.in",
        });
      });
    });
*/

    // gsap.from(".jomor_project_frame", {
    //   scale: "1.15",
    //     scrollTrigger: {
    //       trigger: ".jomor_project_link",
    //       markers: true,
    //       scrub: 1,
    //     }
    // })

    // gsap.from(".jomor_project_frame", {
    //   top: '0%',
    //   scrollTrigger: {
    //     trigger: ".jomor_project_link",
    //     markers: true,
    //     scrub: 1,
    //     top: "20%"
    //   }
    // })

    // gsap.from(".jomor_project-name-div", {
    //   top: '20%',
    //   scrollTrigger: {
    //     trigger: ".jomor_project_link",
    //     markers: true,
    //     scrub: 1,
    //     top: "25%"
    //   }
    // })

    /** example gsap scrolltrigger timeline 
    gsap.from(".herman", {
      duration:10, x:"-50vw", rotation:-360, ease:"linear", 
        scrollTrigger: {
          trigger:".herman",
          markers:true,
          start:"top 75%", //when top of herman passes 75% viewport height
          end:"bottom 25%", //when bottom of herman passes 25% viewport height
          
               //events: onEnter onLeave onEnterBack onLeaveBack
          toggleActions:"restart complete reverse reset"
              //options: play, pause, resume, reset, restart, complete, reverse,none
        }
    }) 
    */
  }

  window.addEventListener('load', function (event) {
    init()
  })
}

if (document.body.classList.contains('example_10')) {
  example_10()
}

export default example_10
