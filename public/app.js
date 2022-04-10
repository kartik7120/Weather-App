const btn = document.querySelector("#btn");
const cityName = document.querySelector("#city");
const apiKey = "9LDZCGAhV1B7GMrny04G6FvuILTAD5DS";
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

btn.addEventListener("click", async (e) => {
    e.stopPropagation();
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
        console.log(cityWeather[0].EpochTime);
        const date = new Date(cityWeather[0].EpochTime * 1000);
        console.log(weatherIconNumber);
        displayDate.textContent = `${date}`;
        console.log(cityWeather[0].ApparentTemperature.Imperial.Value, cityWeather[0].ApparentTemperature.Imperial.Unit);
        li1.textContent = `Temperature : ${cityWeather[0].ApparentTemperature.Imperial.Value} `;
        li1.innerHTML += `<img src="/icons/fahrenheit.gif" class="img-fluid" id="unit" alt="A gif of a son"> / ${cityWeather[0].ApparentTemperature.Metric.Value} <img src="/icons/celsius.gif" class="img-fluid" id="unit" alt="A gif of a son">`;

        // li3.textContent = `Weather Text = ${cityWeather[0].WeatherText}`;
        // li4.textContent = `Wind Speed= ${cityWeather[0].Wind.Speed.Imperial.Value} ${cityWeather[0].Wind.Speed.Imperial.Unit}`;
        li5.textContent = `Relative Humidity : ${cityWeather[0].RelativeHumidity}`;
        li5.innerHTML += ` <img src="/icons/drop.gif" class="img-fluid" id="unit" alt="A gif of a son">`
        // li7.textContent = `Pressure = ${cityWeather[0].Pressure.Imperial.Value} ${cityWeather[0].Pressure.Imperial.Unit}`;
        li8.textContent = `CloudCover : ${cityWeather[0].CloudCover}`;
        li8.innerHTML += ` <img src="/icons/clouds.gif" class="img-fluid" id="unit" alt="A gif of a son">`;
        // li9.textContent = `Wind Direction = ${cityWeather[0].Wind.Direction.Degrees}° ${cityWeather[0].Wind.Direction.English}`;
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
        console.log(cityJSON[0].GeoPosition);
        const latitude = cityJSON[0].GeoPosition.Latitude;
        const longitude = cityJSON[0].GeoPosition.Longitude;
        geolocation.textContent = `Latitude : ${latitude} Longitude : ${longitude}`;
        windDirectionAngle.textContent = `Wind Angle :${cityWeather[0].Wind.Direction.English}`;
        windDirectionCompass.textContent = `Wind Direction : ${cityWeather[0].Wind.Direction.Degrees}°`;
        pressure.textContent = `Pressure : ${cityWeather[0].Pressure.Imperial.Value} ${cityWeather[0].Pressure.Imperial.Unit}`;
        // li2.textContent = `Temperature = ${ cityWeather[0].WeatherIcon }`;
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li5);
        ul.appendChild(li8);
        ul.appendChild(li6);
        if (!card.offsetParent) {
            card.removeAttribute("class");
            card.setAttribute("class", "card visible");
        }
        console.log(rightWidget.offsetParent);
        if (!rightWidget.offsetParent) {
            rightWidget.removeAttribute("class");
            rightWidget.setAttribute("class", "card text-center");
        }

        if (IsDayTime) {
            icon.innerHTML = '<img src="/icons/sun.gif" class="img-fluid" alt="A gif of a son">';
        }
        else
            icon.innerHTML = `<img src="/icons/night.gif" class="img-fluid" alt="A gif of a son">`;

        const response3 = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=${apiKey}&details=${true}&metric=${true}`, { mode: "cors" });

        const dailyReport = await response3.json();

        // console.log("Daily report = ", dailyReport);
        console.log(dailyReport.DailyForecasts[0].Day);
        const dayForecast = dailyReport.DailyForecasts[0].Day;
        const nightForecast = dailyReport.DailyForecasts[0].Night;
        console.log("Day Forecast =", dayForecast);
        console.log("Night Forecast =", nightForecast);
        const EvaporationTranspiration = dayForecast.Evapotranspiration;
        const EvaporationTranspirationValue = EvaporationTranspiration.Value;
        const EvaporationTranspirationUnit = EvaporationTranspiration.Unit;
        console.log(EvaporationTranspirationUnit);
        console.log(EvaporationTranspirationValue);
        const longPhrase = dayForecast.LongPhrase;
        console.log(longPhrase);
        const rain = dayForecast.Rain;
        const rainValue = rain.Value;
        const rainUnit = rain.Unit;
        console.log(rainUnit, rainValue);

        const snow = dayForecast.Snow;
        const snowValue = snow.Value;
        const snowUnit = snow.Unit;
        console.log(snowValue, snowUnit);

        const iconPhrase = dayForecast.IconPhrase;
        console.log(iconPhrase);

        const WindGust = dayForecast.WindGust;
        console.log("WindGust = ", WindGust);
        const WindGustDirection = `${WindGust.Direction.Degrees} ${WindGust.Direction.English}`;
        const WindGustSpeed = `${WindGust.Speed.Value} ${WindGust.Speed.Unit}`;
        console.log(WindGustDirection, WindGustSpeed);

        const EvaporationTranspirationNight = nightForecast.Evapotranspiration;
        const EvaporationTranspirationValueNight = EvaporationTranspirationNight.Value;
        const EvaporationTranspirationUnitNight = EvaporationTranspirationNight.Unit;
        console.log(EvaporationTranspirationUnitNight);
        console.log(EvaporationTranspirationValueNight);
        const longPhraseNight = nightForecast.LongPhrase;
        console.log(longPhraseNight);
        const rainNight = nightForecast.Rain;
        const rainValueNight = rainNight.Value;
        const rainUnitNight = rainNight.Unit;
        console.log(rainUnitNight, rainValueNight);

        const snowNight = nightForecast.Snow;
        const snowValueNight = snowNight.Value;
        const snowUnitNight = snowNight.Unit;
        console.log(snowValueNight, snowUnitNight);

        const iconPhraseNight = nightForecast.IconPhrase;
        console.log(iconPhraseNight);

        longPhraseDayText.textContent = `${longPhrase}`;
        longPhraseNightText.textContent = `${longPhraseNight}`;

        const WindGustNight = nightForecast.WindGust;
        console.log("WindGust = ", WindGust);
        const WindGustDirectionNight = `${WindGustNight.Direction.Degrees} ${WindGustNight.Direction.English}`;
        const WindGustSpeedNight = `${WindGustNight.Speed.Value} ${WindGustNight.Speed.Unit}`;
        console.log(WindGustDirectionNight, WindGustSpeedNight);

    } catch (error) {
        console.log(error);
    }
})
