import React from 'react';
import styled from 'styled-components';
import {TagItem} from './tag-item';

const Wrapper = styled.div`
  display:flex;
`;

export const Tags = ({tags}) => {
    return (
        <Wrapper>
            {
                tags.map(({title}) => <TagItem key={title} title={title} />)
            }
        </Wrapper>
    );
};
