const initialState = {
    estado:false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'atualizar':
    return { ...state, ...payload }

  default:
    return state
  }
}
