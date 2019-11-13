import React from 'react';
import './GeoHeader.css';
import {doUpdateGeolocation} from "../../AppActions";
import {connect} from "react-redux";
import ErrorTile from "../ErrorTile/ErrorTile";

class GeoHeader extends React.Component {

    render = () => (
        <div className="GeoHeader">
            <div className="GH-main">
                <div className="GH-text">Погода здесь</div>
                <button className="GH-update-btn" onClick={() => this.props.updateGeo()}>
                    Обновить геолокацию
                </button>
            </div>
            {this.props.geoLocation && this.props.geoLocation.error && <ErrorTile text={this.props.geoLocation.error}/>}
        </div>
    );
}

const mapStateToProps = (state) => ({
    geoLocation: state.geoLocation
});
const mapDispatchtoProps = (dispatch) => ({
    updateGeo: () => dispatch(doUpdateGeolocation())
});
export default connect(mapStateToProps, mapDispatchtoProps)(GeoHeader);
