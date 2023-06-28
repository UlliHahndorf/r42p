import React from 'react';

import HomeIcon from '@mui/icons-material/Home';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
    iconName: string;
};

const Icon: React.FC<Props> = ({ iconName }) => {

    let icon = <></>;
    switch (iconName) {
        case 'Home': icon = <HomeIcon />; break;
        case 'MenuBook': icon = <MenuBookIcon />; break;
        case 'RestaurantMenu': icon = <RestaurantMenuIcon />; break;
        case 'Edit': icon = <EditIcon />; break;
        case 'Delete': icon = <DeleteIcon />; break;
        default: icon = <QuestionMarkIcon />
    }
    return (<span>{icon}</span>);
};

export default Icon;
