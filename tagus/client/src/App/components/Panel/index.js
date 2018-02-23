import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import './panel.css'

class Panel extends Component {
    render() {
        const header = this.props.title ? 'header' : '';
        const panelClass = this.props.className || '';
        return (
            <div className={`tagus-panel-container ${panelClass}`}>
                <div className="tagus-panel container-fluid">
                    {this.props.title
                    ?   
                        <Header className={this.props.header}>
                            {this.props.title}
                        </Header>
                    : null
                    }
                    <div className="row tagus-panel-content-container">
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

Panel.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    header: PropTypes.string,
    menu: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
};

export default Panel;
