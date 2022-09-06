import React from "react";
import classNames from "classnames";

const Button = ({ className, outlineStyle, addPizzaStyle, onClickAddPizzaToCart, children }) => {
  return (
    <button
      onClick={onClickAddPizzaToCart}
      className={classNames('button', className, {
        'button--outline': outlineStyle,
        'button--add': addPizzaStyle,
      })}
    >
      {children}
    </button>
  );
};

export default Button;