import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { faCheckCircle,faCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

function Produits() { 
    const [produits ,setProduits]=useState([{id:1,name:"computer",price:4000,checked:false},
        {id:2,name:"phone",price:1000,checked:true},{id:3,name:"software",price:5000,checked:false}])
        
    const   handleDeleteProduit=(produit)=>
        {
          const newProduits=produits.filter(p=> p.id!=produit.id);
          setProduits(newProduits);
        }

        const   handleCheckProduit=(produit)=>
        {
          const newProduits=produits.map(p=> {
            if(p.id===p.id)
            {
                p.checked=!p.checked;
            }
            return p;
          });
          setProduits(newProduits);
        }
  return (

    
    <div className='p-1 m-1'>
    <div className='row'>
    <div className='col-md-6'>
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
                produits.map((produit)=>(
                    
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
                    </tr>
                ))
            }
           </tbody>
        </table>
        </div>
        </div>
    </div>
    </div>
       
    </div>
  )
}

export default Produits