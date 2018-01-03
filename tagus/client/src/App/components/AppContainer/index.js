import React, { Component } from 'react';
import './appContainer.css';

class AppContainer extends Component {
    render() {
        return (
            <section id="tagus-container" className="container-fluid">
                <div className="container-fluid full-height">
                    <div className="row full-height">
                        {this.props.children}
                    </div>
                </div>
            </section>
        );
    }
}

export default AppContainer;
