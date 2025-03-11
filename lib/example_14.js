/** Marquee Scroll */

import '../src/styles/style.css'
import { gsap } from 'gsap'

function example_14() {
  console.log('example_14.js is working')

  function init() {
    console.log('example_14 init function is working')
    gsap.from('html', { duration: 0, autoAlpha: 0 }, 'marquee_tl')

    // Get all marquees instead of just the first one using querySelectorAll
    // This is the key fix - we need to select ALL marquees, not just the first one
    const sjs_marquees = document.querySelectorAll('.sjs_marquee')
    console.log(`Found ${sjs_marquees.length} marquees`)

    // If no marquees exist, exit function to prevent errors
    if (!sjs_marquees.length) {
      return
    }

    // Create an array to store all the tweens so we can reference them later if needed
    const tweens = []

    // Loop through each marquee element to set up animations individually
    sjs_marquees.forEach((sjs_marquee, index) => {
      // Get the first child of the marquee, which contains the content to animate
      const sjs_marquee_content = sjs_marquee.firstChild
      if (!sjs_marquee_content) {
        return // Skip this iteration if there's no content
      }

      // Clone the content to create an infinite scroll effect
      // We need two copies of the content to create a seamless loop
      const sjs_marquee_content_clone = sjs_marquee_content.cloneNode(true)
      sjs_marquee.append(sjs_marquee_content_clone)

      // Initialize tween variable for this specific marquee instance
      let sjs_tween

      // Function to create or recreate the marquee animation
      const playMarquee = () => {
        // If the tween already exists, store its progress so we can resume from same position
        // This prevents the animation from resetting during window resize
        let sjs_progress = sjs_tween ? sjs_tween.progress() : 0

        // Kill existing tween before creating a new one (prevents animation duplicates)
        sjs_tween && sjs_tween.progress(0).kill()

        // Calculate the width of the content element
        // This needs to be recalculated on resize to ensure proper animation
        const sjs_width = parseInt(
          getComputedStyle(sjs_marquee_content).getPropertyValue('width'),
          10
        )

        // Get the gap between elements (used in the calculation for smooth animation)
        const sjs_gap = parseInt(
          getComputedStyle(sjs_marquee_content).getPropertyValue('column-gap'),
          10
        )

        // Calculate how far to move the elements (negative value to move left)
        // We move exactly the width + gap to create a perfect loop
        const distanceToTranslate = -1 * (sjs_gap + sjs_width)

        // Create the GSAP animation for this marquee
        // fromTo lets us define both start and end positions
        sjs_tween = gsap.fromTo(
          sjs_marquee.children, // Animate both the original and cloned content
          { x: 0 }, // Start position
          {
            x: distanceToTranslate, // End position
            duration: 20, // Animation time in seconds
            ease: 'none', // Linear movement (no easing)
            repeat: -1, // Repeat indefinitely
          }
        )

        // Restore the previous progress if this is a recreation of the animation
        sjs_tween.progress(sjs_progress)

        // Store reference to this marquee's tween in our array
        tweens[index] = sjs_tween
      }

      // Initialize the animation for this marquee
      playMarquee()

      // Set up a resize handler for this specific marquee with debounce
      // This ensures the animation adjusts properly when the window size changes
      window.addEventListener(
        'resize',
        sjs_debounce(() => {
          playMarquee()
        })
      )
    })

    // Debounce function to prevent excessive function calls during resize
    // This improves performance by waiting until resizing stops before recalculating
    function sjs_debounce(func) {
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
  }

  // Initialize everything once the page has fully loaded
  window.addEventListener('load', function (event) {
    init()
  })
}

// Only run the marquee code if we're on the correct page
// This prevents the code from running unnecessarily on other pages
if (document.body.classList.contains('example_14')) {
  example_14()
}

export default example_14
