import React from "react";
import { Route, Switch } from "react-router-dom";

import { Header } from "./components"
import { Home, Cart, NotFound } from "./pages"

import "./scss/app.scss"

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
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
