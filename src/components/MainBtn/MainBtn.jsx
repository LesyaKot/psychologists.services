import React from 'react';
import css from './MainBtn.module.css';

export default function MainBtn({ onClick, children }) {
  return (
    <button className={css.btn} onClick={onClick} >
      {children}
    </button>
  );
}
