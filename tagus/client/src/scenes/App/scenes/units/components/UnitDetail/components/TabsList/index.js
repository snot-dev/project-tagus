import React, { Component } from 'react';
import TabContent from '../TabContent';

class TabsList extends Component {
    render(){
        return (
            <div className="row tagus-form-control">
                <div className="col-xs-12">
                    {this.props.tabs.map((tab, index) => {
                        return (
                            <TabContent onFieldClick={this.props.onFieldClick} addFieldClick={this.props.addFieldClick} addingField={this.props.addingField} addingTab={this.props.addingTab} tab={tab} key={`${tab.alias}_${index}`} />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default TabsList;