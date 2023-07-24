import axios from "axios";
export const produitAPI=axios.create({
    baseURL:"http://localhost:9000"
});

export const getProduits=(keyword="",page=1,size=4)=>
{
    return  produitAPI.get('/produits?name_like='+keyword+'&_page='+page+'&_limit='+size);
}

export const deleteProduit=(produit)=>
{return produitAPI.delete("/produits/"+produit.id) //premiere methode 
    //return produitAPI.delete('/produits/,${produit.id}');//deuxieme methode a resoudre

}

export const getProduit=(id)=>
{return produitAPI.get("/produits/"+id) //premiere methode 
    //return produitAPI.get('/produits/${id}');//deuxieme methode

}

export const saveProduit=(produit)=>
{ 
    return produitAPI.post('/produits',produit);

}

export const checkProduit=(produit)=>
{ 
    return produitAPI.patch('/produits/'+produit.id,{checked:!produit.checked});

}

export const updateProduit=(produit)=>
{ 
    return produitAPI.put('/produits/'+produit.id,{name:produit.name,price:produit.price,checked:produit.checked});

}