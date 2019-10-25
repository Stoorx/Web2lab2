const apiKey = "689a901bd72a2a9653fbcdaea1ffafd5";

const weatherApi = (city) =>
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey, {
        mode: 'cors',
        method: 'GET'
    }).then(
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
        {key: "Ветер", value: res.wind.speed + " m/s, " + res.wind.deg + "°"},
        {key: "Облачность", value: res.weather[0].description},
        {key: "Давление", value: res.main.pressure + " hPa"},
        {key: "Влажность", value: res.main.humidity + " %"},
        {key: "Координаты", value: res.coord.lat + ", " + res.coord.lon},
    ];

export {weatherApi, parseData};
