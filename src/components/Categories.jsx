import { React, memo, useEffect } from 'react'
import PropTypes from "prop-types"

import { getTop } from "../utils/adaptive";
import { unlockScroll } from "../utils/lock";
import { checkAdaptive } from "../utils/adaptive";

function Categories({ items, onClickCategory, activeCategory, setOpenMenu }) {

  const closeMenu = () => {
    if (!checkAdaptive(1110)) {
      unlockScroll();
      setOpenMenu();
    }
  }

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
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}

Categories.propTypes = {
  activeCategory: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func.isRequired,
  setOpenMenu: PropTypes.func.isRequired
};

Categories.defaultProps = { activeCategory: null, items: [] };

export default memo(Categories)