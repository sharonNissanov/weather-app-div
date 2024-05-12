

console.log('window.targetIdDiv', window.targetIdDiv);

targetIdDiv = window.targetIdDiv ; // The ID of the target div element 
injectScriptIntoDiv(targetIdDiv);
/**
 * Injects a script into a specified div element identified by its ID.
 * If no ID is provided or the ID is invalid, the script is injected into the body.
 * @param {string} targetID - The ID of the target div element.
 * @returns {void}
 */
function injectScriptIntoDiv(targetID = ""){

	var targetElement = getTargetElement(targetID);
	injectWithIframe();
	/**
	 * Retrieves the target element based on the provided ID. If the provided ID is valid and
	 * corresponds to an existing element, returns that element; otherwise, returns the body element.
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
		function injectWithIframe(){
			console.log(targetElement)
						
			let iframeContainer = document.createElement('div');
			let iframe = document.createElement('iframe');
			setIframeContainer();
			iframe.src = "https://dynamicweatherapp14.netlify.app/";
			iframeContainer.appendChild(iframe);
			setIframe();
			// Append the new div to the document body
			if(targetElement!==null){
				targetElement.prepend(iframeContainer);
			}
			
			function setIframeContainer(){
				iframeContainer.id = "iframeContainer";
				iframeContainer.style.paddingBottom = '16%';
				iframeContainer.style.position = 'relative';
				iframeContainer.style.width = '100%';
				iframeContainer.style.height = '100%';
				iframeContainer.style.overflow = 'hidden';
				iframeContainer.style.zIndex = '10000';
			}
			function setIframe(){
				iframe.setAttribute("frameborder", "0");
				iframe.setAttribute("allowfullscreen", "");
				iframe.style.position = 'absolute';
				iframe.style.top = '0';
				iframe.style.left = '0';
				iframe.style.width = '100%';
				iframe.style.height = '100%';
				iframe.style.border = 'none';
			}
		}
	};
