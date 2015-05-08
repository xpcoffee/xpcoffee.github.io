/*
 * Author: 	Rick Bosch
 * email: 	xpc.dev@gmail.com 
 */

// ###
// # CONTENT 

// Image locations
var myImage = document.getElementById('mainImage');
var xpcoffeeURL = 'http://fc03.deviantart.net/fs71/i/2014/094/1/6/logo_april_2014_by_xpcoffee-d7czcrx.png';
var ninjaURL = 'http://fc05.deviantart.net/fs70/i/2011/038/5/7/chibi_ninja___ink___tone_by_xpcoffee-d3902et.jpg';

// Original setup
myImage.setAttribute('src', xpcoffeeURL);


// ###
// # FUNTIONS 

// Dynamic
myImage.onclick = function() {
	var mySrc = myImage.getAttribute('src');
	if(mySrc === xpcoffeeURL) {
		myImage.setAttribute('src', ninjaURL);
	} else {
		myImage.setAttribute('src', xpcoffeeURL);
	}
}