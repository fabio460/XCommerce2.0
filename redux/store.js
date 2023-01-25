import { configureStore } from '@reduxjs/toolkit'
import arraySearch from './arraySearch'
import atualizarDadosApi from './atualizarDadosApi'
import handleFavoritosTodos from './handleFavoritosTodos'
export default configureStore({
    reducer:{
        arraySearch,
        handleFavoritosTodos,
        atualizarDadosApi
    }
})