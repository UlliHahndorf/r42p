import React from 'react';
import { library, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';

library.add(fal);
library.add(fas);

type Props = {
    name: string;
    size?: string;
    style?: string
    className?: string
    isFixedWidth?: boolean;
    isAnimSpin?: boolean;
    isAnimFade?: boolean;
    isAnimShake?: boolean;
};

const Icon: React.FC<Props> = ({ 
        name, 
        style = 'fal', 
        size = '1x', 
        className = '', 
        isFixedWidth = false, 
        isAnimSpin = false, 
        isAnimFade = false, 
        isAnimShake = false }) => {

    let iconNameType: IconName = (name.toLowerCase()) as IconName;
    let sizePropType: SizeProp = (size.toLowerCase()) as SizeProp;
    let styleType: IconPrefix = (style.toLowerCase()) as IconPrefix;
    let content = <FontAwesomeIcon 
                    icon={[ styleType, iconNameType ]} 
                    size={sizePropType}                    
                    spin={isAnimSpin} 
                    fade={isAnimFade} 
                    shake={isAnimShake} 
                    fixedWidth={isFixedWidth}
                    className={className}
                     />

    return (
        <span>
            {content}
        </span>
    );
};

export default Icon;
