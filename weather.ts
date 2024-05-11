readData();
function readData() :void{
    let avgValues = {};
    const API_KEY: string = '2cc48dd34be6452386a130925240905';
    const baseUrl: string = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=14&aqi=no`;

    createWeatherElement();

/**
 * Creates a weather element containing input and result sections.
 * Appends the new div to an existing element in body.
 */
function createWeatherElement(): void {
    const newDiv:HTMLElement = getElement('div', '','weatherDiv');
    newDiv.appendChild(getElement('label', 'Please enter the wanted location'));
    newDiv.appendChild(getElement('input', '', 'weatherInput', 'text','', '', onChangeInput));
    newDiv.appendChild(getElement('p', '', 'resultTitle'));
    
    const bodyElement: HTMLElement | null = document.body;
    if (bodyElement !== null) {
        bodyElement.appendChild(newDiv);
    } else {
        console.error('Body element was not found');
    }
}


/**
 * This function will be called whenever the user types into the input field.
 * @param event The change event triggered by the input field.
 */
    function onChangeInput(event: Event): void{
        const inputValue = (event.target as HTMLInputElement).value;
        console.log('Input value:', inputValue);
        let reqUrl = baseUrl + `&q=${inputValue}`;
        getWeatherData(reqUrl);
    }

/**
 * Get (don’t show) the weather for the user’s entered location in the next 2 weeks.
 * @param url The URL to fetch weather data from.
 */
function getWeatherData(url:string): void{
    console.log(url )
    fetch(url)
    .then(response => {
        if (!response.ok) {
            setResultTitle(false, null);
            console.error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => {
        setResultTitle(true, data);
        console.log(data); 
        calcAvg(data);
    })
    .catch(error => {
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
function setResultTitle(succeeded: boolean, data: any): void {
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
 * Calculates the average temperature for each day of the week over the next 2 weeks.
 * @param {object} data - The weather data retrieved from the API.
 */
function calcAvg(data){
    avgValues = {};
    // Check if data and forecast forecastday exist before proceeding
    if (data?.forecast?.forecastday) {
        data.forecast.forecastday.forEach(day => {
            const date = new Date(day.date);
            const dayOfWeekStr = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayOfWeekIndex = date.getUTCDay();

            if (avgValues[dayOfWeekIndex]?.avgTemp !== undefined) {
                const prevAvgTemp = avgValues[dayOfWeekIndex].avgTemp;
                const newAvgTemp = (prevAvgTemp + day.day.avgtemp_c) / 2;
                avgValues[dayOfWeekIndex].avgTemp = parseFloat(newAvgTemp.toFixed(2));
                avgValues[dayOfWeekIndex].name = dayOfWeekStr;
                avgValues[dayOfWeekIndex].condition =  day.day?.condition; //TODO: CHECK IT
            }
            else{ // Initialize the avgTemp for the current day if it doesn't exist
                avgValues[dayOfWeekIndex] = {avgTemp: day.day.avgtemp_c};
            }
            //  console.log( day.day.condition.text, day.day.avgtemp_c );
        });
    }
    console.log( avgValues);
    buildWeatherCards();
}


function buildWeatherCards(): void{
    let cardsContainer:  HTMLElement | null= document.getElementById("cardsContainer");
    if(document.getElementById("cardsContainer") !== null ){
        (cardsContainer as HTMLElement ).innerHTML = "";
    }else{
        cardsContainer = getElement('div','', "cardsContainer" );
    } 

    Object.keys(avgValues).forEach(value=>{
        let card = buildWeatherCard(value);
        cardsContainer?.appendChild(card);
    })

    document.getElementById('weatherDiv')?.append(cardsContainer  as HTMLElement ); 

    function buildWeatherCard(value: any): HTMLElement{
        const card = getElement('div', avgValues[value].name, '', '', 'weatherCard');
        card.appendChild(getElement('img','','','','', 'https:' + avgValues[value]?.condition?.icon));
        card.appendChild(getElement('span', avgValues[value]?.condition?.text));
        card.appendChild(getElement('span', avgValues[value]?.avgTemp + "&deg"));
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
function getElement(tag: string, text: string, id?: string, type?: string,
    className?: string, src?: string, eventListener?: EventListener): HTMLElement  {
    const element = document.createElement(tag);
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
    if (src) {
        (element as HTMLImageElement ).src = src;
    }
    
    if (eventListener) {
        element.addEventListener('change', eventListener);
    }

    return element;
}
};