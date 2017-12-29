import React, { Component } from 'react';
import Panel from '../../../../components/Panel';
import Overlay from '../../../../components/Overlay';
import AddLink from '../../../../components/AddLink';
import AddTabMenu from './components/AddTabMenu';
import AddFieldMenu from './components/AddFieldMenu';
import TemplatesList from './components/TemplatesList';
import TabContent from './components/TabContent';
import FormButtons from '../../../../components/FormButtons';
import {getUnitDetailIfNeeded, updateUnit, addTab, addField, addNewTab, addNewField, getTemplatesIfNeeded, getUnitFieldsIfNeeded} from '../../../../../../services/units/actions';
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

        store.dispatch(getUnitFieldsIfNeeded());
        store.dispatch(getTemplatesIfNeeded());
    }
    
    shouldComponentUpdate(nextProps) {
        const hasNeededUnit = !!nextProps.detail._id || nextProps.match.params.id !== this.props.detail._id;
        const templates = this.props.fetchingTemplates !== nextProps.fetchingTemplates;
        const unitFields = this.props.fetchingUnitFields !== nextProps.fetchingUnitFields;
        
        return  hasNeededUnit || templates || unitFields;
    }
    
    componentWillUpdate(newProps) {
        if(newProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                touched: false
            });

            store.dispatch(getUnitDetailIfNeeded(newProps.match.params.id));
        }
    }   

    _camelize(str){
        // https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
          }).replace(/\s+/g, '');
    }

    _onBlur(e) {
        const state = {};

        if(!this.state.touched) {
            this.setState({touched: true});
        }

        state[e.target.name] = e.target.value;

        if(e.target.name === "name") {
            state.alias = this._camelize(e.target.value);
        }
        
        store.dispatch(updateUnit(state));
    }

    _onChange() {
        if(!this.state.touched) {
            this.setState({touched: true});
        }

        if(this.props.addingTab) {
            store.dispatch(addTab(false));
        }
        
        if(this.props.addingField) {
            store.dispatch(addField(false));
        }
    }

    addTabClick() {
        if(!this.props.addingTab) {
            store.dispatch(addTab());
        }
     }

    onTabFormSubmit(values) {
        const alias = this._camelize(values.tab.name);
        const tab = {
            name: values.tab.name,
            alias,
            fields: []
        };

        if(!this.state.touched) {
            this.setState({touched: true});
        }
        
        store.dispatch(addNewTab(tab));
        store.dispatch(addTab(false));
    }

    onFieldFormSubmit(values) {
        const field = values.field;

        field.alias = this._camelize(field.name);
        field.required = !!values.required;

        if(!this.state.touched) {
            this.setState({touched: true});
        }

        store.dispatch(addNewField(field, this.props.addingField));
        store.dispatch(addField(false));
    }

    renderTabs() {
        return (
            <div className="col-xs-12">
                {this.props.detail.tabs.map((tab, index) => {
                    return (
                        <TabContent addingField={this.props.addingField} addingTab={this.props.addingTab} tab={tab} key={`${tab.alias}_${index}`} />
                    );
                })}
            </div>
        )
    }

    renderForm() {
        return (
            <div key={this.props.detail._id} className="container-fluid tagus-form-info-fields">
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
                { this.props.templates 
                ? <TemplatesList onChange={this._onChange.bind(this)} templates={this.props.templates} unitTemplates={this.props.detail.templates} />
                :null
                }
                <div className="row tagus-form-control">
                    {this.renderTabs()}
                </div>
                <AddLink className="text-center" onClick={this.addTabClick.bind(this)} disabled={this.props.addingTab || this.props.addingField} text="Add a new Tab" />
                <FormButtons disabled={!this.state.touched} /> 
            </div>
        );
    }

    render() {
        const menu = [
            <AddFieldMenu key='addFieldMenu' onSubmit={this.onFieldFormSubmit.bind(this)} unitFields={this.props.unitFields} tab={this.props.addingField} show={this.props.addingField && !this.props.addingTab} />,
            <AddTabMenu key='addTabMenu' show={this.props.addingTab && !this.props.addingField} onSubmit={this.onTabFormSubmit.bind(this)} />
        ];

        return (
            <Panel title={`${this.props.detail.name}`} className="col-xs-8 full-height" menu={menu}>
                {this.props.detail._id  
                ?   this.renderForm()
                :   null
                }
                <Overlay show={this.props.fetchingList || this.props.savingDetail}/>
            </Panel>
        );
    }
}

export default UnitsDetail;   