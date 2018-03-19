import React, { Component } from 'react';
import moment from 'moment';
import store from '../../../../services/store';
import {getUserDetailIfNeeded} from '../../../../services/users/actions';
import Panel from '../../../../components/Panel';
import {constants} from '../../../../services/constants';


class UserDetail extends Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            store.dispatch(getUserDetailIfNeeded(this.props.match.params.id));
        }
    }

    componentWillUpdate(newProps) {
        if (newProps.match.params.id !== this.props.match.params.id) {
            store.dispatch(getUserDetailIfNeeded(newProps.match.params.id));
        }
    }
    
    render() {
        const created = moment(this.props.detail.created).format(constants.config.DATE_FORMAT);

        return (
            <Panel title={`${this.props.detail.username}`} className="col-xs-8 full-height" >
                <div className="container-fluid tagus-user-detail-info">
                    <div className="row tagus-form-control">
                        <div className="col-xs-12 col-sm-6 tagus-form-field">
                            <label className="tagus-label" >email</label>
                            <p className="tagus-info">{this.props.detail.email}</p>
                        </div>
                        <div className="col-xs-12 col-sm-6 tagus-form-field">
                            <label className="tagus-label" >Username</label>
                            <p className="tagus-info">{this.props.detail.username}</p>
                        </div>
                    </div>
                    <div className="row tagus-form-control">
                    <div className="col-xs-12 col-sm-6 tagus-form-field">
                            <label className="tagus-label" >Created by</label>
                            <p className="tagus-info">{this.props.detail.createdBy}</p>
                        </div>
                        <div className="col-xs-12 col-sm-6 tagus-form-field">
                            <label className="tagus-label" >Created</label>
                            <p className="tagus-info">{created}</p>
                        </div>
                    </div>
                    <div className="row tagus-form-control">
                        <div className="col-xs-12 col-sm-6 tagus-form-field">
                            <label className="tagus-label" >Name</label>
                            <p className="tagus-info">{this.props.detail.name}</p>
                        </div>
                        <div className="col-xs-12 col-sm-6 tagus-form-field">
                            <label className="tagus-label" >Surname</label>
                            <p className="tagus-info">{this.props.detail.surname}</p>
                        </div>
                    </div>
                </div>
            </Panel>
        );
    }
}

export default UserDetail;