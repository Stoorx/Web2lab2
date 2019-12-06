const weatherApiByCity = (city) =>
    resolveToJson(
        apiFetch("?city=" + city)
    );

const weatherApiByCoords = (coords) =>
    resolveToJson(
        apiFetch("/coordinates?lat=" + coords.latitude + "&lon=" + coords.longitude)
    );

const weatherApiById = (id) =>
    resolveToJson(
        apiFetch("id=" + id)
    );


const apiFetch = (searchString) =>
    fetch("http://localhost:8080/weather" + searchString);

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

export {weatherApiByCity, weatherApiByCoords, weatherApiById};
