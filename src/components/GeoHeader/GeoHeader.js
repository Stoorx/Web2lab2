import React from 'react';
import './GeoHeader.css';
import {doUpdateGeolocation} from "../../AppActions";
import {connect} from "react-redux";

class GeoHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: "default"
        };

    }

    render = () => (
        <div className="GeoHeader">
            <div className="GH-main">
                <div className="GH-text">Погода здесь</div>
                <button className="GH-update-btn" onClick={() => this.props.dispatch(doUpdateGeolocation())}>
                    Обновить геолокацию
                </button>
            </div>
            {/*{this.props === "error" && <ErrorTile text={this.state.error.text}/>}*/}
        </div>
    );
}

export default connect((state) => {
    return state;
})(GeoHeader);
