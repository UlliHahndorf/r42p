import React from 'react';
import {
  Fab,
  Paper,
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
  const [, filter, error, , handleFilterChange] = useList();

  const { t } = useTranslation();

  const { data: recipes } = useQuery(['recipes'], getRecipes, { suspense: true });

  const queryClient = useQueryClient();
  const mutation = useMutation(removeRecipe, {
    onSuccess() {
      queryClient.invalidateQueries(['recipes']);
    },
  });

  let content = <div>Keine Bücher gefunden</div>;
  if (recipes && recipes.length > 0) {
    const filteredBooks = recipes
      .filter((recipe) => recipe.Title.toLowerCase().includes(filter.toLowerCase()))
      .map((recipe) => (
        <ListItem
          key={recipe.Id}
          recipe={recipe}
          onDelete={async (id: number) => {
            mutation.mutate(id);
          }}
        />
      ));

    content = (
      <>
        <h2>{t('recipes.title')}</h2>
        <div className="filterContainer">
          <TextField
            label="Filter"
            variant="standard"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
        <div>{t('recipes.list.filterResults', { count: filteredBooks.length })}</div>
        <TableContainer component={Paper}> 
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple books overview table"
            stickyHeader={true}
          >
            <TableHead>
              <TableRow>
                <TableCell>{t('recipes.list.title')}</TableCell>
                <TableCell>{t('recipes.list.price')}</TableCell>
                {/* <TableCell colSpan={2}></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.length > 0 ? (
                filteredBooks
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>keine Treffer</TableCell>
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
