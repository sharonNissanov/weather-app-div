# Dynamic Weather Display

To inject the Dynamic Weather div into a webpage using a script tag,\
***set*** the targetID parameter to the ID of the div where you want the Dynamic Weather logic to be injected.\
Here's the code you can use in the console of the webpage:

const script = document.createElement("script"); \
script.src = "https://cdn.jsdelivr.net/gh/sharonNissanov/weather-app-div@main/solutions/injectDynamicWeatherDiv.js?targetID=content"; \
document.body.prepend(script); 

In the code above you can see that the targetID=content.

I utilized the jsDelivr CDN to serve my injectDynamicWeatherDiv.js file.


***Notice*** \
If the targetID parameter is not provided or provided but not found in the webpage, \
the logic will be injected into the body element by default.

***More src Options***\
Use this script to ***append*** Dynamic Weather logic: "https://cdn.jsdelivr.net/gh/sharonNissanov/weather-app-div@main/test/tempdebbug.js?targetID=content"; \
Use this script for debbug: "https://cdn.jsdelivr.net/gh/sharonNissanov/weather-app-div@main/solutions/appendDynamicWeatherDiv.js?targetID=content";\
