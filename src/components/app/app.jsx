import React from 'react';
import styled from 'styled-components';
import {LanguageInput} from '../language-input';
import {
    DEFAULT_SELECTED,
    DEFAULT_SELECTED_2,
    DEFAULT_ALL
} from '../../example-data'

const OuterWrapper = styled.div`
  display: flex;
`;

const InnerWrapper = styled.div`
  width: 30%;
  padding: 0 15px;
`;

export const App = () => {
    return (
        <OuterWrapper>
            <InnerWrapper>
                <LanguageInput selectedLanguages={DEFAULT_SELECTED} allLanguages={DEFAULT_ALL} />
            </InnerWrapper>
            <InnerWrapper>
                <LanguageInput selectedLanguages={DEFAULT_SELECTED_2} allLanguages={DEFAULT_ALL} />
            </InnerWrapper>
            <InnerWrapper>
                <LanguageInput allLanguages={DEFAULT_ALL} />
            </InnerWrapper>
        </OuterWrapper>
    );
};
