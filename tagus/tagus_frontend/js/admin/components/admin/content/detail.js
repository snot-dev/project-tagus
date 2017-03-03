import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {getContentDetailIfNeeded} from '../../../actions/contentActions';
import Field from '../../../../forms/components/field';

export default class ContentDetail extends React.Component {
    constructor(props) {
        super(props);
        
        this.tabs = [];
        this.tabPanels = [];
    }

    componentWillMount() {
        console.warn(this.props);
        Tabs.setUseDefaultStyles(false);
        this._getTabList();
    };

    _onSubmit(formState) {

    };

    _onFieldUpdate(data) {
        console.warn(data);
    }

    _onError() {
        console.log("ERRRORRRR");
    }

    _getTabList() {
        let tab;

        for(let i = 0; i < this.props.unit.tabs.length; i++) {
            tab = this.props.unit[i];

            this.tabs.push(
                <Tab key={index}><a className="tab block">{tab.name}</a></Tab>
            )

            this.tabPanels.push(
                <section className="col-xs-12 content-container" >
                    {this._getTabFields(tab)}
                </section>
            );
        }
    }

    _getTabFields(tab) {
        let field; 
        let fields;

        for(let i = 0; i < tab.fields.length; i++) {
            field = tabt.fields[i];

            fields.push(
                <Field isValid={true} settings={field} onError='error' onUpdate={this._onFieldUpdate.bind(this)}  />
            )
        }

        return fields;
    }

    render() {
        return (
            <div className="col-xs-9">
                <section id="content-page-detail" className="section">
                    <div className="row">
                        <div className="col-xs-12">
                            <Tabs>
                                <TabList className="tab-navigation">
                                    {this.tab}
                                </TabList>
                                {this.tabPanels}
                            </Tabs>
                        </div>
                    </div>
                </section>
            </div>
        )
    };
};
