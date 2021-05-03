import { SIGN_IN, SIGN_OUT } from '../actions/types'

const INITIAL_STATE = {
    isSignedIn: null
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case SIGN_IN:
            return {...state, isSignedIn: true, userId: action.payload};
        case SIGN_OUT:
            return {...state, isSignedIn: false};
        default:
            return {...state, isSignedIn: state.isSignedIn};
    }
}

export default authReducer