import { combineReducers } from 'redux'
import user from './user'
import post from './post'
import map from './map'
import { HYDRATE } from 'next-redux-wrapper'

const rootReducer=(state,action)=>{
    switch(action.type){
        case HYDRATE:
            console.log('HYDRATE',action);
            return action.payload;
        default: {
            const combineReducer=combineReducers({
                user,
                post,
                map
            })
            return combineReducer(state,action)
        }
    }
}

export default rootReducer