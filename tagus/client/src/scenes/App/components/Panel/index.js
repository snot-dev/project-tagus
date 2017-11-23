import React, { Component } from 'react';
import Header from './Header';
import './panel.css'

class Panel extends Component {
    render() {
        return (
            <div className={"tagus-panel " + (this.props.className || "")}>
                <div className="child container-fluid">
                    <div className="row">
                        <Header>
                            {this.props.header}
                        </Header>

                    </div>
                    <div className="row">
                        <div className="tagus-panel-content col-xs-12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Panel;
