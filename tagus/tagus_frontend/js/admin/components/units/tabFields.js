import React from 'react';

const PROPTYPES = {
    field: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        alias: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
    }).isRequired
};

export default class TabFields extends React.Component{
    render() {
        return (
            <section className="row tab-field">
                <div className="col-xs-12 col-sm-4">
                    <p className="tab-field-name"><label className="tab-field-name">Name:</label> {this.props.field.name}</p>
                    <p className="tab-field-alias"><label className="tab-field-alias">Alias:</label>{this.props.field.alias}</p>
                </div>
                <div className="col-xs-12 col-sm-8">
                    <p className="tab-field-type"><label className="tab-field-alias">Type:</label>{this.props.field.type}</p>
                </div>
            </section>
        )
    };
};

TabFields.propTypes = PROPTYPES;