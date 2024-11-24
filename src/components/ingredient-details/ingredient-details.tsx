import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useLocation } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { ingredientsSelectors } from '../../services/slices/ingredients';
import { useAppSelector } from '../../services/hooks';

export const IngredientDetails: FC = () => {
  const location = useLocation();
  const ingredients = useAppSelector(ingredientsSelectors.selectIngredients);
  const ingredientToFind = location.pathname.replace('/ingredients/', '');
  const ingredientData: TIngredient | undefined = ingredients.find(
    (ingredient) => ingredient._id === ingredientToFind
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
