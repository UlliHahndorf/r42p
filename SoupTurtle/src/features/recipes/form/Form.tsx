import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, InputAdornment, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayJs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { deDE, enUS } from '@mui/x-date-pickers/locales';
import dayjs, { Dayjs } from 'dayjs';

import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../app/hooks';
import { Recipe, CreateRecipe, DefaultRecipe } from '../../../shared/types/Recipe';
import { save } from '../recipesSlice';
import * as Common from '../../../shared/components/Common';

import './Form.scss';

const defaultValues: CreateRecipe = DefaultRecipe();

type Props = {
    recipe?: Recipe | null;
};

const Form: React.FC<Props> = ({ recipe }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { t } = useTranslation();

    // Validation
    const schema = yup.object({
        id: yup.number().optional(),
        title: yup.string().required(t('recipes.validation.title_is_mandatory')),
        price: yup
            .number()
            .typeError(t('recipes.validation.only_numbers'))
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateRecipe>({
        defaultValues,
        resolver: yupResolver(schema) as any,
    });

    const localePlaceholder = (Common.HasEnglishUi() ? enUS.components.MuiLocalizationProvider.defaultProps.localeText : deDE.components.MuiLocalizationProvider.defaultProps.localeText);

    const [valueCreated, setValueCreated] = useState<Dayjs | null>(dayjs(recipe?.dateCreated));
    const [valueModified, setValueModified] = useState<Dayjs | null>(dayjs(recipe?.dateModified));

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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={Common.i18n.language}>
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
                <div>
                    <DatePicker
                        value={valueCreated}
                        defaultValue={valueCreated}
                        label={t('recipes.list.dateCreated')}
                        {...register('dateCreated')}
                        format="DD.MM.YYYY"
                        onChange={(newValue) => setValueCreated(newValue)}
                        localeText={localePlaceholder}
                    />

                    <DatePicker
                        value={valueModified}
                        label={t('recipes.list.dateModified')}
                        {...register('dateModified')}
                        format="DD.MM.YYYY"
                        onChange={(newValue) => setValueModified(newValue)}
                        localeText={localePlaceholder}
                    />
                </div>
                <div className='btnRow'>
                    <Button variant="contained" type="submit">
                        {(recipe === null ? t('recipes.create') : t('recipes.change'))}
                    </Button>
                    <Button variant="outlined" type="reset" component={Link} to="/recipes/list">
                        {t('recipes.cancel')}
                    </Button>
                </div>
            </form>
        </LocalizationProvider>
    );
};

export default Form;
