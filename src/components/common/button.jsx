import React from 'react';
import styled from 'styled-components';

export const Btn = styled.button`
  background-color: transparent;
  padding: 0;
  border: none;
  display:flex;
  align-items:center;
  height: 100%;
  cursor: ${props => props.cursor || 'default'};
`;

const Image = styled.img`
  //width: 100%;
`;

export const Button = ({icon, pointer, onClick, ...restProps}) => {
    const {src, alt} = icon;
    const handleClick = event => {
        event.stopPropagation();
        const {target: {tagName}} = event;

        if (tagName === 'IMG' || tagName === 'BUTTON') {
            onClick()
        }
    };

    return (
        <Btn cursor={pointer && 'pointer'} onClick={handleClick} {...restProps}>
            {
                icon && <Image src={src} alt={alt} />
            }
        </Btn>
    );
};
