import React from 'react';
import './FavoriteCitiesPanel.css';

import FavoriteCity from "../FavoriteCity/FavoriteCity";

class FavoriteCitiesPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => (
        <div className="FavoriteCitiesPanel">
            <div className="FCP-header">
                <div className="FCP-header-text">Избранное</div>
                <form className="FCP-header-add" onSubmit={async (e) => {
                    e.preventDefault();
                    if (await this.addCityToFavorite(this.inputCity.current.value)) {
                        this.inputCity.current.value = "";
                    }
                }}>
                    <input ref={this.inputCity} className="FCP-header-add-input" type="text"
                           placeholder="Добавить новый город"/>
                    <input type="submit" className="FCP-header-add-btn" value="+"/>
                </form>
            </div>
            <div className="FCP-list">
                {
                    this.state.favoriteCities &&
                    this.state.favoriteCities.map(
                        (e) => <FavoriteCity key={e} city={e}/>
                    )
                }
            </div>
        </div>
    )
}

export default FavoriteCitiesPanel;
