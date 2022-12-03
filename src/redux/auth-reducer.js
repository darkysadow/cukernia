const CHECK_AUTH_ME = 'CHECK_AUTH_ME';

let initialState = {
    authStatus: false
}

export let authReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHECK_AUTH_ME:
            return {
                ...state, authStatus: action.authStatus
            }
        default:
            return state;
    }
}

const authMe = (authStatus) => ({type: CHECK_AUTH_ME, authStatus});