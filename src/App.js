import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Summary from './components/Summary';

import './App.css';

function App() {
  return (
    <>
      <div id='top'></div>
      <NavBar />
      <Router>
          <Route
              path="/" 
              exact 
              component={Landing}
          />
      </Router>
	  <Summary />
    <a href="#top" className="backtoTop">Back to Top</a>
    </>
  );
}

export default App;
