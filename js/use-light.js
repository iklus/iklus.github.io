AFRAME.registerComponent('use-light', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'}
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    var arrayPos = 0;
    var intensityArray = ['0', '0.3', '0.6', '0.9'];

    el.addEventListener(data.on, function () {
      data.target.setAttribute('light', 'intensity', intensityArray[arrayPos]);
      if (arrayPos === 3) {
        arrayPos = 0;
      } else {
        arrayPos++;
      }
    });
  }
});