const script = document.createElement("script");
script.textContent = `	injectScriptIntoDiv("")
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
                

    let iframeContainer = document.createElement('div');
    iframeContainer.id = "iframeContainer";
    
    iframeContainer.style.paddingBottom = '16%';
    iframeContainer.style.position = 'relative';
    iframeContainer.style.width = '100%';
    iframeContainer.style.height = '100%';
    iframeContainer.style.overflow = 'hidden';
    iframeContainer.style.zIndex = '10000';

    let iframe = document.createElement('iframe');
    iframe.src = "https://dynamicweatherapp14.netlify.app/";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "");

    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';


    iframeContainer.appendChild(iframe);
    
    // Append the new div to the document body
    if(targetElement!==null){
        targetElement.prepend(iframeContainer);
    }
    
})();
}`;
document.body.appendChild(script);