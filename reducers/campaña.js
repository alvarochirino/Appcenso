export default function campaña(state = {}, action) {
    switch (action.type) {
        case 'SET_CAMPANIAS_LIST': {
            debugger
           return {...state, ...action.payload}
        }
        default:
           return state
     }  
}