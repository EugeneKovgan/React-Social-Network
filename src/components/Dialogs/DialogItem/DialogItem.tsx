// @ts-ignore
import styles from './DialogItem.module.css';
import { NavLink } from 'react-router-dom';
import React from 'react';

type PropsType = { name: string; id: number };

const DialogItem: React.FC<PropsType> = ({ name, id }) => {
  const path = './dialogs/' + id;
  return (
    <div className={styles.dialogItem}>
      <NavLink to={path}>{name}</NavLink>
    </div>
  );
};

export default DialogItem;
