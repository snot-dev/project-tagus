import React, { Component } from 'react';
import Menu from '../../../../../../components/Menu';
import './contentMenu.css';

class ContentMenu extends Component {
    render() {
        return (
            <Menu title="Menu" className="col-xs-6">
                this.props.detail.name
            </Menu>
        );
    }
}

export default ContentMenu;