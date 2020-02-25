import React from 'react';
import styled from 'styled-components';
import {Tags} from './tags';
import {InputField} from './input-field';
import {Button} from '../common'
import {Dropdown} from './dropdown';
import {findParent, removeDuplicates, sortObjectArray} from './utils';
import {MAX_ELEMENT_WIDTH} from './constants';
import dropdownIcon from './images/dropdown_arrow.png';

const OuterWrapper = styled.div`
  border: 1px solid #cce;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  max-width: ${MAX_ELEMENT_WIDTH};
  border-radius: ${({borderBottomRound}) => borderBottomRound ? '5px' : '5px 5px 0 0'};
  position:relative;
`;

const InnerWrapper = styled.div`
  padding-top: 3px;
  padding-left: 3px;
  display:flex;
  flex-wrap: wrap;
  flex: 1;
`;

const ButtonWrapper = styled.div`
  display:flex;
  flex: 0;
`;

export class LanguageInput extends React.Component {
    state = {
        selectedLanguages: [],
        allLanguages: [],
        filteredLanguages: [],
        dropdownOpened: false,
        filter: '',
        wrapperHeight: 0,
        activeItem: 0
    };

    wrapperRef = React.createRef();
    inputRef = React.createRef();
    elementObservable = new ResizeObserver(() => this.updateWrapperHeight());

    componentDidMount() {
        const {selectedLanguages = [], allLanguages} = this.props;
        const languages = removeDuplicates(allLanguages, selectedLanguages);

        this.setState({
            selectedLanguages,
            allLanguages: languages,
            filteredLanguages: languages
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

    handleChangeFilter = event => {
        const {dropdownOpened} = this.state;

        if (!dropdownOpened) {
            this.toggleDropdown()
        }
        this.setActiveItem(0);
        const filter = event.target.value.trim().toLowerCase();

        this.setState({filteredLanguages: this.filterLanguages(filter)});
    };

    filterLanguages = filter => {
        const {allLanguages} = this.state;
        return allLanguages.filter(item => item.title.toLowerCase().includes(filter))
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
                dropdownOpened: false
            }
        });

        this.setState(({allLanguages}) => ({
            filteredLanguages: allLanguages
        }));
    };

    updateWrapperHeight = () => {
        const wrapperHeight = this.wrapperRef.current.offsetHeight;
        this.setState({wrapperHeight});
    };

    getIndex = (currentItem) => this.state.allLanguages.findIndex(item => item.title === currentItem.title);

    handleKeyDown = event => {
        const {activeItem, dropdownOpened, filteredLanguages} = this.state;
        const {key} = event;

        switch (key) {
            case 'ArrowUp':
                this.setActiveItem(-1);
                break;
            case 'ArrowDown':
                if (!dropdownOpened) {
                    this.toggleDropdown()
                }
                this.setActiveItem(1);
                break;
            case 'Enter':
                if (filteredLanguages.length > 0) {
                    const currentIndex = this.getIndex(filteredLanguages[activeItem]) || null;
                    this.toggleLanguage(currentIndex || activeItem, 'allLanguages', 'selectedLanguages');
                }
                break;
            case 'Escape':
                this.toggleDropdown();
                break;
            default:
                break;
        }
    };

    setActiveItem = value => {
        const {filteredLanguages} = this.state;

        this.setState(({activeItem}) => {
            let newValue = activeItem + value;
            const maxValue = filteredLanguages.length - 1;

            if (newValue < 0) {
                newValue = 0;
            }

            if (newValue > maxValue) {
                newValue = maxValue;
            }

            return {
                activeItem: newValue
            }
        });
    };

    handleCloseDropdown = ({target}) => {
        const clickIntoRef = !!findParent(target, this.wrapperRef.current);

        if (target.tagName !== 'INPUT' && !clickIntoRef) {
            this.toggleDropdown();
        }
    };

    render() {
        const {
            selectedLanguages,
            dropdownOpened,
            filteredLanguages,
            wrapperHeight,
            activeItem
        } = this.state;

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
                        onChange={this.handleChangeFilter}
                        inputRef={this.inputRef}
                        handleKeyDown={this.handleKeyDown}
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
                        itemList={filteredLanguages.sort((a, b) => sortObjectArray(a, b, 'title'))}
                        wrapperRef={this.wrapperRef}
                        toggleDropdown={this.toggleDropdown}
                        toggleLanguage={this.toggleLanguage}
                        topPosition={wrapperHeight}
                        getIndex={this.getIndex}
                        dropdownOpened={dropdownOpened}
                        activeItem={activeItem}
                        setActiveItem={this.setActiveItem}
                        handleCloseDropdown={this.handleCloseDropdown}
                        handleKeyDown={this.handleKeyDown}
                    />
                }
            </OuterWrapper>
        );
    }
}
