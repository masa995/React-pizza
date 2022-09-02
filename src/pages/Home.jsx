import React from 'react';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Categories, PizzaBlock, SortPopup, LoadingBlock } from "../components";
import { setCategoryAction } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";

const arrayCategory = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];
const arraySort = [
  {
    type: "popular",
    name: "популярности"
  },
  {
    type: "price",
    name: "цене"
  },
  {
    type: "alphabet",
    name: "алфавиту"
  }
]

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPizzas())
  }, [dispatch])

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

  //Передает встроенный обратный вызов и массив зависимостей. useCallbackвернет сохраненную в памяти версию обратного вызова, которая изменяется только в том случае, если изменилась одна из зависимостей
  const onSelectCategory = useCallback((index) => {
    dispatch(setCategoryAction(index))
  }, [dispatch])

  // const items = [] //костыль
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          items={arrayCategory}
          onClickItem={onSelectCategory}
        />

        <SortPopup
          objArr={arraySort}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">

        {isLoaded ?
          items.map((item) => (
            <PizzaBlock
              {...item} //передаем все свойства разом
              key={item.id}
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