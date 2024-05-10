readData();
function readData() {
    var avgValues = {};
    var urlParams = new URLSearchParams(window.location.search);
    var API_KEY = '2cc48dd34be6452386a130925240905';
    var baseUrl = "https://api.weatherapi.com/v1/forecast.json?key=".concat(API_KEY, "&days=14&aqi=no");
    var id = urlParams.get('divId');
    console.log(id);
    var parentElement;
    createWeatherElement();
    var params = "&q=".concat(id);
    console.log(baseUrl + params, id);
    getWeatherData(baseUrl + params);
    //----------------------------------------------------------------------------------------------------
    // Set properties and attributes for the div element Append the new div to an existing element in the DOM or body
    function createWeatherElement() {
        var newDiv = document.createElement('div');
        newDiv.id = 'weatherDiv';
        addLabel(newDiv);
        addInput(newDiv);
        parentElement = getTargetElement();
        if (parentElement !== null) {
            parentElement.appendChild(newDiv);
        }
        //else error
    }
    //return the target element
    function getTargetElement() {
        var valid = isValidId(id);
        if (typeof id === 'string' && valid) {
            return document.getElementById(id.toString());
        }
        return document.body;
    }
    //return true if there's an element with the specified ids in the document.
    function isValidId(id) {
        // Check if the id is a non-empty string
        if (typeof id !== 'string' || id.trim() === '') {
            return false;
        }
        return document.getElementById(id.toString()) !== null;
    }
    function addLabel(parentEle) {
        var label = document.createElement('label');
        label.textContent = 'Please enter the wanted location';
        parentEle.appendChild(label);
    }
    //Add input element TODO: DOCU
    function addInput(parentEle) {
        var inputElement = document.createElement('input');
        inputElement.id = 'weatherInput';
        inputElement.type = 'text';
        //Add an event listener to the input element
        inputElement.addEventListener('change', onChangeInput);
        parentEle.appendChild(inputElement);
    }
    function onChangeInput(event) {
        // This function will be called whenever the user types into the input field
        var inputValue = event.target.value;
        console.log('Input value:', inputValue);
        var reqUrl = baseUrl + "&q=".concat(inputValue);
        getWeatherData(reqUrl);
    }
    // Get (don’t show) the weather for the user’s entered location in the next 2 weeks
    function getWeatherData(url) {
        fetch(url)
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(function (data) {
            console.log(data);
            calcAvg(data);
        })
            .catch(function (error) {
            //add error message
            console.error('ERROR:', error);
        });
    }
    //For each day of the week, show the average temperature for the next 2 weeks.
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
                console.log(day.day.condition.text, day.day.avgtemp_c);
            });
        }
        console.log(avgValues);
        buildWeatherCards();
    }
    //create Weather Cards container 
    function buildWeatherCards() {
        var _a;
        var cardsContainer = document.getElementById("cardsContainer");
        if (document.getElementById("cardsContainer") !== null) {
            cardsContainer.innerHTML = "";
        }
        else {
            cardsContainer = document.createElement('div');
            cardsContainer.id = "cardsContainer";
        }
        Object.keys(avgValues).forEach(function (value) {
            var card = buildWeatherCard(value);
            cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.appendChild(card);
        });
        (_a = document.getElementById('weatherDiv')) === null || _a === void 0 ? void 0 : _a.append(cardsContainer);
        function buildWeatherCard(value) {
            var card = document.createElement('div');
            card.className = 'weatherCard';
            card.textContent = avgValues[value].name;
            card.appendChild(getIcon(value));
            card.appendChild(getDesc(value));
            card.appendChild(getTemp(value));
            return card;
        }
        function getIcon(value) {
            var _a, _b;
            var icon = document.createElement('img');
            icon.src = 'https:' + ((_b = (_a = avgValues[value]) === null || _a === void 0 ? void 0 : _a.condition) === null || _b === void 0 ? void 0 : _b.icon);
            return icon;
        }
        function getDesc(value) {
            var _a, _b;
            var desc = document.createElement('span');
            desc.innerHTML = (_b = (_a = avgValues[value]) === null || _a === void 0 ? void 0 : _a.condition) === null || _b === void 0 ? void 0 : _b.text;
            return desc;
        }
        function getTemp(value) {
            var _a;
            var desc = document.createElement('span');
            desc.innerHTML = ((_a = avgValues[value]) === null || _a === void 0 ? void 0 : _a.avgTemp) + "&deg";
            return desc;
        }
    }
}
;
