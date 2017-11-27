import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';

class CancelModal extends Component {
    render() {
        return(
            <Modal show={this.props.show}>
                <Modal.Header >
                    <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to cancel all your changes?
                </Modal.Body>
                <Modal.Footer>
                    {this.props.closeButton
                        ? <Button onClick={this.props.closeButton}>Close</Button>
                        :null
                    }
                    {this.props.confirmButton
                        ?<Button onClick={this.props.confirmButton} bsStyle="primary">Discard changes</Button>
                        :null
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CancelModal;