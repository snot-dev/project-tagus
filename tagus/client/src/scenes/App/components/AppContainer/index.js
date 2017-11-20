import React, { Component } from 'react';
import './appContainer.css';

class AppContainer extends Component {
    render() {
        return (
            <section id="tagus-container">
                <div className="container-fluid full-height">
                    <div className="row full-height">
                        <div className="col-xs-12 full-height">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default AppContainer;
