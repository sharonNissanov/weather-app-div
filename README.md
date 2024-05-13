# Inject Dynamic Weather div into a webpage
To inject the Dynamic Weather div into a webpage using a script tag,\
***set*** the targetID parameter to the ID of the div where you want the Dynamic Weather logic to be injected.\
Here's the code you can use in the console of the webpage:

const script = document.createElement("script");\
script.src = "https://cdn.jsdelivr.net/gh/sharonNissanov/weather-app-div@main/solutions/appendDynamicWeather1.js?targetID=content";
document.body.append(script);

In the code above you can see that the targetID=content.

The script constructs an iframe with its source set to the weather-app-div project deployed on Netlify,\
then injects this iframe into the target element.\
I utilized the jsDelivr CDN to serve my injectDynamicWeatherDiv.js file.


***Notice*** \
If the targetID parameter is not provided or provided but not found in the webpage, \
the logic will be injected into the body element by default.

***More src options***\
Use this script to ***prepend*** Dynamic Weather logic: "https://cdn.jsdelivr.net/gh/sharonNissanov/weather-app-div@main/solutions/injectDynamicWeatherDiv.js?targetID=content"; \
Use this script for debbug: "https://cdn.jsdelivr.net/gh/sharonNissanov/weather-app-div@main/test/appendDebbug.js?targetID=content"; 

[Click here to learn more about the injection script](https://github.com/sharonNissanov/weather-app-div/wiki/Dynamic-Weather-Injection-Script) \
[Click here to find more information in the wiki](https://github.com/sharonNissanov/weather-app-div/wiki)

Feel free to contact me if you have any other questions.
