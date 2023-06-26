import React from 'react';
import { Recipe } from '../shared/types/Recipe';
import { Button, TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = {
  recipe: Recipe;
  onDelete: (id: number) => Promise<void>;
};

const ListItem: React.FC<Props> = ({ recipe, onDelete }) => {
  const { t } = useTranslation();
  return (
    <TableRow>
      <TableCell>{recipe.Title}</TableCell>
      <TableCell>{t('recipes.listItem.price', { price: recipe.Price })}</TableCell>
      {/* <TableCell>
        <Button
          variant="outlined"
          onClick={() => onDelete(recipe.Id)}
        >
          löschen
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          component={Link}
          to={`/list/edit/${recipe.Id}`}
        >
          ändern
        </Button>
      </TableCell> */}
    </TableRow>
  );
};

export default ListItem;
