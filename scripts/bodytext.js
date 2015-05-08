/*
 * Author: 	Rick Bosch
 * email: 	xpc.dev@gmail.com 
 */

// ###
// # CONTENT 

// Welcome to people visiting
myHeading = document.getElementById('mainHeader');
myHeading.innerHTML = 'First Website';

myHeading = document.getElementById('greetHeader');
myHeading.innerHTML = 'Hello World!';

welcomeBlurb = document.getElementById('welcomeBlurb');
welcomeBlurb.innerHTML = 'Welcome to my personal site.<br>'
+ 'If you\'re not me, I\'m not entirely sure what you\'re expecting to get out of this... bey <i>hey!</i> Welcome!';

// Description of site
descBlurb = document.getElementById('descBlurb');
descBlurb.innerHTML = "<strong>What is this?</strong><br>"
	+ "I'm busy learning to make an website."
	+ "This will mostly be full of borken things. There will be bad grammar. There will be outdated codeses."
	+ "There is also a ninja, but he doesn't say much. He just judges people.";

// What I've done.
doneBlurb = document.getElementById('doneBlurb');
doneBlurb.innerHTML = '<strong>What I\'ve done so far:</strong>';
doneArray = [
	"images", 
	"headings", 
	"unordered lists", 
	"links", 
	"teeny bit of CSS",
	"<i>JavaScript</i>",
	[
		"function that turns JS arrays into ULs",
		"it handles nested ULs (yay!)"
	]
];
createULFromArray(doneBlurb, doneArray);

// Thoughts
thoughtsBlurb = document.getElementById('thoughtsBlurb');
thoughtsBlurb.innerHTML = "<strong>Some Thoughts:</strong><br>"
		+ "All the content you see is actually contained in JS.<br>"
		+ "I wanted to make HTML only do structuring, with content being typed in JS.<br>"
		+ "In the future, I'll probably make JS parse text files.<br>"
		+ "This will allow me to simply type in simple text files, specify where I want them placed in HTML, and JS does the mapping.<br>"
		+ "All of this for readability and easy editing capabilities";

// Blue Paragraph!
blueParagraph = document.getElementById('blueParagraph');
blueParagraph.innerHTML = "This is my blue paragraph and it is quite content being blue. Aren you content, blue paragraph?<br>"
	+ "<i> Woof! - </i><br>"
	+ "- See? Quite content indeed.</p>";


// ###
// # FUNTIONS 

/*
 * Creates an unordered list from a given array and places it after a given element.
 */
function createULFromArray(previousElement, array) {
	var ul = document.createElement("ul");
	for (i in array) {
		var element = array[i];
		var li = document.createElement("li");
		if(Array.isArray(element)) {
			createULFromArray(ul.lastChild, element);
		} else {
			li.innerHTML = element;
			ul.appendChild(li);
		}
	}
	previousElement.parentNode.insertBefore(ul, previousElement.nextSibling);
}