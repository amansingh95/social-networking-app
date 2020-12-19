import React, { useEffect } from "react";
import {  Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, displayUserPost } from "../actions/userActions";

export const Post = () => {

    const displayPost = useSelector(state => state.userDisplayPost)
    const dispatch= useDispatch()
    const {loading, error, userPost } = displayPost
    useEffect(()=>{
        dispatch(displayUserPost())
    }, [dispatch])

  return (
      <div> 
          {userPost}
        {console.log(userPost)}
      </div>
//     <Row>
//     {userPost.map((post)=>(
//         <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
//            <p>{post.text}</p> 
//         </Col>
//     ))}
// </Row>  
  );
};
