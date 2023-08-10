import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Fab, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { load, remove, selectRecipes, selectLoadState, selectSaveState, selectRemoveState } from '../recipesSlice';
import { useAppDispatch } from '../../../app/hooks';
import { Recipe } from '../../../shared/types/Recipe';

import * as Common from '../../../shared/components/Common';

import ListHeader from './ListHeader';
import ListItem from './ListItem';
import useFilter from './useFilter';
import useOrder from './useOrder';
import './List.scss';

const List: React.FC = () => {
  const { filter, handleFilterChange } = useFilter();
  const { orderValue, handleOrderChange } = useOrder();
  const dispatch = useAppDispatch();
  const loadState = useSelector(selectLoadState);
  const saveState = useSelector(selectSaveState);
  const removeState = useSelector(selectRemoveState);
  
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(0);

  const { t } = useTranslation();

  const recipes = useSelector(selectRecipes);

  useEffect(() => {
    dispatch(load());
  }, []);

  async function handleDelete(): Promise<void> {
    dispatch(remove(deleteId));
  }

  async function confirmDelete(id: number): Promise<void> {
    setConfirmOpen(true);
    setDeleteId(id);
  }

  let content = <Common.Feedback text={t('recipes.nohits')} level='info' />;

  switch (loadState) {
    case 'pending':
      return <Common.Progress />;
    case 'error':
      return <Common.Feedback text={t('main.any_error')} level='error' />
    case 'completed':

      if (!recipes || recipes.length === 0) {
        return <Common.Feedback text={t('recipes.nohits')} level='warning' />
      }

      // Sort
      var orderField = 'Title';
      if (orderValue !== "") orderField = orderValue;
      var sortedRecipes = [...recipes];
      switch (orderField) {
        case 'Title':
          sortedRecipes.sort((a: Recipe, b: Recipe) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
          break;
        case 'Price':
          sortedRecipes.sort((a: Recipe, b: Recipe) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
          break;
        case 'LastMod':
          sortedRecipes.sort((a: Recipe, b: Recipe) => (a.dateModified > b.dateModified) ? 1 : ((b.dateModified > a.dateModified) ? -1 : 0));
          break;
      }

      // Filter
      const filteredRecipes = sortedRecipes
        .filter((recipe) =>
          recipe.title.toLowerCase().includes(filter.toLowerCase()) ||
          recipe.ingredients.toLowerCase().includes(filter.toLowerCase())
        )
        .map((recipe) => (
          <ListItem key={recipe.id} recipe={recipe} onDelete={confirmDelete} />
        ));

      content = (
        <>
          {(removeState === 'pending' || saveState === 'pending') && <Common.Progress text={t('main.processing')} />}
          {(removeState === 'error' || saveState === 'error') && <Common.Feedback text={t('main.any_error')} level='error' />}
          {(removeState === 'completed' || saveState === 'completed') && <Common.Feedback text={t('main.success')} level='success' />}

          <div className="filterContainer">
          <Common.Icon name='book' size='2x' /> <span className='title'>{t('recipes.title')}</span>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField label="Filter" value={filter} onChange={handleFilterChange} />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="orderSelectLabel" sx={{ bgcolor: "#fff" }}>{t('recipes.orderLabel')}</InputLabel>
              <Select labelId="orderSelectLabel" value={orderField} defaultValue={'Title'} onChange={handleOrderChange} >
                <MenuItem value='Title'>{t('recipes.list.title')}</MenuItem>
                <MenuItem value='Price'>{t('recipes.list.price')}</MenuItem>
                <MenuItem value='LastMod'>{t('recipes.list.dateModified')}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="protRemarks">
            Manuell gebaute Liste mit List/ListItem-Komponentenn aus der Material-UI-Bibliothek<br />
            Die Daten kommen per REST von <b>{import.meta.env.VITE_BACKEND_URL}</b>
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
          <Common.Icon name='plus' size='lg' />
        </Fab>
      </Tooltip>
      <Outlet></Outlet>
      <Common.ConfirmDialog 
        title={t('recipes.delete')}
        message={t('recipes.deleteQuery')}
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDelete}
      ></Common.ConfirmDialog>

    </div>
  );
};

export default List;
