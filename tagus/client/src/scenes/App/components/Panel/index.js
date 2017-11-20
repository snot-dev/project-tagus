import React, { Component } from 'react';
import './panel.css'

class Panel extends Component {
    render() {
        return (
            <div className={"tagus-panel " + (this.props.className || "")}>
                <div className="child">

                </div>
            </div>
        );
    }
}

export default Panel;
