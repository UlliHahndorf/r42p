import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Fab, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { load, remove, selectRecipes, selectLoadState, selectSaveState, selectRemoveState } from '../recipesSlice';
import { useAppDispatch } from '../../../app/hooks';
//import cl from '../../../shared/funcs'
import { Recipe } from '../../../shared/types/Recipe';

import Icon from '../../../shared/components/Icon';
import Progress from '../../../shared/components/Progress';
import Feedback from '../../../shared/components/Feedback';

import ListHeader from './ListHeader';
import ListItem from './ListItem';
import useFilter from './useFilter';
import useOrder from './useOrder';
import './List.scss';

// import ConfirmDialog from '../../../shared/components/ConfirmDialog';

const List: React.FC = () => {
  const { filter, handleFilterChange } = useFilter();
  const { orderValue, handleOrderChange } = useOrder();
  const dispatch = useAppDispatch();
  const loadState = useSelector(selectLoadState);
  const saveState = useSelector(selectSaveState);
  const removeState = useSelector(selectRemoveState);

  const { t } = useTranslation();

  const recipes = useSelector(selectRecipes);

  useEffect(() => {
    dispatch(load());
  }, []);

  async function handleDelete(id: number): Promise<void> {
    if (confirm(t('recipes.delete') + '?')) {
      dispatch(remove(id));
    }
    //<ConfirmDialog title='foo' open={true} children='bar' setOpen='' onConfirm={doDelete(id)} />
    {/* Are you sure?
    <button onClick={closeConfirmationModal}>No</button>
    <button onClick={handleSubmit}>Yes</button> */}
    // </ConfirmDialog>

  }

  let content = <Feedback text={t('recipes.nohits')} level='info' />;

  switch (loadState) {
    case 'pending':
      return <Progress />;
    case 'error':
      return <Feedback text={t('main.any_error')} level='error' />
    case 'completed':

      if (!recipes || recipes.length === 0) {
        return <Feedback text={t('recipes.nohits')} level='warning' />
      }

      // Sort
      var orderField = 'Title';
      if (orderValue !== "") orderField = orderValue;
      var sortedRecipes = [...recipes];
      if (orderField === 'Title') {
        sortedRecipes.sort((a: Recipe, b: Recipe) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
      } else {
        sortedRecipes.sort((a: Recipe, b: Recipe) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
      }

      // Filter
      const filteredRecipes = sortedRecipes
        .filter((recipe) =>
          recipe.title.toLowerCase().includes(filter.toLowerCase()) ||
          recipe.ingredients.toLowerCase().includes(filter.toLowerCase())
        )
        .map((recipe) => (
          <ListItem key={recipe.id} recipe={recipe} onDelete={handleDelete} />
        ));

      content = (
        <>
          {(removeState === 'pending' || saveState === 'pending') && <Progress text={t('main.processing')} />}
          {(removeState === 'error' || saveState === 'error') && <Feedback text={t('main.any_error')} level='error' />}
          {(removeState === 'completed' || saveState === 'completed') && <Feedback text={t('main.success')} level='success' />}

          <div className="filterContainer">
            <span className='title'>{t('recipes.title')}</span>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField label="Filter" value={filter} onChange={handleFilterChange} />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="orderSelectLabel" sx={{ bgcolor: "#fff" }}>{t('recipes.orderLabel')}</InputLabel>
              <Select labelId="orderSelectLabel" value={orderField} defaultValue={'Title'} onChange={handleOrderChange} >
                <MenuItem value='Title'>{t('recipes.orderTitle')}</MenuItem>
                <MenuItem value='Price'>{t('recipes.orderPrice')}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple recipes overview table" stickyHeader={true} >
              <ListHeader recipesCount={filteredRecipes.length} />
              <TableBody>
                {filteredRecipes.length > 0 ? (
                  filteredRecipes
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
        <Fab color="primary" aria-label={t('recipes.new')} className="fab" component={Link} to="/recipes/list/new">
          <Icon iconName='New' />
        </Fab>
      </Tooltip>
      <Outlet></Outlet>
    </div>
  );
};

export default List;
