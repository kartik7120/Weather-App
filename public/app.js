const btn = document.querySelector("#btn");
const cityName = document.querySelector("#city");
const apiKey = "QLbc1nElAQlOl4nxKAUcn34GgAi8pgay";
const ul = document.querySelector("#WeatherInformation");
let cityObject; let cityKey;
const LinkDiv = document.querySelector("#WeatherLinks");
const cityHead = document.querySelector("#LocalizedName");
const WeatherDescription = document.querySelector("#WeatherDescription");
const card = document.querySelector("#card");
const icon = document.querySelector("#Icon");
// const Icon = document.querySelector("#Icon");
// console.log(icons);

// const cityData = btn.addEventListener("click", async function (e) {
//     const city = cityName.value;
//     const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}&offset=1`)
//         .then((response) => {
//             return response.json();
//             // const data = await response.json()

//             //     .catch((err) => {
//             //         console.log("JSON CANNOT BE PARSED");
//             //     })
//         }).then((d) => {
//             // console.log("YOUR WEATHER INFORMATION");
//             // console.log(d[0].Country.EnglishName);
//             // console.log(d[0]);
//             console.log(d[0].Key);
//             cityObject = d[0];
//             cityKey = d[0].Key;
//             return fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`, { mode: 'no-cors' })
//         }).then((response) => {
//             return response.json();
//         }).then((d) => {s
//             console.log(d);
//         })
//         .catch((err) => {
//             console.log("OH NO ERROR", err);
//         })
// })

btn.addEventListener("click", async () => {
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
        console.log(weatherIconNumber);
        console.log(cityWeather[0].ApparentTemperature.Imperial.Value, cityWeather[0].ApparentTemperature.Imperial.Unit);
        li1.textContent = `Temperature = ${cityWeather[0].ApparentTemperature.Imperial.Value} `;
        li1.innerHTML += `<img src="/icons/fahrenheit.gif" class="img-fluid" id="unit" alt="A gif of a son">`;

        // li3.textContent = `Weather Text = ${cityWeather[0].WeatherText}`;
        // li4.textContent = `Wind Speed= ${cityWeather[0].Wind.Speed.Imperial.Value} ${cityWeather[0].Wind.Speed.Imperial.Unit}`;
        li5.textContent = `Relative Humidity = ${cityWeather[0].RelativeHumidity}`;
        // li7.textContent = `Pressure = ${cityWeather[0].Pressure.Imperial.Value} ${cityWeather[0].Pressure.Imperial.Unit}`;
        li8.textContent = `CloudCover = ${cityWeather[0].CloudCover}`;
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
            WeatherDescription.innerHTML += '<br>DayTime <img src="/icons/drop.gif" class="img-fluid" id="unit" alt="A gif of a son">';
        }
        else {
            WeatherDescription.innerHTML += "<br>NightTime";
        }


        // li2.textContent = `Temperature = ${ cityWeather[0].WeatherIcon }`;
        ul.appendChild(li1);
        ul.appendChild(li2);
        // ul.appendChild(li3);
        // ul.appendChild(li4);
        ul.appendChild(li5);
        // ul.appendChild(li7);
        ul.appendChild(li8);
        // ul.appendChild(li9);
        // ul.appendChild(li10);
        LinkDiv.appendChild(li6);
        console.log(card.offsetParent);
        if (!card.offsetParent) {
            // card.removeAttribute("style");
            card.removeAttribute("class");
            card.setAttribute("class", "card visible");
            // card.setAttribute("style", "width:18rem; display:block; transition-timing-function: linear; transition-duration: 2s;");
        }

        if (IsDayTime) {

            icon.innerHTML = '<img src="/icons/sun.gif" class="img-fluid" alt="A gif of a son">';
        }
        else
            icon.innerHTML = `<img src="/icons/night.gif" class="img-fluid" alt="A gif of a son">`

        // ul.appendChild(li2);

        // const response3 = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=${apiKey}&details=${true}&metric=${true}`, { mode: "cors" });

        // const dailyReport = await response3.json();

        console.log("Daily report = ", dailyReport);
    } catch (error) {
        console.log(error);
    }
})

// 0:
// ApparentTemperature:
// Imperial: {Value: 94, Unit: 'F', UnitType: 18}
// Metric: {Value: 34.4, Unit: 'C', UnitType: 17}
// [[Prototype]]: Object