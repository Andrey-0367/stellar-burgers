import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { ingredientsSelectors } from '../../services/slices/ingredients';
import { orderActions, orderSelections } from '../../services/slices/order';
import { useActionCreators, useAppSelector } from '../../services/hooks';

export const OrderInfo: FC = () => {
  const number = Number(useParams().number);
  const { fetchOrderByNumber } = useActionCreators(orderActions);
  const { ingredients } = useAppSelector(
    ingredientsSelectors.getIngredientState
  );
  const { orderData } = useAppSelector(orderSelections.selectOrderState);
  useEffect(() => {
    fetchOrderByNumber(number);
  }, []);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };
    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }
  console.log(orderInfo.status);
  return <OrderInfoUI orderInfo={orderInfo} />;
};
