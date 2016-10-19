var React = require('react');
var store = require('../../../adminStore');
var pagesActions = require('../../../actions/pagesActions');
var ReactRedux = require('react-redux');
var Tab = require('react-tabs').Tab;
var Tabs = require('react-tabs').Tabs;
var TabList = require('react-tabs').TabList;
var TabPanel = require('react-tabs').TabPanel;
var dateFormat = require('dateformat');
var RichTextEditor = require('react-quill');
var _ = require('underscore');

var PageDetail = React.createClass ( {
    componentWillMount: function() {
       Tabs.setUseDefaultStyles(false);

       store.dispatch(pagesActions.getPageDetailIfNeeded(this.props.params.id));
    },
    renderTabs: function() {
        return (
            <TabList className="tab-navigation">
                    {this.props.pages.tabs.map(function(tab, index) {
                        return(
                            <Tab key={index}><a className="tab block">{tab}</a></Tab>
                        )
                    })}
            </TabList>
        );
    },

    renderTabContent: function(tab, tabIndex) {
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
    },
    renderField: function(options){
        var that = this;
        return {
            "text": function() {
                return (
                    <input type="text" className="form-field" onBlur={that.handleBlur(options)} defaultValue={that.props.pages.detail.content[options.alias]} name={options.alias} />
                );
            },
            "textarea": function() {
                return (
                    <textarea className="form-field textarea" onBlur={that.handleBlur(options)} defaultValue={that.props.pages.detail.content[options.alias]}  name={options.alias} ></textarea>
                );
            },
            "richText": function() {
                return (
                    <div className="richtext-container">
                        <RichTextEditor  theme="snow" onChange={that.handleBlur(options)} defaultValue={that.props.pages.detail.content[options.alias]}  name={options.alias}/>
                    </div>
                );
            },
            "number": function() {
                return (
                    <input type="number" className="form-field" onBlur={that.handleBlur(options)} defaultValue={that.props.pages.detail.content[options.alias]} name={options.alias} />
                );
            },
            "boolean": function(){
                return (
                    <div className="checkbox-container">
                        <input type="checkbox" onChange={that.handleBlur(options)} name={options.alias} checked="" />
                    </div>
                );

            },
            "email": function() {
                return (
                    <input type="email" className="form-field" onBlur={that.handleBlur(options)} defaultValue={that.props.pages.detail.content[options.alias]} name={options.alias} />
                );
            },
            "radio": function() {
                return (
                    <div className="checkbox-container">
                        {options.options.length > 0 
                        ?   options.options.map(function(option, index) {
                                return(
                                <div key={index}>
                                    <label><input type="radio" name={options.alias} value={option.value} /> {option.name} </label><br/>
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
                    <select className="form-field" name={options.alias}>
                        {options.options.length > 0 
                        ?   options.options.map(function(option, index) {
                                return(
                                    <option value={option.value} key={index}>{options.name}</option>      
                                )
                            })   
                        :   null
                        }
                    </select>  
                );
            }
        }
    },
    renderSettings: function() {
       return (
           <TabPanel>
            <section className="col-xs-12 content-container">
                <div>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" onBlur={this.handleSettingsBlur()} className="form-field" defaultValue={this.props.pages.detail.name} />
                    <label htmlFor="url" className="form-label">Url</label>
                    <input type="text" name="url" onBlur={this.handleSettingsBlur()} className="form-field" defaultValue={this.props.pages.detail.url} />
                    <label className="form-label">Unit Type</label>
                    <p>{this.props.pages.detail.unitType.name}</p>
                    <label className="form-label">Created</label>
                    <p>{dateFormat(this.props.pages.detail.created, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
                    <label className="form-label">Created By</label>
                    <p>{this.props.pages.detail.createdBy}</p>
                    <label className="form-label">Edited</label>
                <p>{dateFormat(this.props.pages.detail.edited, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
            </div>
            </section>
           </TabPanel>
       )
    },
    handleBlur: function(field) {
        return function(e) {
            var value = e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value ): e;
            store.dispatch(pagesActions.changedTabFieldValue(field, value));
        }.bind(this);
    },
    handleSettingsBlur: function() {
        return function(e) {
                store.dispatch(pagesActions.changedSettingsFieldValue(e.target));
            }.bind(this);
    },
    savePage: function() {
        store.dispatch(pagesActions.savePageDetail(this.props.pages.detail));
    },
    resetPage: function() {
        store.dispatch(pagesActions.resetPageDetail(this.props.pages.detail._id));
    },
    render: function() {
        var that = this;

        return (
            <div className="col-xs-9">
                <section id="content-page-detail" className="section">
                    <div className="row">
                    {this.props.showLoader
                    ?   <div className="loader"></div> 
                    :   this.props.pages.tabs.length > 0 
                    ?    <Tabs>
                            {this.renderTabs()}
                             {this.props.pages.unit.tabs.map(function(tab, index) {
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
                    {!this.props.pages.fetchingPageDetail && !this.props.pages.savingPageDetail
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
    }
});


var mapStateToProps = function(state) {
  return {
    pages:  state.pages,
    showLoader: state.pages.fetchingPageDetail || state.pages.savingPageDetail
  };
};


module.exports = ReactRedux.connect(mapStateToProps)(PageDetail);
