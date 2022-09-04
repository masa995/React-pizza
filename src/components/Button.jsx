import React from "react";
import classNames from "classnames";

const Button = ({ className, outline, addPizza, onClickAddPizzaToCart, children }) => {
  return (
    <button
      onClick={onClickAddPizzaToCart}
      className={classNames('button', className, {
        'button--outline': outline,
        'button--add': addPizza,
      })}
    >
      {children}
    </button>
  );
};

export default Button;