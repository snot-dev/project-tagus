import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Panel from '../../../../components/Panel';
import './contentList.css';

class ContentList extends Component {
    _buildContentList() {
        const that = this;
         return (
            <ul id="content-list" className="content-list">
                {that.props.contentList && that.props.contentList.length > 0 
                ?   that.props.contentList.map((content, index) => {
                        return (
                            <li  className="content-item" key={index}>
                                <NavLink to={"/content/" + (content._id)} activeClassName="active" className="content-link">
                                    <i className="fa fa-home" aria-hidden="true"></i>{content.name}
                                </NavLink>
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
                                <NavLink to={`${this.props.url}/${child._id}`} className="content-link">
                                    <i className="fa fa-file" aria-hidden="true"></i>{child.name}
                                </NavLink>
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
            <Panel header={"Content"} className="col-xs-4 full-height">
                {this._buildContentList()}
            </Panel>  
        );
    };
}

export default ContentList;