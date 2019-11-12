import React from 'react';
import './ErrorTile.css';

class ErrorTile extends React.Component {
    render = () => (
        <div className="ErrorTile">
            {this.props.text}
        </div>
    );
}

export default ErrorTile;
