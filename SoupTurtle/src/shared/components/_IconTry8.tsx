import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconLookup } from '@fortawesome/fontawesome-common-types';
//import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { icon } from '@fortawesome/fontawesome-svg-core';
type Props = {
    iconName: string;
};

function createIconLookup(icName: string): IconLookup {
    let iconNameType: IconName = icName as IconName;
    return { prefix: 'fal', iconName: iconNameType };
  }

const Icon: React.FC<Props> = ({ iconName }) => {
    //let iconNameType: IconName = iconName as IconName;

    let para: IconLookup = createIconLookup(iconName);
    console.log(para);
    return (
        <span>
            <FontAwesomeIcon icon={icon(para)} />
        </span>
    );
};

export default Icon;
