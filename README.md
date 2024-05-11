# weather-app-div
 

# Dynamic Weather Display

The main JavaScript function allows you to create a dynamic weather display on a webpage. It fetches weather data from an API and calculates the average temperature for each day of the week. Then, it constructs weather cards for the upcoming 7 days starting from the current date, displaying weather icons, descriptions, and temperatures.

# Features
User-Friendly Interface: Provides an intuitive interface for users to enter their location and view weather forecasts.
Real-Time Data: Fetches weather data from the Weather API, ensuring up-to-date information.
Dynamic Display: Dynamically updates the weather display based on user input and fetched data.
Responsive Design: Adapts to different screen sizes and devices for a seamless viewing experience.
Error Handling: Handles errors gracefully and provides informative messages to users.

# Usage
1. Run the index.html file to see the project in action on your computer.
2. Include the buildDynamicWeatherDiv() function in your JavaScript code.
Call buildDynamicWeatherDiv() to create the weather display element on your webpage.

# How it Works
Creating Weather Element: The createWeatherElement() function creates a weather element containing input and result sections for users to enter their location and view the weather forecast.

Fetching Weather Data: The getWeatherData() function fetches weather data from the Weather API based on the user's location input. It handles errors and displays appropriate messages.

Setting Result Title: The setResultTitle() function sets the title based on the success of fetching weather data.

Calc the avarage temperature for the next 2 weeks: The calcAvgTemp() function calculates the average temperature for each day of the week.

Creating Weather Cards: The buildWeatherCardsByCurrDate() function builds weather cards for the upcoming 7 days starting from the current date index.

Creating Weather Card: The buildWeatherCard() function constructs a weather card element for a specific day, including weather icon, description, and temperature.


Creating HTML Elements: The getElement() function creates HTML elements with optional properties and attributes.

# Function Signatures
buildDynamicWeatherDiv(): void: Builds the dynamic weather display element on the webpage.
createWeatherElement(): void: Creates the weather element containing input and result sections.
onChangeInput(event: Event): void: Handles input change events triggered by the location input field.
getWeatherData(url: string): void: Fetches weather data from the Weather API based on the provided URL.
setResultTitle(succeeded: boolean, data: WeatherData | null): void: Sets the title based on the success of fetching weather data.
calcAvgTemp(data: WeatherData): void: Calculates the average temperature for each day of the week.
buildWeatherCardsByCurrDate(data: WeatherData): void: Builds weather cards for the upcoming 7 days starting from the current date.
buildWeatherCard(dayOfWeekStr: string, imgSrc: string, text: string, avgTemp: number): HTMLElement: Constructs a weather card element for a specific day.
getElement(tag: string, text: string, id?: string, type?: string, className?: string, src?: string, eventListener?: EventListener): HTMLElement: Creates an HTML element with optional properties and attributes.

# Weather Data Type
The WeatherData type represents the structure of the weather data retrieved from the Weather API.
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
        // Current weather data fields...
    };
    forecast: {
        forecastday: {
            date: string;
            // Forecast day data fields...
        }[];
    };
};

# Requirements
Internet connection to fetch weather data from the Weather API.
Access to the Weather API with a valid API key.
Feel free to customize and integrate this dynamic weather display into your web projects!

