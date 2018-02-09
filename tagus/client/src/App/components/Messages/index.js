import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Message from './components/Message';
import './messages.css';

class Messages extends Component {
    constructor(props) {
        super(props);
    }

    _renderList() {
        return (
            <div className="tagus-message-list">
                {this.props.messages.list.map((message, index) => {
                    const {type, subject, verb, result} = message;

                    return (
                        <Message key={`${index}_${type}`} index={index} type={type} subject={subject} verb={verb} result={result} />
                    );
                })}
            </div>
        )
    }
    

    render() {
        return (
            <div className="tagus-messages-container">
                {this.props.messages.list.length > 0 ? this._renderList() : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      messages: state.messages
    };
};

Messages.propTypes = {
    messages: PropTypes.object.isRequired,
    show: PropTypes.bool
}

export default connect(mapStateToProps)(Messages);