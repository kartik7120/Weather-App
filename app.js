const btn = document.querySelector("#btn");
const cityName = document.querySelector("#city");
const apiKey = "QLbc1nElAQlOl4nxKAUcn34GgAi8pgay";
const ul = document.querySelector("#WeatherInformation");
let cityObject; let cityKey;

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
        cityKey = cityObject.Key;
        const type = cityObject.Type;
        // console.log(cityKey);
        const response2 = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}&details=true&type=${type}`, { mode: 'cors' })
        console.log(response2);
        const cityWeather = await response2.json();
        console.log(cityWeather);
        const li1 = document.createElement("li");
        const li2 = document.createElement("li");
        console.log(cityWeather[0].ApparentTemperature.Imperial.Value, cityWeather[0].ApparentTemperature.Imperial.Unit);
        li1.textContent = `Temperature = ${cityWeather[0].ApparentTemperature.Imperial.Value} ${cityWeather[0].ApparentTemperature.Imperial.Unit}`;
        // li2.textContent = `Temperature = ${cityWeather[0].WeatherIcon}`;
        ul.appendChild(li1);
        // ul.appendChild(li2);
    } catch (error) {
        console.log(error);
    }
})

// 0:
// ApparentTemperature:
// Imperial: {Value: 94, Unit: 'F', UnitType: 18}
// Metric: {Value: 34.4, Unit: 'C', UnitType: 17}
// [[Prototype]]: Object