import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../../../../../../services/store';
import {editContent} from '../../../../../../services/content/actions';
import Panel from '../../../../components/Panel';
import ContentMenu from './components/contentMenu';
import './contentList.css';

class ContentList extends Component {
    _onMenuButtonClick(content) {
        return () => {
            if(!this.props.editingContent || !content || this.props.editingContent._id !== content._id ) {
                store.dispatch(editContent(content));
            }
        }
    }

    _buildContentList() {
         return (
            <ul id="content-list" className="content-list">
                {this.props.contentList && this.props.contentList.length > 0 
                ?   this.props.contentList.map((content, index) => {
                        return (
                            <li  className="content-item" key={index}>
                                <div className="content-link-container">
                                    <NavLink to={`${this.props.url}/detail/${content._id}`} activeClassName="active" className="content-link">
                                        <i className="fa fa-home" aria-hidden="true"></i>{content.name}
                                    </NavLink>
                                    <i onClick={this._onMenuButtonClick(content)} className="content-menu-button fa fa-bars"></i>
                                </div>
                                {content.children ? this._childList(content) : null}
                            </li>
                        );
                    }) 
                :  null 
                }
            </ul>
        );
    };

    _childList(item) {
        return (
            <ul className="content-list">
                { item.children.length > 0 
                ?   item.children.map((child, index) => {
                        return(
                            <li className="content-item" key={index}>
                                <div className="content-link-container">
                                    <NavLink to={`${this.props.url}/detail/${child._id}`} className="content-link">
                                        <i className="fa fa-file" aria-hidden="true"></i>{child.name}
                                    </NavLink>
                                    <i onClick={this._onMenuButtonClick(child)} className="content-menu-button fa fa-bars"></i>
                                </div>
                                {this._childList(child)}
                            </li>
                        );
                    }) 
                :  null
                }
            </ul>
        );
    };
   
    render() {
        return (
            <Panel title="Content" className="col-xs-4 full-height">
                {this._buildContentList()}
                {this.props.editingContent
                    ? <ContentMenu className="col-xs-6" onCloseButton={this._onMenuButtonClick()} units={this.props.units} detail={this.props.editingContent} />
                    : null
                }
            </Panel>  
        );
    };
}

export default ContentList;