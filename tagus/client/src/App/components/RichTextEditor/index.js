import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import './richTextEditor.css';

class RichTextEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };
    }

    onChange(value) {
            this.setState({
                text: value
            });
    }

    onBlur(fieldApi) {
        return () => {
            if(this.props.onBlur) {
                this.props.onBlur(this.state);
            }
        }
    }

    render() {
        const {
            fieldApi,
            onInput,
            ...rest
          } = this.props;
    
          const {
            getValue,
            getError,
            getWarning,
            getSuccess,
            setValue,
            setTouched,
          } = fieldApi;
    
          const error = getError();
          const warning = getWarning();
          const success = getSuccess();

        return (
                <ReactQuill  value={this.state.text}
                    onChange={this.onChange.bind(this)}
                    {...rest} 
                />
        );
    }
}

export default RichTextEditor;