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
            //calcAvgTemp(data);
            testAvg(data);
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
     * saves a map with the avg temp od any day
    * Calculate the average temperature for each day of the week based on the provided weather data.
    * @param {WeatherData} data - The weather data containing forecast information.
    * @returns {void}
    */
    function testAvg(data) {
        var _a, _b;
        var cardsContainer = document.getElementById("cardsContainer") || getElement('div', '', 'cardsContainer');
        cardsContainer.innerHTML = "";
        // Initialize a map to store the average temperatures for each day of the week
        avgMap = new Map();
        if ((_a = data === null || data === void 0 ? void 0 : data.forecast) === null || _a === void 0 ? void 0 : _a.forecastday) {
            data.forecast.forecastday.forEach(function (day) {
                var _a;
                var date = new Date(day.date);
                var dayOfWeekIndex = date.getUTCDay();
                var dayOfWeekStr = date.toLocaleDateString('en-US', { weekday: 'short' });
                // Check if the average temperature for the current day of the week already exists
                if (typeof dayOfWeekIndex === "number" && avgMap.has(dayOfWeekIndex)) {
                    var avgTemp = avgMap.get(dayOfWeekIndex) || 0; // Default to 0 if not found
                    var newAvg = (day.day.avgtemp_c + avgTemp) / 2;
                    avgMap.set(dayOfWeekIndex, parseFloat(newAvg.toFixed(2)));
                    //Build and append the weather card for the current day
                    var card = buildWeatherCard(dayOfWeekStr, (_a = day.day) === null || _a === void 0 ? void 0 : _a.condition, avgMap.get(dayOfWeekIndex));
                    cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.appendChild(card);
                }
                else {
                    avgMap.set(dayOfWeekIndex, day.day.avgtemp_c);
                }
            });
        }
        console.log(avgMap);
        (_b = document.getElementById('weatherDiv')) === null || _b === void 0 ? void 0 : _b.append(cardsContainer);
        /**
         * build a new div element for the weather card.
         * and append child elements to it for weather icon, description, and temperature.
         * @param {any} cardData - The data for the day containing name, condition, and average temperature.
         * @returns {HTMLElement} - The constructed weather card element.
         */
        function buildWeatherCard(dayOfWeekStr, cardData, avgTemp) {
            var card = getElement('div', dayOfWeekStr, '', '', 'weatherCard');
            card.appendChild(getElement('img', '', '', '', '', 'https:' + (cardData === null || cardData === void 0 ? void 0 : cardData.icon)));
            card.appendChild(getElement('span', cardData === null || cardData === void 0 ? void 0 : cardData.text));
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
