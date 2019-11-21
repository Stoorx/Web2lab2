import React from 'react';
import {shallow} from "../../enzyme";
import {shallowToJson} from "enzyme-to-json";
import CurrentCity from "../components/CurrentCity/CurrentCity";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../Reducers";
import thunk from "redux-thunk";


it('CurrentCity renders without crashing', () => {
    let initialState = {
        geoLocation: null,
        favoriteCities: []
    };

    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

    const error = shallow(
        <Provider store={store}>
            <CurrentCity/>
        </Provider>
    );
    expect(shallowToJson(error)).toMatchSnapshot();
});
