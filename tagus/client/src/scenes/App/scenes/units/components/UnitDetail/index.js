import React, { Component } from 'react';
import Panel from '../../../../components/Panel';
import Overlay from '../../../../components/Overlay';
import AddTabButton from './components/AddTabButton';
import AddTabMenu from './components/AddTabMenu';
import {getUnitDetailIfNeeded} from '../../../../../../services/units/actions';
import store from '../../../../../../services/store';
import './unitsDetail.css';

class UnitsDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            touched: false
        };
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
            this.setState({
                touched: false,
                values: {}
            });

            store.dispatch(getUnitDetailIfNeeded(newProps.match.params.id));
        }
    }

    _onBlur(e) {
        const state = {};
        const values = {};

        if(!this.state.touched) {
            state.touched = true;
        }

        values[e.target.name] = e.target.value;
        
        state.values = values;

        this.setState(state);
    }

    _onChange() {
        if(!this.state.touched) {
            this.setState({touched: true, values: {}});
        }
    }

    renderForm() {
        return (
            <div key={this.props.detail._id}>
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
                    <div className="row tagus-form-control" >
                        <div className="col-xs-12 tagus-form-field">
                            <label className="tagus-label" htmlFor="name">Name</label>
                            <input type="text" onChange={this._onChange.bind(this)}  onBlur={this._onBlur.bind(this)} defaultValue={this.props.detail.name} name="name" id="name" className="tagus-input text" />
                        </div>
                    </div>
                </div>
                <div>
                    { !this.props.addingTab
                    ?   <AddTabButton addingTab={this.props.addingTab} />
                    :   null
                    }
                </div>
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