import React from 'react';
import {shallow} from "../../enzyme";
import {shallowToJson} from "enzyme-to-json";
import FavoriteCity from "../components/FavoriteCity/FavoriteCity";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../Reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

it('FavoriteCity renders without crashing', () => {
    let initialState = {
        geoLocation: null,
        favoriteCities: ['moscow', 'london']
    };

    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

    const error = shallow(
        <Provider store={store}>
            <FavoriteCity city={'moscow'}/>
        </Provider>
    );
    expect(shallowToJson(error)).toMatchSnapshot();
});
