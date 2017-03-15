import React from 'react';
import {Link} from 'react-router';
import UnitListItem from './listItem';

export default class UnitsList extends React.Component {
    constructor(props) {
        super(props);

        this.units = [];
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.fetchingUnitsList || nextProps.units.length > 0;
    };

    componentWillUpdate(nextProps) {
        this._setUnits(nextProps.units);
    };

    _setUnits(units) {
        this.units.length = 0;

        for(let i = 0; i < units.length; i++) {
            this.units.push(
                <Link key={i} to={'/units/' + units[i]._id} className="col-xs-6 col-sm-4">
                    <UnitListItem unit={units[i]} />
                </Link>
            );
        }
    };

    render() {
        return (
            <div className="col-xs-12 col-sm-4">
                <section className="section unit-list">
                    <h2 className="title">Units</h2>
                    <div className="container-fluid">
                        <div className="col-xs-12">
                            <div className="row">
                                {this.units}
                            </div>
                        </div>
                    </div>
                </section>   
            </div>
        );
    };
};