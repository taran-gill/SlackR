import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Summary from './components/Summary';

function App() {
  return (
    <>
      <NavBar />
      <Router>
          <Route
              path="/" 
              exact 
              component={Landing}
          />
      </Router>
	  <Summary />
    </>
  );
}

export default App;
