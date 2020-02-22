import React from 'react';
import styled from 'styled-components';
import {Tags} from './tags';
import {InputField} from './input-field';
import {Button} from '../common'
import {Dropdown} from './dropdown';
import {removeDuplicates, sortObjectArray} from './utils';
import {MAX_ELEMENT_WIDTH} from './constants';
import dropdownIcon from './images/dropdown_arrow.png';

const OuterWrapper = styled.div`
  padding: 3px 3px 0 3px;
  border: 1px solid #cce;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  max-width: ${MAX_ELEMENT_WIDTH};
  border-radius: ${({borderBottomRound}) => borderBottomRound ? '5px' : '5px 5px 0 0'};
  position:relative;
`;

const InnerWrapper = styled.div`
  display:flex;
  flex-wrap: wrap;
  flex: 1;
`;

const ButtonWrapper = styled.div`
  display:flex;
  padding-bottom: 3px;
  flex: 0;
`;

export class LanguageInput extends React.Component {
    state = {
        selectedLanguages: [],
        allLanguages: [],
        dropdownOpened: false,
        filter: '',
        wrapperHeight: 0
    };

    wrapperRef = React.createRef();
    inputRef = React.createRef();
    elementObservable = new ResizeObserver(() => this.updateWrapperHeight());

    componentDidMount() {
        const {selectedLanguages = [], allLanguages} = this.props;
        const languages = removeDuplicates(allLanguages, selectedLanguages);

        this.setState({
            selectedLanguages,
            allLanguages: languages
        });
        this.elementObservable.observe(this.wrapperRef.current)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.selectedLanguages.length !== this.state.selectedLanguages.length) {
            this.updateWrapperHeight();
        }
    }

    componentWillUnmount() {
        this.elementObservable.unobserve(this.wrapperRef.current)
    }

    toggleDropdown = () => {
        this.setState(({dropdownOpened}) => ({dropdownOpened: !dropdownOpened}));
    };

    handleWrapperClick = (event) => {
        const {dropdownOpened} = this.state;
        const {target: {tagName}} = event;

        if (!dropdownOpened && (tagName === 'DIV' || tagName === 'INPUT')) {
            this.toggleDropdown(event);
        }
    };

    handleChange = event => {
        const {dropdownOpened} = this.state;
        if (!dropdownOpened) {
            this.toggleDropdown()
        }
        this.setState({filter: event.target.value});
    };

    filterLanguages = filter => {
        const {allLanguages} = this.state;

        return allLanguages.filter(item => item.title.toLowerCase().includes(filter.trim().toLowerCase()))
    };

    toggleLanguage = (itemId, arrayFrom, arrayTo) => {
        this.inputRef.current.value = '';

        this.setState(({[arrayFrom]: current, [arrayTo]: target}) => {
            const item = current[itemId];
            return {
                [arrayFrom]: [
                    ...current.slice(0, itemId),
                    ...current.slice(itemId + 1)
                ],
                [arrayTo]: [...target, item],
                dropdownOpened: false,
                filter: ''
            }
        });
    };

    updateWrapperHeight = () => {
        const wrapperHeight = this.wrapperRef.current.offsetHeight;
        this.setState({wrapperHeight});
    };

    render() {
        const {selectedLanguages, dropdownOpened, filter, allLanguages, wrapperHeight} = this.state;

        const languages = filter.length ? this.filterLanguages(filter) : allLanguages;

        return (
            <OuterWrapper
                ref={this.wrapperRef}
                onClick={this.handleWrapperClick}
                borderBottomRound={!dropdownOpened}
            >
                <InnerWrapper>
                    <Tags
                        tags={selectedLanguages}
                        toggleLanguage={this.toggleLanguage}
                    />
                    <InputField
                        onChange={this.handleChange}
                        inputRef={this.inputRef}
                    />
                </InnerWrapper>
                <ButtonWrapper>
                    <Button
                        icon={{src: dropdownIcon, alt: 'V'}}
                        onClick={this.toggleDropdown}
                    />
                </ButtonWrapper>
                {
                    dropdownOpened && <Dropdown
                        itemList={languages.sort((a, b) => sortObjectArray(a, b, 'title'))}
                        wrapperRef={this.wrapperRef}
                        toggleDropdown={this.toggleDropdown}
                        toggleLanguage={this.toggleLanguage}
                        topPosition={wrapperHeight}
                    />
                }
            </OuterWrapper>
        );
    }
}
