import React, { Component } from 'react';
import {Form, Text} from 'react-form';
import {Tabs, Tab} from 'react-bootstrap';
// import store from '../../../../../../services/store';
import './contentForm.css';

class ContentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 0
        }
    }

    _handleTabchange(key) {
        this.setState({key});
    }

    _renderTabs(tabs) {
        const that = this;
        return (
            <Tabs activeKey={this.state.key} onSelect={this._handleTabchange} id="tagus-content-tabs">
            {tabs.map((tab, index) => {
                    return(
                        <Tab eventKey={index} title={tab.name} key={index}>
                            Hello!
                        </Tab>
                    )
                })
            }
            </Tabs>
        )
    }

    render() {
        console.log(this.props.unit);
        return (
            <div>
                {this.props.unit.name}
                <Form>
                    {formApi => (
                        <form>
                            {
                                this._renderTabs(this.props.unit.tabs)

                            }
                        </form>
                    )}
                </Form>
            </div>
        );
    };
}

export default ContentForm;