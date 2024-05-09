readData('sharon');
function readData(id = -1){
    
    let valid = isValidId(id);
    const API_KEY = '2cc48dd34be6452386a130925240905';
    let inputData;
    let test = 'http://api.weatherapi.com/v1/current.json?key=2cc48dd34be6452386a130925240905&q=London&aqi=no'
    

    //let baseUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}`;
    let baseUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}`;
    //let params = `&q=London&aqi=no`;
    let params = `&q=48.8567,2.3508&aqi=no&days=14`;
    console.log(baseUrl+params,   id , valid )
    getWeatherData(baseUrl+params)
    

    //gets an id and return true if there is an ele with this id
    function isValidId(id){
        if(id == null  || id == undefined)
            return false;
        if(document.getElementById(id) || null ){
            return true
        }
        return false;
    }

    function addInput(){

    }

    function onChangeInput(){

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
        })
        .catch(error => {
            console.error('ERROR:', error);
        });
    }
    // Get (don’t show) the weather for the user’s entered location in the next 2 weeks
    function getUserLocation(){

    }

    //For each day of the week, show the average temperature for the next 2 weeks.
    function calcAvg(){

    }

    //create Weather Cards
    function createWeatherCard(){

    }

};