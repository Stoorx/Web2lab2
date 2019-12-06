import {weatherApiByCity, weatherApiByCoords, weatherApiById} from './ApiHelper';


export class Actions {
    static AddFavoriteCity = Symbol("Add favorite city");
    static DeleteFavoriteCity = Symbol("Delete favorite city");
    static LoadFavoriteCities = Symbol("Load favorite cities");
    static UpdateGeolocation = Symbol("Update geoLocation");
    static SetGeolocationError = Symbol("Update geoLocation");
}

export const actionAddFavoriteCity = (city) =>
    ({type: Actions.AddFavoriteCity, data: city});

export const actionDeleteFavoriteCity = (city) =>
    ({type: Actions.DeleteFavoriteCity, data: city});

export const actionLoadFavoriteCities = (cities) => {
    return ({type: Actions.LoadFavoriteCities, cities: cities})
};

export const actionUpdateGeolocation = (position) =>
    ({type: Actions.UpdateGeolocation, position: position});

export const actionSetGeolocationError = (error) =>
    ({type: Actions.SetGeolocationError, error: error});

export function doAddFavoriteCity(city) {
    return (dispatch, getState) => {
        if (getState().favoriteCities.indexOf(city) !== -1)
            return false;

        dbAdd(city);
        dispatch(actionAddFavoriteCity(city));
        return true;
    }
}

function dbDelete(city) {
    fetch("http://localhost:8080/favorites",
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: city})
        }
    )
}

function dbAdd(city) {
    fetch("http://localhost:8080/favorites",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: city})
        }
    )
}

export async function dbFetch() {
    return await fetch("http://localhost:8080/favorites").then(
        async (res) => {
            const json = await res.json();
            return json.map((el) => el.name);
        }
    );
}


export function doDeleteFavoriteCity(city) {
    return (dispatch, getState) => {
        dbDelete(city);
        dispatch(actionDeleteFavoriteCity(city));
    }
}

export function doGetGeolocation() {
    return (dispatch, getState) =>
        new Promise(
            (res, rej) => {
                if (getState().position) {
                    res(getState().position);
                } else {
                    dispatch(doUpdateGeolocation());
                    res(getState().position);
                }
            }
        );
}

export function doUpdateGeolocation() {
    return (dispatch) =>
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                dispatch(actionUpdateGeolocation(pos.coords));
                dispatch(actionSetGeolocationError(undefined));
            },
            (err) => {
                dispatch(actionUpdateGeolocation({latitude: 59.94, longitude: 30.32}));
                dispatch(actionSetGeolocationError(err.message));
            }
        )

}

export const doGetWeatherData = (query) =>
    (dispatch, getState) => {
        if (query.id) {
            return weatherApiById(query.id);
        }
        if (query.coords) {
            return weatherApiByCoords(query.coords.position);
        }
        if (query.city) {
            return weatherApiByCity(query.city);
        }
    };


