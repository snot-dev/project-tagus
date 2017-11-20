import React, { Component } from 'react';
import Header from './Header';
import './panel.css'

class Panel extends Component {
    render() {
        return (
            <div className={"tagus-panel " + (this.props.className || "")}>
                <div className="child">
                    <Header />
                    <div className="tagus-panel-content">

                    </div>
                </div>
            </div>
        );
    }
}

export default Panel;
