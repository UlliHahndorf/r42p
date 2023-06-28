import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Icon from './Icon';

type Props = {
    isOpen: boolean;
    keyAttr: React.Key;
    labelKey: string
    targetUrl: string;
    iconName: string;
};

const MenuItem: React.FC<Props> = ({ isOpen, keyAttr, labelKey, targetUrl, iconName }) => {
    const { t } = useTranslation();
    return (
        <ListItem key={keyAttr} component={Link} to={targetUrl} disablePadding sx={{ display: 'block' }} >
            <ListItemButton sx={{ minHeight: 48, justifyContent: isOpen ? 'initial' : 'center', px: 2.5, }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: isOpen ? 3 : 'auto', }}>
                    <Icon iconName={iconName} />
                </ListItemIcon>
                <ListItemText primary={t(labelKey)} sx={{ opacity: isOpen ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    );
};

export default MenuItem;
