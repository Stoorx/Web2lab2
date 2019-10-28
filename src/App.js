import React from 'react';
import './App.css';

import FavoriteCity from './components/FavoriteCity'
import CurrentCity from './components/CurrentCity'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: null
        }
    }

    updateGeo = () => navigator.geolocation.getCurrentPosition(
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
                    <form className="A-favorite-header-add">
                        <input className="A-favorite-header-add-input" type="text" placeholder="Добавить новый город"/>
                        <input type="submit" className="A-favorite-header-add-btn" value="+"/>
                    </form>
                </div>
                <div className="A-favorite-list">
                    <FavoriteCity city={"london"}/>
                    <FavoriteCity city={"moscow"}/>

                    <FavoriteCity city={"saint petersburg"}/>
                    <FavoriteCity city={"paris"}/>
                </div>
            </div>
        </div>
    );
}

export default App;
