import React from 'react';
import {shallow} from "../../enzyme";
import {shallowToJson} from "enzyme-to-json";
import FavoriteCitiesPanel from "../components/FavoriteCitiesPanel/FavoriteCitiesPanel";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../Reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

it('FavoriteCitiesPanel renders without crashing', () => {
    let initialState = {
        geoLocation: null,
        favoriteCities: ['moscow', 'london']
    };

    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

    const error = shallow(
        <Provider store={store}>
            <FavoriteCitiesPanel/>
        </Provider>
    );
    expect(shallowToJson(error)).toMatchSnapshot();
});
