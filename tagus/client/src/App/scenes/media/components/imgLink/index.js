import React, { Component } from 'react';
import {Popover, OverlayTrigger} from 'react-bootstrap';

class ImgLink extends Component {
    _popover() {
        return (
            <Popover id="tagus-popover" >
                src="<strong>{this.props.link}</strong>"
            </Popover> 
        );
    }

    render() {
        return (
            <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={this._popover()}>
                <a className="tagus-gallery-image-link"><i className="fa fa-link"></i></a>
            </OverlayTrigger>
        )
    }
}

export default ImgLink;