import React from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar";
import 'bulma/css/bulma.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

// Redux
import {Provider} from 'react-redux';
import store from "./store";

function App() {
   return (
      <Provider store={store}>
         <Router>
            <Navbar/>
            <div className={'container'}>
               <Route exact path={'/register'} component={Register}/>
               <Route exact path={'/login'} component={Login}/>
            </div>
         </Router>
      </Provider>
   );
}

export default App;
