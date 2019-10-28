import React from 'react';
import './CurrentCity.css';
import {parseData, weatherApiByCoords} from "../ApiHelper";

class CurrentCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: props.currentPosition
        };
    }

    async componentDidMount() {
        let data = await weatherApiByCoords(this.state.currentPosition.coords);
        let res = data.response;
        let parsedData = parseData(res);
        this.setState({data: res, parsed: parsedData, city: res.name + ", " + res.sys.country});
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
                        <img className="CC-weather-icon" src={"http://openweathermap.org/img/wn/" +
                        this.state.data.weather[0].icon +
                        "@2x.png"} alt=""/>
                        <div className="CC-temperature">
                            <span className="CC-temp-data">{(this.state.data.main.temp - 273.14).toFixed(1)}</span>
                            <span className="CC-temp-units">&deg;C</span>
                        </div>

                    </div>

                </div>
            }
            {
                this.state.parsed ?
                    <div className="CC-right">
                        <div className="CC-data-lines">
                            {
                                this.state.parsed.map((e) =>
                                    <div key={e.key} className="CC-data-line">
                                        <div className="CC-data-line-key">{e.key}</div>
                                        <div className="CC-data-line-value">{e.value}</div>
                                    </div>
                                )
                            }
                        </div>
                    </div> : ""
            }
            {
                this.state.data ? ""
                    : <div className={"CC-loader"}>
                        <div className={"CC-loader-container"}>
                            <div className={"CC-loader-element"}/>
                            <div className={"CC-loader-element"}/>
                            <div className={"CC-loader-element"}/>
                            <div className={"CC-loader-element"}/>
                            <div className={"CC-loader-element"}/>

                            <div className={"CC-loader-element"}/>
                            <div className={"CC-loader-element"}/>
                            <div className={"CC-loader-element"}/>
                            <div className={"CC-loader-element"}/>
                            <div className={"CC-loader-element"}/>
                        </div>
                    </div>
            }
        </div>
    )
}

export default CurrentCity;
