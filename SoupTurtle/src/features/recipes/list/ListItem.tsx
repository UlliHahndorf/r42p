import React from 'react';
import { Button, TableCell, TableRow, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Recipe } from '../../../shared/types/Recipe';
import Icon from '../../../shared/components/Icon';

type Props = {
  recipe: Recipe;
  onDelete: (id: number) => Promise<void>;
};

const ListItem: React.FC<Props> = ({ recipe, onDelete }) => {
  const { t } = useTranslation();
  
  const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

  return (
    <TableRow style={{ verticalAlign: 'top' }}>
      <TableCell><b>{recipe.title}</b></TableCell>
      <TableCell>{recipe.ingredients}</TableCell>
      <TableCell>{renderHTML(recipe.instructions.replace(/\n/g,"<br />"))}</TableCell>
      <TableCell>{recipe.numberServings}</TableCell>
      <TableCell>{recipe.quantities}</TableCell>
      <TableCell>{new Date(recipe.dateCreated).toLocaleDateString("de-DE")}</TableCell>
      <TableCell>{new Date(recipe.dateModified).toLocaleDateString("de-DE")}</TableCell>
      <TableCell>{recipe.category}</TableCell>
      <TableCell>{recipe.notes}</TableCell>
      <TableCell>{recipe.description}</TableCell>
      <TableCell>{t('recipes.listItem.price', { price: recipe.price })}</TableCell>
      <TableCell>{recipe.source + (recipe.sourcePage !== "" ? " / " + recipe.sourcePage : "")}</TableCell>
      <TableCell>
        <Tooltip title={t('recipes.change')}>
          <Button variant="text" component={Link} to={`edit/${recipe.id}`} >
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
