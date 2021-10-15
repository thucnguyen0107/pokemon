import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";

// import './scss/fonts/font-awesome.min.css';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));
const ThePublicLayout = React.lazy(() =>
  import("./containers/ThePublicLayout")
);

// Pages
const Home = React.lazy(() => import("./pages/Home/Home"));
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/home"
              name="home"
              render={() => <ThePublicLayout component={Home} />}
            />
            {/* {/* <Route exact path="/404" name="Page 404" render={() => <ThePublicLayout component={Page404} />} /> */}
            {/* <Route exact path="/dashboard" name="dash board" render={() => <ThePublicLayout component={Dashboard}/>} /> */}
            <Route
              path="/"
              name="home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
