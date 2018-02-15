import React, { Component } from 'react';
import _ from 'lodash';
import Panel from '../../../../components/Panel';
import Modal from '../../../../components/Modal';
import AddLink from '../../../../components/AddLink';
import Overlay from '../../../../components/Overlay';
import store from '../../../../services/store';
import './translateList.css';

class TranslatesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            touched: false,
            submited: false,
            timesSubmited:0,
            valid: true,
            translates: [],
            fields: [],
            showWarningModal: false
        };
    }

    componentWillReceiveProps(props) {
        if (props.list) {
            this._convertToArrayOfKeyValue(props.list);
        }
    }

    _onChange() {
        const state = {};
        if(!this.state.touched) {
            state.touched = true;
        }

        if (!this.state.valid) {
            state.valid = true;
        }

        if (Object.keys(state).length > 0) {
            this.setState(state);
        }
    }

    _onBlur(index) {
        return (e) => {
            const options = _.cloneDeep(this.state.options);

            options[index][e.target.name] = e.target.value;

            this.setState({
                options
            });
        }
    }

    _convertToArrayOfKeyValue(listObj){
        const arr = [];

        for(const k in listObj) {
            arr.push({
                key: k,
                value: listObj[k]
            });
        }

        this.setState({
            translates: arr
        });
    }

    render() {
        return (
            <Panel title="Translates" className="col-xs-6 full-height">
                <div className="container-fluid tagus-translates-list">
                    {this.state.translates.map((translate, index) => {
                        return (
                            <div key={`${index}_${translate.key}`} className="row tagus-translates-list-item">
                                <div className="col-xs-12 col-sm-6">
                                    <label htmlFor="key" className="tagus-label tagus-translate-list-item-key">Key</label>
                                    <input name="key" type='text' className="tagus-translate-input" defaultValue={translate.key}  />
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <label htmlFor="value" className="tagus-label tagus-translate-list-item-key">Value</label>
                                    <input name="value" type='text' className="tagus-translate-input" defaultValue={translate.value} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Panel>
        )
    }
}

export default TranslatesList;