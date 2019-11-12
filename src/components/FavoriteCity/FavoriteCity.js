import React from 'react';
import './FavoriteCity.css';

import {weatherApiByCity} from '../../ApiHelper'

import Store from '../../Store'
import Loader from "../Loader/Loader";
import DataLines from "../DataLines/DataLines";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import {connect} from "react-redux";

class FavoriteCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: "default",
            city: props.city,
            data: null
        };
    }

    async componentDidMount() {
        let data = await weatherApiByCity(this.props.city);
        if (data.status !== "fail") {
            let res = data.response;
            this.setState({data: res, parsed: res, city: res.name + ", " + res.country, state: "ready"});
        } else {
            this.setState({error: data.response.cod, state: "error"});
        }
    }

    removeCity = (event) => {
        event.preventDefault();
        Store.dispatch(
            {
                type: "removeCity",
                data: this.props.city
            }
        )
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
                    <button className="FC-remove-btn" onClick={this.removeCity}> X</button>
                </div>
                {
                    (() => {
                        switch (this.state.state) {
                            case "ready":
                                return <DataLines data={this.state.parsed}/>;
                            case "loading":
                                return <Loader/>;
                            case "error":
                                return <div>Ошибка!</div>;
                            default:
                                return "";
                        }
                    })()
                }
            </div>
        </div>
    )
}

export default connect((state) => {
    return state;
})(FavoriteCity);
