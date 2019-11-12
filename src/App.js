import React from 'react';
import {Provider} from 'react-redux';
import './App.css';

import CurrentCity from './components/CurrentCity/CurrentCity'
import FavoriteCitiesPanel from "./components/FavoriteCitiesPanel/FavoriteCitiesPanel";
import GeoHeader from "./components/GeoHeader/GeoHeader";
import configureStore from './Store'
import {PersistGate} from 'redux-persist/integration/react'

const {store, persistor} = configureStore();

class App extends React.Component {
    constructor(props) {
        super(props);
    }


    // addCityToFavorite = async (city) => {
    //     if (city === "") {
    //         this.setState({error: {text: "Задан пустой поисковый запрос", reason: "input"}});
    //         this.errorTimeout && clearTimeout(this.errorTimeout);
    //         this.errorTimeout = setTimeout(() => {
    //             this.setState({error: undefined});
    //             this.errorTimeout = null;
    //         }, 5000);
    //         return false;
    //     }
    //
    //     let data = await weatherApiByCity(city);
    //     if (data.status === "ok") {
    //         if (this.state.favoriteCities.indexOf(data.response.name) === -1) {
    //             Store.dispatch({
    //                 type: "addCity",
    //                 data: data.response.name
    //             });
    //             return true;
    //         } else {
    //             this.setState({
    //                 error: {
    //                     text: "Город " + data.response.name + " уже есть в избранных",
    //                     reason: "input"
    //                 }
    //             });
    //             this.errorTimeout && clearTimeout(this.errorTimeout);
    //             this.errorTimeout = setTimeout(() => {
    //                 this.setState({error: undefined});
    //                 this.errorTimeout = null;
    //             }, 5000);
    //         }
    //
    //     } else {
    //         this.setState({
    //             error: {
    //                 text: data.response.cod === "404" ? "Город " + city + " не найден" : "Неизвестная ошибка API",
    //                 reason: "api"
    //             }
    //         });
    //         this.errorTimeout && clearTimeout(this.errorTimeout);
    //         this.errorTimeout = setTimeout(() => {
    //             this.setState({error: undefined});
    //             this.errorTimeout = null;
    //         }, 5000);
    //     }
    //     return false;
    // };

    render = () => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <div className="App">
                    <GeoHeader/>
                    <CurrentCity/>
                    <FavoriteCitiesPanel/>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
