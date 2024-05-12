
// Invokes (prepend) the function to inject a script into a specified div element.
injectScriptIntoDiv();

/**
 * Injects a script into a specified div element identified by its ID.
 * If no ID is provided from url or the ID is invalid, the script is injected into the body.
 * @returns {void}
 */
function injectScriptIntoDiv(){
	const scriptSrc = document.currentScript.src;
	const url = new URL(scriptSrc);
    const targetID = url.searchParams.get('targetID');
	var targetElement = getTargetElement(targetID);
    console.log('script src: ', scriptSrc);
    console.log('targetID from url: ', targetID, targetElement);
    console.log("itargetElement: ", targetElement);
	injectWithIframe(targetElement);
};

/**
 * Injects an iframe containing the content of a specified URL into the target element.
 * The injected iframe is styled to match the dimensions of the target element.
 * The source of the iframe is the weather app deployed on Netlify.
 * @param {HTMLElement} targetElement - the target element.
 * @returns {void}
 */
function injectWithIframe(targetElement) {

    let iframeContainer = document.createElement('div');
    let iframe = document.createElement('iframe');

    // Set styles for the iframe container and iframe
    setIframeContainerStyle();
    setIframeStyle();

    // Append the iframe to the container
    iframe.src = "https://dynamicweatherapp14.netlify.app/";


    iframeContainer.appendChild(iframe);
    
    // Append the new div to the document body
    if(targetElement !== null){
        targetElement.prepend(iframeContainer);
    }
    
    // Function to set styles for the iframe container
    function setIframeContainerStyle(){
        iframeContainer.id = "iframeContainer";
        iframeContainer.style.paddingBottom = '16%';
        iframeContainer.style.position = 'relative';
        iframeContainer.style.width = '100%';
        iframeContainer.style.height = '100%';
        iframeContainer.style.overflow = 'hidden';
        iframeContainer.style.zIndex = '10000';
    }

   // Function to set styles for the iframe
    function setIframeStyle(){
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

/**
 * Returns the target element based on the provided ID. If the provided ID is valid and
 * corresponds to an existing element, returns that element; otherwise, returns the body element.
 * @param {string} targetID - The ID of the target element.
 * @returns {HTMLElement} - The target element if found, otherwise the body element.
 */
function getTargetElement(targetID) {
    let valid = isValidId(targetID);
    if(typeof targetID === 'string' && valid){ 
        return document.getElementById(targetID);
    }
    return document.getElementsByTagName('body')[0];
}

/**
 * Checks if the provided ID is a valid non-empty string.
 * @param {string} targetID - The ID to validate.
 * @returns {boolean} - True if the ID is valid and corresponds to an existing element, otherwise false.
 */
function isValidId(targetID) {
    const test = document.getElementById(targetID);
    if (test) {
        console.log('found', test)
    } else {
        console.log("Element with id '" + targetID + "' not found.");
    }     
    if (typeof targetID !== 'string' || targetID.trim() === '' || targetID == null ) {
        return false;
    } 
    return document.getElementById(targetID) !== null;
}