import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

import { Recipe } from '../shared/types/Recipe';
import Form from './Form';

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + '/recipes/' + id)
      .then((response) => response.json())
      .then((existingRecipe) => setRecipe(existingRecipe));
  }, [id]);

  return (
    <Dialog open={true} onClose={() => navigate('/recipes/list')} fullWidth maxWidth="sm">
      <DialogTitle>Rezept bearbeiten</DialogTitle>
      <DialogContent>
        <Form recipe={recipe} />
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
