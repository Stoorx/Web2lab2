import React from 'react';
import './App.css';

import FavoriteCity from './components/FavoriteCity'
import CurrentCity from './components/CurrentCity'

class App extends React.Component {

    render = () => (
        <div className="App">
            <div className="A-geo">
                <div className="A-geo-text">Погода здесь</div>
                <button className="A-geo-update-btn">Обновить геолокацию</button>
            </div>
            <CurrentCity/>
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
