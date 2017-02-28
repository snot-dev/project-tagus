import React from 'react';
import store from '../../../../store';
import {getContentDetailIfNeeded} from '../../../actions/contentActions';
import {connect} from 'react-redux';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
var dateFormat = require('dateformat');
var RichTextEditor = require('react-quill');

class PageDetail extends React.Component { 
    componentWillMount() {
       Tabs.setUseDefaultStyles(false);

       store.dispatch(getContentDetailIfNeeded(this.props.params.id));
    };

    renderTabs() {
        return (
            <TabList className="tab-navigation">
                    {this.props.content.tabs.map(function(tab, index) {
                        return(
                            <Tab key={index}><a className="tab block">{tab}</a></Tab>
                        )
                    })}
            </TabList>
        );
    };

    renderTabContent(tab, tabIndex) {
        var that = this;
       
        return (
            <section className="col-xs-12 content-container" >
                {tab.unitFields.map(function(field, index) {
                    return (
                        <div key={index}>
                            <label className="form-label">{field.name}</label>
                            {that.renderField(field)[field.type]()}
                        </div>
                    );
                })}
            </section>
        )
    };

    renderField(options) {
        var that = this;
        
        return {
            "text": function() {
                return (
                    <input type="text" className="form-field" onBlur={that.handleBlur(options)} defaultValue={that.props.content.detail.content[options.alias]} name={options.alias} />
                );
            },
            "textarea": function() {
                return (
                    <textarea className="form-field textarea" onBlur={that.handleBlur(options)} defaultValue={that.props.content.detail.content[options.alias]}  name={options.alias} ></textarea>
                );
            },
            "richText": function() {
                return (
                    <div className="richtext-container">
                        <RichTextEditor  theme="snow" onChange={that.handleBlur(options)} defaultValue={that.props.content.detail.content[options.alias]}  name={options.alias}/>
                    </div>
                );
            },
            "number": function() {
                return (
                    <input type="number" className="form-field" onBlur={that.handleBlur(options)} defaultValue={that.props.content.detail.content[options.alias]} name={options.alias} />
                );
            },
            "boolean": function(){
                return (
                    <div className="checkbox-container">
                        <input type="checkbox" onChange={that.handleBlur(options)} name={options.alias} checked={JSON.parse(that.props.content.detail.content[options.alias] || 'false')} />
                    </div>
                );

            },
            "email": function() {
                return (
                    <input type="email" className="form-field" onBlur={that.handleBlur(options)} defaultValue={that.props.content.detail.content[options.alias]} name={options.alias} />
                );
            },
            "password": function() {
                return (
                    <input type="password" className="form-field" onBlur={that.handleBlur(options)} defaultValue={that.props.content.detail.content[options.alias]} name={options.alias} />
                );
            },
            "radio": function() {
                return (
                    <div className="checkbox-container">
                        {options.options.length > 0 
                        ?   options.options.map(function(option, index) {
                                return(
                                <div key={index}>
                                    <label><input type="radio" onChange={that.handleBlur(options)} name={options.alias} value={option.value} checked={JSON.parse(that.props.content.detail.content[options.alias] === option.value || "false")} /> {option.name} </label><br/>
                                </div>       
                                )
                            })   
                        :   null
                        }
                    </div>
                );
            },
            "dropdown": function() {
                return (
                    <select className="form-field" onChange={that.handleBlur(options)} defaultValue={that.props.content.detail.content[options.alias]} name={options.alias}>
                        {options.options.length > 0 
                        ?   options.options.map(function(option, index) {
                                return(
                                    <option value={option.value} key={index}>{option.name}</option>      
                                )
                            })   
                        :   null
                        }
                    </select>  
                );
            }
        }
    };

    renderSettings() {
       return (
           <TabPanel>
            <section className="col-xs-12 content-container">
                <div>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" onBlur={this.handleSettingsBlur()} className="form-field" defaultValue={this.props.content.detail.name} />
                    <label htmlFor="url" className="form-label">Url</label>
                    <input type="text" name="url" onBlur={this.handleSettingsBlur()} className="form-field" defaultValue={this.props.content.detail.url} />
                    <label className="form-label">Unit Type</label>
                    <p>{this.props.content.detail.unitType.name}</p>
                    <label className="form-label">Created</label>
                    <p>{dateFormat(this.props.content.detail.created, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
                    <label className="form-label">Created By</label>
                    <p>{this.props.content.detail.createdBy}</p>
                    <label className="form-label">Edited</label>
                <p>{dateFormat(this.props.content.detail.edited, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
            </div>
            </section>
           </TabPanel>
       )
    };

    handleBlur(field) {
        return (e)=> {
            var value = e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value ): e;
            store.dispatch(pageActions.changedTabFieldValue(field, value));
        };
    };

    handleSettingsBlur() {
        return (e) =>{
                store.dispatch(pageActions.changedSettingsFieldValue(e.target));
            };
    };

    savePage() {
        if(this.validUnit()) {
            store.dispatch(pageActions.savePageDetail(this.props.content.detail));
        }
    };

    resetPage() {
        store.dispatch(pageActions.resetPageDetail(this.props.content.detail._id));
    };

    validUnit() {
        for(var i = 0; i < this.props.content.unit.tabs.length; i++) {
            for(var k = 0; k < this.props.content.unit.tabs[i].unitFields.length; k++) {
                var thisField = this.props.content.unit.tabs[i].unitFields[k];

                if(thisField.required && this.props.content.detail.content[thisField.alias] === '') {
                    return false;
                }
            }
        }

        return true;
    };

    render() {
        var that = this;

        return (
            <div className="col-xs-9">
                <section id="content-page-detail" className="section">
                    <div className="row">
                    {this.props.showLoader
                    ?   <div className="loader"></div> 
                    :   this.props.content.tabs.length > 0 
                    ?    <Tabs>
                            {this.renderTabs()}
                             {this.props.content.unit.tabs.map(function(tab, index) {
                                return (
                                    <TabPanel key={index}>
                                        {that.renderTabContent(tab, index)}
                                    </TabPanel>
                                )
                            })}
                            {this.renderSettings()}
                        </Tabs>
                    :  null
                    }
                    </div>
                    {!this.props.content.fetchingPageDetail && !this.props.content.savingPageDetail
                    ?   <div className="row">
                            <div className="col-xs-12 buttons-container">
                                <button className="button" onClick={this.resetPage}> Cancel</button>
                                <button className="button submit pull-right" onClick={this.savePage}>Save</button>
                            </div>
                        </div>
                    :   null
                    }
                </section>
            </div>
        )
    };
};


var mapStateToProps = function(state) {
  return {
    content:  state.content,
    showLoader: state.content.fetchingPageDetail || state.content.savingPageDetail
  };
};


