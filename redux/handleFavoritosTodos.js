const initialState = {
    favoritos:false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'favoritosToTodos':
    return { ...state, ...payload }

  default:
    return state
  }
}
