import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink to={'/'} className={styles.link + ' ' + 'pl-5 pr-5 pb-4 pt-4'}>
          {({ isActive }) => (
            <>
              <div className={isActive ? styles.link_active : styles.link}>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              </div>
              <p
                className={`text text_type_main-default ml-2 mr-10 ${
                  isActive ? styles.link_active : styles.link
                }`}
              >
                Конструктор
              </p>
            </>
          )}
        </NavLink>

        <NavLink
          to={'/feed'}
          className={styles.link + ' ' + 'pl-5 pr-5 pb-4 pt-4'}
        >
          {({ isActive }) => (
            <>
              <div className={isActive ? styles.link_active : styles.link}>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
              </div>
              <p
                className={`text text_type_main-default ml-2 ${
                  isActive ? styles.link_active : styles.link
                }`}
              >
                Лента заказов
              </p>
            </>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <NavLink
        to={'/profile'}
        className={styles.link + ' ' + 'pl-5 pr-5 pb-4 pt-4'}
      >
        {({ isActive }) => (
          <>
            <div className={styles.icon + ' ' + 'mr-2'}>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
            </div>
            <p
              className={`text text_type_main-default ml-2 ${
                isActive ? styles.link_active : styles.link
              }`}
            >
              {userName || 'Личный кабинет'}
            </p>
          </>
        )}
      </NavLink>
    </nav>
  </header>
);
