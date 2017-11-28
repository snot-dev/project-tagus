import React, { Component } from 'react';
import './overlay.css';

class Overlay extends Component {

    render() {
        const show = this.props.show ? "" : "hidden";
        return (
            <div className={`tagus-overlay ${show}`}>

            </div>
        )
    }
}

export default Overlay;