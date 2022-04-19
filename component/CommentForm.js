import React, { useCallback,useEffect } from 'react';
import {Form, Input,Button} from 'antd'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput';
import { useSelector,useDispatch } from 'react-redux';
import {ADD_COMMENT_REQUEST} from '../reducers/post'

function CommetForm({post}) {

    const dispatch =useDispatch();
    const {addCommentDone,addCommentLoading}=useSelector((state)=>state.post)
    const me=useSelector((state)=>state.user.me)
  
    const [commentText,onChangeCommentText,setValue]=useInput('');
    
  

    const onSubmitComment=()=>{


        dispatch({
            type:ADD_COMMENT_REQUEST,
            data: {
                contents:{
                    'content':commentText,
                },
                postId:post.id,
            //    userId:me.id,
            //     nickname:me.nickname
               
            }
    
        })

    }
    // commentText,me

    useEffect(()=>{
        if(addCommentDone){
            setValue('')
        }
    },[addCommentDone])

    return( 


//   <Form onFinish={onSubmitComment}>
//       <Form.Item style={{position:'relative' ,margin:0 ,zIndex:1}}>
<div>

<Input.TextArea value={commentText} onChange={onChangeCommentText} style={{width:700}} rows={4} />
          <Button type="primary" htmlType='submit' style={{position:'absolute' ,right:0,bottom:-40}} style={{marginRight:10,marginTop:10}} onClick={onSubmitComment} loading={addCommentLoading}>등록</Button>
</div>
          
//       </Form.Item>
//   </Form>
  );
}

CommetForm.PropTypes={
    post:PropTypes.object.isRequired,
};


export default CommetForm;
