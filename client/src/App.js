import React, {useEffect} from 'react';
import './App.css';
import 'bulma/css/bulma.min.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";

// Components
import Home from "./components/home/Home";
import Posts from "./components/posts/Posts";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import Post from "./components/post/Post";
import Profile from "./components/profile/Profile";

// Redux
import {loadUser} from "./actions/auth";
import {Provider} from 'react-redux';
import store from "./store";
import PostsByTag from "./components/posts/PostsByTag";
import Contact from "./components/contact/Contact";
import ContactConfirmation from "./components/contact/ContactConfirmation";


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
            <Route exact path={'/'} component={Home}/>
            <Route exact path={'/contact'} component={Contact}/>

            <div className={'test-container'}>
               <Switch>
                  <Route exact path={'/profile/user/:id'} component={Profile}/>
                  <Route exact path={'/posts/:id'} component={Post}/>
                  <Route exact path={'/register'} component={Register}/>
                  <Route exact path={'/login'} component={Login}/>
                  <Route exact path={'/posts'} component={Posts}/>
                  <Route exact path={'/tag/:tag'} component={PostsByTag}/>
                  <Route exact path={'/contact/confirmation'} component={ContactConfirmation}/>


               </Switch>
            </div>
         </Router>
      </Provider>
   );
}

export default App;
