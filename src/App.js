import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './components/Login'
import Home from './components/Home'


const Register = () => (<div></div>)
function App() {

  return (
    <Router>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login} />
        <Route path="/topics" component={Register} />
    </Router>
  );
}

export default App;
