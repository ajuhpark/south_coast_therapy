/** 
 * sj_home_flip_icon
 */

// Register ALL plugins
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);
gsap.registerPlugin(Flip);
gsap.registerPlugin(ScrollSmoother);

function sj_home_flip_icon() {
  console.log("sj_home_flip_icon.js is working");
  
  // Store references to elements and their original parents
  let originalElements = new Map();
  
  // Store ScrollTrigger instances
  let scrollTriggers = {
    flipIconGroup: null
  };
  
  function init() {
    console.log("sj_home_flip_icon init function running");
    initFlipIconAnimation();
    watchIconGroupMovement();
  }

  function initFlipIconAnimation() {
    let iconGroup = document.querySelector("#sj_banner_icon_group");
    let targetContainer = document.querySelector("#sj_target_container_icon_group_contact_section");
    let originalParent = document.querySelector(".sj_banner_1_icon_group_origin");
  
    if (!iconGroup || !targetContainer || !originalParent) {
      console.log("Missing required elements for flip animation:", {
        iconGroup: !!iconGroup,
        targetContainer: !!targetContainer,
        originalParent: !!originalParent
      });
      return;
    }
  
    // Save original parent (only once)
    if (!originalElements.has(iconGroup)) {
      originalElements.set(iconGroup, originalParent);
    }
  
    // Capture initial state
    const initialState = Flip.getState(iconGroup);
  
    // Move the icon group to the target container only once.
    // This is the "final state" for the FLIP calculation.
    targetContainer.appendChild(iconGroup);
  
    // Create the Flip tween (paused, since we are going to update its progress manually)
    let flipTween = Flip.from(initialState, {
      absolute: true,
      ease: "none",
      duration: 1,
      paused: true  // Manually control progress via ScrollTrigger
    });
  
    // Create the ScrollTrigger that will update the tween's progress.
    let st = ScrollTrigger.create({
      trigger: document.querySelector(".small_joys_home") || document.body,
      start: "top 0%",
      end: "bottom 100%",
      scrub: true,  // This scrub connects the scroll position to the tween.
      // markers: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        flipTween.progress(self.progress);
        console.log("📈 Flip progress:", self.progress.toFixed(3));
      }
    });
  
    // Save the ScrollTrigger instance for potential later cleanup.
    scrollTriggers.flipIconGroup = st;

    console.log("🎬 Initializing Flip Icon Animation");
  }

  function watchIconGroupMovement() {
    const iconGroup = document.querySelector("#sj_banner_icon_group");
    if (!iconGroup) return;
  
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node === iconGroup) {
              console.log("🟥 Icon group added to:", mutation.target);
            }
          });
          mutation.removedNodes.forEach((node) => {
            if (node === iconGroup) {
              console.log("🟦 Icon group removed from:", mutation.target);
            }
          });
        }
      });
    });
  
    // Observe both possible parents
    const parent1 = document.querySelector(".sj_banner_1_icon_group_origin");
    const parent2 = document.querySelector("#sj_target_container_icon_group_contact_section");
    
    [parent1, parent2].forEach(parent => {
      if (parent) {
        observer.observe(parent, { childList: true });
      }
    });
  
    console.log("👁️ Watching icon group parent changes");
  }
  
  // Kill only specific animations and reset specific elements
  function killFlipIconAnimation() {
    console.log("💀 Killing Flip Icon Animation");

    // Kill ScrollTrigger
    if (scrollTriggers.flipIconGroup) {
      scrollTriggers.flipIconGroup.kill();
      scrollTriggers.flipIconGroup = null;
    }
    
    // Reset element to original position
    let sj_banner_1_icon_group_1 = document.querySelector("#sj_banner_icon_group");
    if (sj_banner_1_icon_group_1 && originalElements.has(sj_banner_1_icon_group_1)) {
      const originalParent = originalElements.get(sj_banner_1_icon_group_1);
      if (originalParent && sj_banner_1_icon_group_1.parentElement !== originalParent) {
        originalParent.appendChild(sj_banner_1_icon_group_1);
        gsap.set(sj_banner_1_icon_group_1, { clearProps: "all" });
      }
    }
    
    // Reinitialize
    setTimeout(() => {
      initFlipIconAnimation();
    }, 50);
  }

  // This function only kills and resets the flip icon animation
  function resetFlipIconOnly() {
    killFlipIconAnimation();
  }

  // Debounce function for resize events
  function debounce(func) {
    var timer;
    return function(event) {
      if(timer) clearTimeout(timer);
      timer = setTimeout(func, 300, event);
    }
  }

  // Handle resize - only reset the flip icon animation
  window.addEventListener("resize", debounce(function(e) {
    console.log("end of resizing - resetting flip icon only");
    resetFlipIconOnly();
  }));

  window.addEventListener("scroll", debounce(function () {
    const iconGroup = document.querySelector("#sj_banner_icon_group");
    const originalParent = originalElements.get(iconGroup);
    
    if (window.scrollY <= 10 && iconGroup && originalParent && iconGroup.parentElement === originalParent && !scrollTriggers.flipIconGroup) {
      console.log("🔁 Reinitializing flip animation from scroll event");
      initFlipIconAnimation();
    }
  }));
  
  // Make functions available globally for debugging
  window.killFlipIconAnimation = killFlipIconAnimation;
  window.resetFlipIconOnly = resetFlipIconOnly;
  window.reInitFlipAnimation = initFlipIconAnimation; // Add for manual re-init if needed
  
  // Initialize immediately
  init();
  
  // Return an object with public methods
  return {
    init,
    killFlipIconAnimation,
    resetFlipIconOnly
  };
}

// Only initialize if we're on the correct page
// This allows the module to be imported without automatically running
function initFlipIfOnHomePage() {
  if (document.body.classList.contains("small_joys_home")) {
    return sj_home_flip_icon();
  }
  return null;
}

export default initFlipIfOnHomePage;