import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import {EmployeesPage}  from './components/EmployeesPage.js';
import {welcomePage} from './components/welcomePage.js';
import { navBar } from './components/navBar';
import React, {Component} from 'react';


function App() {
  return (
    <Router>
        {navBar()}
          <Routes>
            <Route path="/Welcome"  element={welcomePage()}/>
            <Route path="/employees" element={EmployeesPage()} />
          </Routes>
    </Router>
  );
}

export default App;
