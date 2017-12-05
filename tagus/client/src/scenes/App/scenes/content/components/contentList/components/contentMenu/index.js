import React, { Component } from 'react';
import Menu from '../../../../../../components/Menu';
import {createUnit} from '../../../../../../../../services/content/actions';
import store from '../../../../../../../../services/store';
import {Link} from 'react-router-dom';
import {Collapse} from 'react-bootstrap';
import './contentMenu.css';

class ContentMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    onClick() {
        this.setState({
            open: !this.state.open
        });
    }

    onLinkClick(unit) {
        return() => {
            store.dispatch(createUnit(unit));
        };
    }

    _getUnitsList() {
        const units = [];
        
        for(const key in this.props.units) {
            if(this.props.units.hasOwnProperty(key)) {
                const unit = this.props.units[key];
                units.push(
                    <li className="tagus-menu-item" key={key}><Link onClick={this.onLinkClick(unit)} to={`/content/create/${unit._id}`} className="tagus-menu-link">{unit.name}</Link></li>
                );
            }
        }

        return(
            <ul className="tagus-menu-list row">
                {units}
            </ul>
        )
    }

    render() {
        return (
            <Menu onCloseButton={this.props.onCloseButton} title="Menu" className="col-xs-6 content-menu">
                <ul className="tagus-menu-list row">
                    <li className="tagus-menu-item">
                        <a onClick={this.onClick.bind(this)} className="tagus-menu-link">Add child to {this.props.detail.name}</a>
                        <Collapse in={this.state.open}>
                            <div className="col-xs-12">
                                {this._getUnitsList()}
                            </div>
                        </Collapse>
                    </li>
                    <li className="tagus-menu-item"><a className="tagus-menu-link">Delete</a></li>
                </ul>
            </Menu>
        );
    }
}

export default ContentMenu;