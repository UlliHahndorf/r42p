import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-common-types';
import { fal } from '@fortawesome/pro-light-svg-icons';

library.add(fal);

type Props = {
    iconName: string;
};

const Icon: React.FC<Props> = ({ iconName }) => {
    let iconNameType: IconName = (iconName.toLowerCase()) as IconName;

    let content = <FontAwesomeIcon icon={[ 'fal', iconNameType ]} size="lg" fixedWidth />

    return (
        <span>
            {content}
        </span>
    );
};

export default Icon;
