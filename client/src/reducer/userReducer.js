export const initialState = null

export const reducer = (state,action) => {
    if(action.type==="USER"){
        return action.payload
    }
    if(action.type==="CLEAR"){
        return null
    }
    if(action.type==="UPDATE"){
        return {
            ...state,
            watchList:action.payload.watchList,
        }
    }
    return state
}