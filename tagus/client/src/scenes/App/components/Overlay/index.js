import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import './overlay.css';

class Overlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header >
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    One fine body...
                </Modal.Body>

                
                <Modal.Footer>
                    {this.props.buttons && this.props.buttons.close
                        ? <Button onClick={this.props.buttons.close}>Close</Button>
                        :null
                    }
                    {this.props.buttons &&  this.props.buttons.primary
                        ?<Button bsStyle="primary">Save changes</Button>
                        :null
                    }
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Overlay;