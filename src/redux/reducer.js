import * as types from "./actionTypes";


const initialState={
    users:[],
    user:{},
    msg:""
};

const userReducer=(state=initialState,action) =>{
    switch(action.type){
        case types.GET_USERS:
            return{
                ...state,
                users: action.payload,
            }; 
            case types.UPDATE_USERS:
            case types.ADD_USERS:
                return{
                    ...state,
                    msg: action.payload,
                }; 
        case types.DELETE_USERS:
            return{
                ...state,
                msg: action.payload,
            }; 
            case types.GET_SINGLE_USERS:
                return{
                    ...state,
                    user: action.payload,
                };           
        default:
            return state;
    }
};

export default userReducer;