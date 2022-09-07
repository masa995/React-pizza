import React from "react";
import classNames from "classnames";

function Button({ className, outlineStyle, addPizzaStyle, tranperentStyle, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={classNames('button', className, {
        'button--outline': outlineStyle,
        'button--add': addPizzaStyle,
        'button--tranparent': tranperentStyle
      })}
    >
      {children}
    </button>
  );
};

export default Button;