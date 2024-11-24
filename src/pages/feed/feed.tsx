import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { feedActions, feedSelectors } from '../../services/slices/feed';
import { useActionCreators, useAppSelector } from '../../services/hooks';

export const Feed: FC = () => {
  const { orders } = useAppSelector(feedSelectors.getFeedState);
  const { fetchGetFeeds } = useActionCreators(feedActions);
  useEffect(() => {
    fetchGetFeeds();
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => fetchGetFeeds()} />;
};
