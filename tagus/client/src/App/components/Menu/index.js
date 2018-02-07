import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './menu.css';
import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 0.4 },
};

const Fade = ({ in: inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
        <div className="tagus-menu-backdrop" style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
          {console.warn(state)};
          </div>
    )}
  </Transition>
);

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        this.setState({visible: true});
    }

    render() {
        const className = this.props.className || '';

        return (
            <div className="tagus-menu-container">
                {/* <div className="tagus-menu-backdrop"></div> */}
                <Fade in={this.state.visible} mountOnEnter={true} appear={true} />
                <div className={`tagus-menu ${className}`}>
                    {this.props.title
                    ? <div className="row">
                            <div className="col-xs-12 tagus-menu-header">
                            {this.props.title}
                            {this.props.onCloseButton 
                            ? <div className="tagus-menu-close-button" onClick={this.props.onCloseButton}>X</div>
                            : null}
                            </div>
                        </div>
                    : null}
                    
                    <div className="row">
                        <div className="col-xs-12 tagus-menu-content">
                            {this.props.children}   
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

Menu.propTypes = {
    title: PropTypes.string.isRequired,
    onCloseButton: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};

export default Menu;