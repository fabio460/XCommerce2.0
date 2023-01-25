import React, { useEffect, useState } from 'react'
import styles from '@/styles/AppBar.module.css'
import { Avatar, Divider } from '@mui/material';
import MenuSup from './menu';
import CampoDeBusca from '@/pages/Home/campoDeBusca';
import ModalAdicionarProdutos from './modalAdicionarProduto';
import { useDispatch, useSelector } from 'react-redux';
import { total } from 'Api';


export default function HomeHeader() {
  
  const dispatch = useDispatch()
  const atualizar = useSelector(state=>state.atualizarDadosApi.estado)
  const [QuantidadeProdutos, setQuantidadeDeProdutos] = useState()

  // Alterna a cor dos botões e o estado global(Redux) de favoritos/todos 
  const btnAction = (elem)=>{
    document.querySelectorAll('.btn').forEach(e=>{
      e.style.background = 'brown'
    })
    elem.style.background = 'red'
    if (elem.id === 'id_favoritos') {
      dispatch({
        type:"favoritosToTodos",
        payload:{favoritos:true}
      })
    } else {
      dispatch({
        type:"favoritosToTodos",
        payload:{favoritos:false}
      })
    }
  }

  async function Quantidade() {
    const lista = await total()
    setQuantidadeDeProdutos(lista.length)
  }

  useEffect(()=>{
    Quantidade()
  })

  return (
    <div className={styles.container}>
      <div className={styles.qtd_produtos}>{QuantidadeProdutos} . produtos</div>
      <div className={styles.appbar}>
        <div className={styles.appbar_sup}>
          <div>xco+</div>
          <div style={{display:"flex"}}>
            <Avatar/>
            <MenuSup/>
          </div>
        </div>
        <Divider sx={{bgcolor:"#546e7a"}}/>
        <Divider sx={{bgcolor:"#546e7a"}}/>
        <div className={styles.appbbar_body}>
          <h3 style={{marginRight:"10px"}}>Produtos</h3>
          <CampoDeBusca/>
        </div>
        <Divider sx={{bgcolor:"#546e7a", marginX:"20px" }}/>
        <div className={styles.appbar_inf}>
          <div>
            <button 
              className='btn'
              id='id_todos'
              onClick={e =>btnAction(e.target)} 
              style={{
                cursor:"pointer",
                color:"white",
                marginRight:4,
                background:"red",
                borderRadius:"7px",
                padding:"4px 8px"
              }}
            >
              Todos
            </button>
            <button 
              className='btn'
              id='id_favoritos'
              onClick={e =>btnAction(e.target)} 
              style={{
                cursor:"pointer",
                color:"white",
                background:"brown",
                borderRadius:"7px",
                padding:"4px 8px"
              }}
            >
              Favoritos
            </button>
          </div>
          <div>
           <ModalAdicionarProdutos/>
          </div>
        </div>
      </div>
    </div>
  )
}
