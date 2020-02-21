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

export const Button = ({icon, pointer, ...restProps}) => {
    const {src, alt} = icon;

    return (
        <Btn cursor={pointer && 'pointer'} {...restProps}>
            {
                icon && <Image src={src} alt={alt} />
            }
        </Btn>
    );
};
