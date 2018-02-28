import React, { Component } from 'react';
import Lightbox from 'react-images';
import './gallery.css';

class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentImage: null
        };
    }

    setImage(img) {
        return () => {
            this.setState({
                currentImage: img
            });
        };
    }

    getNextImg() {
       this.setState({
            currentImage: this.state.currentImage +1 % this.props.images.length
       }); 
    }

    getPrevImg() {
        this.setState({
             currentImage: this.state.currentImage -1 % this.props.images.length
        }); 
     }

    render() {
        return (
            <div className="container-fluid tagus-gallery">
                {this.props.images.map((img, index) => {
                    return (
                        <div key={index} className="col-xs-12 col-sm-2 tagus-gallery-image-container">
                            <span class="helper"></span>
                            <img className="tagus-gallery-image" src={img.src} alt={img.name} title={img.name} />
                        </div>
                     )
                })}
            </div>
        )
    }
}

export default Gallery;