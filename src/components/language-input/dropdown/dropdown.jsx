import React, {Component} from 'react';
import styled from 'styled-components';
import {DropdownItem} from './dropdown-item';
import {findParent} from '../utils';
import {FILTER_ERROR_TEXT, MAX_DROPDOWN_HEIGHT} from '../constants';

const Wrapper = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  top: ${({styles}) => styles.topPosition - 2}px;
  border: 1px solid #cce;
  margin: 0;
  padding: 0 6px;
  z-index: 10;
  background-color: #fff;
  list-style-type: none;
  max-height: ${MAX_DROPDOWN_HEIGHT}px;
  overflow: auto;
  border-radius: 0 0 3px 3px;
  font-weight: 300;
  font-size: 13px;
  color: #55677d;
  box-shadow: 0 3px 10px 0 rgba(204,204,238,0.5);
`;

export class Dropdown extends Component {
    state = {
        activeItem: 0
    };

    componentDidMount() {
        const {wrapperRef: {current}} = this.props;
        document.addEventListener('click', this.handleClose);
        current.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        const {wrapperRef: {current}} = this.props;
        document.removeEventListener('click', this.handleClose);
        current.removeEventListener('keydown', this.handleKeyDown);
    }

    setActiveItem = activeItem => {
        this.setState({activeItem});
    };

    handleKeyDown = event => {
        const {activeItem} = this.state;
        const {itemList, toggleLanguage, toggleDropdown} = this.props;
        const {key} = event;

        switch (key) {
            case 'ArrowUp':
                this.setState(({activeItem}) => {
                    const newValue = activeItem - 1;
                    return {
                        activeItem: newValue > 0 ? newValue : 0
                    }
                });
                break;
            case 'ArrowDown':
                this.setState(({activeItem}) => {
                    const newValue = activeItem + 1;
                    return {
                        activeItem: newValue < itemList.length ? newValue : itemList.length - 1
                    }
                });
                break;
            case 'Enter':
                toggleLanguage(activeItem, 'allLanguages', 'selectedLanguages');
                break;
            case 'Escape':
                toggleDropdown();
                break;
            default:
                break;
        }
    };

    handleClose = event => {
        const {wrapperRef: {current}, toggleDropdown} = this.props;
        const {target} = event;

        const clickIntoRef = !!findParent(target, current);
        if (target.tagName !== 'INPUT' && !clickIntoRef) {
            toggleDropdown();
        }
    };

    render() {
        const {activeItem} = this.state;
        const {itemList, toggleLanguage, topPosition} = this.props;

        const content = itemList.length
            ? itemList.map((item, id) => (
                <DropdownItem
                    className={activeItem === id ? 'active' : ''}
                    key={item.title}
                    item={item.title}
                    toggleLanguage={() => toggleLanguage(id, 'allLanguages', 'selectedLanguages')}
                    handleHover={() => this.setActiveItem(id)}
                />
            ))
            : FILTER_ERROR_TEXT;

        return (
            <Wrapper styles={{topPosition}}> {content} </Wrapper>
        );
    }
}
