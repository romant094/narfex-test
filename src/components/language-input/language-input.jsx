import React from 'react';
import styled from 'styled-components';
import {Tags} from './tags';
import {InputField} from './input-field';
import {Button} from '../common'
import dropdownIcon from './images/dropdown_arrow.png';

const defaultSelected = [
    {
        id: 1,
        title: 'Russian'
    },
    {
        id: 2,
        title: 'English'
    }
];

const Wrapper = styled.div`
  padding: 3px;
  border: 1px solid #ddf;
  display: flex;
  align-items: center;
  max-width: 300px;
  border-radius: 5px;
`;

const Label = styled.label`
  width: 100%;
  display:flex;
  align-items:center;
  justify-content: space-between;
`;

export class LanguageInput extends React.Component {
    state = {
        selectedLanguages: defaultSelected
    };

    render() {
        const {selectedLanguages} = this.state;

        return (
            <Wrapper>
                <Tags tags={selectedLanguages} />
                <Label>
                    <InputField />
                    <Button icon={{src: dropdownIcon, alt: 'V'}} onClick={() => console.log('click')} />
                </Label>
            </Wrapper>
        );
    }
}
