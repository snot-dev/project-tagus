import React, { Component } from 'react';
import Modal from '../../../../../../components/Modal';
import Menu from '../../../../../../components/Menu';
import CollapsibleList from '../../../../../../components/CollapsibleList';
import Overlay from '../../../../../../components/Overlay';
import {createUnit, deleteContent} from '../../../../../../../../services/content/actions';
import store from '../../../../../../../../services/store';
import {Link} from 'react-router-dom';
import {Collapse} from 'react-bootstrap';
import './contentMenu.css';

class ContentMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            deleteMode: false
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

    _toggleModal(show) {
        return() => {
            this.setState({
                deleteMode: show
            });
        };
    }

    _deleteContent() {
        this.setState({deleteMode:false});
        store.dispatch(deleteContent(this.props.detail._id));
        this.props.history.push('/content');
    }

    render() {
        const button = <a onClick={this.onClick.bind(this)} className="tagus-menu-link">Add child to {this.props.detail.name}</a>;
        return (
            <Menu onCloseButton={this.props.onCloseButton} title="Menu" className="col-xs-6 content-menu">
                <ul className="tagus-menu-list row">
                    <li className="tagus-menu-item">
                        <CollapsibleList buttonChildren={button}>
                                {this._getUnitsList()}
                        </CollapsibleList>
                    </li>
                    <li className="tagus-menu-item"><a onClick={this._toggleModal(true).bind(this)} className="tagus-menu-link">Delete</a></li>
                </ul>
                <Modal show={this.state.deleteMode} title="Warning!" body={"Are you sure you want to DELETE PERMANENTLY this page and all the children?"} closeButton={{onClick: this._toggleModal(false), text: "Cancel"}} confirmButton={{onClick:this._deleteContent.bind(this), text: "Yes, I'm sure!"}} />
            </Menu>
        );
    }
}

export default ContentMenu;