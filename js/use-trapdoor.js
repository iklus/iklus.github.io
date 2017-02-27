// Opens and closes the Trapdoor

AFRAME.registerComponent('use-trapdoor', {
  schema: {
    on: {type: 'string'}
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    var openFlag = false;

    el.addEventListener(data.on, function () {
      if (openFlag) {
         el.emit('closeTrapdoor');
          openFlag = false;
      } else {
          el.emit('openTrapdoor');
          openFlag = true;
      }
    });
  }
});