import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './header.css'

class Header extends Component {
    render() {
        return (
            <div className="row header-container">
                <div className="tagus-panel-header">
                    <h3>
                        {this.props.children}
                    </h3>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    children: PropTypes.string
};

export default Header;