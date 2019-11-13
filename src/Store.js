import {applyMiddleware, createStore} from 'redux'
import rootReducer from './Reducers'
import thunk from "redux-thunk";


const _loadState = () => JSON.parse(localStorage.state || "[]");
const _storeState = (state) => localStorage.state = JSON.stringify(state);

let persistentState = _loadState();

let initialState = {
    geoLocation: null,
    favoriteCities: persistentState
};

export default function configureStore() {
    let store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
    store.subscribe(() => {
        _storeState(store.getState().favoriteCities);
    });
    return store;
};

