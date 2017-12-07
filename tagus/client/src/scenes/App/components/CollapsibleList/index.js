import React, { Component } from 'react';
import {Collapse} from 'react-bootstrap';
import './collapsiblelist.css';

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

        return(
            <div>
                <a className={`tagus-collapsible-list-button ${className}`} onClick={this._onClick.bind(this)}>{this.props.buttonText}</a>
                <Collapse>
                    <div className="col-xs-12">
                        {this.props.children}
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default CollapsibleList;