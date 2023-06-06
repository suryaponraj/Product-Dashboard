import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
	BrowserRouter,
	Route,
	Routes,
	Navigate,
	Outlet,
} from 'react-router-dom';
import Signin from './Pages/Signin';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Signin/>}>
        
      </Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;