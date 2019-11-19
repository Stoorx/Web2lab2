import React from 'react';
import {shallow} from "../../enzyme";
import {shallowToJson} from "enzyme-to-json";
import DataLines from "../components/DataLines/DataLines";

import example from "../example"
import {repackData} from "../ApiHelper"

it('data lines renders without crashing', async () => {

    const error = shallow(
        <DataLines data={repackData(example())}/>
    );
    expect(shallowToJson(error)).toMatchSnapshot();
});
