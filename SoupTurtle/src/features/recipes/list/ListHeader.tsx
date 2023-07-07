import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  recipesCount: number;
};

const ListHeader: React.FC<Props> = ({ recipesCount }) => {
  const { t } = useTranslation();

  return (
    <><TableHead>
      <TableRow className='firstHeader'>
        <TableCell colSpan={4}>{t('recipes.list.filterResults', { count: recipesCount })}</TableCell>
      </TableRow>
    </TableHead><TableHead>
        <TableRow>
          <TableCell>{t('recipes.list.title')}</TableCell>
          <TableCell>{t('recipes.list.ingredients')}</TableCell>
          <TableCell>{t('recipes.list.instructions')}</TableCell>
          <TableCell>{t('recipes.list.price')}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead></>
  );
};

export default ListHeader;
