import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useActionCreators, useAppSelector } from '../../services/hooks';

import { Navigate } from 'react-router-dom';
import { RequestStatus } from '@utils-types';
import { userActions, userSelectors } from '../../services/slices/user';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useActionCreators(userActions);
  const status = useAppSelector(userSelectors.selectUserStatus);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    loginUser({ email, password });
  };

  if (status == RequestStatus.Success) {
    return <Navigate to={'/'} />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
