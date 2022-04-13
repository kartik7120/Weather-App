const btn = document.querySelector("#btn");
const cityName = document.querySelector("#city");
const apiKey = "oVcWaAx5KMpN1vwT7m5KYdEZZkpSC84R";
const ul = document.querySelector("#WeatherInformation");
let cityObject; let cityKey;
const LinkDiv = document.querySelector("#WeatherLinks");
const cityHead = document.querySelector("#LocalizedName");
const WeatherDescription = document.querySelector("#WeatherDescription");
const card = document.querySelector("#card");
const icon = document.querySelector("#Icon");
const displayDate = document.querySelector("#Date");
const geolocation = document.querySelector("#geolocation");
const pressure = document.querySelector("#Pressure");
const windDirectionAngle = document.querySelector("#windDirectionAngle");
const windDirectionCompass = document.querySelector("#windDirectionCompass");
const rightWidget = document.querySelector("#Right-Widgit");
const longPhraseDayText = document.querySelector("#LongPhraseDay");
const longPhraseNightText = document.querySelector("#LongPhraseNight");
const rain = document.querySelector("#rain");
const snow = document.querySelector("#snow");
const evaporation = document.querySelector("#evaporation");
const windGust = document.querySelector("#windGust");
const DayOneDayForecast = document.querySelector("#DayOneDayForecast");
const NightOneDayForeCast = document.querySelector("#NightOneDayForecast");
const rainNight = document.querySelector("#rainNight");
const snowNight = document.querySelector("#snowNight");
const evaporationNight = document.querySelector("#evaporationNight");
const windGustNight = document.querySelector("#windGustNight");
const DayOneDayForecastNight = document.querySelector("#DayOneDayForecastNight");

window.onload = () => {
    if (localStorage.getItem("cityName")) {
        cityName.value = localStorage.getItem("cityName");
        btn.click();
    }
}

btn.addEventListener("click", async (e) => {
    e.stopPropagation();

    if (ul.children.length > 0) {
        const l = ul.children;
        for (let ele of l) {
            ele.remove();
        }
    }

    try {
        const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName.value}&offset=1`)
        const cityJSON = await response.json();
        cityObject = cityJSON[0];
        console.log("GROUP ->", cityObject);
        console.log(cityObject.LocalizedName);
        cityKey = cityObject.Key;
        console.log("CITY KEY = ", cityKey);
        const type = cityObject.Type;
        // console.log(cityKey);
        const response2 = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}&details=true&type=${type}`, { mode: 'cors' })
        console.log(response2);
        const cityWeather = await response2.json();
        console.log(cityWeather);
        console.log("IsDayTime", cityWeather[0].IsDayTime);
        const IsDayTime = cityWeather[0].IsDayTime;
        const li1 = document.createElement("li");
        const li2 = document.createElement("li");
        const li3 = document.createElement("li");
        const li4 = document.createElement("li");
        const li5 = document.createElement("li");
        const li6 = document.createElement("li");
        const li7 = document.createElement("li");
        const li8 = document.createElement("li");
        const li9 = document.createElement("li");
        const li10 = document.createElement("li");
        // LocalObservationDateTime
        weatherIconNumber = cityWeather[0].WeatherIcon;
        // console.log(cityWeather[0].EpochTime);
        const date = new Date(cityWeather[0].EpochTime * 1000);
        // console.log(weatherIconNumber);
        displayDate.textContent = `${date}`;
        // console.log(cityWeather[0].ApparentTemperature.Imperial.Value, cityWeather[0].ApparentTemperature.Imperial.Unit);
        li1.textContent = `Temperature : ${cityWeather[0].ApparentTemperature.Imperial.Value} `;
        li1.innerHTML += `<img src="/icons/fahrenheit.gif" class="img-fluid" id="unit" alt="A gif of a son"> / ${cityWeather[0].ApparentTemperature.Metric.Value} <img src="/icons/celsius.gif" class="img-fluid" id="unit" alt="A gif of a son">`;

        li5.textContent = `Relative Humidity : ${cityWeather[0].RelativeHumidity}`;
        li5.innerHTML += ` <img src="/icons/drop.gif" class="img-fluid" id="unit" alt="A gif of a son">`
        li8.textContent = `CloudCover : ${cityWeather[0].CloudCover}`;
        li8.innerHTML += ` <img src="/icons/clouds.gif" class="img-fluid" id="unit" alt="A gif of a son">`;
        const DesktopLink = cityWeather[0].Link;
        const MoblieLink = cityWeather[0].MoblieLink;
        li6.innerHTML = `<a href="${DesktopLink}">Desktop Link</a>`; //cityWeather[0].Link
        li1.setAttribute("class", "list-group-item");
        li2.setAttribute("class", "list-group-item");
        li3.setAttribute("class", "list-group-item");
        li4.setAttribute("class", "list-group-item");
        li5.setAttribute("class", "list-group-item");
        li6.setAttribute("class", "list-group-item");
        li7.setAttribute("class", "list-group-item");
        li8.setAttribute("class", "list-group-item");
        li9.setAttribute("class", "list-group-item");
        li10.setAttribute("class", "list-group-item");
        cityHead.textContent = cityObject.LocalizedName;

        WeatherDescription.textContent = cityWeather[0].WeatherText;

        if (IsDayTime === true) {
            WeatherDescription.innerHTML += '<br>DayTime ';
        }
        else {
            WeatherDescription.innerHTML += "<br>NightTime";
        }
        // Geolocation
        // console.log(cityJSON[0].GeoPosition);
        const latitude = cityJSON[0].GeoPosition.Latitude;
        const longitude = cityJSON[0].GeoPosition.Longitude;
        geolocation.textContent = `Latitude : ${latitude} Longitude : ${longitude}`;
        windDirectionAngle.textContent = `Wind Direction :${cityWeather[0].Wind.Direction.English}`;
        windDirectionCompass.textContent = `Wind Angle : ${cityWeather[0].Wind.Direction.Degrees}°`;
        pressure.textContent = `Pressure : ${cityWeather[0].Pressure.Imperial.Value} ${cityWeather[0].Pressure.Imperial.Unit}`;
        // li2.textContent = `Temperature = ${ cityWeather[0].WeatherIcon }`;
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li5);
        ul.appendChild(li8);
        ul.appendChild(li6);

        if (!card.offsetParent) {
            card.removeAttribute("class");
            card.setAttribute("class", "card visible weather");
        }
        console.log(rightWidget.offsetParent);
        if (!rightWidget.offsetParent) {
            rightWidget.removeAttribute("class");
            rightWidget.setAttribute("class", "card text-center weather");
        }

        if (IsDayTime) {
            icon.innerHTML = '<img src="/Nicons/sun.png" class="img-fluid" alt="A image of a sun">';
        }
        else
            icon.innerHTML = `<img src="/Nicons/night-mode.png" class="img-fluid" alt="A image of a moon">`;

        const response3 = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=${apiKey}&details=${true}&metric=${true}`, { mode: "cors" });

        const dailyReport = await response3.json();

        // console.log("Daily report = ", dailyReport);
        // console.log(dailyReport.DailyForecasts[0].Day);
        const dayForecast = dailyReport.DailyForecasts[0].Day;
        const nightForecast = dailyReport.DailyForecasts[0].Night;
        // console.log("Day Forecast =", dayForecast);
        // console.log("Night Forecast =", nightForecast);
        const EvaporationTranspirationValue = dayForecast.Evapotranspiration.Value;
        const EvaporationTranspirationUnit = dayForecast.Evapotranspiration.Unit;
        const longPhrase = dayForecast.LongPhrase;
        // console.log(longPhrase);
        const rainValue = dayForecast.Rain.Value;
        const rainUnit = dayForecast.Rain.Unit;

        if (!DayOneDayForecast.offsetParent) {
            DayOneDayForecast.removeAttribute("class");
            DayOneDayForecast.setAttribute("class", "card text-center weather mt-5 bottom-widget");
        }

        const snowValue = dayForecast.Snow.Value;
        const snowUnit = dayForecast.Snow.Unit;

        const iconPhrase = dayForecast.IconPhrase;
        // console.log(iconPhrase);

        const WindGustDirection = `${dayForecast.WindGust.Direction.Degrees} ${dayForecast.WindGust.Direction.English}`;
        const WindGustSpeed = `${dayForecast.WindGust.Speed.Value} ${dayForecast.WindGust.Speed.Unit}`;

        const EvaporationTranspirationNight = nightForecast.Evapotranspiration;
        const EvaporationTranspirationValueNight = EvaporationTranspirationNight.Value;
        const EvaporationTranspirationUnitNight = EvaporationTranspirationNight.Unit;
        // console.log(EvaporationTranspirationUnitNight);
        // console.log(EvaporationTranspirationValueNight);
        const longPhraseNight = nightForecast.LongPhrase;
        // console.log(longPhraseNight);
        const rainValueNight = nightForecast.Rain.Value;
        const rainUnitNight = nightForecast.Rain.Unit;

        const snowValueNight = nightForecast.Snow.Value;
        const snowUnitNight = nightForecast.Snow.Unit;

        const iconPhraseNight = nightForecast.IconPhrase;
        // console.log(iconPhraseNight);

        longPhraseDayText.textContent = `${longPhrase}`;
        longPhraseNightText.textContent = `${longPhraseNight}`;

        const WindGustNight = nightForecast.WindGust;
        const WindGustDirectionNight = `${WindGustNight.Direction.Degrees} ${WindGustNight.Direction.English}`;
        const WindGustSpeedNight = `${WindGustNight.Speed.Value} ${WindGustNight.Speed.Unit}`;

        rain.innerHTML = `Rain :${rainValue} ${rainUnit}`;
        snow.innerHTML = `Snow :${snowValue} ${snowUnit}`;
        evaporation.innerHTML = `EVP: ${EvaporationTranspirationValue} ${EvaporationTranspirationUnit}`;
        windGust.innerHTML = `Wind : ${WindGustSpeed} ${WindGustDirection}`;

        rainNight.innerHTML = `Rain :${rainValueNight} ${rainUnitNight}`;
        snowNight.innerHTML = `Snow :${snowValueNight} ${snowUnitNight}`;
        evaporationNight.innerHTML = `EVP: ${EvaporationTranspirationValueNight} ${EvaporationTranspirationUnitNight}`;
        windGustNight.innerHTML = `Wind : ${WindGustSpeedNight} ${WindGustDirectionNight}`;

        if (!NightOneDayForeCast.offsetParent) {
            NightOneDayForeCast.removeAttribute("class");
            NightOneDayForeCast.setAttribute("class", "card text-center weather mt-5 bottom-widget");
        }

        localStorage.setItem("name", "kaartik");
        console.log(localStorage.getItem("name"));
        if (cityName.value) {
            localStorage.setItem("cityName", `${cityName.value}`);
            console.log(localStorage.getItem("cityName"));
        }

    } catch (error) {
        console.log(error);
    }
})
