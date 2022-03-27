let classifier;
let video;
let imageModel = 'https://teachablemachine.withgoogle.com/models/58uKOiqW3/'
let flippedVideo;
let label = "";
let count = 0;
let font;

function preload(){
  classifier = ml5.imageClassifier(imageModel + 'model.json');
  font = loadFont('./assets/Regular.otf');
}

function setup() {
  let cnv = createCanvas(windowWidth/3, windowHeight / 2); // creates a preview window
  cnv.parent('myContainer');
  video = createCapture(VIDEO); // accesses my laptops camera
  video.size((windowWidth/3),(windowHeight / 2)); // dimensions of the video window
  video.hide(); // hides the dual camera if the device has one
  video.center();
  flippedVideo = ml5.flipImage(video);
  classifyVideo();
}

function draw() {
  background(500);
  image(flippedVideo, 0, 0); // flips the video preview
  document.getElementById("callout-box").innerHTML = label;
  if (label=='Class 1'){document.getElementById("callout-box").setAttribute('class',"alert alert-success")}
}
function classifyVideo(){
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo,gotResult);
  flippedVideo.remove()
}
function gotResult(error,results){
  if(error){
    console.error(error)
    return;
  } 
  label = results[0].label;
  classifyVideo();
}

function getImage(){
  var imgLink = window.prompt("Image URL:");
  if (imgLink == ''){
    imgLink = 'https://i.postimg.cc/XYnyWzCT/qrcode.png';
  }
  document.getElementById("image").setAttribute('src',imgLink);  
}