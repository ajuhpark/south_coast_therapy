/** Marquee Scroll */

import '../src/styles/style.css'
import { gsap } from 'gsap'
// import example_14 from './example_14'
// example_7()

// import { SplitText } from 'gsap/SplitText'

// gsap.registerPlugin(SplitText)
// gsap.registerPlugin(GSDevTools)
// gsap.registerPlugin(ScrollTrigger)

function example_14() {
  console.log('example_14.js is working')

  function init() {
    console.log('example_14 init function is working')
    gsap.from('html', { duration: 0, autoAlpha: 0 }, 'grid_tl')
    // const item = document.querySelector('.future_item')

    const sjs_marquee = document.querySelector('.sjs_marquee')
    console.log(sjs_marquee)

    let sjs_tween

    /** This is so if sjs_marquee doesn't exist, it'll just stop running so there's no console errors. */
    if (!sjs_marquee) {
      return
    }
    const sjs_marquee_content = sjs_marquee.firstChild
    if (!sjs_marquee_content) {
      return
    }

    // duplicating the marquee_content div
    const sjs_marquee_content_clone = sjs_marquee_content.cloneNode(true)
    sjs_marquee.append(sjs_marquee_content_clone)

    const playMarquee = () => {
      /* 
      If the tween exists, we want it to be sjs_progress. Otherwise, it's zero.
      I don't really get it. It's supposed to not create multiple gsap animations on resize.
      If it's the first time, we're going to say progress is 0.
      Otherwise we're going to start the animation where the point is at. 
      */
      let sjs_progress = sjs_tween ? sjs_tween.progress() : 0

      /*
      we want to kill our tween only if it exists. so here we're saying if 
      the tween exists or it's in progress, then kill it.
      */
      sjs_tween && sjs_tween.progress(0).kill()

      // He calculated this in inspector and then copy pasted here.
      // This would give us the column gap which is 16px, 1rem
      const sjs_width = parseInt(
        getComputedStyle(sjs_marquee_content).getPropertyValue('width'),
        10
      )
      console.log(sjs_width)

      const sjs_gap = parseInt(
        getComputedStyle(sjs_marquee_content).getPropertyValue('column-gap'),
        10
      )
      console.log(sjs_gap)

      const distanceToTranslate = -1 * (sjs_gap + sjs_width)

      sjs_tween = gsap.fromTo(
        // passing both of the sjs_marquee_content divs
        sjs_marquee.children,
        { x: 0 },
        { x: distanceToTranslate, duration: 20, ease: 'none', repeat: -1 }
      )

      // we saved that progress earlier (don't really get this part.)
      sjs_tween.progress(sjs_progress)
    }

    // run the playMarquee function
    playMarquee()

    // this is for debounce
    function sjs_debounce(func) {
      var timer
      return function (event) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(
          () => {
            func()
          },
          500,
          event
        )
      }
    }

    /*
    we're also adding an event listener to run it again on resize. 
    the sjs_debounce helps it not resize everytime it moves. it waits 500ms on the change.
    */
    window.addEventListener('resize', sjs_debounce(playMarquee))
  }

  window.addEventListener('load', function (event) {
    init()
  })
}

if (document.body.classList.contains('example_14')) {
  example_14()
}

export default example_14
