import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import EditProduits from './components/EditProduits';
import Home from './components/Home';
import Newproduits from './components/newProduits';
import Produits from './components/produits';
import logo from './logo.svg';

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
        className={currentRoute === "home"? 
        "btn btn-info ms-1":
        "btn btn-outline-info ms-1"} to={"/home"}>
          Home</Link>
      </li>
      <li>
        <Link onClick={()=>setCurrentRoute("produits")} 
        className={currentRoute==="produits"? 
        "btn btn-info ms-1":
        "btn btn-outline-info ms-1"} to={"/produits"}>
          Produits</Link>
      </li>

      <li>
        <Link onClick={()=>setCurrentRoute("newProduits")} 
        className={currentRoute==="newProduits"? 
        "btn btn-info ms-1":
        "btn btn-outline-info ms-1"} to={"/newProduits"}>
          New Produits</Link>
      </li>
    </ul>
   </nav>
   <Routes>
  <Route path='/home' element={<Home/>}></Route>
  <Route path='/produits' element={<Produits/>}></Route>
  <Route path='/newProduits' element={<Newproduits/>}></Route>
  <Route path='/editProduits/:id' element={<EditProduits/>}></Route>
   </Routes>
    </BrowserRouter>
  );
}

export default App;
