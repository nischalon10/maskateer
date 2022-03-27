let classifier;
let video;
let imageModel = 'https://teachablemachine.withgoogle.com/models/mhyGtGcss/'
let flippedVideo;
let label = "";
let count = 0;
let font;
let bbox;

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
  document.getElementById("callout").innerHTML = label;
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
  // var imgLink = window.prompt("Image URL:");
  var imgLink = 'https://bullsconnect.usf.edu/downloads/screenshots/27CC99954D2F23F6DD98AF4777ECF9.jpg';
  document.getElementById("image").setAttribute('src',imgLink);  
}