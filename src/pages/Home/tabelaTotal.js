import React,{useState,useEffect} from 'react'
import styles from '@/styles/BodyHome.module.css'
import { Alert, Card, CircularProgress, Divider, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Favorite } from '@mui/icons-material';
import { favoritarProduto, favoritos, total } from 'Api';
import { useDispatch, useSelector } from 'react-redux';
export default function TabelaTotal() {

  const [Lista, setLista] = useState([])  
  const itensPorPaginas = 4
  var primeiroItemDaPagina = 0
  var ultimaItemDaPagina = 0
  var [paginaAtual,setpaginaAtual] = useState(1)
  const [TotalDePaginas, setTotalDePaginas] = useState()
  const favoritosTo = useSelector(state=>state.handleFavoritosTodos.favoritos) 
  const atualizar = useSelector(state=>state.atualizarDadosApi.estado)
  const campoDeBusca = useSelector(state=>state.arraySearch.lista)
  const dispatch = useDispatch()
  const [carregando, setCarregando] = useState(false)

  const Paginacao = (pagina)=>{
    primeiroItemDaPagina = pagina*itensPorPaginas - itensPorPaginas
    ultimaItemDaPagina = pagina*itensPorPaginas - 1
  }

  const AvancarPagina = async()=>{
     if (paginaAtual < TotalDePaginas) {
      setpaginaAtual(paginaAtual + 1)
     }
  }

  const RetrocederPagina = ()=>{
      if (paginaAtual > 1) {
        setpaginaAtual(paginaAtual - 1)
     }
  }
 
  const carregarListaTotal = async()=> {
    setCarregando(true)
    var p = await total()
    if (campoDeBusca.listaDeProdutos.length > 0) {
      p = campoDeBusca.listaDeProdutos
      setpaginaAtual(1)
    }
    if (campoDeBusca.listaDeProdutos.length === 0 && campoDeBusca.CampoInput !== "") {
      p = []
      setpaginaAtual(1)
    }
    setLista(
      p.filter((e,key)=>{
        if (key >= primeiroItemDaPagina && key <= ultimaItemDaPagina) {
          return e  
        }
      })
    )
    
    setCarregando(false)
  }

  const carregarFavoritos = async()=> {
    setCarregando(true)
    var p = await favoritos()
    if (campoDeBusca.listaDeProdutos.length > 0) {
      p = campoDeBusca.listaDeProdutos
    }
    if (campoDeBusca.listaDeProdutos.length === 0 && campoDeBusca.CampoInput !== "") {
      p = []
    }
    setLista(
      p.filter((e,key)=>{
        if (key >= primeiroItemDaPagina && key <= ultimaItemDaPagina) {
          return e  
        }
      })
    )
    
    setCarregando(false)
  }

  const setFavorito = async(id)=>{
    await favoritarProduto(id, dispatch, atualizar)
  }

  // verificando o total de paginas pela quantidade de itens
  async function getTotalDePaginas() {
    var p = []
    if (favoritosTo) {
      p = await favoritos()
    } else {
      p = await total()
    }
    let indice = 0
    p.forEach((e, key) => {
      if (key%itensPorPaginas === 0) {
        indice++
      }
    });

    setTotalDePaginas(indice)
  }

  useEffect(() => {
    getTotalDePaginas()
    Paginacao(paginaAtual)
    if (favoritosTo) {
      carregarFavoritos()
    } else {
      carregarListaTotal()
    }
  }, [atualizar,favoritosTo,paginaAtual,campoDeBusca])

  // useEffect(()=>{
  //     setpaginaAtual(1)
  // },[favoritosTo,campoDeBusca])
  return (
    <div>
      {favoritosTo.toString()}
      <div className={styles.BodyHomeRight}>
        <div style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
          <div>Todos os produtos</div>
          <div style={{display:"flex"}}>
            <IconButton
               onClick={RetrocederPagina}
            >
              <ArrowBackIcon sx={{color:"#0288d1"}}/>
            </IconButton>
            <IconButton
               onClick={AvancarPagina}
            >
              <ArrowForwardIcon sx={{color:"#0288d1"}}/>
            </IconButton>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.listHeader}>
            <div className={styles.trPrimary}>IDENTIFICAÇÃO</div>
            <div className={styles.trSegundary}>PREÇOS</div>
            <div className={styles.trSegundary}>VENDAS</div>
            <div className={styles.trSegundary}>ESTOQUE</div>
          </div>
          <Divider sx={{margin:"0px 10px"}}/>
          <Divider sx={{margin:"0px 10px"}}/>
          {
            carregando ? 
            <div className={styles.carregando}><CircularProgress /></div>:
            Lista.length === 0 ? 
            <div className={styles.listavazia}>
              Item não encontrado
            </div>:
            Lista?.map((prod, key)=>{
              return(
                <div className={styles.listBody} key={key}>
                  <div className={styles.trPrimary}>
                    <div style={{display:"flex"}}>
                      <Card sx={{width:50,height:50, display:"flex",alignItems:"center", marginRight:2}}>
                        <img src={prod.image} style={{width:"100%"}}/>
                      </Card>
                      <div style={{display:"flex",flexDirection:"column", justifyContent:"space-between"}}>
                        <div style={{color:"blue"}}>{prod.name}</div>
                        <div style={{color:"gray", fontSize:"12px"}}>{prod.code}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.trSegundary}>
                    <div style={{color:"gray", fontSize:"12px"}}>R$ {(prod.price).toFixed(2)}</div>
                  </div>
                  <div className={styles.trSegundary}>
                    <div style={{color:"gray", fontSize:"12px"}}>
                      <div>Total de R$ {(prod.sales * prod.price).toFixed(2)}</div>
                      <div>{prod.sales} vendas</div>
                    </div>
                  </div>
                  <div className={styles.trSegundary}>
                    <div style={{color:"gray", fontSize:"12px"}}>
                      {prod.stock} und
                    </div>
                  </div>
                  <div className={styles.trSegundary}>
                    <IconButton onClick={e=>setFavorito(prod.id)}>
                      <Favorite color={prod.favorite ? 'error' : 'inherit'}/>
                    </IconButton>
                  </div>
                  <Divider sx={{margin:"0px 10px"}}/>
                </div>
              ) 
            })
          }
        </div>
        <div className={styles.footerBox}>Página {paginaAtual} de {TotalDePaginas}</div>
      </div>
    </div>
  )
}
