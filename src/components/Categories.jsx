import { React, memo, useEffect } from 'react'
import PropTypes from "prop-types"

import { getTop } from "../utils/adaptive";
import { unlockScroll } from "../utils/lock";

function Categories({ items, onClickCategory, activeCategory, setOpenMenu }) {

  const closeMenu = () => {
    unlockScroll();
    setOpenMenu();
  }

  //вычесляет верхнию координату для позиционирования Categories
  useEffect(() => {
    getTop();
  }, [])

  return (
    <div
      className="categories"
    >
      <ul>
        <li
          onClick={() => {
            onClickCategory(null)
            closeMenu()
          }}
          className={activeCategory === null ? "active" : ""}
        >
          Все</li>
        {items.map((name, index) => (
          items &&
          <li
            className={activeCategory === index ? "active" : ""}
            key={`${name}_${index}`}
            onClick={() => {
              onClickCategory(index)
              closeMenu()
            }}
          //Если просто написать onClick={onClick(name)}, то функция сразу выполнится при рендере компонента, а за тем не будет выполнятся
          //() => {} - каждый раз когда перерендыревается элемент создается новая анонимная функция
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}

// React.memo является компонентом более высокого порядка.

// Если ваш компонент отображает тот же результат с использованием тех же пропсов, вы можете обернуть его в вызов React.memo для повышения производительности в некоторых случаях путем запоминания результата.

Categories.propTypes = {
  activeCategory: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func.isRequired,
  setOpenMenu: PropTypes.func.isRequired
};

Categories.defaultProps = { activeCategory: null, items: [] };

export default memo(Categories)