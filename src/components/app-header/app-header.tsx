import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/hooks';
import { userSelectors } from '../../services/slices/user';

export const AppHeader: FC = () => {
  const data = useAppSelector(userSelectors.selectUser);

  return <AppHeaderUI userName={data?.name} />;
};
