var React = require('react');
var store = require('../../../adminStore');
var pagesActions = require('../../../actions/pagesActions');
var ReactRedux = require('react-redux');
var Tab = require('react-tabs').Tab;
var Tabs = require('react-tabs').Tabs;
var TabList = require('react-tabs').TabList;
var TabPanel = require('react-tabs').TabPanel;
var renderField = require('../../../tagus_lib').renderFieldType;
var renderSettingsTab = require('../../../tagus_lib').renderSettingsTab;
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
    renderSettings: function(blurHandler) {
       return (
           <TabPanel>
            <section className="col-xs-12 content-container">
                    {renderSettingsTab(this.props.pages.detail, blurHandler)}
            </section>
           </TabPanel>
       )
    },
    renderTabContent: function(tab, tabIndex) {
        var that = this;
        var pageTab = that.props.pages.detail.unitType.tabs[tabIndex]; //TODO: check if this tab exists in the page already

        return (
            <section className="col-xs-12 content-container" >
                {tab.unitFields.map(function(field, index) {
                    if(!pageTab.unitFields[index] || pageTab.unitFields[index].alias !== field.alias) {
                        //create new field in the page with an empty value
                        console.log("created!");
                        var newField = _.extend({}, field);
                        newField.value = null;
                        pageTab.unitFields.push(newField);
                    }

                    return (
                        <div key={index}>
                            <label className="form-label">{field.name}</label>
                            {renderField(index, field, that.handleBlur(tabIndex, index), tabIndex, pageTab.unitFields[index].value)}
                        </div>
                    );
                })}
            </section>
        )
    },
    handleBlur: function(tab, field) {

        return function() {
            return function(e) {
                var value = e.target ? e.target.value : e;
                store.dispatch(pagesActions.changedTabFieldValue(tab, field, value));
                console.log(this);
            }.bind(this);
        }
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
                            {this.renderSettings(this.handleSettingsBlur)}
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
