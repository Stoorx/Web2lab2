import {Actions} from './AppActions';
import {combineReducers} from "redux";


const CityReducer = (state = [], action) => {
    switch (action.type) {
        case Actions.AddFavoriteCity:
            return state.concat([action.city]);
        case Actions.DeleteFavoriteCity:
            return state.filter(el => el !== action.data);
        default:
            return state;
    }
};

const GeolocationReducer = (state = null, action) => {

    switch (action.type) {
        case Actions.UpdateGeolocation:
            let a = {position: action.position};
            console.log(a);
            return a;
        case Actions.SetGeolocationError:
            return {error: action.error};
        default:
            return state;
    }
};

export default combineReducers({
    CityReducer,
    GeolocationReducer
});
