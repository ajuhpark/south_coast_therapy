/** Marquee Scroll */

import '../src/styles/style.css'
import { gsap } from 'gsap'
import example_17 from './example_17'


// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function example_13() {
  console.log('example_13.js is working')

  function init() {
    console.log('example_13 init function is working')
    gsap.from('html', { duration: 0, autoAlpha: 0 }, 'marquee_tl')

    // Get all marquees instead of just the first one using querySelectorAll
    // This is the key fix - we need to select ALL marquees, not just the first one
    const ms_marquees = document.querySelectorAll('.ms_marquee')
    console.log(`Found ${ms_marquees.length} marquees`)

    // If no marquees exist, exit function to prevent errors
    if (!ms_marquees.length) {
      return
    }

    // Create an array to store all the tweens so we can reference them later if needed
    const tweens = []

    // Loop through each marquee element to set up animations individually
    ms_marquees.forEach((ms_marquee, index) => {
      // Get the first child of the marquee, which contains the content to animate
      const ms_marquee_content = ms_marquee.firstChild
      if (!ms_marquee_content) {
        return // Skip this iteration if there's no content
      }

      // Clone the content to create an infinite scroll effect
      // We need two copies of the content to create a seamless loop
      const ms_marquee_content_clone = ms_marquee_content.cloneNode(true)
      ms_marquee.append(ms_marquee_content_clone)

      // Initialize tween variable for this specific marquee instance
      let ms_tween

      // Function to create or recreate the marquee animation
      const playMarquee = () => {
        // If the tween already exists, store its progress so we can resume from same position
        // This prevents the animation from resetting during window resize
        let ms_progress = ms_tween ? ms_tween.progress() : 0

        // Kill existing tween before creating a new one (prevents animation duplicates)
        ms_tween && ms_tween.progress(0).kill()

        // Calculate the width of the content element
        // This needs to be recalculated on resize to ensure proper animation
        const ms_width = parseInt(
          getComputedStyle(ms_marquee_content).getPropertyValue('width'),
          10
        )

        // Get the gap between elements (used in the calculation for smooth animation)
        const ms_gap = parseInt(
          getComputedStyle(ms_marquee_content).getPropertyValue('column-gap'),
          10
        )

        // Calculate how far to move the elements (negative value to move left)
        // We move exactly the width + gap to create a perfect loop
        const distanceToTranslate = -1 * (ms_gap + ms_width)

        // Create the GSAP animation for this marquee
        // fromTo lets us define both start and end positions
        ms_tween = gsap.fromTo(
          ms_marquee.children, // Animate both the original and cloned content
          { x: 0 }, // Start position
          {
            x: distanceToTranslate, // End position
            duration: 20, // Animation time in seconds
            ease: 'none', // Linear movement (no easing)
            repeat: -1, // Repeat indefinitely
          }
        )

        // Restore the previous progress if this is a recreation of the animation
        ms_tween.progress(ms_progress)

        // Store reference to this marquee's tween in our array
        tweens[index] = ms_tween
      }

      // Initialize the animation for this marquee
      playMarquee()

      // Set up a resize handler for this specific marquee with debounce
      // This ensures the animation adjusts properly when the window size changes
      window.addEventListener(
        'resize',
        ms_debounce(() => {
          playMarquee()
        })
      )
    })

    // Debounce function to prevent excessive function calls during resize
    // This improves performance by waiting until resizing stops before recalculating
    function ms_debounce(func) {
      var timer
      return function (event) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(
          () => {
            func()
          },
          500, // Wait 500ms after last resize event before executing
          event
        )
      }
    }




    // This is code for the swiper marquee
    const swiper = new Swiper(".swiper-marquee", {
      modules: [Autoplay], 
      // swiper will use the width we define in Webflow if we do auto. 
      slidesPerView: 'auto',
      spaceBetween: 120, 
      loop: true, 
      speed: 6000,
      // can't interact w things in slider
      allowTouchMove: false,
      // for infinite marquee
      autoplay: {
        delay: 1,
        disableOnInteraction: false
      }


    })

  }

  // Initialize everything once the page has fully loaded
  window.addEventListener('load', function (event) {
    init()
  })
}

// Only run the marquee code if we're on the correct page
// This prevents the code from running unnecessarily on other pages
if (document.body.classList.contains('example_13')) {
  example_13()
}

export default example_13