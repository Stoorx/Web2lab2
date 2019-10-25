import React from 'react';
import './CurrentCity.css';
import icon from '../logo192.png';

class CurrentCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: props.cityName && props.cityName || "Москва"
        };

        this.data = [
            {key: "Ветер", value: "Moderate breeze, 6.0 m/s"},
            {key: "Облачность", value: "Broken clouds"},
            {key: "Давление", value: "1013 hpa"},
            {key: "Влажность", value: "52 %"},
            {key: "Координаты", value: "[59.88, 30.42]"}
        ];
    }

    render = () => (
        <div className="CurrentCity">
            <div className="CC-left">
                <div className="CC-name">
                    {this.state.cityName}
                </div>
                <div className="CC-main-block">
                    <img className="CC-weather-icon" src={icon} alt=""/>
                    <div className="CC-temperature">
                        <span className="CC-temp-data">8</span>
                        <span className="CC-temp-units">&deg;C</span>
                    </div>

                </div>
            </div>
            <div className="CC-right">
                <div className="CC-data-lines">
                    {
                        this.data.map((e) =>
                            <div key={e.key} className="CC-data-line">
                                <div className="CC-data-line-key">{e.key}</div>
                                <div className="CC-data-line-value">{e.value}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CurrentCity;
