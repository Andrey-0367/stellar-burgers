import { ProfileOrdersUI } from '@ui-pages';
import { RequestStatus } from '@utils-types';
import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { useActionCreators, useAppSelector } from '../../services/hooks';
import { orderActions, orderSelections } from '../../services/slices/order';
import { feedActions } from '../../services/slices/feed';

export const ProfileOrders: FC = () => {
  const { orders } = useAppSelector(orderSelections.selectOrderState);
  const { fetchOrdersAll } = useActionCreators(orderActions);
  const { fetchGetFeeds } = useActionCreators(feedActions);
  const isOrderLoading = useAppSelector(orderSelections.selectOrderStatus);

  useEffect(() => {
    fetchOrdersAll();
    fetchGetFeeds();
  }, []);

  if (isOrderLoading == RequestStatus.Loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
