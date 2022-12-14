import { React, useState, useEffect, useRef, memo } from "react";
import PropTypes from "prop-types"

import { Button } from "../components/index";

function SortPopup({ objArr, onClickSortBy, activeSort }) {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const sortRef = useRef(); //сохраняет ссылку на эл. sort
  const labelActive = objArr.find((obj) => obj.type === activeSort.type).name;

  const toggleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup)
  }

  const selectItem = (obj) => {
    onClickSortBy(obj)
    setVisiblePopup(false);
  }

  const handleOutsideClick = (e) => {
    const path = e.path || e.composedPath();
    if (!path.includes(sortRef.current)) {
      setVisiblePopup(false);
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, [])

  return (
    <div
      ref={sortRef}
      className="sort"
    >
      <div className="sort__label">
        <svg
          className={visiblePopup ? "rotate" : ""}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          onClick={toggleVisiblePopup}
        >
          {labelActive}
        </span>
      </div>

      <Button
        arial-label="Фильтр"
        className={"button--sort"}
        onClick={toggleVisiblePopup}
      >
        <svg
          height="20"
          fill="#ffffff"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 472.615 472.615"
        >
          <g>
            <g>
              <polygon points="472.615,12.908 0,12.908 180.081,202.629 180.066,459.708 292.55,401.525 292.534,202.629 		" />
            </g>
          </g>
        </svg>
      </Button>

      {visiblePopup &&
        <div className="sort__popup">
          <ul>
            {objArr.map((obj, index) => (
              obj &&
              <li
                className={activeSort.type === obj.type ? "active" : ""}
                key={`${obj.type}_${index}`}
                onClick={() => selectItem(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>}
    </div>
  )
}

SortPopup.propTypes = {
  activeSort: PropTypes.object.isRequired,
  objArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickSortBy: PropTypes.func.isRequired,
};

SortPopup.defaultProps = {
  objArr: [],
};

export default memo(SortPopup);