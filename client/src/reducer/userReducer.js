export const initialState = null

export const reducer = (state,action) => {
    if(action.type==="USER"){
        return action.payload
    }
    if(action.type==="CLEAR"){
        return null
    }
    if(action.type==="UPDATE"){
        localStorage.setItem("watchList",JSON.stringify(action.payload))
        return {
            ...state,
            watchList:action.payload,
        }
    }
    // if(action.type==="UPDATENEW"){
    //     return {
    //         ...state,
    //         watchList:JSON.parse(action.payload)
    //     }
    // }
    // console.log(state)
    return state
}