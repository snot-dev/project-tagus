import React from 'react';

export default class UnitListItem extends React.Component {
    render() {
        return (
            <div className="text-center">
                <h2><i className="fa fa-tint" aria-hidden="true"></i></h2>
                <h4 >{this.props.unit.name}</h4>
            </div>
        );
    };
};