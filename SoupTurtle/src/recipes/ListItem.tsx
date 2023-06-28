import React from 'react';
import { Button, TableCell, TableRow, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Recipe } from '../shared/types/Recipe';
import Icon from '../shared/Icon';

type Props = {
  recipe: Recipe;
  onDelete: (id: number) => Promise<void>;
};

const ListItem: React.FC<Props> = ({ recipe, onDelete }) => {
  const { t } = useTranslation();
  return (
    <TableRow>
      <TableCell>{recipe.title}</TableCell>
      <TableCell>{recipe.ingredients}</TableCell>
      <TableCell>{t('recipes.listItem.price', { price: recipe.price })}</TableCell>
      <TableCell>
        <Tooltip title={t('recipes.change')}>
          <Button variant="text" component={Link} to={`/list/edit/${recipe.id}`} >
            <Icon iconName='Edit' />
          </Button>
        </Tooltip>
        <Tooltip title={t('recipes.delete')}>
          <Button variant="text" onClick={() => onDelete(recipe.id)} >
            <Icon iconName='Delete' />
          </Button>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default ListItem;
