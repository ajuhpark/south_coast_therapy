import '../src/styles/style.css'
import { gsap } from 'gsap'
// import { SplitText } from 'gsap/SplitText'

// Button Hover Effect

import example_17 from './example_17'


gsap.registerPlugin(SplitText)

function example_4() {
  console.log('example_4.js is working')

  function init() {
    console.log('example_4 init function is working')

    gsap.from("html", {duration: 0, autoAlpha:0})

    document.body.style.cursor = "none";

    var cursor = document.createElement("div");
    cursor.classList.add("cursor");
    document.body.appendChild(cursor);

    var follow = document.createElement("div");
    follow.classList.add("follow");
    document.body.appendChild(follow);

    function move(obj, event) {
        obj.style = "";
        obj.style.top = event.clientY + "px";
        obj.style.left = event.clientX + "px";
    }

    if (cursor) {
        window.addEventListener("mousemove", function(event) {
            var e = event;
            var t = e.target;
            var f = follow;
            var c = cursor;

            if (t.tagName == "A") {
                c.style.backgroundColor = "transparent";

                f.style.top = t.offsetTop + "px";
                f.style.left = t.offsetLeft + "px";
                f.style.width = t.clientWidth + "px";
                f.style.height = t.clientHeight + "px";

                f.classList.add("on-focus");
            } else {
                move(c, e);
                move(f, e);
                f.classList.remove("on-focus");
            }
        });
    }
  }

  window.addEventListener("load", function(event) { 
    init(); 
  });
}

if (document.body.classList.contains('example_4')) {
  example_4();
}

export default example_4
