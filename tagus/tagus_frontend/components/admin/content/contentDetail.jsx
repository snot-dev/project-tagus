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

        return (
            <section className="col-xs-12 content-container" >
                {tab.unitFields.map(function(field, index) {
                    return (
                        <div key={index}>
                            <label className="form-label">{field.name}</label>
                            {renderField(index, field, that.handleBlur(tabIndex, index), tabIndex)}
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
                store.dispatch(pagesActions.changedFieldValue(tab, field, value));
            }.bind(this);
        }
    },
    handleSettingsBlur: function() {
        return function(e) {
                console.log(e.target);
                store.dispatch(pagesActions.changedSettingsFieldValue(e.target));
            }.bind(this);
    },
    render: function() {
        var that = this;

        return (
            <div className="col-xs-9">
                <section className="section content-page-detail">
                    <div className="row">
                    {this.props.pages.fetchingPageDetail 
                    ?   <div className="loader"></div> 
                    :   this.props.pages.tabs.length > 0 
                    ?    <Tabs>
                            {this.renderTabs()}
                             {this.props.pages.detail.unitType.tabs.map(function(tab, index) {
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

                </section>
            </div>
        )
    }
});


var mapStateToProps = function(state) {
  return {
    pages:  state.pages
  };
};


module.exports = ReactRedux.connect(mapStateToProps)(PageDetail);
