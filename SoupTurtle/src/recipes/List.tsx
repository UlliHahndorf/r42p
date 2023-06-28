import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Fab, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { getRecipes } from '../api/recipe.api';
import ListItem from './ListItem';
import useList from './useList';
import Icon from '../shared/Icon';
import './List.scss';

//import ConfirmDialog from '../shared/components/ConfirmDialog';

const List: React.FC = () => {
  const [, filter, orderValue, error, handleDelete, handleFilterChange, handleOrderChange] = useList();

  const { t } = useTranslation();

  const { data: recipes } = useQuery(['recipes'], getRecipes, { suspense: true });

  let content = <div>{t('recipes.nohits')}</div>;
  if (recipes && recipes.length > 0) {

    // Order
    var orderField = 'Name';
    if (orderValue !== "") orderField = orderValue;
    if (orderField === 'Name') {
      recipes.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    } else {
      recipes.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
    }

    const filteredBooks = recipes
      .filter((recipe) =>
        recipe.title.toLowerCase().includes(filter.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(filter.toLowerCase())
      )
      .map((recipe) => (
        <ListItem
          key={recipe.id}
          recipe={recipe}
          onDelete={handleDelete}          
        />
      ));

    content = (
      <>
        <div className="filterContainer">
        <span className='title'>{t('recipes.title')}</span>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <TextField
              label="Filter"
              variant="standard"
              value={filter}
              onChange={handleFilterChange}
            />
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="orderSelectLabel">{t('recipes.orderLabel')}</InputLabel>
            <Select
              labelId="orderSelectLabel"
              value={orderField}
              defaultValue={'Name'}
              onChange={handleOrderChange}
            >
              <MenuItem value='Name'>{t('recipes.orderName')}</MenuItem>
              <MenuItem value='Price'>{t('recipes.orderPrice')}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple books overview table" stickyHeader={true} >
            <TableHead>
              <TableRow className='firstHeader'>
                <TableCell colSpan={4}>{t('recipes.list.filterResults', { count: filteredBooks.length })}</TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell>{t('recipes.list.title')}</TableCell>
                <TableCell>{t('recipes.list.ingredients')}</TableCell>
                <TableCell>{t('recipes.list.instructions')}</TableCell>
                <TableCell>{t('recipes.list.price')}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.length > 0 ? (
                filteredBooks
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>{t('recipes.nohits')}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
  return (
    <div className="listContainer">
      {error != '' && <div>{error}</div>}
      {content}
      <Tooltip title={t('recipes.new')}>
      <Fab
        color="primary"
        aria-label={t('recipes.new')}
        className="fab"
        component={Link}
        to="/recipies/edit"
      >
        <Icon iconName='New' />
      </Fab>
      </Tooltip>
      <Outlet></Outlet>
    </div>
  );
};

export default List;
