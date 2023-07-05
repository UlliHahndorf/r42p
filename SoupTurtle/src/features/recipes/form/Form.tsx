import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../app/hooks';
import { Recipe, CreateRecipe, DefaultRecipe } from '../../../shared/types/Recipe';
import { save } from '../recipesSlice';

import './Form.scss';

const defaultValues: CreateRecipe = DefaultRecipe();

// TODO Resources
const schema = yup.object({
    id: yup.number().optional(),
    title: yup.string().required('Title ist ein Pflichtfeld'),
    price: yup
        .number()
        .typeError('Bitte nur Zahlen eingeben')
});

type Props = {
    recipe?: Recipe | null;
};

const Form: React.FC<Props> = ({ recipe }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateRecipe>({
        defaultValues,
        resolver: yupResolver(schema) as any,
    });

    const { t } = useTranslation();

    useEffect(() => {
        if (recipe) {
            reset(recipe);
        }
    }, [recipe]);

    async function onSubmit(recipe: CreateRecipe): Promise<void> {
        dispatch(save(recipe));
        reset(defaultValues);
        navigate('/recipes/list');
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div>
                <TextField
                    label={t('recipes.list.title')}
                    {...register('title')}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    />
            </div>
            <div>
                <TextField
                    label={t('recipes.list.ingredients')}
                    {...register('ingredients')}
                    error={!!errors.ingredients}
                    helperText={errors.ingredients?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    />
            </div>
            <div>
                <TextField
                    label={t('recipes.list.instructions')}
                    {...register('instructions')}
                    error={!!errors.instructions}
                    helperText={errors.instructions?.message}
                    margin="normal"
                    multiline
                    maxRows={7}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    />
            </div>
            <div>
                <TextField
                    label={t('recipes.list.price')}
                    {...register('price')}
                    margin="normal"
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                      }}
                />
            </div>
            <div className='btnRow'>
                <Button variant="contained" type="submit">
                    {( recipe === null ? t('recipes.create') : t('recipes.change'))}
                </Button>
                <Button variant="outlined" type="reset" component={Link} to="/recipes/list">
                    {t('recipes.cancel')}
                </Button>
            </div>
        </form>
    );
};

export default Form;
