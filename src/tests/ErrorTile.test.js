import React from 'react';
import {shallow} from "../../enzyme";
import {shallowToJson} from "enzyme-to-json";
import ErrorTile from '../components/ErrorTile/ErrorTile'

it('error renders without crashing', () => {
    const error = shallow(
        <ErrorTile text={"12122"}/>
    );
    expect(shallowToJson(error)).toMatchSnapshot();
});
