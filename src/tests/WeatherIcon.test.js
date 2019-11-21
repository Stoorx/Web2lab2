import React from 'react';
import {shallow} from "../../enzyme";
import {shallowToJson} from "enzyme-to-json";
import WeatherIcon from "../components/WeatherIcon/WeatherIcon";

it('ErrorTile renders without crashing', () => {
    const error = shallow(
        <WeatherIcon big src={'01n'}/>
    );
    expect(shallowToJson(error)).toMatchSnapshot();
});
