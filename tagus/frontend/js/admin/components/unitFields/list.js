import React from 'react';
import {Link} from 'react-router';
import UnitFieldListItem from './listItem';

export default class UnitsList extends React.Component {
    constructor(props) {
        super(props);

        this.unitFields = [];
    }

    componentWillMount() {
        this._setUnitFields(this.props.unitFields);
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.fetchingList || nextProps.unitFields.length > 0;
    };

    componentWillUpdate(nextProps) {
        this._setUnitFields(nextProps.unitFields);
    };

    _setUnitFields(unitFields) {
        let unitField;
        this.unitFields.length = 0;

        for(let i = 0; i < unitFields.length; i++) {
            unitField = unitFields[i];

            this.unitFields.push(
                <Link key={i} to={'/unitFields/' + unitField._id} onClick={this.props.getDetail(unitField._id)} className="col-xs-6 col-sm-4">
                    <UnitFieldListItem unitField={unitField} />
                </Link>
            );
        }
    };

    render() {
        return (
            <div className="col-xs-12 col-sm-4">
                <section className="section unitField-list">
                    <h2 className="title">Unit Fields</h2>
                    <div className="container-fluid">
                        <div className="col-xs-12">
                            <div className="row">
                                {this.unitFields}
                            </div>
                        </div>
                    </div>
                </section>   
            </div>
        );
    };
};