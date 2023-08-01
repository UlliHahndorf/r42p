import React from 'react';
import { library, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-common-types';
import { fal } from '@fortawesome/pro-light-svg-icons';

library.add(fal);

type Props = {
    iconName: string;
    size?: string;
    isFixedWidth?: boolean;
    isAnimSpin?: boolean;
    isAnimFade?: boolean;
    isAnimShake?: boolean;
};

const Icon: React.FC<Props> = ({ iconName, size = "1x", isFixedWidth = false, isAnimSpin = false, isAnimFade = false, isAnimShake = false }) => {
    let iconNameType: IconName = (iconName.toLowerCase()) as IconName;
    let sizePropType: SizeProp = (size.toLowerCase()) as SizeProp;

    let content = <FontAwesomeIcon 
                    icon={[ 'fal', iconNameType ]} 
                    size={sizePropType}                    
                    spin={isAnimSpin} 
                    fade={isAnimFade} 
                    shake={isAnimShake} 
                    fixedWidth={isFixedWidth}
                     />

    return (
        <span>
            {content}
        </span>
    );
};

export default Icon;
