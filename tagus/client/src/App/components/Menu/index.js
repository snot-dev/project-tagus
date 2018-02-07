import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './menu.css';
import Transition from 'react-transition-group/Transition';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.duration = {
            opacity: 200,
            width: 50
        };

        this.opacityTransitionStyles = {
            entering: { opacity: 0 },
            entered:  { opacity: 0.4 }
        };

        this.opacityDefaultStyle = {
            transition: `opacity ${this.duration.opacity}ms ease-in-out`
        };

        this.widthTransitionStyles = {
            entering: { width: 0 },
            entered:  { width: null }
        };

        this.widthDefaultStyle = {
            transition: `width ${this.duration.width}ms ease-in-out`,
            width: 0    
        };
    }

    _render(state) {
        const className = this.props.className || '';
        return (
            <div className="tagus-menu-container">
                <div style={{
                ...this.opacityDefaultStyle,
                ...this.opacityTransitionStyles[state]
              }} className="tagus-menu-backdrop"></div>
                <div className={`tagus-menu ${className}`} style={{
                    ...this.widthDefaultStyle, ...this.widthTransitionStyles[state]
                }}>
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

    render() {
        return (
            <Transition appear={true} mountOnEnter={true} in={this.props.show} timeout={0}>
                {(state) => (
                    this.props.show ? this._render(state) : null                    
                )}
            </Transition>
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