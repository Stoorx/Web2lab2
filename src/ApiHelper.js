const apiKey = "689a901bd72a2a9653fbcdaea1ffafd5";

const weatherApiByCity = (city) =>
    resolveToJson(
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&lang=ru", {
            mode: 'cors',
            method: 'GET'
        })
    );

const weatherApiByCoords = (coords) =>
    resolveToJson(
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat=" + coords.latitude
            + "&lon=" + coords.longitude + "&appid=" + apiKey + "&lang=ru",
            {
                mode: 'cors',
                method: 'GET'
            })
    );

const resolveToJson = (weatherPromise) =>
    weatherPromise.then(
        (response) => {
            return response;
        },
        (e) => {
            console.log(e);
        }
    ).then(
        async (response) => {
            let json = await response.json().then((json) => {
                return json;
            });
            if (response.ok) {
                return {status: "ok", response: json}
            } else {
                return {status: "fail", response: json}
            }
        }
    );
const parseData = (res) =>
    [
        {key: "Ветер", value: res.wind.speed + " m/s" + (res.wind.deg ? (", " + res.wind.deg + "°") : "")},
        {key: "Облачность", value: res.weather[0].description},
        {key: "Давление", value: res.main.pressure + " hPa"},
        {key: "Влажность", value: res.main.humidity + " %"},
        {key: "Координаты", value: res.coord.lat + ", " + res.coord.lon},
    ];


export {weatherApiByCity, weatherApiByCoords, parseData};
