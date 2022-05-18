import shortid from "shortid";
import produce from "immer";
import faker from "faker";
import { FaLessThanEqual } from "react-icons/fa";

export const initialState = {
  mainPosts: [],
  comment: [],
  likeRequest: null,
  CommentDeleteDone: false,
  CommentDeleteLoading: false,
  CommentDeleteError: null,

  addCommentDone: false,
  addCommentLoading: false,
  addCommentError: false,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadsPostsLoading: false,
  loadsPostsDone: false,
  loadsPostsError: null,
  hasMorePosts: true,
  loadMorePostLoading: false,
  loadMorePostDone: false,
  loadMorePostError: null,
  loadMorePostErrorBolean: false,
};
export const COMMENT_DELETE_REQUEST = "COMMENT_DELETE_REQUEST";
export const COMMENT_DELETE_SUCCESS = "COMMENT_DELETE_SUCCESS";
export const COMMENT_DELETE_FAILURE = "COMMENT_DELETE_FAILURE";

export const LOAD_MORE_POST_SUCCESS = "LOAD_MORE_POST_SUCCESS";
export const LOAD_MORE_POST_REQUEST = "LOAD_MORE_POST_REQUEST";
export const LOAD_MORE_POST_FAILURE = "LOAD_MORE_POST_FAILURE";

export const LOADS_POSTS_REQUEST = "LOADS_POSTS_REQUEST";
export const LOADS_POSTS_SUCCESS = "LOADS_POSTS_SUCCESS";
export const LOADS_POSTS_FAILURE = "LOADS_POSTS_FAILURE";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const LOAD_COMMENT_REQUEST = "LOAD_COMMENT_REQUEST";
export const LOAD_COMMENT_SUCCESS = "LOAD_COMMENT_SUCCESS";
export const LOAD_COMMENT_FAILURE = "LOAD_COMMENT_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const LIKE_REQUEST = "LIKE_REQUEST";
export const LIKE_SUCCESS = "LIKE_SUCCESS";
export const LIKE_FAILURE = "LIKE_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LIKE_REQUEST:
        break;
      case LIKE_SUCCESS:
        const commentposts = draft.mainPosts.data.find(
          (v) => v.id === action.data.id
        );
        if (action.data.result.attached[0]) {
          commentposts.likeCheck = true;
          commentposts.likes.unshift(1);
        } else {
          commentposts.likeCheck = false;
          commentposts.likes.shift();
        }

        break;
      case LIKE_FAILURE:
        break;
      case LOAD_COMMENT_REQUEST:
        break;
      case LOAD_COMMENT_SUCCESS:
        draft.comment = action.data.data;
        break;
      case LOAD_COMMENT_FAILURE:
        break;

      case COMMENT_DELETE_REQUEST:
        draft.CommentDeleteLoading = true;
        draft.CommentDeleteDone = false;
        draft.CommentDeleteError = null;
        break;
      case COMMENT_DELETE_SUCCESS:
        draft.comment = draft.comment.filter((v) => v.id !== action.data);
        // console.log('asdasdasdasdaffasdasdasdasdasdasd',draft.comment.indexOf(comment))

        // draft.mainPosts.find((v)=>v.id===action.data).comment.unshift(action.data.datas.comment)
        //postId,commentId
        // const commentpost=draft.mainPosts.find((v)=>v.id===action.data)
        // commentpost.comment.unshift(action.data.datas.comment)
        // draft.mainposts
        // action.data

        // action.data
        break;
      case COMMENT_DELETE_FAILURE:
        draft.CommentDeleteDone = false;
        draft.CommentDeleteError = "ㅇㅇㅇ";
        break;

      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        // draft.hasMorePosts = draft.mainPosts.length < 50;
        // draft.mainPosts = action.data.concat(draft.mainPosts);
        //  백만들어지면 포스트 불러올것
        console.log("nexq", action.data.nextPage);
        draft.mainPosts = action.data;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = "ㅇㅇㅇ";
        break;

      case LOAD_MORE_POST_REQUEST:
        draft.loadMorePostLoading = true;
        draft.loadMorePostDone = false;
        draft.loadMorePostError = null;
        break;
      case LOAD_MORE_POST_SUCCESS:
        draft.loadMorePostLoading = false;
        draft.loadMorePostDone = true;
        draft.hasMorePosts = draft.mainPosts.data.length < 100;

        // draft.mainPosts = action.data.concat(draft.mainPosts);
        //  백만들어지면 포스트 불러올것
        draft.mainPosts.nextPage = action.data.nextPage;
        draft.mainPosts.data.push(...action.data.data);
        //   if(draft.mainPosts.data.length ===39){
        //     draft.loadMorePostNumberError=true
        // }
        break;
      case LOAD_MORE_POST_FAILURE:
        draft.loadMorePostLoading = false;
        draft.loadMorePostErrorBolean = true;
        draft.loadMorePostError = "ㅇㅇㅇ";
        break;

      case LOADS_POSTS_REQUEST:
        draft.loadsPostsLoading = true;
        draft.loadsPostsDone = false;
        draft.loadsPostsError = null;
        break;
      case LOADS_POSTS_SUCCESS:
        draft.loadsPostsLoading = false;
        draft.loadsPostsDone = true;

        draft.mainPosts = action.data;
        break;
      case LOADS_POSTS_FAILURE:
        draft.loadsPostsLoading = false;
        draft.loadsPostsError = "ㅇㅇㅇ";
        break;

      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        break;
      case ADD_COMMENT_SUCCESS:
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        draft.comment.unshift(action.data.comment);
        //반환된 comment를 comment에 넣어야하니깐

        // const commentpost = draft.mainPosts.find(
        //   (v) => v.id === action.data.id
        // );
        // commentpost.comment.unshift(action.data.result.comment);
        // draft.mainPosts.find((v)=>v.id===action.data.id)

        // draft.mainPosts = draft.mainPosts;

        // id:action.data.postId,
        // datas:result
        // Cannot read properties of undefined (reading 'unshift')

        // const commentpost= draft.mainPosts.data.find((v)=>v.id===parseInt(action.data.comment.post_id))
        // commentpost.comment.unshift(action.data.comment)

        // draft.mainPosts.data.find((v)=>v.id===parseInt(action.data.comment.post_id)).comment.unshift(action.data.comment)
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.data.error;
        break;

      default:
        return state;
    }
  });
};

export default reducer;
