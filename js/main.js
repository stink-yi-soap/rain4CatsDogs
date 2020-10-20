let catsDogs = [];
let acceleration = 0.0098;
let nDrops = 500;
let drops = [];

let button = document.getElementById('getData');
let form = document.getElementById('cityForm');
form.style.display = "none";    
form.addEventListener("submit", getData);
button.addEventListener("click", apiReq);

let blurb = document.getElementById('blurb');
let header = document.getElementById('ttl');
header.style.display = "none";
blurb.addEventListener("click", showHeader);
header.addEventListener("click", showForm);


import {apiReq, rainStat} from './api.js';


// get geolocation of user

let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  let crd = pos.coords;

  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);


//DOM animation

function showHeader() {
    if (header.style.display === "none") {
      header.style.display = "block";
      blurb.style.display = "none";
    } 
}
  
function showForm() {
    if (form.style.display === "none") {
      form.style.display = "block";
      header.style.display = "none";
    } 
}  

// p5 animation
// rain code from: https://codepen.io/shtrom/pen/NpxJWy

window.preload = function () {
  for (let n = 0; n < 12; n++) {
    catsDogs[n] = loadImage('./assets/' + n + '.png');
  }
}

window.setup = function () {
  createCanvas(window.innerWidth,window.innerHeight);
  for (let i = 0; i < nDrops; i++) {
    drops.push(new Drop());
  }
}

window.draw = function () {
  clear();
  stroke(198,205,209);
  if (rainStat == true) {      
    for (let n = 0; n < 12; n++) {
      image(catsDogs[n], random(0, width), random(-40, 900));
    }
  }
  drops.forEach(function(d) {
    d.drawAndDrop();
  });
}

function Drop() {
  this.initX = function() {
    this.x = random() * width;
  };
  this.initY = function() {
    this.y = -random() * height / 3; 
  };

  this.initX();
  this.y = random() * height;

  this.length = random() * 10;
  this.speed = random();

  this.drawAndDrop = function() {
    this.draw();
    this.drop();
  };

  this.draw = function() {
    line(this.x, this.y, this.x, this.y + this.length);
  };

  this.drop = function() {
    if (this.y < height) {
      this.y += this.speed;
      this.speed += acceleration;
    } else {
      this.speed = random();
      this.initY();
      this.initX();
    }
  };
}
