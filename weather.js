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
    var avgValues = {};
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
            calcAvgTemp(data);
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
    function testAvg(data) {
        var _a;
        var avgMap = new Map();
        var res = new Map();
        if ((_a = data === null || data === void 0 ? void 0 : data.forecast) === null || _a === void 0 ? void 0 : _a.forecastday) {
            data.forecast.forecastday.forEach(function (day) {
                var date = new Date(day.date);
                var dayOfWeekStr = date.toLocaleDateString('en-US', { weekday: 'short' });
                var dayOfWeekIndex = date.getUTCDay();
                // console.log('test', dayOfWeekIndex, avgMap[dayOfWeekIndex], day.day.avgtemp_c)
                if (typeof dayOfWeekIndex === "number" && avgMap.has(dayOfWeekIndex)) {
                    var avgTemp = avgMap.get(dayOfWeekIndex) || 0; //
                    var newAvg = (day.day.avgtemp_c + avgTemp) / 2;
                    avgMap.set(dayOfWeekIndex, parseFloat(newAvg.toFixed(2)));
                }
                else {
                    avgMap.set(dayOfWeekIndex, day.day.avgtemp_c);
                }
            });
        }
        console.log(avgMap);
        // console.log('----------------------------------------------------')
    }
    /**
     * Calculate the average temperature for each day of the week based on the provided weather data.
     * @param {WeatherData} data - The weather data containing forecast information.
     * @returns {void}
     */
    function calcAvgTemp(data) {
        var _a;
        testAvg(data);
        // Initialize an object to store the average temperatures for each day of the week
        avgValues = {};
        // Check if Check if the required data is exist before proceeding
        if ((_a = data === null || data === void 0 ? void 0 : data.forecast) === null || _a === void 0 ? void 0 : _a.forecastday) {
            data.forecast.forecastday.forEach(function (day) {
                var _a;
                // Extract the date and day of the week information
                var date = new Date(day.date);
                var dayOfWeekStr = date.toLocaleDateString('en-US', { weekday: 'short' });
                var dayOfWeekIndex = date.getUTCDay();
                // console.log('org', dayOfWeekIndex, day.day.avgtemp_c)
                // Check if the average temperature for the current day of the week already exists
                if (avgValues[dayOfWeekIndex] !== undefined && typeof avgValues[dayOfWeekIndex].avgTemp === "number") {
                    // Calculate the new average temperature by averaging the current and previous temperatures
                    var prevAvgTemp = avgValues[dayOfWeekIndex].avgTemp;
                    var newAvgTemp = (prevAvgTemp + day.day.avgtemp_c) / 2;
                    avgValues[dayOfWeekIndex].avgTemp = parseFloat(newAvgTemp.toFixed(2));
                    avgValues[dayOfWeekIndex].name = dayOfWeekStr;
                    avgValues[dayOfWeekIndex].condition = (_a = day.day) === null || _a === void 0 ? void 0 : _a.condition; //TODO: CHECK IT
                }
                else { // Initialize the avgTemp for the current day if it doesn't exist
                    avgValues[dayOfWeekIndex] = { avgTemp: day.day.avgtemp_c };
                }
            });
        }
        console.log(avgValues);
        // Build weather cards based on the calculated average temperatures
        buildWeatherCards();
    }
    /**
     * Builds the weather cards container and appends weather cards to it.
     * If the cards container already exists, clear its contents
     * @returns {void}
     */
    function buildWeatherCards() {
        var _a;
        var cardsContainer = document.getElementById("cardsContainer") || getElement('div', '', 'cardsContainer');
        cardsContainer.innerHTML = "";
        Object.keys(avgValues).forEach(function (value) {
            var card = buildWeatherCard(value);
            cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.appendChild(card);
        });
        (_a = document.getElementById('weatherDiv')) === null || _a === void 0 ? void 0 : _a.append(cardsContainer);
        /**
         * build a new div element for the weather card.
         * and append child elements to it for weather icon, description, and temperature.
         * @param {any} value - The data for the day containing name, condition, and average temperature.
         * @returns {HTMLElement} - The constructed weather card element.
         */
        function buildWeatherCard(value) {
            var _a, _b, _c, _d, _e;
            var card = getElement('div', avgValues[value].name, '', '', 'weatherCard');
            card.appendChild(getElement('img', '', '', '', '', 'https:' + ((_b = (_a = avgValues[value]) === null || _a === void 0 ? void 0 : _a.condition) === null || _b === void 0 ? void 0 : _b.icon)));
            card.appendChild(getElement('span', (_d = (_c = avgValues[value]) === null || _c === void 0 ? void 0 : _c.condition) === null || _d === void 0 ? void 0 : _d.text));
            card.appendChild(getElement('span', ((_e = avgValues[value]) === null || _e === void 0 ? void 0 : _e.avgTemp) + "&deg"));
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
