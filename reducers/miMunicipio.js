export default function miMunicipio(state = {}, action) {
   switch (action.type) {
      case 'SET_INSTITUCIONES_LIST'+action.id: {
         debugger
         return { ...state, ...action.payload }
      }
      case 'SET_TIPOS_INSTITUCIONES_LIST': {
         return { ...state, ...action.payload }
      }
      case 'SET_CAMPANIAS_LIST': {
         return { ...state, ...action.payload }
      }
      default:
         return state
   }
}