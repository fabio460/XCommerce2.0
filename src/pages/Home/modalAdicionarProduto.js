import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import { criarProduto } from 'Api';
import { useDispatch, useSelector } from "react-redux"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalAdicionarProdutos() {

  const [Produto, setProduto] = useState('')
  const [ProdutoInvalido, setProdutoInvalido] = useState()
  const [Preco, setPreco] = useState('')  
  const [PrecoInvalido, setPrecoInvalido] = useState()
  const [Estoque, setEstoque] = useState('')
  const [EstoqueInvalido, setEstoqueInvalido] = useState()
  const [Codigo, setCodigo] = useState('')
  const [CodigoInvalido, setCodigoInvalido] = useState()
  const [UrlImage, setUrlImage] = useState('')
  const [Vendas, setVendas] = useState('')
  const [VendaInvalida, setVendaInvalida] = useState()
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const atualizar = useSelector(state=>state.atualizarDadosApi.estado)
  const dispatch = useDispatch()

  
  const adicionarProduto = async()=>{
    validarCampos()
    console.log({
      ProdutoInvalido,
      VendaInvalida,
      CodigoInvalido,
      PrecoInvalido,
      EstoqueInvalido
    })
    if (
       !(Produto === '') &&
       !(Preco === '' || !isNumber(Preco)) &&
       !(Estoque === '' || !isNumberInteger(Estoque)) &&
       !(Vendas === '' || !isNumberInteger(Vendas)) &&
       !(Codigo === '')
    ) {
      
      const p =await criarProduto(Produto, Codigo, Vendas, tratarVirgulaNoNumero(Preco), Estoque, UrlImage, dispatch, atualizar) 
      handleClose()
    }
  }

  function isNumber(texto) {
    let valid =  (/^(?=.*[ a-zA-Z@#$%º¢£&!'"-+/\(\)\ \`\\\|\{\}\[\]\~\^\:\; ])/);
    return !valid.test(texto)
  }

  function isNumberInteger(texto) {
    let valid =  (/^(?=.*[ a-zA-Z@#$%º¢£&!'"-+/\(\)\ \`\\\|\{\}\[\]\~\^\:\;\,\. ])/);
    return !valid.test(texto)
  }

  function tratarVirgulaNoNumero(numero) {
   return numero.replace(',','.')

  }
  function validarCampos() {
    let invalido = false

    if (Produto === '') {
      setProdutoInvalido(true)
    }else{
      setProdutoInvalido(false)    
    }

    if (Preco === '' || !isNumber(Preco)) {
      setPrecoInvalido(true)
    }else{
      setPrecoInvalido(false)
    }

    if (Codigo === '') {
      setCodigoInvalido(true)
    }else{
      setCodigoInvalido(false)
    }

    if (Estoque === '' || !isNumberInteger(Estoque)) {
      setEstoqueInvalido(true)
    }else{
      setEstoqueInvalido(false)
    }

    if (Vendas === '' || !isNumberInteger(Vendas)) {
      setVendaInvalida(true)
    }else{
      setVendaInvalida(false)
    }    
  
    if (ProdutoInvalido === undefined && EstoqueInvalido === undefined ) {
      return false
    }
    
    if (ProdutoInvalido === false && EstoqueInvalido === false) {
      return true
    }

    if (ProdutoInvalido === true && EstoqueInvalido === true) {
      return false
    }
  }

  return (
    <div>
      <button
        onClick={handleClickOpen} 
        style={{
          cursor:"pointer",
          color:"white",
          background:"red",
          borderRadius:"7px",
          padding:"4px 8px"
        }}>
          Criar novo
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Adicione seu produto"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div style={{display:'grid', gridTemplateColumns:'3fr 1fr', gap:"10px", margin:"10px 0px"}}>
              <TextField size='small' label={ProdutoInvalido ? 'Produto inválido' : 'Produto'} onChange={e=>setProduto(e.target.value)} error={ProdutoInvalido}/>
              <TextField size='small' label={CodigoInvalido ? 'Código inválido':'Código'} onChange={e=>setCodigo(e.target.value)} error={CodigoInvalido}/>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'2fr 2fr 1fr', gap:"10px", margin:"10px 0px"}}>
              <TextField size='small' label={VendaInvalida ? 'Venda Inválida': 'Vendas'} onChange={e=>setPreco(e.target.value)} error={PrecoInvalido}/>
              <TextField size='small' label={EstoqueInvalido ?'Estoque inválido':'Estoque'} onChange={e=>setEstoque(e.target.value)} error={EstoqueInvalido}/>
              <TextField size='small' label={VendaInvalida ? 'Vendas Invalido' : 'Vendas'} onChange={e=>setVendas(e.target.value)} error={VendaInvalida}/>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:"10px", margin:"10px 0px"}}>
              <TextField size='small' label='Url da Imagem' onChange={e=>setUrlImage(e.target.value)}/>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={adicionarProduto} color='success'>Adicionar</Button>
          <Button onClick={handleClose} color='error'>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
