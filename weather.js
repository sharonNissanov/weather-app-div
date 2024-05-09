readData();
function readData(id = -1){

   
    
    const API_KEY = '2cc48dd34be6452386a130925240905';
    let inputData;
    let parentElement;
    let test = 'http://api.weatherapi.com/v1/current.json?key=2cc48dd34be6452386a130925240905&q=London&aqi=no'
    
    createWeatherElement();
    const baseUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=14&aqi=no`;
    let params = `&q=48.8567,2.3508`;
    console.log(baseUrl+params,   id  )
    getWeatherData(baseUrl+params)
    
//----------------------------------------------------------------------------------------------------

    // Set properties and attributes for the div element Append the new div to an existing element in the DOM or body
    function createWeatherElement(){
      
        const newDiv = document.createElement('div');
        newDiv.textContent = 'weather Div';
        newDiv.id = 'weatherDiv';
        addInput(newDiv)
        parentElement = getTargetElement();
        parentElement.appendChild(newDiv);
    }

    //return the target element
    function getTargetElement(){
        let valid = isValidId(id);
        return  valid ? document.getElementById(id) : document.body;
    }

    //return true if there's an element with the specified ids in the document.
    function isValidId(id) {
        // Check if the id is a non-empty string
        if (typeof id !== 'string' || id.trim() === '') {
            return false;
        } 
        return document.getElementById(id) !== null;
    }

    //Add input element TODO: DOCU
    function addInput(parentEle){
        const inputElement = document.createElement('input');
        inputElement.id = 'weatherInput';
        //add type = text
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


    function getWeatherData(url){
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

    // Get (don’t show) the weather for the user’s entered location in the next 2 weeks
    function getUserLocation(){

    }

    //For each day of the week, show the average temperature for the next 2 weeks.
    function calcAvg(data){
        let avgValues = [];
        let obj = {};
        if(data.forecast?.forecastday){
            data.forecast?.forecastday.forEach(day=>{
                let date = new Date(day.date);
                const dayOfWeekName = date.toLocaleDateString('en-US', { weekday: 'short' });
                console.log(date.getUTCDay(), ":",  day?.day?.avgtemp_c)
                if(obj[date.getUTCDay()] != undefined){
                    obj[date.getUTCDay()].avgTemp = (obj[date.getUTCDay()].avgTemp + day?.day?.avgtemp_c ) /2;
                }else{
                    obj[date.getUTCDay()] = {avgTemp : day?.day?.avgtemp_c }
                }
             
                obj[date.getUTCDay()].avgTemp = parseFloat( obj[date.getUTCDay()].avgTemp.toFixed(2));
               // console.log(dayOfWeekName,) ; // Output: Tuesday

            });
        }
        console.log( obj);
    }

    //create Weather Cards
    function createWeatherCard(){

    }

};