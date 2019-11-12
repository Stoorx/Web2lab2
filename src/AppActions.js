import {weatherApiByCity, weatherApiByCoords, weatherApiById} from './ApiHelper';

export class Actions {
    static AddFavoriteCity = Symbol("Add favorite city");
    static DeleteFavoriteCity = Symbol("Delete favorite city");
    static UpdateGeolocation = Symbol("Update geolocation");
    static SetGeolocationError = Symbol("Update geolocation");
}

export const actionAddFavoriteCity = (city) =>
    ({type: Actions.AddFavoriteCity, city});

export const actionDeleteFavoriteCity = (city) =>
    ({type: Actions.DeleteFavoriteCity, city});

export const actionUpdateGeolocation = (position) =>
    ({type: Actions.UpdateGeolocation, position: position});

export const actionSetGeolocationError = (error) =>
    ({type: Actions.SetGeolocationError, error: error});

export const doUpdateGeolocation = () =>
    (dispatch) =>
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(actionUpdateGeolocation(position));
            },
            (e) => {
                dispatch(actionSetGeolocationError(e));
                console.log("GeoAPI is not permitted");
            }
        );

export const doGetWeatherData = (query) =>
    (dispatch, getState) => {
        if (query.id) {
            return weatherApiById(query.id);
        }
        if (query.coords) {
            console.log(getState());
            return weatherApiByCoords(query.coords);
        }
        if (query.city) {
            return weatherApiByCity(query.city);
        }
    };


