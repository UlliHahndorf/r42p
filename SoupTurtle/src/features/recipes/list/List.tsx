import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Fab, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectRecipes, selectLoadState, selectRemoveState} from '../recipesSlice';
import { useAppDispatch } from '../../../app/hooks';
import { loadAction, removeAction } from '../recipes.actions';

import Icon from '../../../shared/components/Icon';
import Progress from '../../../shared/components/Progress';
import Feedback from '../../../shared/components/Feedback';

import ListItem from './ListItem';
import useFilter from './useFilter';
import useOrder from './useOrder';
import './List.scss';

//import ConfirmDialog from '../shared/components/ConfirmDialog';

const List: React.FC = () => {
  const { filter, handleFilterChange} = useFilter();
  const { orderValue, handleOrderChange} = useOrder();
  const dispatch = useAppDispatch();
  const loadState = useSelector(selectLoadState);
  const removeState = useSelector(selectRemoveState);

  const { t } = useTranslation();

  const recipes = useSelector(selectRecipes);

  useEffect(() => {
    console.log("dispatch loadAction request");
    dispatch(loadAction.request());
  }, []);

  async function handleDelete(id: number): Promise<void> {
    dispatch(removeAction.request(id));
  }

  let content = <Feedback text={t('recipes.nohits')} level='info' />;
  
  console.log("loadstate is", loadState);

  switch (loadState) {
    case 'pending':
      return <Progress />;
    case 'error':
      return <Feedback text={t('main.any_error')} level='error' />
    case 'completed':

      console.log("RecipesLength:", recipes.length);
      if (!recipes || recipes.length === 0) {
        return <Feedback text={t('recipes.nohits')} level='warning' />
      }
      // Order
      var orderField = 'Name';
      if (orderValue !== "") orderField = orderValue;
      if (orderField === 'Name') {
        recipes.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
      } else {
        recipes.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
      }

      // Filter
      const filteredBooks = recipes
        .filter((recipe) =>
          recipe.title.toLowerCase().includes(filter.toLowerCase()) ||
          recipe.ingredients.toLowerCase().includes(filter.toLowerCase())
        )
        .map((recipe) => (
          <ListItem key={recipe.id} recipe={recipe} onDelete={handleDelete} />
        ));

      content = (
        <>
          {removeState === 'pending' && <Progress text='Datensatz wird gelöscht' />}
          {removeState === 'error' && <Feedback text={t('main.any_error')} level='error' />}

          <div className="filterContainer">
            <span className='title'>{t('recipes.title')}</span>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField  label="Filter" variant="standard" value={filter} onChange={handleFilterChange} />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="orderSelectLabel">{t('recipes.orderLabel')}</InputLabel>
              <Select labelId="orderSelectLabel" value={orderField} defaultValue={'Name'} onChange={handleOrderChange} >
                <MenuItem value='Name'>{t('recipes.orderName')}</MenuItem>
                <MenuItem value='Price'>{t('recipes.orderPrice')}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple recipes overview table" stickyHeader={true} >
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
  } // switch

    return (
      <div className="listContainer">
        {content}
        <Tooltip title={t('recipes.new')}>
        <Fab color="primary" aria-label={t('recipes.new')} className="fab" component={Link} to="/recipies/edit">
          <Icon iconName='New' />
        </Fab>
        </Tooltip>
        <Outlet></Outlet>
      </div>
    );
};

export default List;
