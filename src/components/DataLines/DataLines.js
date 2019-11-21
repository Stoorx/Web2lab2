import React from 'react';
import './DataLines.css';

class DataLines extends React.Component {
    static parseData = data => [
        {key: "Ветер", value: data.wind.speed + " m/s" + (data.wind.heading && (", " + data.wind.heading + "°"))},
        {key: "Облачность", value: data.clouds},
        {key: "Давление", value: data.pressure + " hPa"},
        {key: "Влажность", value: data.humidity + " %"},
        {key: "Координаты", value: data.coords.lat + ", " + data.coords.lon},
    ];

    render = () =>
        <div className="DataLines">
            {
                DataLines.parseData(this.props.data).map((e) =>
                    <div key={e.key} className="DL-line">
                        <div className="DL-key">{e.key}</div>
                        <div className="DL-value">{e.value}</div>
                    </div>
                )
            }
        </div>;
}

export default DataLines;
