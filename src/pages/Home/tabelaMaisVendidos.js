import React,{useState,useEffect} from 'react'
import styles from '@/styles/BodyHome.module.css'
import { Card, CircularProgress, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { maisVendidos } from 'Api';
import { useSelector } from 'react-redux';

export default function TabelaMaisVendidos() {

  const [Lista, setLista] = useState([])  
  const itensPorPaginas = 4
  var primeiroItemDaPagina = 0
  var ultimaItemDaPagina = 0
  var [paginaAtual,setPaginaAtual] = useState(1)
  const [TotalDePaginas, setTotalDePaginas] = useState(0)
  const [carregando, setCarregando] = useState(false)

  const Paginacao = (pagina)=>{
    primeiroItemDaPagina = pagina*itensPorPaginas - itensPorPaginas
    ultimaItemDaPagina = pagina*itensPorPaginas - 1
  }

  const AvancarPagina = async()=>{
     if (paginaAtual < TotalDePaginas) {
      setPaginaAtual(paginaAtual + 1)
     }
  }

  const RetrocederPagina = ()=>{
      if (paginaAtual > 1) {
        setPaginaAtual(paginaAtual - 1)
     }
  }

  async function carregarLista() {
    setCarregando(true)
    const p = await maisVendidos()
    setLista(
      p.filter((e,key)=>{
        if (key >= primeiroItemDaPagina && key <= ultimaItemDaPagina) {
          return e  
        }
      })
    )
    setCarregando(false)
  }  

  async function getTotalDePaginas() {
    const p = await maisVendidos()
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
    carregarLista()
  }, [paginaAtual])
  
  return (
    <div>
      <div className={styles.BodyHomeLeft}>
        <div style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
          <div>Mais vendidos</div>
          <div style={{display:"flex"}}>
            <IconButton onClick={RetrocederPagina}>
              <ArrowBackIcon sx={{color:"#0288d1"}}/>
            </IconButton>
            <IconButton onClick={AvancarPagina}>
              <ArrowForwardIcon sx={{color:"#0288d1"}}/>
            </IconButton>
          </div>
        </div>
        <div className={styles.box}>
          {
            carregando ? 
            <div className={styles.carregando}><CircularProgress /></div>:
            <div className={styles.listFavotite}>
            {
              Lista?.map((prod, key)=>{
                return(
                  <div style={{paddingTop:10}} key={key}>
                    <Card sx={{width:100,height:100, display:"flex",alignItems:"center"}}>
                      <img src={prod.image} style={{width:"100%"}}/>
                    </Card>
                    <div style={{margin:"10px 0px"}}>
                      <div style={{display:"flex", justifyContent:"space-between"}}>
                        <div style={{fontSize:10, color:"gray"}}>R$ {(prod.price).toFixed(2)}</div>
                        <div style={{fontSize:10, color:"gray"}}>{prod.sales} vendidos</div>
                      </div>
                      <div style={{color:'blue'}}>{prod.name}</div>
                    </div>
                  </div>
                )
              })
            }
            </div>
          }
        </div>
        <div className={styles.footerBox}>Página {paginaAtual} de {TotalDePaginas}</div>
      </div>
    </div>
  )
}
