import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Recipe } from '../../../shared/types/Recipe';
import { selectRecipe } from '../recipesSlice';
import Form from '../form/Form';

const Edit: React.FC = () => {
  const getRecipe = useSelector(selectRecipe);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (id) {
      setRecipe(getRecipe(parseInt(id, 10)) as Recipe);
    }
  }, [getRecipe, id]);

  const title = (recipe === null ? t('recipes.dialog_title_create') : t('recipes.dialog_title_change'));

  return (
    <Dialog open={true} onClose={() => navigate('/recipes/list')} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Form recipe={recipe} />
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
