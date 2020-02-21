import React from 'react';
import styled from 'styled-components';
import {Button} from '../../../common';
import cross from '../../images/tag_cross.png';

const Span = styled.span`
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #dae2e8;
  padding: 3px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  cursor: default;
  margin-right: 5px;
  
  &:hover{
    background-color: #cbd6de;    
  }
`;

const Title = styled.span`
  color: #55677d;
  font-weight: 300;
  font-size: 13px;
  margin-right: 3px;
  line-height: 1;
`;

export const TagItem = ({title}) => {
    return (
        <Span>
            <Title>{title}</Title>
            <Button icon={{src: cross, alt: 'x'}} pointer />
        </Span>
    );
};
