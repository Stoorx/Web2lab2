import React from 'react';
import './FavoriteCity.css';

import {parseData, weatherApi} from '../ApiHelper'


class FavoriteCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: props.city,
            data: null
        };
    }

    async componentDidMount() {
        let data = await weatherApi(this.props.city);
        let res = data.response;
        let parsedData = parseData(res);
        this.setState({data: res, parsed: parsedData, city: res.name + ", " + res.sys.country});
    }

    render = () => (
        <div className="FavoriteCity">
            <div className="FC-container">
                <div className="FC-header">
                    <div className="FC-name">
                        {this.state.city}
                    </div>
                    {
                        this.state.data ? <div className="FC-temperature">
                            <span className="FC-temp-data">{(this.state.data.main.temp - 273.14).toFixed(1)}</span>
                            <span className="FC-temp-units">&deg;C</span>
                        </div> : ""
                    }
                    {
                        this.state.data ? <img className="FC-weather-icon"
                                               src={"http://openweathermap.org/img/wn/" +
                                               this.state.data.weather[0].icon +
                                               ".png"}
                                               alt=""/> : ""
                    }
                    <button className="FC-remove-btn">X</button>
                </div>
                {
                    this.state.data ? <div className="FC-data-lines">
                            {
                                this.state.parsed.map((e) =>
                                    <div key={e.key} className="FC-data-line">
                                        <div className="FC-data-line-key">{e.key}</div>
                                        <div className="FC-data-line-value">{e.value}</div>
                                    </div>
                                )
                            }
                        </div>
                        :
                        <div className={"FC-loader"}>
                            <div className={"FC-loader-container"}>
                                <div className={"FC-loader-element"}/>
                                <div className={"FC-loader-element"}/>
                                <div className={"FC-loader-element"}/>
                                <div className={"FC-loader-element"}/>
                                <div className={"FC-loader-element"}/>

                                <div className={"FC-loader-element"}/>
                                <div className={"FC-loader-element"}/>
                                <div className={"FC-loader-element"}/>
                                <div className={"FC-loader-element"}/>
                                <div className={"FC-loader-element"}/>
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

export default FavoriteCity;
