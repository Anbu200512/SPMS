import React from 'react';
import { classNames } from '../../utils/helpers';

const Card = ({ children, className, hover = false, padding = true }) => {
  return (
    <div
      className={classNames(
        'bg-white rounded-xl border border-gray-100 shadow-sm',
        padding && 'p-6',
        hover && 'card-hover',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
