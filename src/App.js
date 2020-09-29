import React from "react";
import "./styles.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/header";
import routes from "./routes/route";
import Home from "./pages/home";
import Task from "./pages/task";

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={routes.home}>
          <Home />
        </Route>
        <Route path={routes.task}>
          <Task />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}
