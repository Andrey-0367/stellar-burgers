import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useActionCreators } from '../../services/hooks';
import { userActions } from '../../services/slices/user';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const { logoutUser } = useActionCreators(userActions);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
