import React from 'react';
import './FavoriteCity.css';

import {weatherApiByCity} from '../../ApiHelper'

import Loader from "../Loader/Loader";
import DataLines from "../DataLines/DataLines";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import {connect} from "react-redux";
import {doDeleteFavoriteCity} from "../../AppActions";

class FavoriteCity extends React.Component {
    removeCity = (e) => {
        e.preventDefault();
        this.props.deleteFavCity(this.state.key);
    };

    async componentDidMount() {
        let data = await weatherApiByCity(this.props.city);
        if (data.status !== "fail") {
            let res = data.response;
            this.setState({data: res, parsed: res, city: res.name + ", " + res.country, state: "ready"});
        } else {
            this.setState({error: data.response.result.cod, state: "error"});
        }
    }
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
                                return <DataLines data={this.state.parsed}/>;
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
    deleteFavCity: (city) => dispatch(doDeleteFavoriteCity(city))
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCity);
