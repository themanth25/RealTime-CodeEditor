import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuth: false,
    error: null,
    loading: false,
    userName: null,
    token: null
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.SET_AUTH:
            return{
                ...state,
                isAuth: action.isAuth,
                loading: action.loading,
                userName: action.userName
            }
        case actionTypes.ERROR_CLEANUP:
            return{
                ...state,
                error: null
            }
        case actionTypes.LOGOUT:
            return{
                ...state,
                isAuth: false,
                userName: null,
                token: null
            }
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading: action.loading
            }
        case actionTypes.FAILED_LOGIN:
            return{
                ...state,
                loading: action.loading,
                isAuth: action.isAuth,
                error: action.error
            }
        case actionTypes.SIGNUP_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.SIGNUP_FAILED:
            return{
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.SIGNUP_SUCCESS:
            return{
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default reducer;