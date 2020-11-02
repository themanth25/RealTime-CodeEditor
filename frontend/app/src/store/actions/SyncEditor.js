import * as actionTypes from './actionTypes';


export const setRoomName = (name) => {
    return{
        type: actionTypes.SET_ROOM,
        roomName: name
    }
}

export const fetchingRoomFailed = () => {
    return{
        type: actionTypes.FETCHING_ROOM_FAILED
    }
}

export const getRoomName = (name) => {
    return dispatch =>{
        dispatch(setRoomName(name));
    }
}