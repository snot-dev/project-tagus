import React, { Component } from 'react';
import {getContentDetailIfNeeded} from '../../../../../../services/content/actions';
import {Form, Text} from 'react-form';
import store from '../../../../../../services/store';
import Panel from '../../../../components/Panel';
import ContentForm from './components/contentForm';
import './contentDetail.css';

class ContentDetail extends Component {
    componentWillMount() {
        if(this.props.match.params.id) {
            store.dispatch(getContentDetailIfNeeded(this.props.match.params.id));
        }
    }
    
    shouldComponentUpdate(props) {
        return this.props.match.params.id === props.detail._id && props.unit._id;
    }

    componentWillUpdate(newProps) {
        if(newProps.match.params.id !== this.props.match.params.id) {
            store.dispatch(getContentDetailIfNeeded(newProps.match.params.id));
        }
    }

    render() {
        return (
            <Panel header={this.props.detail.name} className="col-xs-8 full-height">
                {
                    this.props.unit
                    ? <ContentForm {...this.props} />
                    : null
                }
            </Panel>  
        );
    };
}

export default ContentDetail;