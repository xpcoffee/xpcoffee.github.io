/*
 * Author: 	Rick Bosch
 * email: 	xpc.dev@gmail.com 
 */

// 	--------
//	CONTENT 
// 	--------
var userBanner = document.querySelector('#userBanner');

// Check if there is a returning user
if(!localStorage.getItem('name')) {
	setUserName();
} else {
	var storedName = localStorage.getItem('name');
	userBanner.innerHTML = 'Hey, ' + storedName + '!';
}

// 	--------
//	FUNCTIONS 
// 	--------
/*
 * Prompts user for a username.
 */
function setUserName() {
	var myName = prompt('Please enter your name.');
	var greeter;
	if(myName) {
		localStorage.setItem('name', myName);
		greeter = 'Hi, ' + myName + '!';
	} else {
		greeter = 'Welcome, guest!';
	}
	userBanner.innerHTML = greeter;
}