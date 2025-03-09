/** Marquee Scroll */

import '../src/styles/style.css'
import { gsap } from 'gsap'
// import example_13 from './example_13'
// example_7()

// import { SplitText } from 'gsap/SplitText'

// gsap.registerPlugin(SplitText)
// gsap.registerPlugin(GSDevTools)
// gsap.registerPlugin(ScrollTrigger)

function example_13() {
  console.log('example_13.js is working')

  function init() {
    console.log('example_13 init function is working')
    gsap.from('html', { duration: 0, autoAlpha: 0 }, 'marquee_tl')
    // const item = document.querySelector('.future_item')

    const ms_marquee = document.querySelector('.ms_marquee')
    console.log(ms_marquee)

    let ms_tween

    /** This is so if ms_marquee doesn't exist, it'll just stop running so there's no console errors. */
    if (!ms_marquee) {
      return
    }
    const ms_marquee_content = ms_marquee.firstChild
    if (!ms_marquee_content) {
      return
    }

    // duplicating the marquee_content div
    const ms_marquee_content_clone = ms_marquee_content.cloneNode(true)
    ms_marquee.append(ms_marquee_content_clone)

    const playMarquee = () => {
      /* 
      If the tween exists, we want it to be ms_progress. Otherwise, it's zero.
      I don't really get it. It's supposed to not create multiple gsap animations on resize.
      If it's the first time, we're going to say progress is 0.
      Otherwise we're going to start the animation where the point is at. 
      */
      let ms_progress = ms_tween ? ms_tween.progress() : 0

      /*
      we want to kill our tween only if it exists. so here we're saying if 
      the tween exists or it's in progress, then kill it.
      */
      ms_tween && ms_tween.progress(0).kill()

      // He calculated this in inspector and then copy pasted here.
      // This would give us the column gap which is 16px, 1rem
      const ms_width = parseInt(
        getComputedStyle(ms_marquee_content).getPropertyValue('width'),
        10
      )
      console.log(ms_width)

      const ms_gap = parseInt(
        getComputedStyle(ms_marquee_content).getPropertyValue('column-gap'),
        10
      )
      console.log(ms_gap)

      const distanceToTranslate = -1 * (ms_gap + ms_width)

      ms_tween = gsap.fromTo(
        // passing both of the ms_marquee_content divs
        ms_marquee.children,
        { x: 0 },
        { x: distanceToTranslate, duration: 20, ease: 'none', repeat: -1 }
      )

      // we saved that progress earlier (don't really get this part.)
      ms_tween.progress(ms_progress)
    }

    // run the playMarquee function
    playMarquee()

    // this is for debounce
    function ms_debounce(func) {
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
    the ms_debounce helps it not resize everytime it moves. it waits 500ms on the change.
    */
    window.addEventListener('resize', ms_debounce(playMarquee))
  }

  window.addEventListener('load', function (event) {
    init()
  })
}

if (document.body.classList.contains('example_13')) {
  example_13()
}

export default example_13
