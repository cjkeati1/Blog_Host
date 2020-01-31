import React, {useEffect} from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar";
import 'bulma/css/bulma.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import {loadUser} from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

// Redux
import {Provider} from 'react-redux';
import store from "./store";
import Home from "./components/home/Home";
import Posts from "./components/posts/Posts";
import PostForm from "./components/posts/PostModalForm";
import PrivateRoute from "./components/routing/PrivateRoute";
import Categories from "./components/categories/Categories";

if (localStorage.token) {
   setAuthToken(localStorage.token);
}

function App() {
   useEffect(() => {
      store.dispatch(loadUser());
   }, []); // Need brackets so it runs once (basically a componentDidMount)

   return (
      <Provider store={store}>
         <Router>
            <Navbar/>
            <PrivateRoute exact path={'/create-post'} component={PostForm}/>
            <Route exact path={'/'} component={Home}/>
            <Route exact path={'/categories'} component={Categories}/>

            <div className={'container'}>
               <Switch>

                  <Route exact path={'/register'} component={Register}/>
                  <Route exact path={'/login'} component={Login}/>
                  <Route exact path={'/posts'} component={Posts}/>
               </Switch>
            </div>
         </Router>
      </Provider>
   );
}

export default App;
