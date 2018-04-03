AFRAME.registerComponent('headband-menu', {
  init: function() {
    menuElement = this.el;
    var t = this;

    var hands = document.querySelectorAll("[hand-controls]");
    for (var i = 0; i < hands.length; i++) {
      hands[i].addEventListener("gripdown", function() { t.setPos(); });
    }

    var player = document.querySelector("#player");

    this.switches = menuElement.getElementsByClassName('switch');
    this.panels = menuElement.getElementsByClassName('panel');

    this.first = true;
  },

  play: function() {
    this.addListeners();
  },

  pause: function() {
    this.removeListeners();
  },

  addListeners: function() {
    var t = this;
    for (var i = 0; i < this.switches.length; i++) {
      var x = i;
      this.switches[i].addEventListener("hitstart", (function() {
        var x = i;
        return function () { t.changePanel(x); }
      })());
    }
  },



  removeListeners: function() {
    for (var i = 0; i < this.switches.length; i++) {
      this.switches[i].removeEventListener("hitstart");
    }
  },

  changePanel: function(i) {
    console.log(i);
    console.log(this.panels);
    for (var j = 0; j < this.panels.length; j++) {
      this.panels[j].setAttribute("visible", false);
    }

    this.panels[i].setAttribute("visible", true);
  },


  setPos: function() {
    console.log("set pos");
    var mainCamera = document.querySelector("#mainCamera").object3D;
    var camDir = mainCamera.getWorldDirection();
    var camRot = mainCamera.rotation;

    var yRot = camRot.y * (180 / Math.PI);
    var camPos = mainCamera.position;
    this.el.setAttribute('rotation', {x: 0, y: yRot, z: 0})
    this.el.setAttribute('visible', true);

    // 1.1
    var d = -0.2
    this.el.setAttribute('position', {x: d * camDir.x + camPos.x, y: -0.35 + camPos.y, z: d * camDir.z + camPos.z });
  }

});
