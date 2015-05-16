/*
 * Author: 	Rick Bosch
 * email: 	xpc.dev@gmail.com 
 */


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