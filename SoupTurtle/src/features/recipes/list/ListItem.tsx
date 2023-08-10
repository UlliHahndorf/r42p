import React from 'react';
import { Button, TableCell, TableRow, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Recipe } from '../../../shared/types/Recipe';
import * as Common from '../../../shared/components/Common';

type Props = {
  recipe: Recipe;
  onDelete: (id: number) => Promise<void>;
};

const ListItem: React.FC<Props> = ({ recipe, onDelete }) => {
  const { t } = useTranslation();

  const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

//  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <TableRow style={{ verticalAlign: 'top' }}>
      <TableCell>
        <Link to={`edit/${recipe.id}`} >
        <b>{recipe.title}</b>
        </Link>
      </TableCell>
      <TableCell>{recipe.ingredients}</TableCell>
      <TableCell>{renderHTML(recipe.instructions.replace(/\n/g, "<br />"))}</TableCell>
      <TableCell>{recipe.numberServings}</TableCell>
      <TableCell>{recipe.quantities}</TableCell>
      <TableCell>{Common.DateFormatString(recipe.dateCreated.toString())}</TableCell>
      <TableCell>{Common.DateFormatString(recipe.dateModified.toString())}</TableCell>
      <TableCell>{recipe.category}</TableCell>
      <TableCell>{recipe.notes}</TableCell>
      <TableCell>{recipe.description}</TableCell>
      <TableCell>{t('recipes.listItem.price', { price: recipe.price })}</TableCell>
      <TableCell>{recipe.source + (recipe.sourcePage !== "" ? " / " + recipe.sourcePage : "")}</TableCell>
      <TableCell>
        <Tooltip title={t('recipes.change')}>
          <Button variant="text" component={Link} to={`edit/${recipe.id}`} >
            <Common.Icon name='edit' size='lg' />
          </Button>
        </Tooltip>
        <Tooltip title={t('recipes.delete')}>
          <Button variant="text" onClick={() => onDelete(recipe.id)} >
            <Common.Icon name='trash-can' size='lg' />
          </Button>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default ListItem;
