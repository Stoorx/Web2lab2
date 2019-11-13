import React from 'react';
import {Provider} from 'react-redux';
import './App.css';

import CurrentCity from './components/CurrentCity/CurrentCity'
import FavoriteCitiesPanel from "./components/FavoriteCitiesPanel/FavoriteCitiesPanel";
import GeoHeader from "./components/GeoHeader/GeoHeader";
import configureStore from './Store'

const store = configureStore();

class App extends React.Component {
    render = () => (
        <Provider store={store}>
            <div className="App">
                <GeoHeader/>
                <CurrentCity/>
                <FavoriteCitiesPanel/>
            </div>
        </Provider>
    );
}

export default App;
