import React, { Component } from 'react';
import {getContentDetailIfNeeded} from '../../../../../../services/content/actions';
import store from '../../../../../../services/store';
import './contentDetail.css';

class ContentDetail extends Component {
    componentWillMount() {
        if(this.props.match.params.id) {
            store.dispatch(getContentDetailIfNeeded(this.props.match.params.id));
        }
    }
    
    componentWillUpdate(newProps) {
        if(newProps.match.params.id !== this.props.match.params.id) {
            store.dispatch(getContentDetailIfNeeded(newProps.match.params.id));
        }
    }

    render() {
        return (
            <div>
                {this.props.detail.name}
            </div>  
        );
    };
}

export default ContentDetail;