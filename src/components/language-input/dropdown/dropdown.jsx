import React, {Component} from 'react';
import styled from 'styled-components';
import {DropdownItem} from './dropdown-item';
import {FILTER_ERROR_TEXT, MAX_DROPDOWN_HEIGHT} from '../constants';

const Wrapper = styled.ul`
  position: absolute;
  left: -1px;
  width: calc(100% + 2px);
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
    componentDidMount() {
        const {setActiveItem, handleCloseDropdown} = this.props;
        document.addEventListener('click', handleCloseDropdown);
        setActiveItem(0);
    }

    componentWillUnmount() {
        const {handleCloseDropdown} = this.props;
        document.removeEventListener('click', handleCloseDropdown);
    }

    render() {
        const {
            itemList,
            toggleLanguage,
            topPosition,
            activeItem,
            setActiveItem
        } = this.props;

        return (
            <Wrapper styles={{topPosition}}>
                {
                    itemList.length
                        ? itemList.map((item, id) => (
                            <DropdownItem
                                activeItem={activeItem === id}
                                key={item.title}
                                item={item.title}
                                toggleLanguage={() => toggleLanguage(id, 'allLanguages', 'selectedLanguages')}
                                handleHover={() => setActiveItem(id)}
                            />
                        ))
                        : FILTER_ERROR_TEXT
                }
            </Wrapper>
        );
    }
}
