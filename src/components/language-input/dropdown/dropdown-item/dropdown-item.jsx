import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.li`
  padding: 3px 8px;
  margin: 0 -6px;
  cursor: pointer;
  border-bottom: 0.5px solid #ddf;
  
  &:last-child{
    border-bottom: none;
  }
  
  &:hover,
  &.active{
    background-color: #ddf;
  }
`;

export const DropdownItem = ({item, toggleLanguage, handleHover, activeItem}) => {
    return (
        <Wrapper
            className={activeItem ? 'active' : ''}
            onClick={toggleLanguage}
            onMouseEnter={handleHover}
        >
            {item}
        </Wrapper>
    );
};
