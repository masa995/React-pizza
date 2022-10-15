import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import { Categories, PizzaBlock, SortPopup, LoadingBlock, Button } from "../components";
import { setCategoryAction } from "../redux/actions/filters";
import { setSortByAction } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";

import { lockScroll, unlockScroll } from "../utils/lock";
import { checkAdaptive } from '../utils/adaptive';

const arrayCategory = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];
const arraySort = [
  {
    type: "rating",
    name: "популярности",
    order: "desc"
  },
  {
    type: "sortPrice",
    name: "цене",
    order: "desc"
  },
  {
    type: "name",
    name: "алфавиту",
    order: "asc"
  }
]

function Home() {
  const [openMenu, setOpenMenu] = useState(false)

  const btnMenuChange = () => {
    if (openMenu) {
      unlockScroll();
      setOpenMenu(false);
    } else {
      lockScroll();
      setOpenMenu(true);
    }
  }

  const dispatch = useDispatch();

  const { items } = useSelector((state) => {
    return {
      items: state.pizzas.items,
    }
  })
  const { isLoaded } = useSelector((state) => {
    return {
      isLoaded: state.pizzas.isLoaded
    }
  })

  const { category, sortBy } = useSelector((state) => {
    return {
      category: state.filter.category,
      sortBy: state.filter.sortBy
    }
  })

  const { countPizzas } = useSelector((state) => {
    return {
      countPizzas: state.cart.countTypesOfId
    }
  })

  useEffect(() => {
    window.addEventListener('resize', () => {
      setOpenMenu(checkAdaptive())
    })
    setOpenMenu(checkAdaptive())
  }, [])

  useEffect(() => {
    dispatch(fetchPizzas(category, sortBy))
  }, [dispatch, category, sortBy])

  //Передает встроенный обратный вызов и массив зависимостей. useCallbackвернет сохраненную в памяти версию обратного вызова, которая изменяется только в том случае, если изменилась одна из зависимостей
  const onSelectCategory = useCallback((index) => {
    dispatch(setCategoryAction(index))
  }, [dispatch])

  const onSelectSortBy = useCallback((obj) => {
    dispatch(setSortByAction(obj))
  }, [dispatch]);

  const handleAddPizzaToCart = (obj) => {
    dispatch({
      type: 'ADD_PIZZA_CART',
      payload: obj,
    });
  };

  return (
    <div className="container">
      <div className="content__top">

        <Button
          arial-label="Кнопка меню"
          className={classNames("button--menu", {
            'active': openMenu
          })}
          onClick={btnMenuChange}
        >
          <span></span>
          <span></span>
        </Button>

        {openMenu && <Categories
          items={arrayCategory}
          onClickCategory={onSelectCategory}
          activeCategory={category}
          setOpenMenu={setOpenMenu}
        />}

        <SortPopup
          objArr={arraySort}
          onClickSortBy={onSelectSortBy}
          activeSort={sortBy}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">

        {isLoaded ?
          items.map((item) => (
            <PizzaBlock
              {...item} //передаем все свойства разом
              key={item.id}
              addPizzaToCart={handleAddPizzaToCart}
              cartAddedCount={countPizzas[item.id]}
            />
          ))
          : Array(12).fill(0).map((val, index) => (
            <LoadingBlock
              key={index} />
          ))
        }
      </div>
    </div>
  )
}

export default Home;