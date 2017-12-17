import React, { Component } from 'react';
import Panel from '../../../../components/Panel';
import Overlay from '../../../../components/Overlay';
import Form from '../../../../components/Form';
import AddTabButton from './components/AddTabButton';
import AddTabMenu from './components/AddTabMenu';
import {getUnitDetailIfNeeded} from '../../../../../../services/units/actions';
import store from '../../../../../../services/store';
import './unitsDetail.css';

class UnitsDetail extends Component {
    constructor(props) {
        super(props);

        this.fields = [
            {
                name: "Name",
                type: "text",
                alias: "name",
                required: true
            }
        ];
    }

    _getFieldsDefaultValues() {
        const values = {};
        
        for(const field of this.fields)  {
            values[field.alias] = this.props.detail[field.alias];
        }

        return values;
    }

    componentWillMount() {
        if (this.props.match.params.id) {
            store.dispatch(getUnitDetailIfNeeded(this.props.match.params.id));
        }

    }
    
    shouldComponentUpdate(props) {
        const hasNeededUnit = !!props.detail._id || props.match.params.id !== this.props.detail._id;
        
        return  hasNeededUnit;
    }
    
    componentWillUpdate(newProps) {
        if(newProps.match.params.id !== this.props.match.params.id) {
            store.dispatch(getUnitDetailIfNeeded(newProps.match.params.id));
        }
    }

    renderForm() {
        return (
            <div>
                <div className="container-fluid tagus-form-info-fields">
                    <div className="row tagus-form-control">
                        <div className="col-xs-12 col-sm-6 tagus-form-field">
                            <label className="tagus-label" >Alias</label>
                            <p className="tagus-info">{this.props.detail.alias}</p>
                        </div>
                        <div className="col-xs-12 col-sm-6 tagus-form-field text-right">
                            <label className="tagus-label" >Created</label>
                            <p className="tagus-info">{this.props.detail.created}</p>
                        </div>
                    </div>
                </div>
                <Form key={this.props.detail._id} name="unit" fields={this.fields} defaultValues={this._getFieldsDefaultValues()} >
                    <div>
                        { !this.props.addingTab
                        ?   <AddTabButton addingTab={this.props.addingTab} />
                        :   null
                        }
                    </div>
                </Form>
            </div>
        );
    }

    render() {
        return (
            <Panel title={`${this.props.detail.name}`} className="col-xs-8 full-height">
                {this.props.detail._id  
                ?   this.renderForm()
                :   null
                }

                <AddTabMenu show={this.props.addingTab} />
                <Overlay show={this.props.fetchingList || this.props.savingDetail}/>
            </Panel>
        );
    }
}

export default UnitsDetail;   