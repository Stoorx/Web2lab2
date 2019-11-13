import {Actions} from './AppActions';
import {combineReducers} from "redux";


const favoriteCitiesReducer = (state = [], action) => {
    switch (action.type) {
        case Actions.AddFavoriteCity:
            return [action.data, ...state];
        case Actions.DeleteFavoriteCity:
            return state.filter(el => el !== action.data);
        default:
            return state;
    }
};

const geoLocationReducer = (state = null, action) => {
    switch (action.type) {
        case Actions.UpdateGeolocation:
            return {...state, position: action.position};
        case Actions.SetGeolocationError:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default combineReducers({
    favoriteCities: favoriteCitiesReducer,
    geoLocation: geoLocationReducer
});
