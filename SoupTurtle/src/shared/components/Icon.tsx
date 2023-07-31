import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-common-types';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

type Props = {
    iconName: string;
};

const Icon: React.FC<Props> = ({ iconName }) => {
    let iconNameType: IconName = iconName as IconName;

    return (
        <span>
            <FontAwesomeIcon icon={icon({ name: iconNameType })} />
        </span>
    );
};

export default Icon;
