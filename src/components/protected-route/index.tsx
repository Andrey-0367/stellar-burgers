import React from 'react';
import { useAppSelector } from '../../services/hooks';

import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { userSelectors } from '../../services/slices/user';

type ProtectedRouteProps = {
  children: React.ReactNode;
  isPublic?: boolean | undefined;
};

function ProtectedRoute({ children, isPublic }: ProtectedRouteProps) {
  const user = useAppSelector(userSelectors.selectUser);
  const checkUser = useAppSelector(userSelectors.selectUserCheck);
  const location = useLocation();
  if (!checkUser) {
    return <Preloader />;
  }
  if (!isPublic && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/' };
    return (
      <Navigate to={from} state={{ background: from?.state?.background }} />
    );
  }

  return children;
}

export default ProtectedRoute;
