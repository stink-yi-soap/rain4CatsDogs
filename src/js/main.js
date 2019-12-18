let catsDogs = [];
var acceleration = 0.0098;
var nDrops = 1000;
var drops = [];

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
import p5 from 'p5';


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

let s = (sk) => {    

    sk.preload = () =>{
        for (let n = 0; n < 12; n++) {
            catsDogs[n] = sk.loadImage('./assets/' + n + '.png');
        }
    }

    sk.setup = () =>{
        sk.createCanvas(window.innerWidth,window.innerHeight);
        for (let i = 0; i < nDrops; i++) {
            drops.push(new Drop());
        }
    }

    sk.draw = () =>{
        sk.clear();
        sk.stroke(198,205,209);
        if (rainStat == true) {
            sk.stroke(220,224,222)            ;
    
            for (let n = 0; n < 12; n++) {
                sk.image(catsDogs[n], sk.random(0, sk.windowWidth), sk.random(-40, 900));
            }
        }
        drops.forEach(function(d) {
          d.drawAndDrop();
        });
    }

    function Drop() {
      this.initX = function() {
        this.x = sk.random() * sk.width;
      };
      this.initY = function() {
        this.y = -sk.random() * sk.height / 3; 
      };
    
      this.initX();
      this.y = sk.random() * sk.height;
    
      this.length = sk.random() * 10;
      this.speed = sk.random();
    
      this.drawAndDrop = function() {
        this.draw();
        this.drop();
      };
    
      this.draw = function() {
        sk.line(this.x, this.y, this.x, this.y + this.length);
      };
    
      this.drop = function() {
        if (this.y < sk.height) {
          this.y += this.speed;
          this.speed += acceleration;
        } else {
          this.speed = sk.random();
          this.initY();
          this.initX();
        }
      };
    }

}

const P5 = new p5(s);






