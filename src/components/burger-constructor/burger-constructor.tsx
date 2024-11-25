import { FC, useMemo } from 'react';
import { RequestStatus, TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { burgerActions, burgerSelectors } from '../../services/slices/burger';
import { useActionCreators, useAppSelector } from '../../services/hooks';
import { userSelectors } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItemsIngredients = useAppSelector(
    burgerSelectors.selectBurgerIngredients
  );
  const constructorItemsBun = useAppSelector(burgerSelectors.selectBurgerBun);
  const constructorItems = {
    ingredients: constructorItemsIngredients,
    bun: constructorItemsBun
  };
  const { orderBurgers, setRequest, clearBurger } =
    useActionCreators(burgerActions);
  const orderModalData = useAppSelector(burgerSelectors.selectModalData);
  const orderRequest = useAppSelector(burgerSelectors.selectBurgerStatus);
  const user = useAppSelector(userSelectors.selectUser);
  const navigate = useNavigate();

  let arr: string[] = [];
  const ingredients: string[] | void = constructorItems.ingredients.map(
    (ingredient) => ingredient._id
  );
  if (constructorItems.bun) {
    const bun = constructorItems.bun?._id;
    arr = [bun, ...ingredients, bun];
  }

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
    } else if (user && constructorItems.bun) {
      setRequest(true);
      orderBurgers(arr);
    } else if (user && !constructorItems.bun) {
      return;
    }
  };

  const closeOrderModal = () => {
    setRequest(false);
    clearBurger();
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest == RequestStatus.Success}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
