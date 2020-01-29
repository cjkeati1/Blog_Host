import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import 'bulma/css/bulma.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


function App() {
   return (
         <Router>
               <Navbar/>
         </Router>
   );
}

export default App;
