import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState ,useEffect} from 'react'

import { faCheckCircle,faCircle, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { checkProduit, deleteProduit, getProduits } from '../logique/logique'
import { useNavigate } from 'react-router-dom'

function Produits() {
    const navigate=useNavigate();
    const [query,setQuery]=useState("");
    const [state ,setState]=useState({
        produits:[],
        currentPage:1,
        pageSize:4,
        keyword:"",
        totalPages:0
    } )
     //la fonction qui recupere la liste des produits au demarrage de l application 
     useEffect(() => { handleGetProduits(state.keyword,state.currentPage,state.pageSize);},[]); // aucune variable n est verifier pour effectuer ce traitement donc on laisse [] vide 
    
    
    
     //on cree la fonction handleGetProduits
    const handleGetProduits=(keyword,page,size)=>{
        getProduits(keyword,page,size).then((resp)=>{
            // pour faire la pagination il fzut recuperer le nombre d element total 
            const totalElement=resp.headers['x-total-count'];
            let totalPages=Math.floor(totalElement/size);
            if(totalElement % size !==0) ++totalPages;

            setState({...state, produits:resp.data,keyword:keyword,currentPage:page,pageSize:size,totalPages:totalPages})
        }).catch((err)=>{
            console.error("Erreur lors du chargement", err );
        });
    }
    
     const   handleDeleteProduit=(produit)=>
        {
          deleteProduit(produit).then((resp)=>{
            //handleGetProduits(); dans cette methode on recharge l ensemble des produits
            const newProduits= state.produits.filter(p=> p.id!==produit.id);
          setState({...state, produits:newProduits});
          })
        }

        const   handleCheckProduit=(produit)=>
        {
         checkProduit(produit).then(resp=>{
            const newProduits = state.produits.map(p=> {
                if(p.id===produit.id)
                {
                    p.checked=!p.checked;
                }
                return p;
              });
              setState({...state,produits:newProduits});
         })
        }
        const goToPage=(page) =>{
            handleGetProduits(state.keyword,page,state.pageSize);
        };

        const handleSearch=(event)=>{
           event.preventDefault();
           handleGetProduits(query,1,state.pageSize); 
        }
  return (

    
    <div className='p-1 m-1'>
    <div className='row'>
    <div className='col-md-6'>
        <div className='card'>
        <form onSubmit={handleSearch}>
        <div className='row g-2'>
            <div className='col-auto'>
                < input value={query} onChange={(e)=>setQuery(e.target.value)} className='form-control'></input>
            </div>
            <div className='col-auto'>
                <button className='btn btn-success'><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
            </div>
        </div>
    </form>
        </div>
    <div className='card'> 
    
        <div className='card-body'>
        <table className='table'>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Checked</th>
            </tr>
            </thead>
           <tbody>
            {
               state.produits.map((produit)=>(
                    
                    <tr key={produit.id}>
                        <td>{produit.id}</td>
                        <td>{produit.name}</td>
                        <td>{produit.price}$</td>
                        <td>
                            <button onClick={()=>handleCheckProduit(produit)} className='btn btn-outline-success'>
                                <FontAwesomeIcon
                                icon={produit.checked ? faCheckCircle: faCircle}></FontAwesomeIcon>
                            </button>
                        </td>
                        <td >
                            <button onClick={()=>handleDeleteProduit(produit)} className='btn btn-danger'>
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </button>
                        </td>
                      <td>
                        <button onClick={() => navigate('/editProduits/'+produit.id)}  className='btn btn-outline-success'><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button></td>  
                    </tr>
                ))
            }
           </tbody>
        </table>
        <ul  className='nav nav-pills'>
            {
                new Array(state.totalPages).fill(0).map((v,index)=>(
                    <li key={index}>
                        <button onClick={()=>goToPage(index+1)} className='btn btn-info m-2'>{index +1}</button>
                    </li>
                ))
            }
        </ul>
        </div>
        </div>
    </div>
    </div>
       
    </div>
  )
}

export default Produits