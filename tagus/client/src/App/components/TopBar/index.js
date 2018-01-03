import React, { Component } from 'react';
import './topBar.css';

class TopBar extends Component {
    render() {
        return (
            <nav id="top-bar">
                <div className="container-fluid">
                    <div className="row">
                        <div id="navHeaderContainer" className="col-xs-6">
                            <h1 id="navHeader">tagus</h1>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default TopBar;