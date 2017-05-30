import React from 'react';

export default class UnitFieldListItem extends React.Component {
    render() {
        return (
            <div className="text-center">
                <h2><i className="fa fa-tint" aria-hidden="true"></i></h2>
                <h4 >{this.props.unitField.name}</h4>
            </div>
        );
    };
};