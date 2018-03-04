/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('headband', {
  schema: {
    side: {type: 'string', default: 'bottom'},
    mode: {type: 'string', default: 'desktop'},
    prefix: {type: 'string', default: 'hb'},
    primitive: {type: 'string', default: 'plane'},
    widthProperty: {type:'string', default: 'width'},  // Change what property scales with window width
    heightProperty: {type:'string', default: 'height'},  // Change what property scales with window height
    heightMultiplier: {type: 'float', default: 2},
    away: {type: 'float', default: 0.01},
    sections: {type: 'int', default: 4},
    marginPercent: {type: 'float', default: 0.05},
    breakpoint: {type: 'int', default: 480},
    //disableMobile: {type: 'bool', default: false},
    //disableDesktop: {type: 'bool', default: false},
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    // Constaints
    this.RATIO = 0.839;
    this.VR = "false";
    this.classNames = {
      hb2dMenuName: data.prefix + "-2d-menu",
      hb2dTitlename: data.prefix + "-2d-title"
    }

    
    // Variables
    this.runningResize = false;
    //el.addEventListener("loaded", function () { el.components.headband.resizeMenu() });
    window.addEventListener("resize", function () { el.components.headband.resizeMenu() });
  },

  update: function () {
    var data = this.data;
    var el = this.el;

    if (data.side === "bottom") {
      this.sideMultiplier = -1;
    } else if (data.side === "top") {
      this.sideMultiplier = 1;
    } else {
      console.error("Incorrect side entered");
    }

    data.menuHeight = (data.away/10)*data.heightMultiplier;
    var down = this.sideMultiplier*(data.away*this.RATIO-data.menuHeight/2);

    el.setAttribute("position", "0 " + down + " " + (-1*data.away));
    el.setAttribute("geometry", "primitive:"+data.primitive+";");
    el.setAttribute("geometry", data.heightProperty+":"+data.menuHeight+";"+data.widthProperty+":1;");
    
    this.resizeMenu();
  },

  resizeMenu: function () {
    var data = this.data;
    var el = this.el;

    
    console.log("Running: " + this.runningResize);

    if (this.runningResize) {
      return;
      console.error("Bad");
    } else {
      this.runningResize = true;
    }

    console.log("Window Width: " + window.innerWidth);

    if (data.disableMobile) {
      this.resizeDesktop();
    } else if (data.disableDesktop) {
      this.resizeMobile();
    } else {
      if (window.innerWidth < data.breakpoint) {
        this.resizeMobile();
      } else {
        this.resizeDesktop();
      }
    }
    
    /*
    if (this.VR) {
      console.log("Entering the virtual world.")
      // THIS IS WHERE VR STUFF WILL GO
    } else {
      if (window.innerWidth < data.breakpoint) {
        // Now in mobile width
        if (this.mode === "desktop") {
          // If coming from desktop width to mobile width call switch
          this.switchToMobile();
        }
        this.mode = "mobile";
        this.resizeMobile();
      } else {
        // Now in desktop width
        if (this.mode === "mobile") {
          // If coming from mobile width to desktop width call switch
          this.switchToDesktop();
        }
        this.mode = "desktop";
        this.resizeDesktop();
      }
    }
    */

    this.runningResize = false;
  },


  resizeDesktop: function () {
    var data = this.data;
    var el = this.el;

    console.log("resizeDesktop_new");

    var newWidth = (2 * window.innerWidth * (data.away * this.RATIO)) / window.innerHeight;
    var sectionWidth = newWidth - ((data.sections + 1) * data.marginPercent) / data.sections;
    var marginWidth = data.marginPercent * (newWidth / 2);
    var marginHeight = data.marginPercent * data.menuHeight;

    var hbArray = document.getElementsByClassName(this.classNames.hb2dMenuName);
    if (!hbArray) {
      console.error("There are no elements with class name: " + this.classNames.hb2dMenuName);
      return;
    } 
    //console.log(hbArray);

    var middlePoints = [];

    for (let i = 0; i < data.sections; i++) {
      var menuPoint = (newWidth/data.sections)*(i+1) - newWidth/(2*data.sections) - newWidth/2;
      //middlePoints.push((newWidth/data.sections)*(i+1) - newWidth/(2*data.sections) - newWidth/2);

      console.log("hasLoaded: " + hbArray[i].hasLoaded);
      if (hbArray[i].hasLoaded) {
        var tempPos = hbArray[i].getAttribute('position');
        tempPos.x = menuPoint;
        hbArray[i].setAttribute("position", tempPos);
        //AFRAME.utils.entity.setComponentProperty(hbArray[i], 'position.x', menuPoint);
      } else {
        console.warn("An 2d menu element hasn't loaded yet");
      }
      
      //tempEl[0].components.position.attrValue.x = middlePoints[i-1];
    }

    //console.log('Middle Points: ' + middlePoints);

    el.setAttribute('geometry', { width: newWidth });
    
  },


  switchToDesktop: function () {
    var data = this.data;
    var el = this.el;

    console.log("switchToDesktop");

    

    
    
  },
  

  resizeMobile: function () {
    var data = this.data;
    var el = this.el;

    console.log("resizeMobile");
    



  },





  switchToMobile: function () {
    var data = this.data;
    var el = this.el;

    console.log("switchToMobile");
    



  },

});
