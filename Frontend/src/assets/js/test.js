"use strict";
console.log("holi");
console.log("cacaca");

function randomNumber(min, max) { 
    return Math.random() * (max - min) + min;
}

window.onload = function() {
    var audio = new Audio('sonidos/amogus.ogg');
    audio.setAttribute('loop', 'loop');
    audio.play();
}