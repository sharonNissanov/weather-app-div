// @ts-ignore
/// <reference lib="es2015" />
/**
 * Builds a dynamic weather display element on the webpage.
 * This function creates a weather div containing input and result sections for users to enter their location
 * and view the average temperature for the next 2 weeks. It fetches weather data from an API and calculates
 * the average temperature for each day of the week. It then constructs weather cards for each day,
 * displaying weather icons, descriptions, and temperatures.
 * @returns {void}
 */
buildDynamicWeatherDiv();
function buildDynamicWeatherDiv() {
    var avgMap;
    var API_KEY = '2cc48dd34be6452386a130925240905';
    var baseUrl = "https://api.weatherapi.com/v1/forecast.json?key=".concat(API_KEY, "&days=14&aqi=no");
    createWeatherElement();
    /**
     * Creates a weather element containing label, input field, and result section.
     * Appends the new div to an existing element in body.
     * @returns {void}
     */
    function createWeatherElement() {
        var newDiv = getElement('div', '', 'weatherDiv');
        newDiv.appendChild(getElement('label', 'Please enter the wanted location'));
        newDiv.appendChild(getElement('input', '', 'weatherInput', 'text', '', '', onChangeInput));
        newDiv.appendChild(getElement('p', '', 'resultTitle'));
        // Append the new div to the body of the document
        var bodyElement = document.body;
        if (bodyElement !== null) {
            bodyElement.appendChild(newDiv);
        }
        else {
            console.error('Body element was not found');
        }
    }
    /**
     * This function will be called whenever the user change the input field.
     * @param {Event} event - The change event triggered by the input field.
     * @returns {void}
     */
    function onChangeInput(event) {
        //Retrieve user-entered location and construct API URL
        var inputValue = event.target.value;
        console.log('Input value:', inputValue);
        var reqUrl = baseUrl + "&q=".concat(inputValue);
        // Fetch weather data from the API
        getWeatherData(reqUrl);
    }
    /**
     * Fetches weather data from the API based on the provided URL.
     * Get the weather for the user’s entered location in the next 2 weeks.
     * @param {string} url The URL to fetch weather data from.
     * @returns {void}
     */
    function getWeatherData(url) {
        console.log(url);
        fetch(url)
            .then(function (response) {
            // Check for valid network response
            if (!response.ok) {
                setResultTitle(false, null);
                console.error('Network response was not ok');
            }
            return response.json();
        })
            .then(function (data) {
            setResultTitle(true, data);
            console.log(data);
            displayAvgWeatherCards(data);
        })
            .catch(function (error) {
            // Handle errors
            setResultTitle(false, null);
            console.error('ERROR:', error);
        });
    }
    /**
     * Sets the title based on the success of fetching weather data.
     * @param {boolean} - succeeded  A boolean indicating whether the data fetching was successful.
     * @param {WeatherData | null} data -The weather data retrieved from the API.
     * @returns {void}
     */
    function setResultTitle(succeeded, data) {
        var _a;
        var resultEle = document.getElementById("resultTitle");
        if (resultEle) {
            if (succeeded && ((_a = data === null || data === void 0 ? void 0 : data.location) === null || _a === void 0 ? void 0 : _a.name)) {
                resultEle.innerText = "The average temperature for the next 2 weeks in ".concat(data.location.name);
            }
            else {
                resultEle.innerText = "Something went wrong, please try again";
                var cardsContainer = document.getElementById("cardsContainer");
                if (cardsContainer) {
                    cardsContainer.innerHTML = "";
                }
            }
        }
    }
    /**
     * Builds the weather cards container and appends weather cards to it.
     * If the cards container already exists, clear its contents
     * @returns {void}
     */
    /**
     * sets a map with the avg temp of any day
    * Calculate the average temperature for each day of the week based on the provided weather data.
    * @param {WeatherData} data - The weather data containing forecast information.
    * @returns {void}
    */
    function displayAvgWeatherCards(data) {
        var _a;
        // Initialize a map to store the average temperatures for each day of the week
        avgMap = new Map();
        if ((_a = data === null || data === void 0 ? void 0 : data.forecast) === null || _a === void 0 ? void 0 : _a.forecastday) {
            data.forecast.forecastday.forEach(function (day) {
                var date = new Date(day.date);
                var dayOfWeekIndex = date.getUTCDay();
                // Check if the average temperature for the current day of the week already exists
                if (typeof dayOfWeekIndex === "number" && avgMap.has(dayOfWeekIndex)) {
                    var avgTemp = avgMap.get(dayOfWeekIndex) || 0; // Default to 0 if not found
                    var newAvg = (day.day.avgtemp_c + avgTemp) / 2;
                    avgMap.set(dayOfWeekIndex, parseFloat(newAvg.toFixed(2)));
                }
                else {
                    avgMap.set(dayOfWeekIndex, day.day.avgtemp_c);
                }
            });
        }
        console.log(avgMap);
        buildWeatherCardsByCurrDate(data);
    }
    /**
     * Builds weather cards for the upcoming 7 days starting from the current date.
     * Appends the constructed cards to the specified container element in the DOM.
     * @param {WeatherData} data - The weather data containing forecast information.
     * @returns {void}
     */
    function buildWeatherCardsByCurrDate(data) {
        var _a, _b, _c;
        // Get or create the cards container element
        var cardsContainer = document.getElementById("cardsContainer") || getElement('div', '', 'cardsContainer');
        cardsContainer.innerHTML = "";
        // Get the current day index (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
        var currDateIndex = (new Date()).getUTCDay();
        // Extract the forecast data for the upcoming 7 days starting from the next day
        var forecastDays = (_b = (_a = data === null || data === void 0 ? void 0 : data.forecast) === null || _a === void 0 ? void 0 : _a.forecastday) === null || _b === void 0 ? void 0 : _b.slice(currDateIndex + 1, currDateIndex + 8);
        // Iterate over the forecast data and build weather cards for each day
        forecastDays === null || forecastDays === void 0 ? void 0 : forecastDays.forEach(function (day) {
            var _a, _b, _c, _d;
            var date = new Date(day.date);
            var dayOfWeekStr = date.toLocaleDateString('en-US', { weekday: 'short' });
            var card = buildWeatherCard(dayOfWeekStr, (_b = (_a = day.day) === null || _a === void 0 ? void 0 : _a.condition) === null || _b === void 0 ? void 0 : _b.icon, (_d = (_c = day.day) === null || _c === void 0 ? void 0 : _c.condition) === null || _d === void 0 ? void 0 : _d.text, avgMap.get(date.getUTCDay()));
            cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.appendChild(card);
        });
        (_c = document.getElementById('weatherDiv')) === null || _c === void 0 ? void 0 : _c.append(cardsContainer);
        /**
           * Builds a weather card element for a specific day.
           * @param {string} dayOfWeekStr - The day of the week string (e.g., "Mon", "Tue").
           * @param {string} imgSrc - The source URL of the weather icon for the day.
           * @param {string} text - The description of the weather condition for the day.
           * @returns {HTMLElement} - The constructed weather card element.
           */
        function buildWeatherCard(dayOfWeekStr, imgSrc, text, avgTemp) {
            var card = getElement('div', dayOfWeekStr, '', '', 'weatherCard');
            card.appendChild(getElement('img', '', '', '', '', 'https:' + imgSrc));
            card.appendChild(getElement('span', text));
            card.appendChild(getElement('span', avgTemp + "&deg"));
            return card;
        }
    }
    /**
  * Creates an element with optional properties and attributes and returns it.
  * @param {string} tag The type of element to create (e.g., 'label', 'input', 'p').
  * @param {string} text The text content for the new element.
  * @param {string} id The id attribute for the new element.
  * @param {string} type The type attribute for new element.
  * @param {string} className The className attribute for new element.
  * @param {EventListener} eventListener The event listener function to attach to the new element.
  * @returns {HTMLElement} -the new element
  */
    function getElement(tag, text, id, type, className, src, eventListener) {
        var element = document.createElement(tag);
        if (id) {
            element.id = id;
        }
        if (type) {
            element.type = type;
        }
        if (text) {
            element.innerHTML = text;
        }
        if (className) {
            element.className = className;
        }
        if (tag === 'img' && src) {
            element.src = src;
        }
        if (eventListener) {
            element.addEventListener('change', eventListener);
        }
        return element;
    }
}
;
