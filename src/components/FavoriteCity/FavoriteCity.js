import React from 'react';
import './FavoriteCity.css';

import Loader from "../Loader/Loader";
import DataLines from "../DataLines/DataLines";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import {connect} from "react-redux";
import {doDeleteFavoriteCity, doGetWeatherData} from "../../AppActions";

class FavoriteCity extends React.Component {
    removeCity = (e) => {
        e.preventDefault();
        this.props.deleteFavCity(this.state.key);
    };

    componentDidMount = async () => {
        this.props.getWeatherData({city: this.props.city})
            .then((o) => {
                if (o.status === 'ok')
                    this.setState({data: o.response, state: "ready", city: o.response.name});
                else
                    this.setState({error: o.response.cod, state: "error"});
            })
    };

    render = () => (
        <div className="FavoriteCity">
            <div className="FC-container">
                <div className="FC-header">
                    <div className="FC-name">
                        {this.state.city}
                    </div>
                    {
                        this.state.state === "ready" &&
                        [
                            <div key="FC-temp" className="FC-temperature">
                                <span className="FC-temp-data">{(this.state.data.temp - 273.14).toFixed(1)}</span>
                                <span className="FC-temp-units">&deg;C</span>
                            </div>,
                            <WeatherIcon key="FC-icon" src={this.state.data.icon}/>
                        ]
                    }
                    <button className="FC-remove-btn" onClick={this.removeCity}>X</button>
                </div>
                {
                    (() => {
                        switch (this.state.state) {
                            case "ready":
                                return <DataLines data={this.state.data}/>;
                            case "loading":
                                return <Loader/>;
                            case "error":
                                return <div>{"Ошибка " + this.state.error}</div>;
                            default:
                                return "";
                        }
                    })()
                }
            </div>
        </div>
    );

    constructor(props) {
        super(props);
        this.state = {
            state: "loading",
            city: props.city,
            key: props.city
        };
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    deleteFavCity: (city) => dispatch(doDeleteFavoriteCity(city)),
    getWeatherData: (query) => dispatch(doGetWeatherData(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCity);
