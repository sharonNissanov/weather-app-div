
(function readData(id = -1){
    
    const API_KEY = '2cc48dd34be6452386a130925240905';
    let inputData;
    let test = 'http://api.weatherapi.com/v1/current.json?key=2cc48dd34be6452386a130925240905&q=London&aqi=no'
    console.log(111111, test,   id )

    let baseUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=London&aqi=no`;

   
    fetch(baseUrl)
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

    function isValidId(){

    }

    function addInput(){

    }

    function onChangeInput(){

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
})();