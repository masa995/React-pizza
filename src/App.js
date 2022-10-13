import React from "react";
import { Route, Switch } from "react-router-dom";

import { Header } from "./components"
import { Home, Cart, NotFound } from "./pages"

import "./scss/app.scss"

function App() {
  // window.test = () => {
  //   fetch("http://localhost:3001/pizzas").then((response) => response.json()).then((json) => {
  //     dispatch(setPizzasAction(json))
  //   });
  // }

  //Решение из ДОКУМЕНТАЦИИ
  // useEffect(() => {
  //   //Я сразу обращаюсь к массиву пицц, поэтому мне не нужно обращатся к свойству.
  //   //json() - преобразует ответ в json объект
  //   //методы отправки пишем после адресса в объекте
  //   fetch("http://localhost:3001/pizzas").then((response) => response.json()).then((json) => {
  //     dispatch(setPizzasAction(json))
  //   });
  // }, [dispatch])

  //ПОЧЕМУ ТЫ РАБОТАЕШЬ! (решение с STACKOVERFLOW)
  //можно спользовать acync await
  // useEffect(() => {
  //   function fetchData() {
  //     fetch("http://localhost:3001/pizzas").then((response) => response.json()).then((json) => {
  //       dispatch(setPizzasAction(json))
  //     });
  //   }
  //   fetchData();
  // })

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        {/* //передаем переменные в компонент
        <Route exact path="/" component={() =>
          <Home
            items={pizzas}
          />} /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
