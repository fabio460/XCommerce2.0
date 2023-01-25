import React,{useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { buscarProdutoPeloNome, buscarProdutosFavoritosPeloNome } from 'Api';
import { useDispatch, useSelector } from 'react-redux';


export default function CampoDeBusca() {

  const dispatch = useDispatch()
  const favoritos = useSelector(state=>state.handleFavoritosTodos.favoritos)
  const [Produto, setProduto] = useState("")
  var p = []

  const buscar = async()=> {
    if (favoritos) {
      p = await buscarProdutosFavoritosPeloNome(Produto)   
    }else{
      p = await buscarProdutoPeloNome(Produto)
    }
    dispatch({
      type:"arraySearch",
      payload:{
        lista:{
          listaDeProdutos:p,
          CampoInput:Produto
        }
      }
    })
  }

  buscar()
  
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, height:30 }}
    >
      <IconButton 
        type="button" sx={{ p: '10px' }} aria-label="search"
        onClick={buscar} 
        >
        <SearchIcon />
      </IconButton>
      <InputBase
        value={Produto}
        onChange={e=>setProduto(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Buscar por produtos"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    </Paper>
  );
}
