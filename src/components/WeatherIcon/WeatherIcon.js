import React from 'react';
import './WeatherIcon.css';


class WeatherIcon extends React.Component {
    render = () =>
        <img className={"WeatherIcon"} src={
            "http://openweathermap.org/img/wn/" +
            this.props.src + (this.props.big && "@2x") + ".png"
        } alt=""/>

}

export default WeatherIcon;
