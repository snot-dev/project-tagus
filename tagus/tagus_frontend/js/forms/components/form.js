import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Field from './field';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this._defaultSettings = {
            validation: {
                validate: true,
                onError: "error"    
            },
            enableTabs: false,
            tabs: {},
            buttons: {
                cancel: {
                    class: "button",
                    id: "backButton",
                    value: "Reset"
                },
                submit: {
                    class: "button submit",
                    id: "submitButton",
                    value: "Submit"
                }
            },
        };

        this._validFields = [];
        
        this.state = {
            validForm: false,
            fields: {},
            body: {},
            tabs: {}
        };

        this._validForm = true;

        this._settings = Object.assign(this._defaultSettings, this.props.settings);

        // this._setInitialState();
    };

    componentWillMount() {
        Tabs.setUseDefaultStyles(false);
    };

    _onUpdate(data) {
        this.state.fields[data.name].value = data.value;
    };

    _setInitialState() {
        let field;
        let key;

        for(let i  = 0; i < this.props.fields.length; i++) {
            field = this.props.fields[i];
            key = this.props.fields[i].name;
            
            if(this._isConsiderableField(field)) {
                this.state.fields[key] = {
                    value: field.defaultValue,
                    valid: true
                }
                
                this._validFields.push(field);

            }
            else {
                console.error("Field does not have a valid name");
            }
        }
    };

    _setInitialStateWithTabs() {
        let tab;
        let stateTab;
        let field;
        let key;

        for(let i = 0; i < this.props.tabs.lenght; i++) {
            tab = this.props.tabs[i];
            
            this.state.tabs[tab.name] = [];
            stateTab = this.state.tabs[tab.name];

            for (let j = 0; j < tab.fields.length; j++ ) {
                field = tab.fields[j];
                key = field.name;

                if(this._isConsiderableField(field)){

                }
            }
        } 
    };

    _isConsiderableField(field) {
        return field.name && field.name.length > 0;
    };

    _renderFields() {
        let fields = [];
        let field;

        for(let i = 0; i < this._validFields.length; i++) {
            field = this._validFields[i];

            fields.push(
                <Field isValid={this.state.fields[field.name].valid} errorClass={this._settings.validation.onError}  onUpdate={this._onUpdate.bind(this)} settings={field} key={i} />
            );
        }

        return (
            <div className="field-group">
                {fields}
            </div>
        )
    };
    
    _renderTabs() {
        let tabs = [];
        let TabPanels = [];
        let tab;

        for( let i = 0; i < this.props.tabs.length; i++) {
            tab = this.props.tabs[i];
            if(tab.name !== "") {
                tabs.push(
                    <Tab key={i} > <a className="tab block">{tab.name}</a></Tab>
                );
            }
        }

        return (
            <Tabs>
                <TabList className="tab-navigation">
                    {tabs}
                </TabList>
            </Tabs>
        );
    };

    _hasTabs() {
        return this._settings.enableTabs && this.props.tabs && this.props.tabs.length > 0;
    };  

    _validateFields() {
        let field; 
        let stateField;
        let fields = this.state.fields;
        let validForm = true;
        let body = {};


        for(let i = 0; i < this._validFields.length; i++) {
            field = this._validFields[i];

            if(fields.hasOwnProperty(field.name)) {
                stateField = fields[field.name];
                stateField.valid = true;

                if(field.required === true && (!stateField.value || stateField.value.length === 0)) {
                    validForm = false;
                    stateField.valid = false; 
                }
                else {
                    body[field.name] = stateField.value
                }
            }
        }

        this.state = {
            validForm,
            fields,
            body,
        };

    };

    _onSubmit(e) {
        e.preventDefault();
        this._validateFields();

        if(this.state.validForm && this.props.onSubmit) {
            this.props.onSubmit(this.state.body);
        }
        else if(!this.state.validForm && this.props.onError){
            this.props.onError();
        }
    };

    render() {
        return (
            <form onSubmit={this._onSubmit.bind(this)} className={this.props.class}>
                {this._hasTabs() ? this._renderTabs() : this._renderFields()}
                <div className="buttons-container">
                    {this._settings.backButton ? <button id={this._settings.buttons.back.id} className={this._settings.buttons.back.class }> {this._settings.buttons.back.value}</button> : null }
                    <button id={this._settings.buttons.submit.id} className={this._settings.buttons.submit.class} >{this._settings.buttons.submit.value}</button>
                </div>
            </form>
        );
    };
};  