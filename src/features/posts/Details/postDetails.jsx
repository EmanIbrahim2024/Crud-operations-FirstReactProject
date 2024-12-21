import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from "react-redux";
import { fetchPostDetails } from "../slices/postsSlice";

const PostDetails = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const postdetail = useSelector((state) => state.postsData.posts);
  const [post, setPost] = useState({
      title: "",
      body: "",
    });
  

  useEffect(() => {
    
    // const fetchPostDetails = async () => {
    //   const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`); 
    //   const data = await response.json();
    //   setPost(data);
    // };
 

   dispatch(fetchPostDetails(id))
    // fetchPostDetails()
  }, []); 

  useEffect(() => {
    if (postdetail) {
      setPost(postdetail);
    }
  }, [postdetail]);





  return (

    
    <div className="d-flex justify-content-center align-items-center" >
    <div className='details-card-style'>
        <h2 className="text-primary text-center">{post.title}</h2>
        <p >id:{post.id}</p>
        <p>userID:{post.userId}</p>
        <p>{post.body}</p>
        
    </div>
    </div>
  );
};

export default PostDetails;
