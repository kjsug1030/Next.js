import {all,call,fork,put,take, takeEvery, takeLatest,delay} from 'redux-saga/effects'

import postSaga from './post'
import userSaga from './user'
import mapSaga from './map'

// import axios from 'axios'

// axios.defaults.baseURL="http://localhost:3065"
// axios.defaults.withCredentials=true
 
export default function* rootSaga(){
     yield all([
        fork(postSaga),
        fork(userSaga),
        fork(mapSaga)
     ])
}





