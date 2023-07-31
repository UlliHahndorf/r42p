import React, { Suspense } from 'react';
import * as MuiIcons from '@mui/icons-material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

type Props = {
    iconName: string;
};

const Icon: React.FC<Props> = ({ iconName }) => {
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
    const iconComponentName = `${capitalize(iconName)}`;
    
    const IconComponent = (MuiIcons as { [key: string]: React.ComponentType<any> })[iconComponentName] || MuiIcons.QuestionMark;

    return (
        <span>
            <Suspense fallback={<QuestionMarkIcon />}>
                {IconComponent && <IconComponent />}
            </Suspense>
        </span>
    );
};

export default Icon;
