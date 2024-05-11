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
function buildDynamicWeatherDiv() :void{
    let avgMap: Map<number, number>;
    const API_KEY: string = '2cc48dd34be6452386a130925240905';
    const baseUrl: string = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=14&aqi=no`;

    createWeatherElement();

/**
 * Creates a weather element containing label, input field, and result section.
 * Appends the new div to an existing element in body.
 * @returns {void}
 */
function createWeatherElement(): void {
    const newDiv:HTMLElement = getElement('div', '','weatherDiv');
    newDiv.appendChild(getElement('label', 'Please enter the wanted location'));
    newDiv.appendChild(getElement('input', '', 'weatherInput', 'text','', '', onChangeInput));
    newDiv.appendChild(getElement('p', '', 'resultTitle'));
    
    // Append the new div to the body of the document
    const bodyElement: HTMLElement | null = document.body;
    if (bodyElement !== null) {
        bodyElement.appendChild(newDiv);
    } else {
        console.error('Body element was not found');
    }
}

/**
 * This function will be called whenever the user change the input field.
 * @param {Event} event - The change event triggered by the input field.
 * @returns {void}
 */
    function onChangeInput(event: Event): void{
        //Retrieve user-entered location and construct API URL
        const inputValue: string = (event.target as HTMLInputElement).value;
        console.log('Input value:', inputValue);
        let reqUrl: string = baseUrl + `&q=${inputValue}`;
         // Fetch weather data from the API
        getWeatherData(reqUrl);
    }

/**
 * Fetches weather data from the API based on the provided URL.
 * Get the weather for the user’s entered location in the next 2 weeks.
 * @param {string} url The URL to fetch weather data from.
 * @returns {void}
 */
function getWeatherData(url:string): void{
    console.log(url )
    fetch(url)
    .then(response => {
         // Check for valid network response
        if (!response.ok) {
            setResultTitle(false, null);
            console.error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => {
        setResultTitle(true, data);
        console.log(data); 
        calcAvgTemp(data);
    })
    .catch(error => {
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
function setResultTitle(succeeded: boolean, data: WeatherData | null): void {
    const resultEle = document.getElementById("resultTitle");
    if (resultEle) {
        if (succeeded && data?.location?.name) {
            resultEle.innerText = `The average temperature for the next 2 weeks in ${data.location.name}`;
        } else {
            resultEle.innerText = "Something went wrong, please try again";
            const cardsContainer = document.getElementById("cardsContainer");
            if(cardsContainer){
                (cardsContainer as HTMLElement ).innerHTML = "";
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
* Calculate the average temperature for each day of the week based on the provided weather data
* and save it in a map. (the key is the day index and the value is the average temperature).
* @param {WeatherData} data - The weather data containing forecast information.
* @returns {void}
*/
function calcAvgTemp(data: WeatherData): void{

    // Initialize a map to store the average temperatures for each day of the week
    avgMap = new Map<number, number>();
    if (data?.forecast?.forecastday) {
        data.forecast.forecastday.forEach(day => {

            const date = new Date(day.date);
            const dayOfWeekIndex = date.getUTCDay();

           // Check if the average temperature for the current day of the week already exists
            if (typeof dayOfWeekIndex === "number" && avgMap.has(dayOfWeekIndex)) {
                const avgTemp = avgMap.get(dayOfWeekIndex) || 0;  // Default to 0 if not found
                const newAvg = (day.day.avgtemp_c + avgTemp) / 2;
                avgMap.set(dayOfWeekIndex, parseFloat(newAvg.toFixed(2)));
            } else {
                avgMap.set(dayOfWeekIndex, day.day.avgtemp_c);
            }
        });
    }
    console.log(avgMap)
    buildWeatherCardsByCurrDate(data)
}

/**
 * Builds weather cards for the upcoming 7 days starting from the current date.
 * Appends the constructed cards to the specified container element in the DOM.
 * @param {WeatherData} data - The weather data containing forecast information.
 * @returns {void}
 */
function buildWeatherCardsByCurrDate(data: WeatherData){
  
    // Get or create the cards container element
    let cardsContainer: HTMLElement = document.getElementById("cardsContainer") || getElement('div', '', 'cardsContainer');
    cardsContainer.innerHTML = "";

     // Get the current day index (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    let currDateIndex = (new Date()).getUTCDay();

       // Extract the forecast data for the upcoming 7 days starting from the next day
    let forecastDays = data?.forecast?.forecastday?.slice(currDateIndex + 1, currDateIndex + 8);

    // Iterate over the forecast data and build weather cards for each day
    forecastDays?.forEach(day => {
        const date = new Date(day.date);
        const dayOfWeekStr = date.toLocaleDateString('en-US', { weekday: 'short' });
        const card = buildWeatherCard(dayOfWeekStr, day.day?.condition?.icon, day.day?.condition?.text, avgMap.get(date.getUTCDay()) as number);
        cardsContainer?.appendChild(card);
    });

    document.getElementById('weatherDiv')?.append(cardsContainer); 
  /**
     * Builds a weather card element for a specific day.
     * @param {string} dayOfWeekStr - The day of the week string (e.g., "Mon", "Tue").
     * @param {string} imgSrc - The source URL of the weather icon for the day.
     * @param {string} text - The description of the weather condition for the day.
     * @returns {HTMLElement} - The constructed weather card element.
     */
    function buildWeatherCard(dayOfWeekStr: string, imgSrc: string, text: string, avgTemp: number): HTMLElement {
        const card = getElement('div', dayOfWeekStr, '', '', 'weatherCard');
        card.appendChild(getElement('img','','','','', 'https:' + imgSrc));
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
function getElement(tag: string, text: string, id?: string, type?: string,
    className?: string, src?: string, eventListener?: EventListener): HTMLElement  {
    const element: HTMLElement  = document.createElement(tag);
    if (id) {
        element.id = id;
    }
    if (type) {
        (element as HTMLInputElement).type = type;
    }
    if (text) {
        element.innerHTML = text;
    }
    if (className) {
        element.className = className;
    }
    if (tag === 'img' && src) {
        (element as HTMLImageElement ).src = src;
    }
    
    if (eventListener) {
        element.addEventListener('change', eventListener);
    }

    return element;
}
};

type WeatherData = {
    location: {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tz_id: string;
        localtime_epoch: number;
        localtime: string;
    };
    current: {
        last_updated_epoch: number;
        last_updated: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: {
            text: string;
            icon: string;
            code: number;
        };
        precip_in: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        feelslike_f: number;
        vis_miles: number;
        uv: number;
    };
    forecast: {
        forecastday: { //array of forecastday
            date: string;
            date_epoch: number;
            day: {
                maxtemp_c: number;
                maxtemp_f: number;
                mintemp_c: number;
                mintemp_f: number;
                avgtemp_c: number;
                avgtemp_f: number;
                maxwind_mph: number;
                maxwind_kph: number;
                totalprecip_mm: number;
                totalprecip_in: number;
                totalsnow_cm: number;
                avgvis_km: number;
                avgvis_miles: number;
                avghumidity: number;
                daily_will_it_rain: number;
                daily_chance_of_rain: number;
                daily_will_it_snow: number;
                daily_chance_of_snow: number;
                condition: {
                    text: string;
                    icon: string;
                    code: number;
                };
                uv: number;
            };
            astro: any; 
            hour: { //array of hour
                condition: any; 
            }[];
        }[];
    };
};

