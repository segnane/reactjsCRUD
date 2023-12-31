import React, { useState } from 'react'
import { saveProduit } from '../logique/logique';

function Newproduits() {
    const [name,setName]=useState("");
    const [price,setPrice]=useState(0);
    const [checked,setChecked]=useState(false);
    
    
    const handleSaveProduit=(event)=>{
        event.preventDefault();
        let produit ={name,price,checked };
        saveProduit(produit).then((resp)=>{
            alert(JSON.stringify(resp.data));
        });
    };
  return (
    <div className='row p1'>
        <div className='col-md-6'>
            <div className='card'>
                <div className='card-body'>
                    <form onSubmit={handleSaveProduit}>
                        <div className='mb-3'>
                            <label className='form-label'>Name:</label>
                            <input onChange={(e)=>setName(e.target.value)} value={name} className='form-control'></input>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Price:</label>
                            <input onChange={(e)=>setPrice(e.target.value)} value={price} className='form-control'></input>
                        </div>
                        <div className='form-check'>
                            <input onChange={(e)=>setChecked(e.target.value)} defaultChecked={checked} className='form-check-input' type="checkbox"></input>
                            <label className='form-check-label' htmlFor="flexCheckCheched">Checked</label>
                        </div>
                    <button className='btn btn-success'   >Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Newproduits