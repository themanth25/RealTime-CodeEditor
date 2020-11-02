import * as actionTypes from '../actions/actionTypes';

const initialState = {
    roomName: null,
    error: false
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.SET_ROOM:
            return{
                ...state,
                roomName: action.roomName
            };
        case actionTypes.FETCHING_ROOM_FAILED:
            return{
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;