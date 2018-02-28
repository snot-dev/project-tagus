import React, { Component } from 'react';
import Lightbox from 'react-images';
import {connect} from 'react-redux';
import Panel from '../../components/Panel';
import store from '../../services/store';
import {getMedia} from '../../services/media/actions';

class Media extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lightboxIsOpen: true
        }
    }

    
    componentDidMount() {
        store.dispatch(getMedia());
    }

    toggleLightbox(show) {
        return () => {
            this.setState({
                lightboxIsOpen: show
            });
        };
    }

    render() {
        return (
            <section id="media" className="col-xs-12 full-height">
                <Panel title={this.props.name} className="col-xs-12 full-height">
                    {this.props.media.list.length > 0
                    ?   <Lightbox
                    images={this.props.media.list}
                    isOpen={this.state.lightboxIsOpen}
                    // onClickPrev={this.gotoPrevious}
                    // onClickNext={this.gotoNext}
                    onClose={this.toggleLightbox(false)}
                  />
                  :null
                    }
                </Panel>
            </section>
        )
    }
}


const mapStateToProps = state => {
    return {
      media: state.media
    };
  };
  
export default connect(mapStateToProps)(Media);