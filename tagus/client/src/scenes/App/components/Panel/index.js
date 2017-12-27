import React, { Component } from 'react';
import Header from './Header';
import './panel.css'

class Panel extends Component {
    render() {
        const header = this.props.title ? 'header' : '';
        const panelClass = this.props.className || '';
        return (
            <div className={`tagus-panel ${panelClass}`}>
                <div className="child container-fluid">
                    {this.props.title
                    ?   <div className="row">
                            <Header className={this.props.header}>
                                {this.props.title}
                            </Header>
                        </div>
                    : null
                    }
                    <div className={`tagus-panel-content-container ${header}`}>
                        {this.props.menu}
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
