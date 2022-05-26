import produce from "immer";
import { LOAD_MY_LOCATION_REQUEST } from "./map";
import Router from "next/router";
import { LIKE_REQUEST, LIKE_SUCCESS } from "./post";

export const initialState = {
  profileBadge: null,
  profile: null,
  otherProfile: {
    id: 0,
    posts: [
      {
        id: 0,
        likeCheck: false,
        likes: [],
      },
    ],
  },
  weathers: null,
  goalpurpose: null,
  notification: null,
  notificationCheckCount: 0,
  allPurpose: null,
  purposeProgress: null,
  totalTime: null,
  totalCalorie: null,
  totalRunTime: null,
  totalBikeTime: null,

  /////////////////
  otherUserTotalTime: null,
  otherUserTotalCalorie: null,
  otherUserTotalRunTime: null,
  otherUserTotalBikeTime: null,
  ///////////////

  me: null,
  searchUsers: [],
  weekRecord: null,
  userRate: null,
  weekBikeRecord: null,

  loadLogInLoading: false,
  loadLogInDone: false,
  loadLogInError: null,

  logInLoading: false,
  LogInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false, // 언팔로우 시도중
  unfollowDone: false,
  unfollowError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  myInfoLoading: false,
  myInfoDone: false,
  myInfoError: null,
  userSearchDone: false,
  userSearchError: null,
  userSearchLoading: false,
  weekRecordLoading: false,
  weekRecordDone: false,
  weekRecordError: null,
  deleteMyPostLoading: false,
  deleteMyPostDone: false,
  deleteMyPostError: null,
  userRateLoading: false,
  userRateDone: false,
  userRateError: null,
  profileEditLoading: false,
  profileEditDone: false,
  profileEditError: null,
  profileBadgeLoading: false,
  profileBadgeDone: false,
  profileBadgeError: null,
};

export const READ_NOTIFICATION_REQUEST = "READ_NOTIFICATION_REQUEST";
export const READ_NOTIFICATION_SUCCESS = "READ_NOTIFICATION_SUCCESS";
export const READ_NOTIFICATION_FAILURE = "READ_NOTIFICATION_FAILURE";

export const PROFILE_BADGE_REQUEST = "PROFILE_BADGE_REQUEST";
export const PROFILE_BADGE_SUCCESS = "PROFILE_BADGE_SUCCESS";
export const PROFILE_BADGE_FAILURE = "PROFILE_BADGE_FAILURE";

export const PROFILE_EDIT_REQUEST = "PROFILE_EDIT_REQUEST";
export const PROFILE_EDIT_SUCCESS = "PROFILE_EDIT_SUCCESS";
export const PROFILE_EDIT_FAILURE = "PROFILE_EDIT_FAILURE";

// export const CHECK_NOTIFICATION_REQUEST = "CHECK_NOTIFICATION_REQUEST";
// export const CHECK_NOFICATION_SUCCESS='CHECK_NOFICATION_SUCCESS'

export const NOTIFICATION_DELETE_REQUEST = "NOTIFICATION_DELETE_REQUEST";
export const NOTIFICATION_DELETE_SUCCESS = "NOTIFICATION_DELETE_SUCCESS";
export const NOTIFICATION_DELETE_FAILURE = "NOTIFICATION_DELETE_FAILURE";

export const NOTIFICATION_REQUEST = "NOTIFICATION_REQUEST";
export const NOTIFICATION_SUCCESS = "NOTIFICATION_SUCCESS";
export const NOTIFICATION_FAILURE = "NOTIFICATION_FAILURE";

export const FOLLOW_NOTIFICATION_REQUEST = "FOLLOW_NOTIFICATION_REQUEST";
export const FOLLOW_NOTIFICATION_SUCCESS = "FOLLOW_NOTIFICATION_SUCCESS";
export const FOLLOW_NOTIFICATION_FAILURE = "FOLLOW_NOTIFICATION_FAILURE";

export const FOLLOW_CANCEL_REQUEST = "FOLLOW_CANCEL_REQUEST";
export const FOLLOW_CANCEL_SUCCESS = "FOLLOW_CANCEL_SUCCESS";
export const FOLLOW_CANCEL_FAILURE = "FOLLOW_CANCEL_FAILURE";

export const OTHER_PROFILE_REQUEST = "OTHER_PROFILE_REQUEST";
export const OTHER_PROFILE_SUCCESS = "OTHER_PROFILE_SUCCESS";
export const OTHER_PROFILE_FAILURE = "OTHER_PROFILE_FAILURE";

export const TOTAL_BIKE_TIME_REQUEST = "TOTAL_BIKE_TIME_REQUEST";
export const TOTAL_BIKE_TIME_SUCCESS = "TOTAL_BIKE_TIME_SUCCESS";
export const TOTAL_BIKE_TIME_FAILURE = "TOTAL_BIKE_TIME_FAILURE";

export const TOTAL_RUN_TIME_REQUEST = "TOTAL_RUN_TIME_REQUEST";
export const TOTAL_RUN_TIME_SUCCESS = "TOTAL_RUN_TIME_SUCCESS";
export const TOTAL_RUN_TIME_FAILURE = "TOTAL_RUN_TIME_FAILURE";

export const TOTAL_CALORIE_REQUEST = "TOTAL_CALORIE_REQUEST";
export const TOTAL_CALORIE_SUCCESS = "TOTAL_CALORIE_SUCCESS";
export const TOTAL_CALORIE_FAILURE = "TOTAL_CALORIE_FAILURE";

export const TOTAL_TIME_REQUEST = "TOTAL_TIME_REQUEST";
export const TOTAL_TIME_SUCCESS = "TOTAL_TIME_SUCCESS";
export const TOTAL_TIME_FAILURE = "TOTAL_TIME_FAILURE";

export const PROGRESS_REQUEST = "PROGRESS_REQUEST";
export const PROGRESS_SUCCESS = "PROGRESS_SUCCESS";
export const PROGRESS_FAILURE = "PROGRESS_FAILURE";

export const ALL_GOAL_REQUEST = "ALL_GOAL_REQUEST";
export const ALL_GOAL_SUCCESS = "ALL_GOAL_SUCCESS";
export const ALL_GOAL_FAILURE = "ALL_GOAL_FAILURE";

export const GOAL_REQUEST = "GOAL_REQUEST";
export const GOAL_SUCCESS = "GOAL_SUCCESS";
export const GOAL_FAILURE = "GOAL_FAILURE";

export const DELETE_GOAL_REQUEST = "DELETE_GOAL_REQUEST";
export const DELETE_GOAL_SUCCESS = "DELETE_GOAL_SUCCESS";
export const DELETE_GOAL_FAILURE = "DELETE_GOAL_FAILURE";

export const WEATHER_REQUEST = "WEATHER_REQUEST";
export const WEATHER_SUCCESS = "WEATHER_SUCCESS";
export const WEATHER_FAILURE = "WEATHER_FAILURE";

export const USER_RATE_REQUEST = "USER_RATE_REQUEST";
export const USER_RATE_SUCCESS = "USER_RATE_SUCCESS";
export const USER_RATE_FAILURE = "USER_RATE_FAILURE";

export const USER_SEARCH_REQUEST = "USER_SEARCH_REQUEST";
export const USER_SEARCH_SUCCESS = "USER_SEARCH_SUCCESS";
export const USER_SEARCH_FAILURE = "USER_SEARCH_FAILURE";

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const LOAD_LOGIN_REQUEST = "LOAD_LOGIN_REQUEST";
export const LOAD_LOGIN_SUCCESS = "LOAD_LOGIN_SUCCESS";
export const LOAD_LOGIN_FAILURE = "LOAD_LOGIN_FAILURE";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const FOLLOWING_REQUEST = "FOLLOWING_REQUEST";
export const FOLLOWING_SUCCESS = "FOLLOWING_SUCCESS";
export const FOLLOWING_FAIL = "FOLLOWING_FAIL";

export const UNFOLLOWING_REQUEST = "UNFOLLOWING_REQUEST";
export const UNFOLLOWING_SUCCESS = "UNFOLLOWING_SUCCESS";
export const UNFOLLOWING_FAIL = "UNFOLLOWING_FAIL";

export const WEEKRECORD_REQUEST = "WEEKRECORD_REQUEST";
export const WEEKRECORD_SUCCESS = "WEEKRECORD_SUCCESS";
export const WEEKRECORD_FAILURE = "WEEKRECORD_FAILURE";

export const WEEKRECORD_BIKE_REQUEST = "WEEKRECORD_BIKE_REQUEST";
export const WEEKRECORD_BIKE_SUCCESS = "WEEKRECORD_BIKE_SUCCESS";
export const WEEKRECORD_BIKE_FAILURE = "WEEKRECORD_BIKE_FAILURE";

export const DELETE_MYPOST_REQUEST = "DELETE_MYPOST_REQUEST";
export const DELETE_MYPOST_SUCCESS = "DELETE_MYPOST_SUCCESS";
export const DELETE_MYPOST_FAILURE = "DELETE_MYPOST_FAILURE";

export const OTHER_USER_TOTAL_RUN_TIME_REQUEST =
  "OTHER_USER_TOTAL_RUN_TIME_REQUEST";
export const OTHER_USER_TOTAL_RUN_TIME_SUCCESS =
  "OTHER_USER_TOTAL_RUN_TIME_SUCCESS";
export const OTHER_USER_TOTAL_RUN_TIME_FAILURE =
  "OTHER_USER_TOTAL_RUN_TIME_FAILURE";

export const OTHER_USER_TOTAL_CALORIE_REQUEST =
  "OTHER_USER_TOTAL_CALORIE_REQUEST";
export const OTHER_USER_TOTAL_CALORIE_SUCCESS =
  "OTHER_USER_TOTAL_CALORIE_SUCCESS";
export const OTHER_USER_TOTAL_CALORIE_FAILURE =
  "OTHER_USER_TOTAL_CALORIE_FAILURE";

export const OTHER_USER_TOTAL_BIKE_TIME_REQUEST =
  "OTHER_USER_TOTAL_BIKE_TIME_REQUEST";
export const OTHER_USER_TOTAL_BIKE_TIME_SUCCESS =
  "OTHER_USER_TOTAL_BIKE_TIME_SUCCESS";
export const OTHER_USER_TOTAL_BIKE_TIME_FAILURE =
  "OTHER_USER_TOTAL_BIKE_TIME_FAILURE";

export const OTHER_USER_TOTAL_TIME_REQUEST = "OTHER_USER_TOTAL_TIME_REQUEST";
export const OTHER_USER_TOTAL_TIME_SUCCESS = "OTHER_USER_TOTAL_TIME_SUCCESS";
export const OTHER_USER_TOTAL_TIME_FAILURE = "OTHER_USER_TOTAL_TIME_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LIKE_SUCCESS:
        const otherPosts = draft.otherProfile.posts.find(
          (v) => v.id === action.data.id
        );
        if (otherPosts) {
          if (action.data.result.attached[0]) {
            otherPosts.likeCheck = true;
            otherPosts.likes.unshift(1);
          } else {
            otherPosts.likeCheck = false;
            otherPosts.likes.shift();
          }
        }
        break;

      case PROFILE_BADGE_REQUEST:
        draft.profileBadgeLoading = true;
        draft.profileBadgeDone = false;

        break;
      case PROFILE_BADGE_SUCCESS:
        draft.profileBadgeLoading = false;
        draft.profileBadgeDone = true;

        draft.me.badge = action.data;
        break;
      case PROFILE_BADGE_FAILURE:
        draft.profileBadgeError = action.error;
        break;
      case READ_NOTIFICATION_REQUEST:
        break;
      case READ_NOTIFICATION_SUCCESS:
        draft.notification.find((v) => v.not_id === action.data).read = 1;
        draft.notificationCheckCount = draft.notification.filter(
          (v) => v.read === 0
        ).length;

        // draft.nofication.data=draft.nofication.data.filter((v)=>v.read===0)
        // readNoficationComponent.read=1
        // var changeNofication=
        // draft.nofication.data.filter((v)=>v.not_id===action.data)=readNoficationComponent
        break;

      case READ_NOTIFICATION_FAILURE:
        break;

      // case CHECK_NOTIFICATION_REQUEST:
      //   draft.notificationCheckCount = action.data;
      //   break;

      case NOTIFICATION_DELETE_REQUEST:
        break;
      case NOTIFICATION_DELETE_SUCCESS:
        draft.notification = draft.notification.filter(
          (v) => v.not_id !== action.data
        );
        draft.notificationCheckCount = draft.notification.filter(
          (v) => v.read === 0
        ).length;
        break;
      // draft.me.followings = draft.me.followings.filter((v) => v.id !== action.data);

      case NOTIFICATION_DELETE_FAILURE:
        break;

      case NOTIFICATION_REQUEST:
        break;
      case NOTIFICATION_SUCCESS:
        draft.notification = action.data;
        draft.notificationCheckCount = draft.notification.filter(
          (v) => v.read === 0
        ).length;
        break;
      case NOTIFICATION_FAILURE:
        break;
      case FOLLOW_NOTIFICATION_REQUEST:
        break;
      case FOLLOW_NOTIFICATION_SUCCESS:
        draft.otherProfile.followCheck = 3;
        break;
      case FOLLOW_NOTIFICATION_FAILURE:
        break;
      case FOLLOW_CANCEL_REQUEST:
        break;
      case FOLLOW_CANCEL_SUCCESS:
        draft.otherProfile.followCheck = 2;
        break;
      case FOLLOW_CANCEL_FAILURE:
        break;

      case OTHER_PROFILE_REQUEST:
        break;
      case OTHER_PROFILE_SUCCESS:
        draft.otherProfile = action.data;
        break;
      case OTHER_PROFILE_FAILURE:
        break;

      case PROFILE_EDIT_REQUEST:
        draft.profileEditLoading = true;
        draft.profileEditDone = false;
        draft.profileEditError = false;
        break;
      case PROFILE_EDIT_SUCCESS:
        draft.profileEditLoading = false;
        draft.profileEditDone = true;

        draft.me.profile = action.data.profile;
        draft.me.name = action.data.name;
        draft.me.weight = action.data.weight;
        draft.me.introduce = action.data.introduce;
        draft.me.location = action.data.location;
        draft.me.birth = action.data.birth;
        draft.me.sex = action.data.sex;
        break;
      case PROFILE_EDIT_FAILURE:
        draft.profileEditLoading = false;
        draft.profileEditError = action.error;
        break;

      /////////////////////////////////

      case OTHER_USER_TOTAL_BIKE_TIME_REQUEST:
        break;
      case OTHER_USER_TOTAL_BIKE_TIME_SUCCESS:
        draft.otherUserTotalBikeTime = action.data;
        break;
      case OTHER_USER_TOTAL_BIKE_TIME_FAILURE:
        break;

      case OTHER_USER_TOTAL_RUN_TIME_REQUEST:
        break;
      case OTHER_USER_TOTAL_RUN_TIME_SUCCESS:
        draft.otherUserTotalRunTime = action.data;
        break;
      case OTHER_USER_TOTAL_RUN_TIME_FAILURE:
        break;

      case OTHER_USER_TOTAL_CALORIE_REQUEST:
        break;
      case OTHER_USER_TOTAL_CALORIE_SUCCESS:
        draft.otherUserTotalCalorie = action.data;
        break;
      case OTHER_USER_TOTAL_CALORIE_FAILURE:
        break;

      case OTHER_USER_TOTAL_TIME_REQUEST:
        break;
      case OTHER_USER_TOTAL_TIME_SUCCESS:
        draft.otherUserTotalTime = action.data;
        break;
      case OTHER_USER_TOTAL_TIME_FAILURE:
        break;

      /////////////////////////////////

      case TOTAL_BIKE_TIME_REQUEST:
        break;
      case TOTAL_BIKE_TIME_SUCCESS:
        draft.totalBikeTime = action.data;
        break;
      case TOTAL_BIKE_TIME_FAILURE:
        break;

      case TOTAL_RUN_TIME_REQUEST:
        break;
      case TOTAL_RUN_TIME_SUCCESS:
        draft.totalRunTime = action.data;
        break;
      case TOTAL_RUN_TIME_FAILURE:
        break;

      case TOTAL_CALORIE_REQUEST:
        break;
      case TOTAL_CALORIE_SUCCESS:
        draft.totalCalorie = action.data;
        break;
      case TOTAL_CALORIE_FAILURE:
        break;

      case TOTAL_TIME_REQUEST:
        break;
      case TOTAL_TIME_SUCCESS:
        draft.totalTime = action.data;
        break;
      case TOTAL_TIME_FAILURE:
        break;

      case DELETE_GOAL_REQUEST:
        break;
      case DELETE_GOAL_SUCCESS:
        // draft.purposeProgress=action.data
        // if (action.data.title){
        //   draft.goalpurpose=action.data

        // }
        break;
      case DELETE_GOAL_FAILURE:
        break;

      case PROGRESS_REQUEST:
        break;
      case PROGRESS_SUCCESS:
        draft.purposeProgress = action.data;
        // if(action.data.title){
        //   draft.goalpurpose=action.data

        // }
        break;
      case PROGRESS_FAILURE:
        break;

      case ALL_GOAL_REQUEST:
        break;
      case ALL_GOAL_SUCCESS:
        draft.allPurpose = action.data;
        // if(action.data.title){
        //   draft.goalpurpose=action.data

        // }
        break;
      case ALL_GOAL_FAILURE:
        break;

      case GOAL_REQUEST:
        break;
      case GOAL_SUCCESS:
        draft.goalpurpose = action.data;

        // draft.weathers=action.data
        break;
      case GOAL_FAILURE:
        break;

      case WEATHER_REQUEST:
        break;
      case WEATHER_SUCCESS:
        draft.weathers = action.data;
        break;
      case WEATHER_FAILURE:
        break;

      case WEEKRECORD_BIKE_REQUEST:
        draft.weekRecordLoading = true;
        draft.weekRecordDone = false;
        break;
      case WEEKRECORD_BIKE_SUCCESS:
        draft.weekRecordLoading = false;
        draft.weekRecordDone = true;
        // console.log('ghjka',action.data)
        draft.weekBikeRecord = action.data;
        break;
      case WEEKRECORD_BIKE_FAILURE:
        draft.weekRecordDone = false;
        draft.weekRecordLoading = false;
        draft.weekRecordError = "error";
        break;
      case WEEKRECORD_REQUEST:
        draft.weekRecordLoading = true;
        draft.weekRecordDone = false;
        break;
      case WEEKRECORD_SUCCESS:
        draft.weekRecordLoading = false;
        draft.weekRecordDone = true;
        console.log("ghjka", action.data);
        draft.weekRecord = action.data;
        break;
      case WEEKRECORD_FAILURE:
        draft.weekRecordDone = false;
        draft.weekRecordLoading = false;
        draft.weekRecordError = "error";
        break;
      case USER_RATE_REQUEST:
        draft.userRateLoading = true;
        draft.userRateDone = false;
        break;
      case USER_RATE_SUCCESS:
        draft.userRateLoading = false;
        draft.userRateDone = true;
        console.log("ghjka", action.data);
        draft.userRate = action.data;
        break;
      case USER_RATE_FAILURE:
        draft.userRateDone = false;
        draft.userRateLoading = false;
        draft.userRateError = "error";
        break;
      case LOGIN_REQUEST:
        draft.logInLoading = true;
        break;
      case LOGIN_SUCCESS:
        draft.logInLoading = false;
        // draft.me=dummyUser(action.data)
        draft.me = null;
        draft.me = action.data;
        break;
      case LOGIN_FAIL:
        draft.logInLoading = false;
        break;
      case LOAD_LOGIN_REQUEST:
        draft.loadLogInLoading = true;
        break;
      case LOAD_LOGIN_SUCCESS:
        draft.loadLogInLoading = false;
        draft.me = action.data;

        // draft.me=dummyUser(action.data)
        // draft.me=action.data
        break;
      case LOAD_LOGIN_FAILURE:
        draft.loadLogInLoading = false;
        break;
      case LOGOUT_REQUEST:
        draft.logOutLoading = true;
        break;
      case LOGOUT_SUCCESS:
        window.location.href = "/LoginTest";

        draft.logOutLoading = false;
        // draft.me = null;
        break;
      case LOGOUT_FAIL:
        draft.logOutLoading = false;
        break;
      case FOLLOWING_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;
      case FOLLOWING_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.followDone = true;
        draft.me.followers.push({
          id: action.data[0].id,
          name: action.data[0].name,
          sex: action.data[0].sex,
          profile: action.data[0].profile,
          mmr: action.data[0].mmr,
        });
        // draft.otherProfile.followCheck=1
        break;
      case FOLLOWING_FAIL:
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      case UNFOLLOWING_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;
      case UNFOLLOWING_SUCCESS:
        draft.unfollowLoading = false;
        draft.me.followings = draft.me.followings.filter(
          (v) => v.id !== action.data
        );
        draft.otherProfile.followCheck = 2;
        draft.unfollowDone = true;
        break;
      case UNFOLLOWING_FAIL:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;
      case SIGNUP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGNUP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGNUP_FAIL:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;

      case USER_SEARCH_REQUEST:
        draft.userSearchLoading = true;
        draft.userSearchError = null;
        draft.userSearchDone = false;
        break;
      case USER_SEARCH_SUCCESS:
        draft.userSearchLoading = false;
        draft.userSearchDone = true;
        draft.searchUsers = action.data.data;
        break;
      case USER_SEARCH_FAILURE:
        draft.userSearchLoading = false;
        draft.userSearchError = action.error;
        break;
      case LOAD_MY_INFO_REQUEST:
        draft.myInfoLoading = true;
        draft.myInfoError = null;
        draft.myInfoDone = false;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.myInfoLoading = false;
        draft.myInfoDone = false;
        // draft.me=null
        console.log("데이터정보", action.data);

        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.myInfoLoading = false;
        draft.myInfoError = action.error;
        break;
      case DELETE_MYPOST_REQUEST:
        draft.deleteMyPostLoading = true;
        draft.deleteMyPostDone = false;
        break;
      case DELETE_MYPOST_SUCCESS:
        draft.deleteMyPostLoading = false;
        draft.deleteMyPostDone = true;
        // draft.me.followings = draft.me.followings.filter((v) => v.id !== action.data);
        draft.me.posts = draft.me.posts.filter((v) => v.id !== action.data);
        break;
      case DELETE_MYPOST_FAILURE:
        draft.deleteMyPostLoading = false;
        draft.deleteMyPostDone = false;
        draft.deleteMyPostError = "error";
        break;

      default:
        return state;
    }
  });
};

export default reducer;
