import React from 'react';
import {shallow} from "../../enzyme";
import {shallowToJson} from "enzyme-to-json";
import Loader from "../components/Loader/Loader";


it('Loader renders without crashing', () => {
    const error = shallow(
        <Loader/>
    );
    expect(shallowToJson(error)).toMatchSnapshot();
});
