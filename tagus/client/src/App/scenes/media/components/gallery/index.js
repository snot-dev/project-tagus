import React, { Component } from 'react';
import Lightbox from 'react-images';
import ImgLink from '../imgLink';
import './gallery.css';

class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentImage: 0,
            isLightBoxOpen: false,
            showLink: false
        };
    }

    toggleLightBox(show) {
        return () => {
            this.setState({
                isLightBoxOpen: false
            });
        }
    }

    setImage(img) {
        return () => {
            this.setState({
                isLightBoxOpen: true,
                currentImage: img
            });
        };
    }

    gotoNextLightboxImage() {
       this.setState({
            currentImage: this.state.currentImage +1 % this.props.images.length
       }); 
    }

    gotoPrevLightboxImage() {
        this.setState({
             currentImage: this.state.currentImage -1 % this.props.images.length
        }); 
     }

    render() {
        return (
            <div className="container-fluid tagus-gallery">
                <div className="row">
                    {this.props.images.map((img, index) => {
                        return (
                            <div key={index} className="col-xs-12 col-sm-2 tagus-gallery-image-container">
                                <ImgLink link={img.src} />
                                <span className="helper"></span>
                                <img onClick={this.setImage(index)} className="tagus-gallery-image" src={img.src} alt={img.name} title={img.name} />
                            </div>
                        )
                    })}
                </div>
                <Lightbox images={this.props.images} isOpen={this.state.isLightBoxOpen} currentImage={this.state.currentImage} onClickNext={this.gotoNextLightboxImage.bind(this)} onClickPrev={this.gotoPrevLightboxImage.bind(this)} onClose={this.toggleLightBox(false)} />
            </div>
        )
    }
}

export default Gallery;