
 <script>

injectScriptIntoDiv("")
function injectScriptIntoDiv(targetID = ""){

var targetElement = getTargetElement(targetID);

/**
 * Retrieves the target element based on the provided ID.
 * If the provided ID is valid and corresponds to an existing element, returns that element;
 * otherwise, returns the body element.
 * @param {string} targetID - The ID of the target element to retrieve.
 * @returns {HTMLElement} - The target element if found, otherwise the body element.
 */
	function getTargetElement(targetID) {
		let valid = isValidId(targetID);
		if(typeof targetID === 'string' && valid){ 
			return document.getElementById(targetID);
		}
		return document.getElementsByTagName('body')[0];
	
	/**
     * Checks if the provided ID is a valid non-empty string.
     * @param {string} targetID - The ID to validate.
     * @returns {boolean} - True if the ID is valid and corresponds to an existing element, otherwise false.
     */
		function isValidId(targetID) {
			// Check if the id is a non-empty string
			if (typeof targetID !== 'string' || targetID.trim() === '' || targetID == null ) {
				return false;
			} 
			return document.getElementById(targetID) !== null;
		}
	}

	/**
 * Injects an iframe containing the content of a specified URL into the target element.
 * The injected iframe is styled to match the dimensions of the target element.
 * @returns {void}
 */
	(function injectWithIframe(){
	console.log(targetElement)
	const style = `
		#iframeContainer {
			padding-bottom: 16%;
			position: relative;
			width: 100%;
			height: 100%;
			overflow: hidden;
			z-index: 10000;
		}
	
		#iframeContainer iframe {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border: none; /* Removes the border around the iframe */
		}`;
				
	const styleElement = document.createElement('style');
	styleElement.innerHTML = style;
	document.head.appendChild(styleElement);
				
	let newdiv = document.createElement('div');
	newdiv.id = "iframeContainer";
	
	let iframe = document.createElement('iframe');
	iframe.src = "https://dynamicweatherapp14.netlify.app/";
	iframe.setAttribute("frameborder", "0");
	iframe.setAttribute("allowfullscreen", "");
	newdiv.appendChild(iframe);
	
	// Append the new div to the document body
	if(targetElement!==null){
		targetElement.prepend(newdiv);
	}
	
})();
}

</script>