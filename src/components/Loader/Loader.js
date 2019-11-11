import React from 'react';
import './Loader.css';

class Loader extends React.Component {
    render = () => (
        <div className={"Loader"}>
            <div className={"L-container"}>
                <div className={"L-element"}/>
                <div className={"L-element"}/>
                <div className={"L-element"}/>
                <div className={"L-element"}/>
                <div className={"L-element"}/>

                <div className={"L-element"}/>
                <div className={"L-element"}/>
                <div className={"L-element"}/>
                <div className={"L-element"}/>
                <div className={"L-element"}/>
            </div>
        </div>
    )
}

export default Loader;
