import logo from './logo.svg'; 
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Produits from './components/produits';
import newProduits from './components/newProduits';
import { useState,useEffect } from 'react';

function App() {
 
  const [currentRoute,setCurrentRoute] =useState();
 
  useEffect(() => {
    const path=window.location.pathname.toLocaleLowerCase();
  setCurrentRoute(path.slice(1,path.length))},[])
  
  return (
   <BrowserRouter>
   <nav className='m-1  p-1 border border-info'>
    <ul className='nav na-pills'>
      <li>
      <Link onClick={()=>setCurrentRoute("home")} 
        className={currentRoute == "home"? 
        "btn btn-info ms-1":
        "btn btn-outline-info ms-1"} to={"/home"}>
          Home</Link>
      </li>
      <li>
        <Link onClick={()=>setCurrentRoute("produits")} 
        className={currentRoute=="produits"? 
        "btn btn-info ms-1":
        "btn btn-outline-info ms-1"} to={"/produits"}>
          Produits</Link>
      </li>
    </ul>
   </nav>
   <Routes>
  <Route path='/home' element={<Home/>}></Route>
  <Route path='/produits' element={<Produits/>}></Route>
  <Route path='/newProduits' element={<newProduits/>}></Route>
   </Routes>
    </BrowserRouter>
  );
}

export default App;
