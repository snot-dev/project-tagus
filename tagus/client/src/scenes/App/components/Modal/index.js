import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';

class CustomModal extends Component {
    render() {
        return(
            <Modal show={this.props.show}>
                <Modal.Header >
                    {this.props.title
                    ?   <Modal.Title>{this.props.title}</Modal.Title>
                    :   null}
                </Modal.Header>
                {this.props.body 
                ?   <Modal.Body>
                        {this.props.body}
                    </Modal.Body>
                :   null}
                <Modal.Footer>
                    {this.props.closeButton
                        ? <Button onClick={this.props.closeButton}>{this.props.closeButton.text}</Button>
                        :null
                    }
                    {this.props.confirmButton
                        ?<Button onClick={this.props.confirmButton.onClick} bsStyle="primary">{this.props.confirmButton.text}</Button>
                        :null
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CustomModal;