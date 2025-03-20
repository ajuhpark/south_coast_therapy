import '../src/styles/style.css'
import { gsap } from 'gsap'

function color_mode_toggle() {
  console.log('color_mode_toggle.js is working')
  
  // Try to run the initialization immediately
  initColorToggle();
  
  // Also try with a slight delay as a fallback
  setTimeout(initColorToggle, 100);
  
  // Also try with DOMContentLoaded as originally intended
  document.addEventListener('DOMContentLoaded', initColorToggle);
}

function initColorToggle() {
  // Only run once
  if (window.colorToggleInitialized) return;
  window.colorToggleInitialized = true;
  
  console.log("Initializing color toggle");
  
  // Define all available color sets - add more as needed
  const colorSets = [
    { button: 'sjs_button_color_set_1', class: 'sjs_color_set_1' },
    { button: 'sjs_button_color_set_2', class: 'sjs_color_set_2' },
    { button: 'sjs_button_color_set_3', class: 'sjs_color_set_3' },
    { button: 'sjs_button_color_set_4', class: 'sjs_color_set_4' }
  ];
  
  // Animation duration and ease
  const colorModeDuration = 3;
  const colorModeEase = "power1.out";
  
  // Root element for CSS variable manipulation
  const htmlElement = document.documentElement;
  const body = document.querySelector('.sjs_body');
  
  if (!body) {
    console.error("Body element with class .sjs_body not found");
    return;
  }
  
  // Get all color set buttons
  const buttons = {};
  colorSets.forEach(set => {
    const button = document.querySelector(`.${set.button}`);
    if (button) {
      buttons[set.class] = {
        element: button,
        buttonClass: set.button
      };
      console.log(`Found button for ${set.class}:`, button);
    } else {
      console.warn(`Button for ${set.class} not found`);
    }
  });
  
  // Check if we have at least one button
  if (Object.keys(buttons).length === 0) {
    console.error("No color set buttons found");
    return;
  }
  
  // Store color values for each set
  const colorSetValues = {};
  
  // Function to extract CSS variables for a color set
  function extractColorSetVariables(colorSetClass) {
    // Create a temporary element to extract computed styles
    const tempDiv = document.createElement('div');
    tempDiv.classList.add('sjs_body', colorSetClass);
    // tempDiv.style.display = 'none';
    document.body.appendChild(tempDiv);
    
    const computedStyle = getComputedStyle(tempDiv);
    const cssVars = {};
    
    // Extract all CSS variables
    for (let i = 0; i < computedStyle.length; i++) {
      const prop = computedStyle[i];
      if (prop.startsWith('--')) {
        cssVars[prop] = computedStyle.getPropertyValue(prop).trim();
      }
    }
    
    document.body.removeChild(tempDiv);
    return cssVars;
  }
  
  // Extract color values for each set
  colorSets.forEach(set => {
    colorSetValues[set.class] = extractColorSetVariables(set.class);
    console.log(`Extracted variables for ${set.class}`);
  });
  
  // Function to apply color set with GSAP animation
  function applyColorSet(activeColorSet, animate = false) {
    gsap.killTweensOf(htmlElement); // Prevent overlapping animations
    
    if (!colorSetValues[activeColorSet]) {
      console.error(`Color set values for ${activeColorSet} not found`);
      return;
    }
    
    // Remove active class from all buttons
    Object.values(buttons).forEach(buttonData => {
      buttonData.element.classList.remove('active');
    });
    
    // Add active class to button
    if (buttons[activeColorSet]) {
      buttons[activeColorSet].element.classList.add('active');
    }
    
    // Get color variables for this set
    const colorObject = colorSetValues[activeColorSet];
    
    // Apply the colors with or without animation
    if (animate && gsap) {
      console.log('gsap is working on color toggle')
      gsap.to(htmlElement, {
        duration: colorModeDuration,
        ease: colorModeEase,
        overwrite: "auto",
        ...colorObject,
        onUpdate: () => {
          // Force CSS variable update
          Object.entries(colorObject).forEach(([varName, value]) => {
            htmlElement.style.setProperty(varName, value);
          });
        }
      });
    } else {
      console.log('gsap is working on color toggle')
      Object.entries(colorObject).forEach(([variable, value]) => {
        htmlElement.style.setProperty(variable, value);
      });
    }
    
    // Update the body class for compatibility
    const allColorClasses = colorSets.map(set => set.class);
    allColorClasses.forEach(colorClass => {
      body.classList.remove(colorClass);
    });
    body.classList.add(activeColorSet);
    
    // Save to localStorage
    localStorage.setItem('sjs-color-scheme', activeColorSet);
    
    console.log(`Applied color set ${activeColorSet}`);
  }
  
  // Check if there's a saved preference in localStorage
  const savedColorSet = localStorage.getItem('sjs-color-scheme') || 'sjs_color_set_1';
  console.log("Saved color set:", savedColorSet);
  
  // Apply saved color set on load without animation
  applyColorSet(savedColorSet, false);
  
  // Set up event listeners for all buttons
  Object.entries(buttons).forEach(([colorClass, buttonData]) => {
    buttonData.element.addEventListener('click', function(e) {
      e.preventDefault();
      console.log(`${buttonData.buttonClass} button clicked, applying ${colorClass}`);
      applyColorSet(colorClass, true);
    });
  });
}

// Call the function
color_mode_toggle()

export default color_mode_toggle