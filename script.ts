
 <script>

injectScriptIntoDiv("")
function injectScriptIntoDiv(targetID = ""){

var targetElement = getTargetElement(targetID);

	function getTargetElement(targetID) {
		let valid = isValidId(targetID);
		if(typeof targetID === 'string' && valid){ 
			return document.getElementById(targetID);
		}
		return document.getElementsByTagName('body')[0];
	
		function isValidId(targetID) {
			// Check if the id is a non-empty string
			if (typeof targetID !== 'string' || targetID.trim() === '' || targetID == null ) {
				return false;
			} 
			return document.getElementById(targetID) !== null;
		}
	}

	(function getData(){
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
		targetElement.appendChild(newdiv);
	}
	
})();
}

</script>