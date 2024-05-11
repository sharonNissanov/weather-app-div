readData();
function readData() :void{
    let avgValues = {};
    //const urlParams = new URLSearchParams(window.location.search);
    const API_KEY: string = '2cc48dd34be6452386a130925240905';
    const baseUrl:string = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=14&aqi=no`;
   // var id = urlParams.get('divId');
   // console.log(id)
    
    createWeatherElement();
   // let params = `&q=${id}`;
    

    // Set properties and attributes for the div element Append the new div to an existing element in the DOM or body
    function createWeatherElement() : void{
        const newDiv = document.createElement('div');
        newDiv.id = 'weatherDiv';
        addLabel(newDiv);
        addInput(newDiv);
        let bodyElement: HTMLElement | null = document.getElementsByTagName('body')[0];
        if(bodyElement !== null){
            bodyElement.appendChild(newDiv);
        }
      //else error
    }

    function addLabel(parentEle): void{
        const label = document.createElement('label');
        label.textContent = 'Please enter the wanted location';
        parentEle.appendChild(label);
    }

    //Add input element TODO: DOCU
    function addInput(parentEle): void{
        const inputElement = document.createElement('input');
        inputElement.id = 'weatherInput';
        inputElement.type = 'text';
        //Add an event listener to the input element
        inputElement.addEventListener('change', onChangeInput);
        parentEle.appendChild(inputElement);
    }

    function onChangeInput(event){
        // This function will be called whenever the user types into the input field
        const inputValue = event.target.value;
        console.log('Input value:', inputValue);
        let reqUrl = baseUrl + `&q=${inputValue}`;
        getWeatherData(reqUrl);
    }

     // Get (don’t show) the weather for the user’s entered location in the next 2 weeks
    function getWeatherData(url:string){
        console.log(url )
        fetch(url)
        .then(response => {
          
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .then(data => {
            console.log(data); 
            calcAvg(data)
        })
        .catch(error => {
            //add error message
            console.error('ERROR:', error);
        });
    }

   
    //For each day of the week, show the average temperature for the next 2 weeks.
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
                console.log( day.day.condition.text, day.day.avgtemp_c );
            });
        }
        console.log( avgValues);
        buildWeatherCards();
    }

    //create Weather Cards container 
    function buildWeatherCards(): void{
        let cardsContainer:  HTMLElement | null= document.getElementById("cardsContainer");
        if(document.getElementById("cardsContainer") !== null ){
            (cardsContainer as HTMLElement ).innerHTML = "";
        }else{
            cardsContainer = document.createElement('div');
            cardsContainer.id = "cardsContainer";
        } 

        Object.keys(avgValues).forEach(value=>{
            let card = buildWeatherCard(value);
            cardsContainer?.appendChild(card);
        })

       document.getElementById('weatherDiv')?.append(cardsContainer  as HTMLElement ); 

       function buildWeatherCard(value: any): HTMLDivElement{
        let card = document.createElement('div');
        card.className = 'weatherCard';
        card.textContent = avgValues[value].name;
        card.appendChild(getIcon(value));
        card.appendChild(getDesc(value));
        card.appendChild(getTemp(value));
        return card;
       }

       function getIcon(value): HTMLImageElement {
        let icon = document.createElement('img');
        icon.src = 'https:' + avgValues[value]?.condition?.icon;
        return icon;
       }

       function getDesc(value): HTMLSpanElement{
        let desc = document.createElement('span');
        desc.innerHTML = avgValues[value]?.condition?.text;
        return desc;
       }

       function getTemp(value): HTMLSpanElement{
        let desc = document.createElement('span');
        desc.innerHTML = avgValues[value]?.avgTemp + "&deg";
        return desc;
       }
    }
  
};
