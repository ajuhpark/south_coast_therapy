import '../src/styles/style.css'
import { gsap } from 'gsap'
// import example_12 from './example_12'
// example_7()

// import { SplitText } from 'gsap/SplitText'

/** Jomor Tutorial */

// gsap.registerPlugin(SplitText)
// gsap.registerPlugin(GSDevTools)
gsap.registerPlugin(ScrollTrigger)

function example_12() {
  console.log('example_12.js is working')

  function init() {
    console.log('example_12 init function is working')
    gsap.from('html', { duration: 0, autoAlpha: 0 }, 'gsap_pinning_tl')

    gsap.utils.toArray('.pin_panel').forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
        end: '200% top',
        pin: true,
        pinSpacing: false,
        animation: gsap.fromTo(
          panel,
          {
            boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)', // Drop shadow
          },
          {
            // position: 'absolute',
            width: '90vw',
            duration: 1, // Animation duration in seconds
            z: -390, // Moves back on the Z-axis
            y: 20, // Moves down by 20px
            ease: 'power2.out', // Smooth easing
            boxShadow: '20px 20px 40px rgba(0, 0, 0, 0.6)', // Drop shadow
          }
        ),
        scrub: true,
        // markers: { startColor: 'white', endColor: 'white' },
        markers: true,
      })

      gsap.set(panel, {
        transformPerspective: 800,
      })
    })
  }

  window.addEventListener('load', function (event) {
    init()
  })
}

if (document.body.classList.contains('example_12')) {
  example_12()
}

export default example_12
