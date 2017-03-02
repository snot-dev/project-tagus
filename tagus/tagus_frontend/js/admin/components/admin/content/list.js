import React from 'react';
import store from '../../../../store';
import {Link} from 'react-router';
import {connect} from 'react-redux';    

export default class ContentList extends React.Component {
      _buildContentList() {
        var that = this;
         return (
            <ul id="page-list" className="list">
                {that.props.contentList && that.props.contentList.length > 0 
                ?   that.props.contentList.map((content, index) => {
                        return (
                            <li  className="page item" key={index}>
                                <Link to={"/content/" + (content._id)} onClick={this.props.getDetail(content._id)} activeClassName="active" className="link">
                                    <i className="fa fa-home" aria-hidden="true"></i>{content.name}
                                </Link>
                                    {content.children.length > 0 ?
                                        this._childList(content)
                                    : null
                                    }
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
            <ul className="child-list">
                { item.children.length > 0 
                ?   item.children.map((child, index) => {
                        return(
                            <li className="page item" key={index}>
                                <Link to={"/content/" + (child._id)} onClick={this.props.getDetail(child._id)} activeClassName="active" className="link">
                                    <i className="fa fa-file" aria-hidden="true"></i>{child.name}
                                </Link>
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
            <div className="col-xs-3">
                <section className="section content-page-list">
                    <h2 className="title">Content</h2>
                    <div>
                        {this._buildContentList()}
                    </div>  
                </section>   
            </div>
        );
    };
;
};