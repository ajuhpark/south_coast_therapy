import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

/** Pagination Exercise */

gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)


function example_18() {
  console.log('example_18.js is working')

  function init() {
    console.log('example_18 init function is working')
    gsap.from('html', { duration: 0, autoAlpha: 0 }, 
      // 'fut_hover'
    )


    
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

// if (document.body.classList.contains('example_18')) {
  example_18();
// }

// export default example_18
