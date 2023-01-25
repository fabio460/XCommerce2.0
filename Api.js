

const apiBase = 'https://api-xcommerce.vercel.app/'

export const total = async()=>{
    return await fetch(apiBase+'produto').then(r=>r.json())
}

export const favoritos = async()=>{
   return await fetch(apiBase+'produto/favoritos').then(r=>r.json())
}

export const maisVendidos = async()=>{
   return await fetch(apiBase+'produto/maisvendidos').then(r=>r.json())
}

export const criarProduto = async(name, code, sales, price, stock, image, dispatch, atualizar)=>{

   return await fetch(apiBase+'produto',{
      method:'post',
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify({
         name,
         code,
         sales:parseInt(sales),
         price:parseFloat(price),
         stock:parseInt(stock),
         image
      })
   })
   .then(r=>r.json())
   .then(r=>{
      dispatch({
         type:"atualizar",
         payload:{estado:!atualizar}
      })
   })
   .catch(r=>alert(r))
}

export const favoritarProduto = async (id, dispatch, atualizar)=>{
   return await fetch(apiBase+'produto/favoritar',{
      method:'post',
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify({
       id
      })
   })
   .then(r=>r.json())
   .then(r=>{
      dispatch({
         type:"atualizar",
         payload:{estado:!atualizar}
      })
   })
   .catch(r=>console.log(r))  
}

export const buscarProdutoPeloNome = async (nomeDoProduto)=>{
   return await fetch(apiBase+'produto/buscarPeloNome',{
      method:'post',
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify({
         nomeDoProduto
      })
   })
   .then(r=>r.json())
   .then(r=>{
      return r

   })
   .catch(r=>console.log(r))  
}

export const buscarProdutosFavoritosPeloNome = async (nomeDoProduto)=>{
   return await fetch(apiBase+'produto/buscarFavoritosPeloNome',{
      method:'post',
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify({
         nomeDoProduto
      })
   })
   .then(r=>r.json())
   .then(r=>{
      return r
   })
   .catch(r=>console.log(r))  
}


