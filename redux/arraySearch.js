const initialState = {
    lista : {
      listaDeProdutos:[],
      CampoInput:""
    }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'arraySearch':
    return { ...state, ...payload }

  default:
    return state
  }
}
