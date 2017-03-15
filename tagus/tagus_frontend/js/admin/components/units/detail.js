import React from 'react';
import store from '../../../store';

const PROPTYPES =  {
    name: React.PropTypes.string.isRequired,
    tabs: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        fields: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            alias: React.PropTypes.string.isRequired,
            type: React.PropTypes.string.isRequired,
        })).isRequired
    })).isRequired,
    templates: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default class UnitDetail extends React.Component {
    render() {
        return (
            <div className="col-xs-8">
                <section className="section content-page-list">
                    <h2 className="title">{this.props.unit.name}</h2>
                    <div>
                    </div>  
                </section>   
            </div>
        );
    };
};

UnitDetail.propTypes = PROPTYPES;