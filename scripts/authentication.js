/*
 * Author: 	Rick Bosch
 * email: 	xpc.dev@gmail.com 
 */

// ###
// # CONTENT 

var myButton = document.querySelector('#changeUserButton');
var myHeading = document.querySelector('#greetHeader');

// Check if there is a returning user
if(!localStorage.getItem('name')) {
	setUserName();
} else {
	var storedName = localStorage.getItem('name');
	myHeading.innerHTML = 'Hello, ' + storedName + '. Welcome back!';
	myButton.innerHTML = 'But I\'m not ' + storedName + '!';
}


// ###
// # EVENTS 

myButton.onclick = function() {
	setUserName();
}


// ###
// # FUNTIONS 

/*
 * Prompts user for a username.
 */
function setUserName() {
	var myName = prompt('Please enter your name.');
	localStorage.setItem('name', myName);
	myHeading.innerHTML = 'Hello, ' + myName + '. Welcome!';
}