import React, { useState } from "react";
import PropTypes from "prop-types"
import classNames from "classnames";

import { Button } from "../index";

function PizzaBlock({ id, imageUrl, name, price, sizes, types, addPizzaToCart, cartAddedCount }) {
  const availableSize = [26, 30, 40];
  const availableType = ["тонкое", "традиционное"];

  const [activeTypes, setActiveTypes] = useState(types[0]) //первый элемент в массиве types
  const [activeSizes, setActiveSizes] = useState(sizes[0]) //первый элемент в массиве sizes

  const selectActiveType = (index) => {
    setActiveTypes(index)
  }

  const selectActiveSize = (size) => {
    setActiveSizes(size)
  }

  const addPizza = () => {
    const obj = {
      id,
      name,
      price,
      sizes: activeSizes,
      types: availableType[activeTypes]
    }
    addPizzaToCart(obj)
  }

  return (
    <div
      className="pizza-block">
      <img
        className="pizza-block__image"
        src={imageUrl}
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {availableType.map((type, index) => (
            // console.log(type, index),
            <li
              key={`${type}_${index}`}
              onClick={() => (selectActiveType(index))}
              className={classNames({
                active: activeTypes === index, // переключение активного элемента
                disabled: !types.includes(index) //если в массиве с сервера нет данного элемента ставим disabled
              })}
            >
              {type}</li>
          ))}
        </ul>
        <ul>
          {availableSize.map((size, index) => (
            // console.log(type, index),
            <li
              key={`${size}_${index}`}
              onClick={() => selectActiveSize(size)}
              className={classNames({
                active: activeSizes === size,
                disabled: !sizes.includes(size)
              })}
            >
              {size} см.</li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{price} ₽</div>
        <Button
          outline
          addPizza
          onClickAddPizzaToCart={addPizza}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {cartAddedCount &&
            <i>{cartAddedCount}</i>}
        </Button>
      </div>
    </div>
  )
}

PizzaBlock.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  types: PropTypes.arrayOf(PropTypes.number), //массив чисел
  sizes: PropTypes.arrayOf(PropTypes.number), //массив чисел
  addPizzaToCart: PropTypes.func,
  cartAddedCount: PropTypes.number
};

PizzaBlock.defaultProps = {
  name: "---",
  price: 0,
  types: [],
  sizes: []
}

export default PizzaBlock;