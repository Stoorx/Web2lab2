import React from 'react';
import './CurrentCity.css';
import Loader from "../Loader/Loader";
import DataLines from "../DataLines/DataLines";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import {connect} from "react-redux";
import {doGetWeatherData, doUpdateGeolocation} from "../../AppActions";

class CurrentCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

        this.props.dispatch(doUpdateGeolocation());

        let position = this.props.GeolocationReducer.position;
        this.props.dispatch(doGetWeatherData({coords: position}));
    }

    render = () => (
        <div className="CurrentCity">
            {
                this.state.data &&
                <div className="CC-left">
                    <div className="CC-name">
                        {this.state.city}
                    </div>

                    <div className="CC-main-block">
                        <WeatherIcon big src={this.state.data.icon}/>
                        <div className="CC-temperature">
                            <span className="CC-temp-data">{(this.state.data.temp - 273.14).toFixed(1)}</span>
                            <span className="CC-temp-units">&deg;C</span>
                        </div>

                    </div>

                </div>
            }
            {
                (() => {
                    switch (this.state.state) {
                        case "ready":
                            return (
                                <div className="CC-right">
                                    <DataLines data={this.state.parsed}/>
                                </div>
                            );
                        case "loading":
                            return <Loader/>;
                        case "error":
                            return <div>Ошибка</div>;
                        default:
                            return "";
                    }
                })()
            }
        </div>
    )
}

export default connect((state) => {
    return state;
})(CurrentCity);
