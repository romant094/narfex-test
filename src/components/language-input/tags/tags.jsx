import React from 'react';
import {TagItem} from './tag-item';

export const Tags = ({tags, toggleLanguage}) => {
    return (
        <React.Fragment>
            {
                tags && tags.map((tag, id) => (
                    <TagItem
                        key={tag.title}
                        title={tag.title}
                        handleDeleteTag={() => toggleLanguage(id, 'selectedLanguages', 'allLanguages')}
                    />
                ))
            }
        </React.Fragment>
    );
};
