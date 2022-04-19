
import { all,call,fork,put,takeLatest, take} from 'redux-saga/effects'
import {LOGIN_FAIL, LOGIN_REQUEST,LOGIN_SUCCESS,LOGOUT_REQUEST, 
    LOGOUT_SUCCESS,LOGOUT_FAIL, SIGNUP_REQUEST,SIGNUP_SUCCESS,SIGNUP_FAIL,
    FOLLOWING_SUCCESS,FOLLOWING_REQUEST,FOLLOWING_FAIL,UNFOLLOWING_REQUEST,
    UNFOLLOWING_SUCCESS,PROGRESS_FAILURE,UNFOLLOWING_FAIL, LOAD_LOGIN_REQUEST, LOAD_LOGIN_SUCCESS, LOAD_LOGIN_FAILURE, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE, USER_SEARCH_REQUEST, USER_SEARCH_SUCCESS, USER_SEARCH_FAILURE, WEEKRECORD_REQUEST, WEEKRECORD_SUCCESS, WEEKRECORD_FAILURE, DELETE_MYPOST_REQUEST,DELETE_MYPOST_SUCCESS,DELETE_MYPOST_FAILURE, USER_RATE_REQUEST,USER_RATE_FAILURE,USER_RATE_SUCCESS,WEEKRECORD_BIKE_SUCCESS,WEEKRECORD_BIKE_REQUEST,WEEKRECORD_BIKE_FAILURE, WEATHER_REQUEST, WEATHER_SUCCESS, WEATHER_FAILURE, GOAL_REQUEST, GOAL_SUCCESS, GOAL_FAILURE, ALL_GOAL_REQUEST, ALL_GOAL_SUCCESS, ALL_GOAL_FAILURE, PROGRESS_SUCCESS, PROGRESS_REQUEST, DELETE_GOAL_REQUEST, DELETE_GOAL_SUCCESS, DELETE_GOAL_FAILURE, TOTAL_TIME_REQUEST, TOTAL_CALORIE_REQUEST, TOTAL_TIME_SUCCESS, TOTAL_TIME_FAILURE, TOTAL_CALORIE_SUCCESS, TOTAL_CALORIE_FAILURE, TOTAL_RUN_TIME_REQUEST, TOTAL_BIKE_TIME_REQUEST, TOTAL_RUN_TIME_SUCCESS, TOTAL_RUN_TIME_FAILURE, TOTAL_BIKE_TIME_SUCCESS, TOTAL_BIKE_TIME_FAILURE} from '../reducers/user'
import axios from 'axios'
import cookie from 'react-cookies'
import { withCookies, Cookies } from 'react-cookie';

var cookies=new Cookies()





const logInAPI=async(datas)=>{
    try{
        const res= await fetch("https://2yubi.shop/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email:datas.email,
              password:datas.password,
        }),
          });
          const data= await res.json()
       
        cookie.save('login_token',data.access_token, {
            path: "/",
          });
       
          return data

    }catch(err){
        console.log(err)
    }
}


function* login(action){

try{
    const result =yield call(logInAPI,action.data)
console.log('userResult',result)
yield put({
    type:LOGIN_SUCCESS,
    data:result
})
}catch(err){
    yield put({
        type:LOGIN_FAIL,
        data:err.response.data
    })
}
} 


const logOutAPI=async(data)=>{
    // return axios.post('https://2yubi.shop/api/logout')

    try{
        const res= await fetch("https://2yubi.shop/api/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
           
       
          });
          const data= await res.json()
       
        cookie.remove('login_token', {
            path: "/",
          });
          
       
          return data

    }catch(err){
        console.log(err)
    }
}

function* logout(){
    try{
        yield call(logOutAPI)
        yield put({
            type:LOGOUT_SUCCESS,
        })
    }catch(err){
        yield put({
            type:LOGOUT_FAIL,
            error:'error'
             
        })
    }
} 

function signupAPI(data){
return axios.post('http://3.35.239.14/api/register',data)
}

function* signup(action){

    try{
       yield call(signupAPI,action.data)
        
          yield put({
              type:SIGNUP_SUCCESS,
          })
      }catch(err){
          yield put({
              type:SIGNUP_FAIL,
              error:err.response.data,
               
          })
      }
}


const followAPI=async(datas)=>{
    try{
        const res= await fetch(`https://2yubi.shop/api/follow/${datas.id}`, {
            method: "POST",
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
    
    function* following(action){
    
        try{
            const result=yield call(followAPI,action.data)
            
              yield put({
                  type:FOLLOWING_SUCCESS,
                  data:action.data
              })
          }catch(err){
              yield put({
                  type:FOLLOWING_FAIL,
                  error:err.response.data,
                   
              })
          }
    }





    const unfollowAPI=async(datas)=>{
        try{
            const res= await fetch(`https://2yubi.shop/api/follow/${datas}`, {
                method: "POST",
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
        
        function* unfollowing(action){
        
            try{
                const result=yield call(unfollowAPI,action.data)
                
                  yield put({
                      type:UNFOLLOWING_SUCCESS,
                      data:action.data
                  })
              }catch(err){
                  yield put({
                      type:UNFOLLOWING_FAIL,
                      error:err.response.data,
                       
                  })
              }
        }



        
  

const loadLoginAPI=async()=>{

    try{
        const res= await fetch("https://2yubi.shop/api/user", {
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

    function* loadLogin(action){
    
        try{
            
            const result=yield call(loadLoginAPI)
            console.log('asdacsadasasf',result)
            
            
              yield put({
                  type:LOAD_LOGIN_SUCCESS,
                  data:result
              })
          }catch(err){
              yield put({
                  type:LOAD_LOGIN_FAILURE,
                  error:err.response.data,
                   
              })
          }
    }
    
      
        




       


const loadUserInfoAPI=async()=>{

    const res=await axios.get('https://2yubi.shop/api/user')
         
       const data= await res.data          
        return data

   
}

        function* loadUserInfo(action){
        
            try{
                const result=yield call(loadUserInfoAPI)
                
                  yield put({
                      type:LOAD_MY_INFO_SUCCESS,
                      data:result
                  })
              }catch(err){
                  yield put({
                      type:LOAD_MY_INFO_FAILURE,
                      error:err.response.data,
                       
                  })
              }
        }
        ////////

        const userSearchAPI=async(datas)=>{



            try{
                const res= await fetch('https://2yubi.shop/api/userSearch', {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        keyword:datas,
                       
                  }),
                  });
                  const data= await res.json()
              
               
                  return data
        
            }catch(err){
                console.log(err)
            }

       
    }
    
            function* userSearch(action){
            
                try{
                    const result=yield call(userSearchAPI,action.data)
                    console.log('userSearchresult',result)
                    
                      yield put({
                          type:USER_SEARCH_SUCCESS,
                          data:result
                      })
                  }catch(err){
                      yield put({
                          type:USER_SEARCH_FAILURE,
                          error:err.response.data,
                           
                      })
                  }
            }
            
    




            const weekRecordAPI=async()=>{
            
                    const res=await axios.get('https://2yubi.shop/api/post/weekRecord?event=R')
                  
                      const data= await res.data        
                      console.log('akdajsfkdjas',data)
                      return data
            
               
            }
            
                    function* weekRecord(action){
                    
                        try{
                            const result=yield call(weekRecordAPI)
                           
                              yield put({
                                  type:WEEKRECORD_SUCCESS,
                                  data:result
                              })
                          }catch(err){
                              yield put({
                                  type:WEEKRECORD_FAILURE,
                                  error:err.response.data,
                                   
                              })
                          }
                    }








                    const weekBikeRecordAPI=async()=>{
            
                        const res=await axios.get('https://2yubi.shop/api/post/weekRecord?event=B')
                      
                          const data= await res.data   
                          console.log('weeeeeee',data)       
                          return data
                
                   
                }
                
                        function* weekBikeRecord(action){
                        
                            try{
                                const result=yield call(weekBikeRecordAPI)
                               
                                  yield put({
                                      type:WEEKRECORD_BIKE_SUCCESS,
                                      data:result
                                  })
                              }catch(err){
                                  yield put({
                                      type:WEEKRECORD_BIKE_FAILURE,
                                      error:err.response.data,
                                       
                                  })
                              }
                        }




                    const deleteMyPostAPI =async(datas)=>{

                        const res= await fetch(`https://2yubi.shop/api/post/${datas}`, {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                              Accept: "application/json",
                            },
                            credentials: "include",
                          });
                    
                        const data=await res
                        console.log('dongdongqwe',data)
                        
                        return data 
                        }
                        
                    
                    function* deleteMyPost(action){
                        try{
                            const result = yield call(deleteMyPostAPI,action.data)
                            console.log('qwedongss')
                            console.log('zxcvt',result)
                        
                            yield put({
                                type:DELETE_MYPOST_SUCCESS,        
                                data:action.data   
                            })
                    
                        }catch(err){
                            yield put({
                                type:DELETE_MYPOST_FAILURE,
                                error:'xx',
                                 
                            })
                    
                        }
                    }




const userRateAPI=async()=>{

    const res=await axios.get('https://2yubi.shop/api/record/type')

    const data=await res.data
    
    return data

   
   
}




function* userRate(action){
    try{
        console.log('action',action.data)
        const result = yield call(userRateAPI,action.data)
        console.log('userRate',result)
        yield put({
            type:USER_RATE_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:USER_RATE_FAILURE,
            error:'aa',
        })

    }
}
                    
                    

const watchWeatherAPI=async()=>{
    var apikey = "407c340ad45b9019b9732c3bf8018bc9";

var cityName='daegu'
console.log('donsdmfsdfndsjh')

    const res=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`)

    const data=await res.data
    console.log('asdqsdsadasdasdsaasdwe',data)
    
    return data

   
   
}



function* Weather(action){
    try{
        console.log('action',action.data)
        const result = yield call(watchWeatherAPI)
        yield put({
            type:WEATHER_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:WEATHER_FAILURE,
            error:'aa',
        })

    }
}
                    
                    
const GoalAPI=async(datas)=>{


    try{
        const res= await fetch('https://2yubi.shop/api/goal', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                title:datas.title,
                goal:parseInt(datas.purpose),
                firstDate:datas.start,
                lastDate:datas.end,
                event:datas.event
        }),
          });
          const data= await res.json()
       
     
       console.log('asfssdfwr',data)
          return data

    }catch(err){
        console.log(err)
    }
   

}



function* Goal(action){
    try{
        console.log('action',action.data)
        const result = yield call(GoalAPI,action.data)
        yield put({
            type:GOAL_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:GOAL_FAILURE,
            error:'aa',
        })

    }
}
               

const AllGoalAPI=async()=>{


    const res=await axios.get('https://2yubi.shop/api/goal/all')
         
    const data= await res.data          
     return data


    
    
}



function* AllGoal(action){
    try{
        console.log('action',action.data)
        const result = yield call(AllGoalAPI)
        yield put({
            type:ALL_GOAL_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:ALL_GOAL_FAILURE,
            error:'aa',
        })

    }
}

const progressAPI=async()=>{


    const res=await axios.get('https://2yubi.shop/api/goal/check')
         
    const data= await res.data          
     return data



    
}



function* progress(action){
    try{
        console.log('action',action.data)
        const result = yield call(progressAPI)
        yield put({
            type:PROGRESS_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:PROGRESS_FAILURE,
            error:'aa',
        })

    }
}
                    
                    



const deleteGoalAPI=async(datas)=>{


    try{
        const res= await fetch(`https://2yubi.shop/api/goal/delete/${datas}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            
          });
          const data= await res.json()
       
     
       console.log('asdsdgsdcvxcv',data)
          return data

    }catch(err){
        console.log(err)
    }



}



function* deleteGoal(action){
    try{
        console.log('action',action.data)
        const result = yield call(deleteGoalAPI,action.data)
        yield put({
            type:DELETE_GOAL_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:DELETE_GOAL_FAILURE,
            error:'aa',
        })

    }
}


                          

const totalTimeAPI=async()=>{


    const res=await axios.get('https://2yubi.shop/api/record/totalTime')
         
    const data= await res.data          
     return data



    
}



function* totalTime(action){
    try{
        console.log('action',action.data)
        const result = yield call(totalTimeAPI)
        yield put({
            type:TOTAL_TIME_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:TOTAL_TIME_FAILURE,
            error:'aa',
        })

    }
}
           

                        

const totalCalorieAPI=async()=>{


    const res=await axios.get('https://2yubi.shop/api/record/totalCalorie')
         
    const data= await res.data          
     return data



    
}



function* totalCalorie(action){
    try{
        console.log('action',action.data)
        const result = yield call(totalCalorieAPI)
        yield put({
            type:TOTAL_CALORIE_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:TOTAL_CALORIE_FAILURE,
            error:'aa',
        })

    }
}
               

const totalRunTimeAPI=async()=>{


    const res=await axios.get('https://2yubi.shop/api/record/distance?event=R')
         
    const data= await res.data          
     return data



    
}



function* totalRunTime(action){
    try{
        console.log('action',action.data)
        const result = yield call(totalRunTimeAPI)
        yield put({
            type:TOTAL_RUN_TIME_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:TOTAL_RUN_TIME_FAILURE,
            error:'aa',
        })

    }
}
                    

const totalBikeTimeAPI=async()=>{


    const res=await axios.get('https://2yubi.shop/api/record/distance?event=B')
         
    const data= await res.data          
     return data



    
}



function* totalBikeTime(action){
    try{
        console.log('action',action.data)
        const result = yield call(totalBikeTimeAPI)
        yield put({
            type:TOTAL_BIKE_TIME_SUCCESS,
            data:result
        })

    }catch(err){
        yield put({
            type:TOTAL_BIKE_TIME_FAILURE,
            error:'aa',
        })

    }
}
                    









    



function* watchLogin(){
    yield takeLatest(LOGIN_REQUEST,login)
}

function* watchLogout(){
    yield takeLatest(LOGOUT_REQUEST,logout)
}
function* watchSignup(){
    yield takeLatest(SIGNUP_REQUEST,signup)
}
function* watchFollowing(){
    yield takeLatest(FOLLOWING_REQUEST,following)
}
function* watchUnFollowing(){
    yield takeLatest(UNFOLLOWING_REQUEST,unfollowing)
}
function* watchLoadLogin(){
    yield takeLatest(LOAD_LOGIN_REQUEST,loadLogin)
}

function* watchUserInfo(){
    yield takeLatest(LOAD_MY_INFO_REQUEST,loadUserInfo)
}
function* watchUserSearch(){
    yield takeLatest(USER_SEARCH_REQUEST,userSearch)
}
function* watchWeekRecord(){
    yield takeLatest(WEEKRECORD_REQUEST,weekRecord)
}
function* watchDeleteMyPost(){
    yield takeLatest(DELETE_MYPOST_REQUEST,deleteMyPost)
}
function* watchUserRate(){
    yield takeLatest(USER_RATE_REQUEST,userRate)
}
function* watchWeekBikeRecord(){
    yield takeLatest(WEEKRECORD_BIKE_REQUEST,weekBikeRecord)
}

function* watchWeather(){
    yield takeLatest(WEATHER_REQUEST,Weather)
}
function* watchGoal(){
    yield takeLatest(GOAL_REQUEST,Goal)
}

function* watchAllGoal(){
    yield takeLatest(ALL_GOAL_REQUEST,AllGoal)
}

function* watchProgress(){
    yield takeLatest(PROGRESS_REQUEST,progress)
}
function* watchDeleteGoal(){
    yield takeLatest(DELETE_GOAL_REQUEST,deleteGoal)
}

function* watchTotalTime(){
    yield takeLatest(TOTAL_TIME_REQUEST,totalTime)
}

function* watchTotalCarlorie(){
    yield takeLatest(TOTAL_CALORIE_REQUEST,totalCalorie)
}

function* watchTotalRunTime(){
    yield takeLatest(TOTAL_RUN_TIME_REQUEST,totalRunTime)
}

function* watchTotalBikeTime(){
    yield takeLatest(TOTAL_BIKE_TIME_REQUEST,totalBikeTime)
}












export default function* rootSaga(){

    yield all([
        fork(watchLoadLogin),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchFollowing),
        fork(watchUnFollowing),
        fork(watchUserInfo),
        fork(watchUserSearch),
        fork(watchWeekRecord),
        fork(watchDeleteMyPost),
        fork(watchUserRate),
        fork(watchWeekBikeRecord),
        fork(watchWeather),
        fork(watchGoal),
        fork(watchAllGoal),
        fork(watchProgress),
        fork(watchDeleteGoal),
        fork(watchTotalTime),
        fork(watchTotalCarlorie),
        fork(watchTotalRunTime),
        fork(watchTotalBikeTime),

    ])

}