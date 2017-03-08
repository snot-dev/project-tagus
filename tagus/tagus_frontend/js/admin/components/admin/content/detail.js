import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {updateContentField, saveContent} from '../../../actions/contentActions';
import Field from '../../../../forms/components/field';
import store from '../../../../store';

export default class ContentDetail extends React.Component {
    constructor(props) {
        super(props);
        
        this.tabs = [];
        this.tabPanels = [];
    }

    componentWillMount() {
        Tabs.setUseDefaultStyles(false);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return Object.keys(nextProps.detail).length > 0 && Object.keys(nextProps.unit).length > 0 && nextProps.detail._id === this.props.params.id;
    };

    componentWillUpdate(nextProps) {
        this._resetTabs();
        this._getTabList(nextProps.unit.tabs, nextProps.detail.content);
    };

    componentWillUnmount() {
        this._resetTabs();
    };

    _resetTabs() {
        this.tabs.length = 0;
        this.tabPanels.length = 0;
    };

    _saveContent() {
        console.warn(this.props.detail);
        store.dispatch(saveContent(this.props.detail));
    };

    _onFieldUpdate(data) {
        store.dispatch(updateContentField(data));
    };

    _onError() {
        console.log("ERRRORRRR");
    };

    _getTabList(tabs, content) {
        let tab;

        for(let i = 0; i < tabs.length; i++) {
            tab = tabs[i];

            this.tabs.push(
                <Tab key={i}><a className="tab block">{tab.name}</a></Tab>
            );

            this.tabPanels.push(
                <TabPanel key={i}>
                    <section className="col-xs-12 content-container" >
                        {this._getTabFields(tab, content)}
                    </section>
                </TabPanel>
            );
        }
    };

    _getTabFields(tab, content) {
        let field; 
        let fields = [];

        for(let i = 0; i < tab.fields.length; i++) {
            field = tab.fields[i];

            fields.push(
                <Field key={i.toString() + field.alias + content[field.alias] } isValid={true} defaultValue={content[field.alias]} settings={field} errorClass='error' onUpdate={this._onFieldUpdate.bind(this)}  />
            );
        }

        return fields;
    };

    render() {
        return (
            <div className="col-xs-9">
                <section id="content-page-detail" className="section">
                    <div className="row">
                        <div className="col-xs-12">
                            <Tabs>
                                <TabList className="tab-navigation">
                                    {this.tabs}
                                </TabList>
                                {this.tabPanels}
                            </Tabs>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 buttons-container">
                            <button className="button"> Cancel</button>
                            <button className="button submit pull-right" onClick={this._saveContent.bind(this)}>Save</button>
                        </div>
                    </div>
                </section>
            </div>
        )
    };
};
