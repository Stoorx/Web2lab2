import {weatherApiByCity, weatherApiByCoords, weatherApiById} from './ApiHelper';


export class Actions {
    static AddFavoriteCity = Symbol("Add favorite city");
    static DeleteFavoriteCity = Symbol("Delete favorite city");
    static UpdateGeolocation = Symbol("Update geoLocation");
    static SetGeolocationError = Symbol("Update geoLocation");
}

export const actionAddFavoriteCity = (city) =>
    ({type: Actions.AddFavoriteCity, data: city});

export const actionDeleteFavoriteCity = (city) =>
    ({type: Actions.DeleteFavoriteCity, data: city});

export const actionUpdateGeolocation = (position) =>
    ({type: Actions.UpdateGeolocation, position: position});

export const actionSetGeolocationError = (error) =>
    ({type: Actions.SetGeolocationError, error: error});

export function doAddFavoriteCity(city) {
    return (dispatch, getState) => {
        if (getState().favoriteCities.indexOf(city) !== -1)
            return false;

        dispatch(actionAddFavoriteCity(city));
        return true;
    }
}

export function doDeleteFavoriteCity(city) {
    return (dispatch, getState) =>
        dispatch(actionDeleteFavoriteCity(city));
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


