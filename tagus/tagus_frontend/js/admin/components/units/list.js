import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';    

export default class UnitsList extends React.Component {
    shouldComponentUpdate(nextState) {
        return nextState.fetchingUnitsList || nextState.list.length > 0;
    };

    render() {
        return (
            <div className="col-xs-12">
                <section className="section unit-list">
                    <h2 className="title">Units</h2>
                </section>   
            </div>
        );
    };
};