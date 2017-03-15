import React from 'react';

export default class UnitListItem extends React.Component {


    render() {
        return (
            <div>
                <h4 className="text-center">{this.props.unit.name}</h4>
            </div>
        );
    };
};