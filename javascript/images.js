/*
 * Author:  Rick Bosch
 * email:   xpc.dev@gmail.com
 */

// ###
// # CONTENT

// Image locations
var myImage = document.getElementById('mainImage');
var ninjaURL = 'http://fc05.deviantart.net/fs70/i/2011/038/5/7/chibi_ninja___ink___tone_by_xpcoffee-d3902et.jpg';

// Original setup
myImage.style.display = 'none';
myImage.src = ninjaURL;

// ###
// # FUNTIONS

// Dynamic
function showNinja() {
    if('none' === myImage.style.display) {
        myImage.style.display = 'block';
    } else {
        myImage.style.display = 'none';
    }
}