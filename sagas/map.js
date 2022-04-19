import { all,call,fork,put,takeLatest, take} from 'redux-saga/effects'
import axios from 'axios'
import { SEARCH_MAP_REQUEST ,
SEARCH_MAP_SUCCESS,
SEARCH_MAP_FAILURE,
LOAD_MAP_REQUEST,
LOAD_MAP_SUCCESS,
LOAD_MAP_FAILURE,
MOVING_MAP_SUCCESS,
MOVING_MAP_REQUEST,
MOVING_MAP_FAILURE,
RUNNING_MAP_FAILURE,
RUNNING_MAP_SUCCESS,
RUNNING_MAP_REQUEST,
BIKE_MAP_REQUEST,
BIKE_MAP_SUCCESS,
BIKE_MAP_FAILURE,
LOAD_CREATEMAP_REQUEST,
LOAD_CREATEMAP_SUCCESS,
LOAD_CREATEMAP_FAILURE,
ADD_TRACK_REQUEST,
ADD_TRACK_SUCCESS,
ADD_TRACK_FAILURE,
LOAD_MY_LOCATION_REQUEST,
LOAD_MY_LOCATION_SUCCESS,
LOAD_MY_LOCATION_FAILURE,
LOAD_TRACK_RANK_REQUEST,
LOAD_TRACK_RANK_SUCCESS,
LOAD_TRACK_RANK_FAILURE,
LOAD_TRACK_MYRANK_REQUEST,
LOAD_TRACK_MYRANK_FAILURE,
LOAD_TRACK_MYRANK_SUCCESS
} from '../reducers/map'
import { USER_RATE_FAILURE, USER_RATE_REQUEST, USER_RATE_SUCCESS } from '../reducers/user';



const searchMapAPI =async(datas)=>{


    try{
        const res= await fetch(`https://2yubi.shop/api/tracks/search?bound1=${datas.north.lng}&bound2=${datas.north.lat}&bound3=${datas.south.lng}&bound4=${datas.south.lat}&event=${datas.event}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            
          });
          const data= await res.json()
    
          return data

    }catch(err){
        console.log(err)
    }

    }
    
function* searchMap(action){
    try{
        const result = yield call(searchMapAPI,action.data)
        // console.log('search',result)
        yield put({
            type:SEARCH_MAP_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:SEARCH_MAP_FAILURE,
            error:err.response.data,
             
        })

    }
}





const loadMapAPI=async(datas)=>{
   const {data}=await axios.get(`https://2yubi.shop/api/tracks?track_id=${datas}`)

    return data
    }
    

function* loadMap(action){
    try{
        const result = yield call(loadMapAPI,action.data)
        yield put({
            type:LOAD_MAP_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:LOAD_MAP_FAILURE,
            error:'ss',
             
        })

    }
}

const movingMapAPI=async(datas)=>{
    try{
        const res= await fetch(`https://2yubi.shop/api/tracks/search?bound1=${datas.north.lng}&bound2=${datas.north.lat}&bound3=${datas.south.lng}&bound4=${datas.south.lat}&event=${datas.event}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            
          });
          const data= await res.json()
          return data
    }catch(err){
        console.log(err)
    }
    }
    

function* movingMap(action){
    try{
        const result = yield call(movingMapAPI,action.data)
        yield put({
            type:MOVING_MAP_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:MOVING_MAP_FAILURE,
            error:err.response.data,
        })

    }
}




const runningMapAPI=async(datas)=>{
    try{
        const res= await fetch(`https://2yubi.shop/api/tracks/search?bound1=${datas.north.lng}&bound2=${datas.north.lat}&bound3=${datas.south.lng}&bound4=${datas.south.lat}&event=${datas.event}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            
          });
          const data= await res.json()
          return data

    }catch(err){
        console.log(err)
    }
}
    
function* runningMap(action){
    try{
        const result = yield call(runningMapAPI,action.data)
        yield put({
            type:RUNNING_MAP_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:RUNNING_MAP_FAILURE,
            error:err.response.data,
        })

    }
}





const bikeMapAPI=async(datas)=>{
    try{
        const res= await fetch(`https://2yubi.shop/api/tracks/search?bound1=${datas.north.lng}&bound2=${datas.north.lat}&bound3=${datas.south.lng}&bound4=${datas.south.lat}&event=${datas.event}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            
          });
          const data= await res.json()
      
          return data

    }catch(err){
        console.log(err)
    }
    }
    

function* bikeMap(action){
    try{
        const result = yield call(bikeMapAPI,action.data)
        yield put({
            type:BIKE_MAP_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:BIKE_MAP_FAILURE,
            error:err.response.data,
        })

    }
}




const createmapLoadAPI=async(datas)=>{
    try{
        // https://2yubi.shop/api/gpsData/check?gpsId=62556bf05f21e60fb3e47d09
        const res= await fetch(`https://2yubi.shop/api/gpsData/check?gpsId=${datas}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            
          });
          const data= await res.json()

          console.log('sdkmflkvmdfkoj',data)
         
   
          return data

    }catch(err){
        console.log('dongerr',err)
    }
    }


function* createmapLoad(action){
    try{
        const result = yield call(createmapLoadAPI,action.data)
        yield put({
            type:LOAD_CREATEMAP_SUCCESS,
            data:result
            //result안에 gpsData(배열),track(배열)이 있다
        })

    }catch(err){
        yield put({
            type:LOAD_CREATEMAP_FAILURE,
            error:'as',
        })

    }
}





const addTrackAPI=async(datas)=>{
    try{
        const res= await fetch(`https://2yubi.shop/api/tracks`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body:JSON.stringify({
                gpsData:datas
            })
           
          });
          const data= await res.json()
          console.log('qwwerwertyert',data)
          return data

    }catch(err){
        console.log(err)
    }
    }

function* addTrack(action){
    try{
        const result = yield call(addTrackAPI,action.data)
        console.log('sadsadcxgdfgtgre',result)
        yield put({
            type:ADD_TRACK_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:ADD_TRACK_FAILURE,
            error:err.response.data,
        })

    }
}





const myLocationAPI=async(datas)=>{
    try{
        const res= await fetch(`https://2yubi.shop/api/tracks/search?bound1=${datas.north.lng}&bound2=${datas.north.lat}&bound3=${datas.south.lng}&bound4=${datas.south.lat}&event=${datas.event}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            
          });
          const data= await res.json()
          return data

    }catch(err){
        console.log(err)
    }
}
   
function* myLocation(action){
    try{
        const result = yield call(myLocationAPI,action.data)
        yield put({
            type:LOAD_MY_LOCATION_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:LOAD_MY_LOCATION_FAILURE,
            error:err.response.data,
        })

    }
}






const trackRankAPI=async(datas)=>{



    const res=await axios.get(`https://2yubi.shop/api/ranking/track?track_id=${datas}`)
    const data=await res
  
    return data

    
   
}

function* trackRank(action){
    try{
        const result = yield call(trackRankAPI,action.data)
    if(result.status==200){
        yield put({
            type:LOAD_TRACK_RANK_SUCCESS,
            data:result.data.data
        })
    }else if(result.status==204){
        yield put({
            type:LOAD_TRACK_RANK_SUCCESS,
            data:0
        })
    }

       

    }catch(err){
        yield put({
            type:LOAD_TRACK_RANK_FAILURE,
            error:'aa',
        })

    }
}




const trackMyRankAPI=async(datas)=>{



    // try{
    //     const res= await fetch(`https://2yubi.shop/api/ranking/myRank?track_id=${datas}`, {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Accept: "application/json",
    //         },
    //         credentials: "include",
            
    //       });
    //       const data= await res.json()
    //       console.log('myrankkkdnate',data)
       
       
    //       return data

    // }catch(err){
    //     console.log(err)
    // }


    const res=await axios.get(`https://2yubi.shop/api/ranking/myRank?track_id=${datas}`)

    const data=await res
    console.log('zxcvbnm',data)
    
    return data

   
   
}




function* trackMyRank(action){
    try{
        console.log('action',action.data)
        const result = yield call(trackMyRankAPI,action.data)
        console.log('myTrack',result)


        if(result.status==200){
          
        yield put({
            type:LOAD_TRACK_MYRANK_SUCCESS,
            data:result.data
        })
        }else if(result.status==204){
            yield put({
                type:LOAD_TRACK_MYRANK_SUCCESS,
                data:0
            })
        }




   

    }catch(err){
        yield put({
            type:LOAD_TRACK_MYRANK_FAILURE,
            error:'aa',
        })

    }
}









function* watchSearchMap(){
    yield takeLatest(SEARCH_MAP_REQUEST,searchMap)
}

function* wahchLoadMap(){
    yield takeLatest(LOAD_MAP_REQUEST,loadMap)
}

function* watchMovingMap(){
    yield takeLatest(MOVING_MAP_REQUEST,movingMap)
}

function* watchBikeMap(){
    yield takeLatest(BIKE_MAP_REQUEST,bikeMap)
}

function* watchRunningMap(){
    yield takeLatest(RUNNING_MAP_REQUEST,runningMap)
}

function* watchCreateMapLoad(){
    yield takeLatest(LOAD_CREATEMAP_REQUEST,createmapLoad)
}

function* watchAddTrack(){
    yield takeLatest(ADD_TRACK_REQUEST,addTrack)
}

function* watchMyLocation(){
    yield takeLatest(LOAD_MY_LOCATION_REQUEST,myLocation)
}

function* watchMapRank(){
    yield takeLatest(LOAD_TRACK_RANK_REQUEST,trackRank)
}

function* watchMapMyrank(){
    yield takeLatest(LOAD_TRACK_MYRANK_REQUEST,trackMyRank)
}








export default function* rootSaga(){

    yield all([
        fork(watchSearchMap),
        fork(wahchLoadMap),
        fork(watchMovingMap),
        fork(watchBikeMap),
        fork(watchRunningMap),
        fork(watchCreateMapLoad),
        fork(watchAddTrack),
        fork(watchMyLocation),
        fork(watchMapRank),
        fork(watchMapMyrank),
        

      
    ])

}
