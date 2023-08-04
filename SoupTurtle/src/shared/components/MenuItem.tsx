import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import * as Common from './Common';

type Props = {
    isSelected: boolean;
    isOpen: boolean;
    keyAttr: React.Key;
    labelKey: string
    targetUrl: string;
    iconName: string;
    onSelect: () => void;
};

const MenuItem: React.FC<Props> = ({ isSelected, isOpen, keyAttr, labelKey, targetUrl, iconName, onSelect }) => {
    const { t } = useTranslation();

     return (
        <ListItem key={keyAttr} component={Link} to={targetUrl} disablePadding sx={{ display: 'block' }} >
            <ListItemButton sx={{ minHeight: 48, justifyContent: isOpen ? 'initial' : 'center', px: 2.5, }} 
                     // Add onClick event to call the handleClick function
                     onClick={onSelect}
                    // Add the selected property based on the isSelected state
                    selected={isSelected}
                > 
                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: isOpen ? 3 : 'auto', }}>
                    <Common.Icon name={iconName} size='2x' isFixedWidth={true} />
                </ListItemIcon>
                <ListItemText primary={t(labelKey)} sx={{ opacity: isOpen ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    );
};

export default MenuItem;
