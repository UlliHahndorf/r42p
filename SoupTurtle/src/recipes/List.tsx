import React from 'react';
import {
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

import ListItem from './ListItem';

import useList from './useList';

import './List.scss';
import { Link, Outlet } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRecipes, removeRecipe } from '../api/recipe.api';
import { useTranslation } from 'react-i18next';

const List: React.FC = () => {
  const [, filter, orderValue, error, handleDelete, handleFilterChange, handleOrderChange] = useList();

  const { t } = useTranslation();

  const { data: recipes } = useQuery(['recipes'], getRecipes, { suspense: true });

  const queryClient = useQueryClient();
  // const mutation = useMutation(removeRecipe, {
  //   onSuccess() {
  //     queryClient.invalidateQueries(['recipes']);
  //   },
  // });

  let content = <div>{t('recipes.nohits')}</div>;
  if (recipes && recipes.length > 0) {

    // Order
    var orderField = 'Name';
    if (orderValue !== "") orderField = orderValue;
    if (orderField === 'Name') {
      recipes.sort((a, b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0));
    } else {
      recipes.sort((a, b) => (a.Price > b.Price) ? 1 : ((b.Price > a.Price) ? -1 : 0));
    }

    const filteredBooks = recipes
      .filter((recipe) =>
        recipe.Title.toLowerCase().includes(filter.toLowerCase()) ||
        recipe.Ingredients.toLowerCase().includes(filter.toLowerCase())
      )
      .map((recipe) => (
        <ListItem
          key={recipe.Id}
          recipe={recipe}
          onDelete={handleDelete}          
        />
      ));

    content = (
      <>
        <h2>{t('recipes.title')}</h2>
        <div className="filterContainer">
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
        <TableContainer component={Paper}>
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
      <Fab
        color="primary"
        aria-label="Add new recipe"
        className="fab"
        component={Link}
        to="/form"
      >
        Neu
      </Fab>
      <Outlet></Outlet>
    </div>
  );
};

export default List;
