import React, { Component } from 'react';
import Panel from '../../../../components/Panel';
import Overlay from '../../../../components/Overlay';
import AddLink from '../../../../components/AddLink';
import Form from '../../../../components/Form';
import AddTabMenu from './components/AddTabMenu';
import AddFieldMenu from './components/AddFieldMenu';
import TemplatesList from './components/TemplatesList';
import TabContent from './components/TabContent';
import FormButtons from '../../../../components/FormButtons';
import {getUnitDetailIfNeeded, updateUnit, addTab, addField, addNewTab, addNewField, getTemplatesIfNeeded, getUnitFieldsIfNeeded, resetUnit} from '../../../../../../services/units/actions';
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

        this._fields = [{
            name: "Name",
            alias: "name",
            type: "text",
            required: true
        }];

        this._defaultValues = {
            name: this.props.detail.name
        };
    }
    
    _resetTemplates(formTouched, nextProps) {
        const propsTemplates = nextProps ? nextProps.detail.templates : this.props.detail.templates;
        const templates = propsTemplates.slice(0);
        const touched = !!formTouched;

        this.setState({
            templates,
            touched
        });
    }

    shouldComponentUpdate(nextProps) {
        const hasNeededUnit = !!nextProps.detail._id || nextProps.match.params.id !== this.props.detail._id;
        const templates = nextProps.templates !== this.props.templates || this.props.fetchingTemplates !== nextProps.fetchingTemplates;
        const unitFields = this.props.fetchingUnitFields !== nextProps.fetchingUnitFields;
        
        return  hasNeededUnit || templates || unitFields;
    }
    
    componentWillReceiveProps(nextProps) {
        const diffDetail = nextProps.detail._id && nextProps.detail._id !== this.props.detail._id;
        const noState = nextProps.detail.templates && !this.state.templates;
        if(diffDetail || noState) {
            this._resetTemplates(false, nextProps);
        }
    }
    
    componentWillUpdate(nextProps) {
        if(nextProps.match.params.id !== this.props.match.params.id) {
            store.dispatch(getUnitDetailIfNeeded(nextProps.match.params.id));
        }

        this._defaultValues = {
            name: nextProps.detail.name
        };
    }   

    //TODO: Move this to the reducer
    _camelize(str){
        // https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
          }).replace(/\s+/g, '');
    }

    _onBlur(e) {
        const state = {};
        const update = {};

        if(!this.state.touched) {
            this.setState({touched: true});
        }

        update[e.target.name] = e.target.value;

        if(e.target.name === "name") {
            update.alias = this._camelize(e.target.value);
        }

        store.dispatch(updateUnit(update));
    }

    _onTemplatesChange(update) {
        if(!this.state.touched) {
            this.setState({touched: true});
        }

        if(this.props.addingTab) {
            store.dispatch(addTab(false));
        }
        
        if(this.props.addingField) {
            store.dispatch(addField(false));
        }

        this._updateTemplates(update);
    }

    _updateTemplates(update) {
        const templates = this.state.templates.slice(0);

        if(update.value) {
            if(templates.indexOf())
            templates.push(update.name);
        }
        else {
            const index = templates.indexOf(update.name);
            templates.splice(index,1);
        }

        this.setState({
            templates
        });
    }

    _onCancelButton(id) {
        return () => {
            store.dispatch(resetUnit(id));
        }
    }

    _onReset(reset) {
        return () => {
            this._resetTemplates(reset);
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
                <div className="row">
                    <Form disabled={!this.state.touched} onReset={this._onReset(false)} name="unitName" fields={this._fields} defaultValues={this._defaultValues} >
                        {/* <div className="row tagus-form-control" >
                            <div className="col-xs-12 tagus-form-field">
                                <label className="tagus-label" htmlFor="name">Name</label>
                                <input type="text" onChange={this._onChange.bind(this)}  onBlur={this._onBlur.bind(this)} defaultValue={this.props.detail.name} name="name" id="name" className="tagus-input text" />
                            </div>
                        </div> */}
                        { this.props.templates 
                        ? <TemplatesList onChange={this._onTemplatesChange.bind(this)} templates={this.props.templates} unitTemplates={this.state.templates || this.props.detail.templates} />
                        :null
                        }
                        <div className="row tagus-form-control">
                            {this.renderTabs()}
                        </div>
                        <AddLink className="text-center" onClick={this.addTabClick.bind(this)} disabled={this.props.addingTab || this.props.addingField} text="Add a new Tab" />
                        {/* <FormButtons onCancel={this._onCancelButton(this.props.detail._id)} disabled={!this.state.touched} />  */}
                    </Form>
                </div>
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