import React, { Component } from 'react';

class TabContent extends Component {

    render() {
        return (
            <div className="col-xs-12 tagus-unit-tab-content">
                <label className="tagus-label">{this.props.tab.name}</label>
            </div>
        );
    }
}

export default TabContent;