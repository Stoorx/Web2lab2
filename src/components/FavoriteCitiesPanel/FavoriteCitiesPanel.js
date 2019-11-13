import React from 'react';
import './FavoriteCitiesPanel.css';

import FavoriteCity from "../FavoriteCity/FavoriteCity";
import {connect} from "react-redux";
import {doAddFavoriteCity} from "../../AppActions";
import ErrorTile from "../ErrorTile/ErrorTile";

class FavoriteCitiesPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputCity = React.createRef();
    }

    addCity = (e) => {
        e.preventDefault();
        if (!this.props.addFavCity(this.inputCity.current.value)) {
            this.setState({error: "Город с таким именем уже добавлен в избранное"});
            setTimeout(() => this.setState({error: undefined}), 3000);
        }
        this.inputCity.current.value = "";
    };

    render = () => (
        <div className="FavoriteCitiesPanel">
            <div className="FCP-header">
                <div className="FCP-header-text">Избранное</div>
                <form className="FCP-header-add" onSubmit={this.addCity}>
                    <input ref={this.inputCity} className="FCP-header-add-input" type="text"
                           placeholder="Добавить новый город"/>
                    <input type="submit" className="FCP-header-add-btn" value="+"/>
                </form>
            </div>
            {this.state.error && <ErrorTile text={this.state.error}/>}
            <div className="FCP-list">
                {
                    this.props.favoriteCities &&
                    this.props.favoriteCities.map(
                        (e) => <FavoriteCity key={e} city={e}/>
                    )
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({favoriteCities: state.favoriteCities});

const mapDistpatchToProps = (dispatch) => ({
    addFavCity: (cityName) => dispatch(doAddFavoriteCity(cityName))
});

export default connect(mapStateToProps, mapDistpatchToProps)(FavoriteCitiesPanel);
