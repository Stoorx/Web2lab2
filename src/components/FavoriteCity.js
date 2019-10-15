import React from 'react';
import {BDiv, Button} from 'bootstrap-4-react';
import './FavoriteCity.css';
import icon from '../logo192.png';

class FavoriteCity extends React.Component {
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
        <BDiv className="FavoriteCity">
            <BDiv className="FC-header">
                <BDiv className="FC-name">
                    {this.state.cityName}
                </BDiv>
                <BDiv className="FC-temperature">
                    <span className="FC-temp-data">8</span>
                    <span className="FC-temp-units">&deg;C</span>
                </BDiv>
                <img className="FC-weather-icon" src={icon} alt=""/>
                <Button className="FC-remove-btn">X</Button>
            </BDiv>
            <BDiv className="FC-data-lines">
                {
                    this.data.map((e) =>
                        <BDiv key={e.key} className="FC-data-line">
                            <BDiv className="FC-data-line-key">{e.key}</BDiv>
                            <BDiv secondary className="FC-data-line-value">{e.value}</BDiv>
                        </BDiv>
                    )
                }
            </BDiv>
        </BDiv>
    )
}

export default FavoriteCity;
