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

    _getFieldType(field) {
        switch(field.type) {
            case'text':
                return Text;
            default:
                break;
        }
    }

    _renderField(field) {
        const that = this;
        const Field = this._getFieldType(field);

        return (
            <div className="tagus-form-field">
                <label htmlFor={field.alias}>{field.name}</label>
                <Field field={field.alias} id={field.alias} />                
            </div>
        )
    }

    _renderTabs(tabs) {
        const that = this;
        return (
            <Tabs activeKey={this.state.key} onSelect={this._handleTabchange} id="tagus-content-tabs">
            {tabs.map((tab, index) => {
                    return(
                        <Tab eventKey={index} title={tab.name} key={index}>
                            {tab.fields.map((field, fieldIndex) => {
                                return(
                                    <div className="tagus-form-control" key={fieldIndex}>
                                        {that._renderField(field)}
                                    </div>
                                )
                            })}
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