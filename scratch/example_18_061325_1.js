import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

/** Pagination Exercise 
 * splittext removed.
*/

gsap.registerPlugin(SplitText)
gsap.registerPlugin(GSDevTools)


function example_18() {
  console.log('example_18.js is working')

  function init() {
    console.log('example_18 init function is working')
    
    // TEST 1: Check if GSAP exists
    console.log('=== GSAP AVAILABILITY TEST ===')
    console.log('typeof gsap:', typeof gsap)
    console.log('gsap object:', gsap)
    
    if (typeof gsap === 'undefined') {
      console.error('❌ GSAP is completely undefined!')
      return
    }
    
    // TEST 2: Check GSAP properties
    console.log('=== GSAP PROPERTIES TEST ===')
    console.log('gsap.version:', gsap.version)
    console.log('gsap.from exists:', typeof gsap.from === 'function')
    console.log('gsap.to exists:', typeof gsap.to === 'function')
    console.log('gsap.set exists:', typeof gsap.set === 'function')
    console.log('gsap.timeline exists:', typeof gsap.timeline === 'function')
    
    // TEST 3: Try the simplest possible GSAP animation
    console.log('=== BASIC GSAP TEST ===')
    try {
      console.log('Attempting gsap.set test...')
      gsap.set('html', { opacity: 1 })
      console.log('✅ gsap.set worked!')
    } catch (error) {
      console.error('❌ gsap.set failed:', error)
      return
    }
    
    // TEST 4: Try the original tween with more logging
    console.log('=== ORIGINAL TWEEN TEST ===')
    try {
      console.log('HTML element before tween:', document.querySelector('html'))
      console.log('HTML computed style before:', window.getComputedStyle(document.querySelector('html')).visibility)
      
      const tween = gsap.from('html', { 
        duration: 0, 
        autoAlpha: 0,
        onComplete: () => console.log('✅ Tween completed!'),
        onStart: () => console.log('✅ Tween started!'),
        onUpdate: () => console.log('Tween updating...')
      })
      
      console.log('✅ gsap.from created, tween object:', tween)
      console.log('HTML computed style after:', window.getComputedStyle(document.querySelector('html')).visibility)
      
    } catch (error) {
      console.error('❌ gsap.from failed:', error)
      console.error('Error details:', error.message)
      console.error('Error stack:', error.stack)
      return
    }
    
    // TEST 5: Try a different element
    console.log('=== ALTERNATIVE ELEMENT TEST ===')
    try {
      // Create a test div
      const testDiv = document.createElement('div')
      testDiv.id = 'gsap-test'
      testDiv.style.width = '100px'
      testDiv.style.height = '100px'
      testDiv.style.backgroundColor = 'red'
      testDiv.style.position = 'fixed'
      testDiv.style.top = '10px'
      testDiv.style.left = '10px'
      testDiv.style.zIndex = '9999'
      document.body.appendChild(testDiv)
      
      console.log('Test div created:', testDiv)
      
      // Try animating the test div
      gsap.from('#gsap-test', {
        duration: 2,
        x: 200,
        rotation: 360,
        autoAlpha: 0,
        onComplete: () => {
          console.log('✅ Test div animation completed!')
          // Remove test div after animation
          setTimeout(() => {
            if (testDiv.parentNode) {
              testDiv.parentNode.removeChild(testDiv)
            }
          }, 1000)
        }
      })
      
      console.log('✅ Test div animation started')
      
    } catch (error) {
      console.error('❌ Test div animation failed:', error)
    }
    
    // TEST 6: Check for conflicting CSS or other issues
    console.log('=== ENVIRONMENT CHECK ===')
    console.log('Document ready state:', document.readyState)
    console.log('Window loaded:', document.readyState === 'complete')
    console.log('HTML element:', document.documentElement)
    console.log('Body element:', document.body)
    
    // Check for any CSS that might be interfering
    const htmlStyles = window.getComputedStyle(document.documentElement)
    console.log('HTML element styles:')
    console.log('- visibility:', htmlStyles.visibility)
    console.log('- opacity:', htmlStyles.opacity)
    console.log('- display:', htmlStyles.display)
    console.log('- transform:', htmlStyles.transform)
    
    // TEST 7: Check if there are any global errors
    window.addEventListener('error', (e) => {
      console.error('Global error detected:', e.error)
    })
    
    console.log('=== ALL TESTS COMPLETED ===')
    console.log('If you see a red square animating in the top-left corner, GSAP is working!')
  }

  window.addEventListener("load", function(event) { 
    console.log('Window load event fired')
    init()
  })
}

// Execute immediately
example_18()
