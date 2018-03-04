import React, { Component } from 'react';
import './inputFile.css';

class InputFile extends Component {
    _onChange() {
        console.warn("Changed!");
    }

    render() {
        return (
            <span className="tagus-media-input">
                <label htmlFor="tagus-media-input-file" className="tagus-media-input-label"><i className="fa fa-upload tagus-media-input-icon"></i>Add Media</label>
                <input onChange={this._onChange.bind(this)} type="file" accept="image/*" id="tagus-media-input-file" name="tagus-media" />
            </span>
        );
    }
}

export default InputFile;