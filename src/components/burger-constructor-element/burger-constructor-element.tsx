import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { burgerActions } from '../../services/slices/burger';
import { useActionCreators } from '../../services/hooks';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const { moveBurgerIngredient, removeBurgerIngredient } =
      useActionCreators(burgerActions);

    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        moveBurgerIngredient({ currentIndex: index, targetIndex: index + 1 });
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        moveBurgerIngredient({ currentIndex: index, targetIndex: index - 1 });
      }
    };

    const handleClose = () => {
      removeBurgerIngredient(ingredient.id);
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
