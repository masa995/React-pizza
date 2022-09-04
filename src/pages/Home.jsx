import React from 'react';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Categories, PizzaBlock, SortPopup, LoadingBlock } from "../components";
import { setCategoryAction } from "../redux/actions/filters";
import { setSortByAction } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";

const arrayCategory = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];
const arraySort = [
  {
    type: "popular",
    name: "популярности",
    order: "desc"
  },
  {
    type: "price",
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
  const dispatch = useDispatch();

  // обращаемся в REDUX store и возвращает props
  //вызывает ререндр
  const { items } = useSelector((state) => {
    //(state.pizzas.items);
    return {
      items: state.pizzas.items,
    }
  })
  const { isLoaded } = useSelector((state) => {
    // console.log(state.pizzas.isLoaded)
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

  const { cartItems } = useSelector((state) => {
    return {
      cartItems: state.cart.items
    }
  })

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
        <Categories
          items={arrayCategory}
          onClickCategory={onSelectCategory}
          activeCategory={category}
        />

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
              cartAddedCount={cartItems[item.id] && cartItems[item.id].length}
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