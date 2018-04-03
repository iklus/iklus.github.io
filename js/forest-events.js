var all = document.querySelectorAll('a-entity');
for (var i = 0; i < all.length; i++) {
  if (all[i].object3D) {
    all[i].object3D.frustumCulled = false;
  }
}

var buttons = document.querySelectorAll('.button');

var labels = [
  ".wood",
  ".tree",
  ".stone",
  ".flower",
  ".mushroom",
  ".bush",
  ".stump"
];
console.log(buttons);
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("hitstart", (function() {
    var isOn = true;
    var label = labels[i];
    var b = buttons[i];
    return function() {
      if (b.parentEl.getAttribute("visible")) {
        var objs = document.querySelectorAll(label);
        for (var j = 0; j < objs.length; j++) {
          objs[j].setAttribute("visible", !isOn);
        }
        isOn = !isOn;
      }
    };
  })());
}
