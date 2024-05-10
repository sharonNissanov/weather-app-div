readData();
function readData(id) {
    if (id === void 0) { id = ""; }
    var API_KEY = '2cc48dd34be6452386a130925240905';
    var parentElement;
    createWeatherElement();
    var baseUrl = "https://api.weatherapi.com/v1/forecast.json?key=".concat(API_KEY, "&days=14&aqi=no");
    var params = "&q=48.8567,2.3508";
    console.log(baseUrl + params, id);
    getWeatherData(baseUrl + params);
    //----------------------------------------------------------------------------------------------------
    // Set properties and attributes for the div element Append the new div to an existing element in the DOM or body
    function createWeatherElement() {
        var newDiv = document.createElement('div');
        newDiv.textContent = 'weather Div';
        newDiv.id = 'weatherDiv';
        addInput(newDiv);
        parentElement = getTargetElement();
        parentElement.appendChild(newDiv);
    }
    //return the target element
    function getTargetElement() {
        var valid = isValidId(id);
        return valid ? document.getElementById(id.toString()) : document.body;
    }
    //return true if there's an element with the specified ids in the document.
    function isValidId(id) {
        // Check if the id is a non-empty string
        if (typeof id !== 'string' || id.trim() === '') {
            return false;
        }
        return document.getElementById(id.toString()) !== null;
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
        var avgValues = {};
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
    }
    //create Weather Cards
    function createWeatherCard() {
        // document.getElementById('weatherDiv').append() 
    }
}
;
