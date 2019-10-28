import React from 'react';
import './App.css';

import FavoriteCity from './components/FavoriteCity'
import CurrentCity from './components/CurrentCity'

import Store from './Store'

import {weatherApiByCity} from "./ApiHelper";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: null,
            favoriteCities: null
        };
        this.inputCity = React.createRef();

        this.state.favoriteCities = Store.getState();
        Store.subscribe(() => {
            this.setState({favoriteCities: Store.getState()})
        });
    }

    updateGeo = (e) => navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({currentPosition: position})
        },
        (e) => {
            this.setState({error: {text: "Геолокация недоступна", reason: "geo"}});
            console.log("GeoAPI is not permitted")
        }
    );

    componentDidMount = () =>
        this.updateGeo();

    addCityToFavorite = async (city) => {
        if (city === "") {
            this.setState({error: {text: "Задан пустой поисковый запрос", reason: "input"}});
            this.errorTimeout && clearTimeout(this.errorTimeout);
            this.errorTimeout = setTimeout(() => {
                this.setState({error: undefined});
                this.errorTimeout = null;
            }, 5000);
            return false;
        }

        let data = await weatherApiByCity(city);
        if (data.status === "ok") {
            if (this.state.favoriteCities.indexOf(data.response.name) === -1) {
                Store.dispatch({
                    type: "addCity",
                    data: data.response.name
                });
                return true;
            } else {
                this.setState({
                    error: {
                        text: "Город " + data.response.name + " уже есть в избранных",
                        reason: "input"
                    }
                });
                this.errorTimeout && clearTimeout(this.errorTimeout);
                this.errorTimeout = setTimeout(() => {
                    this.setState({error: undefined});
                    this.errorTimeout = null;
                }, 5000);
            }

        } else {
            this.setState({
                error: {
                    text: data.response.cod === "404" ? "Город " + city + " не найден" : "Неизвестная ошибка API",
                    reason: "api"
                }
            });
            this.errorTimeout && clearTimeout(this.errorTimeout);
            this.errorTimeout = setTimeout(() => {
                this.setState({error: undefined});
                this.errorTimeout = null;
            }, 5000);
        }
        return false;
    };

    render = () => (
        <div className="App">
            <div className="A-geo">
                <div className="A-geo-text">Погода здесь</div>
                {this.state.error === undefined || this.state.error.reason !== "geo" ?
                    <button className="A-geo-update-btn" onClick={this.updateGeo}>Обновить геолокацию</button> : ""}
            </div>
            {this.state.error && <div className="A-error-msg">{this.state.error.text}</div>}
            {this.state.currentPosition && <CurrentCity currentPosition={this.state.currentPosition}/>}
            <div className="A-favorite">
                <div className="A-favorite-header">
                    <div className="A-favorite-header-text">Избранное</div>
                    <form className="A-favorite-header-add" onSubmit={async (e) => {
                        e.preventDefault();
                        if (await this.addCityToFavorite(this.inputCity.current.value)) {
                            this.inputCity.current.value = "";
                        }
                    }}>
                        <input ref={this.inputCity} className="A-favorite-header-add-input" type="text"
                               placeholder="Добавить новый город"/>
                        <input type="submit" className="A-favorite-header-add-btn" value="+"/>
                    </form>
                </div>
                <div className="A-favorite-list">
                    {
                        this.state.favoriteCities &&
                        this.state.favoriteCities.map(
                            (e) => <FavoriteCity key={e} city={e}/>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
