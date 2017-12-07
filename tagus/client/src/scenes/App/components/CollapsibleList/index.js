import React, { Component } from 'react';
import {Collapse} from 'react-bootstrap';
import './collapsibleList.css';

class CollapsibleList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    componentWillMount() {
        if( typeof this.props.open !== 'undefined'){
            this.setState({
                open: this.props.open
            });
        }
    }

    _onClick(){
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const className = this.props.className || '';
        const open = this.state.open ? ' open' : '';

        return(
            <div className={`tagus-collapsible-list ${className}`}>
                <a className={`tagus-collapsible-list-button${open}`} onClick={this._onClick.bind(this)}>{this.props.buttonChildren}</a>
                {this.props.parent}
                <Collapse in={this.state.open}>
                    <div className="col-xs-12">
                        {this.props.children}
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default CollapsibleList;