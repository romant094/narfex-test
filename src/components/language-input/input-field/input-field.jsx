import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border: none;
  min-width: 10px;
  margin-bottom: 3px;
  flex: 1;
`;

export const InputField = ({onChange, inputRef}) => {
    return (
        <Input onChange={onChange} ref={inputRef} />
    );
};
