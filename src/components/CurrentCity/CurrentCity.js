import React from 'react';
import './CurrentCity.css';
import Loader from "../Loader/Loader";
import DataLines from "../DataLines/DataLines";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import {connect} from "react-redux";
import {doGetGeolocation, doGetWeatherData} from "../../AppActions";

class CurrentCity extends React.Component {
    render = () => (
        <div className="CurrentCity">
            {
                this.state.data &&
                <div className="CC-left">
                    <div className="CC-name">
                        {this.state.data.name + ", " + this.state.data.country}
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
                                    <DataLines data={this.state.data}/>
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

    constructor(props) {
        super(props);
        this.state = {
            state: "loading"
        };
    }

    componentDidMount() {
        this.props.getGeolocation();
    }

    componentDidUpdate(prevProps) {
        if (this.props.geoLocation && this.props.geoLocation !== prevProps.geoLocation) {
            this.props.getWeatherData({coords: this.props.geoLocation})
                .then((o) => this.setState({data: o.response, state: "ready"}));
        }
    }


}

const mapStateToProps = (state) => ({geoLocation: state.geoLocation});
const mapDispatchToProps = (dispatch) => ({
    getGeolocation: () => dispatch(doGetGeolocation()),
    getWeatherData: (query) => dispatch(doGetWeatherData(query))
});
export default connect(mapStateToProps, mapDispatchToProps)(CurrentCity);
