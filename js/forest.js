// This script builds the back ground VR forest 
var models = [
  '<a-entity obj-model="obj: #f3-obj; mtl: #f3-mtl" position="0 0.44 0" rotation="0 180 0" scale="5 5 5"></a-entity>',
  '<a-entity obj-model="obj: #f4-obj; mtl: #f4-mtl" position="0 0.2 0" rotation="0 180 0" scale="5 5 5"></a-entity>',
  '<a-entity obj-model="obj: #f6-obj; mtl: #f6-mtl" position="0 0.19 0" rotation="0 180 0" scale="5 5 5"></a-entity>',
  '<a-entity obj-model="obj: #f7-obj; mtl: #f7-mtl" position="0 0.24 0" rotation="0 180 0" scale="5 5 5"></a-entity>',
]
var treeModels = [
  '<a-entity obj-model="obj: #f1-obj; mtl: #f1-mtl" position="0 0.4 0" rotation="0 180 0" scale="5 5 5"></a-entity>',
  '<a-entity obj-model="obj: #f2-obj; mtl: #f2-mtl" position="0 1.18 0" rotation="0 180 0" scale="5 5 5"></a-entity>',
  '<a-entity obj-model="obj: #f5-obj; mtl: #f5-mtl" position="0 0.73 0" rotation="0 180 0" scale="5 5 5"></a-entity>',
  '<a-entity obj-model="obj: #f8-obj; mtl: #f8-mtl" position="0 0.77 0" rotation="0 180 0" scale="5 5 5"></a-entity>'
]
var treeFrequency = 2;
for (i=0; i<treeFrequency; i++) { models = models.concat(treeModels); }
// First index of each array is radius length
var inCircleAngles = [2.5, 0, 45, 90, 135, 180, 225, 270, 315];
var outCircleAngles = [4.5, 10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350];
var forestHTML = '';
var forestElement = document.getElementById('forest');
var degreesToHTML = function (angleArray) {
  var inHTML = '';
  var l = angleArray[0];
  for (i=1; i<angleArray.length; i++) {
    var x = l * Math.cos(angleArray[i] * (Math.PI / 180))
    var z = l * Math.sin(angleArray[i] * (Math.PI / 180))
    inHTML += '<a-entity position="' + x + ' 0 ' + z + '" rotation="0 ' + Math.floor(Math.random() * 360) + ' 0">';
    var randomNum = Math.floor(Math.random() * models.length);
    inHTML += models[randomNum];
    inHTML += '</a-entity>';
  }
  return inHTML;
}
forestElement.innerHTML = degreesToHTML(inCircleAngles) + degreesToHTML(outCircleAngles);


// Function to move the VR backgound to the front and pause rotation
var vrToFront = function() {
  var aframe = $(".aframe");
  aframe.css( "zIndex", "10" );
  $("a-scene").get(0).setAttribute("embedded", false);
  $("#forest").get(0).emit("pauseAnim");
  $("#ambientLight").get(0).setAttribute('light', {intensity: 0.8});
  $("#return_button").css("display", "inline");
}


// Function to move the VR backgound to the front and pause rotation
var vrToBack = function() {
  var aframe = $(".aframe");
  aframe.css( "zIndex", "-100" );
  $("a-scene").get(0).setAttribute("embedded", true);
  $("#forest").get(0).emit("resumeAnim");
  $("#ambientLight").get(0).setAttribute('light', {intensity: 0.2});
  $("#return_button").css("display", "none");
}