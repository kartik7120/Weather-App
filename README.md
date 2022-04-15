# Weather-App

A simple weather app using [AccuWeather API](https://developer.accuweather.com/)

## Features of the app

The app requires you to enter the **name** of your city and it will show current weather report of the city and Day One forecast of the weather of the city

The app shows the current temperature of the city in degree celcius or farenheit , Relative Humidity , Cloud cover
wind speed , wind direction , pressure etc including day one forecast of the city.

The app will remember the last city that was entered by the user and when the user returns to the app . Automatically a API call using the last entered city will be made to display the updated weather report of the last entered city by using **localStorage** API

## How to use the app

First you need to register yourself using your Email on the [AccuWeather API](https://developer.accuweather.com/) home page.

After registering yourself you need to go to [My Apps](https://developer.accuweather.com/user/me/apps) section of the API and click on the Add a new App to gererate a API key so that you can use the API to fetch data .

> 📝 No API key will be provided for the App and you need to use your own

Once that is complete then copy your API key and headover to [App.js](public/app.js) file fill the value of the apikey variable with your API key . After this is done then open your terminal and type the command `npm start` to start the app.

Head over to [LocalHost 3000](http://localhost:3000/) to view the app and start using it !
