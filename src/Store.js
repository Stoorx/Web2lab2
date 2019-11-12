import {applyMiddleware, compose, createStore} from 'redux'
import rootReducer from './Reducers'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";

export default function configureStore(initialState) {
    let store = createStore(
        persistReducer({
                key: 'root',
                storage
            }, rootReducer
        ),
        initialState,
        compose(
            applyMiddleware(thunk)
        )
    );
    let persistor = persistStore(store);
    return {store, persistor};
};

