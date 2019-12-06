import {applyMiddleware, createStore} from 'redux'
import rootReducer from './Reducers'
import thunk from "redux-thunk";


// const _loadState = () => fetch("http:/localhost:8080/favorites").then(async (res) => (await res.json()).map((el) => el.name));

export default function configureStore() {
    const initialState = {
        geoLocation: null,
        favoriteCities: []
    };
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
};

