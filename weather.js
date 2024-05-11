readData();
function readData() {
    var avgValues = {};
    var API_KEY = '2cc48dd34be6452386a130925240905';
    var baseUrl = "https://api.weatherapi.com/v1/forecast.json?key=".concat(API_KEY, "&days=14&aqi=no");
    createWeatherElement();
    /**
     * Creates a weather element containing input and result sections.
     * Appends the new div to an existing element in body.
     */
    function createWeatherElement() {
        var newDiv = getElement('div', '', 'weatherDiv');
        newDiv.appendChild(getElement('label', 'Please enter the wanted location'));
        newDiv.appendChild(getElement('input', '', 'weatherInput', 'text', '', '', onChangeInput));
        newDiv.appendChild(getElement('p', '', 'resultTitle'));
        var bodyElement = document.body;
        if (bodyElement !== null) {
            bodyElement.appendChild(newDiv);
        }
        else {
            console.error('Body element was not found');
        }
    }
    /**
     * This function will be called whenever the user types into the input field.
     * @param event The change event triggered by the input field.
     */
    function onChangeInput(event) {
        var inputValue = event.target.value;
        console.log('Input value:', inputValue);
        var reqUrl = baseUrl + "&q=".concat(inputValue);
        getWeatherData(reqUrl);
    }
    /**
     * Get (don’t show) the weather for the user’s entered location in the next 2 weeks.
     * @param url The URL to fetch weather data from.
     */
    function getWeatherData(url) {
        console.log(url);
        fetch(url)
            .then(function (response) {
            if (!response.ok) {
                setResultTitle(false, null);
                console.error('Network response was not ok');
            }
            return response.json();
        })
            .then(function (data) {
            setResultTitle(true, data);
            console.log(data);
            calcAvg(data);
        })
            .catch(function (error) {
            //add error message
            setResultTitle(false, null);
            console.error('ERROR:', error);
        });
    }
    /**
     * Sets the title based on the success of fetching weather data.
     * @param succeeded A boolean indicating whether the data fetching was successful.
     * @param data The weather data retrieved from the API.
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
     * Calculates the average temperature for each day of the week over the next 2 weeks.
     * @param {object} data - The weather data retrieved from the API.
     */
    function calcAvg(data) {
        var _a;
        avgValues = {};
        // Check if data and forecast forecastday exist before proceeding
        if ((_a = data === null || data === void 0 ? void 0 : data.forecast) === null || _a === void 0 ? void 0 : _a.forecastday) {
            data.forecast.forecastday.forEach(function (day) {
                var _a, _b;
                var date = new Date(day.date);
                var dayOfWeekStr = date.toLocaleDateString('en-US', { weekday: 'short' });
                var dayOfWeekIndex = date.getUTCDay();
                if (((_a = avgValues[dayOfWeekIndex]) === null || _a === void 0 ? void 0 : _a.avgTemp) !== undefined) {
                    var prevAvgTemp = avgValues[dayOfWeekIndex].avgTemp;
                    var newAvgTemp = (prevAvgTemp + day.day.avgtemp_c) / 2;
                    avgValues[dayOfWeekIndex].avgTemp = parseFloat(newAvgTemp.toFixed(2));
                    avgValues[dayOfWeekIndex].name = dayOfWeekStr;
                    avgValues[dayOfWeekIndex].condition = (_b = day.day) === null || _b === void 0 ? void 0 : _b.condition; //TODO: CHECK IT
                }
                else { // Initialize the avgTemp for the current day if it doesn't exist
                    avgValues[dayOfWeekIndex] = { avgTemp: day.day.avgtemp_c };
                }
                //  console.log( day.day.condition.text, day.day.avgtemp_c );
            });
        }
        console.log(avgValues);
        buildWeatherCards();
    }
    function buildWeatherCards() {
        var _a;
        var cardsContainer = document.getElementById("cardsContainer");
        if (document.getElementById("cardsContainer") !== null) {
            cardsContainer.innerHTML = "";
        }
        else {
            cardsContainer = getElement('div', '', "cardsContainer");
        }
        Object.keys(avgValues).forEach(function (value) {
            var card = buildWeatherCard(value);
            cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.appendChild(card);
        });
        (_a = document.getElementById('weatherDiv')) === null || _a === void 0 ? void 0 : _a.append(cardsContainer);
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
  * @param tag The type of element to create (e.g., 'label', 'input', 'p').
  * @param text The text content for the new element.
  * @param id The id attribute for the new element.
  * @param type The type attribute for new element.
  * @param className The className attribute for new element.
  * @param eventListener The event listener function to attach to the new element.
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
        if (src) {
            element.src = src;
        }
        if (eventListener) {
            element.addEventListener('change', eventListener);
        }
        return element;
    }
}
;
