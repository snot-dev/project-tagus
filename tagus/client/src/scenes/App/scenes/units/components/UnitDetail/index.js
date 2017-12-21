import React, { Component } from 'react';
import Panel from '../../../../components/Panel';
import Overlay from '../../../../components/Overlay';
import AddLink from '../../../../components/AddLink';
import AddTabMenu from './components/AddTabMenu';
import TemplatesList from './components/TemplatesList';
import TabContent from './components/TabContent';
import {getUnitDetailIfNeeded, updateUnit, addTab, addNewTab, getTemplatesIfNeeded} from '../../../../../../services/units/actions';
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

        store.dispatch(getTemplatesIfNeeded());
    }
    
    shouldComponentUpdate(nextProps) {
        const hasNeededUnit = !!nextProps.detail._id || nextProps.match.params.id !== this.props.detail._id;
        const templates = this.props.fetchingTemplates !== nextProps.fetchingTemplates;
        
        return  hasNeededUnit || templates;
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

        store.dispatch(addNewTab(tab));
        store.dispatch(addTab(false));
    }

    renderTabs() {
        return (
            <div className="col-xs-12">
                {this.props.detail.tabs.map((tab, index) => {
                    return (
                        <TabContent tab={tab} key={`${tab.alias}_${index}`} />
                    );
                })}
            </div>
        )
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
                    { this.props.templates 
                    ? <TemplatesList templates={this.props.templates} unitTemplates={this.props.detail.templates} />
                    :null
                    }
                    <div className="row tagus-form-control">
                        {this.renderTabs()}
                    </div>
                    <AddLink onClick={this.addTabClick.bind(this)} show={!this.props.addingTab} text="Add a new Tab" />
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

                <AddTabMenu show={this.props.addingTab} onSubmit={this.onTabFormSubmit.bind(this)} />
                <Overlay show={this.props.fetchingList || this.props.savingDetail}/>
            </Panel>
        );
    }
}

export default UnitsDetail;   