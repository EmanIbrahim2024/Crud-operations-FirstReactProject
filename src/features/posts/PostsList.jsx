import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import "./style.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { fetchPosts, addPost,deletePost,updatePost  } from "./slices/postsSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import UpdatePostModal from "../../Components/Modals/UpdatePostModal";
import { Link  } from 'react-router-dom';
import PostDetails from "./Details/postDetails";



function PostsList() {
  const [showModal, setShowModal] = useState(false);
    const [currentPost, setCurrentPost] = useState({
      title: "",
      body: "",
    });




  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

    const handleAddPost = async (newPost, { resetForm }) => {
    try {
      await dispatch(addPost(newPost)).then(() => {
            setNewPost({
              title: "",
              body: "",
            })});
      resetForm();
      toast.success("Post added successfully");
    } catch (error) {
      toast.error("Error adding post");
    }
  };

  const handleDelete = (postId) => {
    dispatch(deletePost(postId)).then(() => {
      toast.success('Post deleted successfully');
    });
  };
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Title must contain only letters and spaces")
      .max(100, "Title must not exceed 10 words")
      .min(10,"Title must not lower than 100 words")
      .required("Title is required"),
    body: Yup.string()
    .required("Body is required")
    .max(500, "body must not exceed 500 words")
    .min(50,"body must not lower than 50 words"),
    
  });

  const handleShowModal = (post) => {
      // console.log(post)
      setCurrentPost(post);
      setShowModal(true);
    };
    const handleCloseModal = () => {
      setShowModal(false);
    };
    const handleUpdatePost = () => {
      const updatedPostData = {title: currentPost.title, body: currentPost.body};
      // console.log(updatedPostData);
      dispatch(updatePost({id: currentPost.id,  updatedData:updatedPostData})).then(() => {
        setShowModal(false);
        toast.success("Post has been updated successfully");
      });
    };




  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {posts &&
                posts.map((post) => (
                  <div className="card post-item" key={post.id}>
                    <div className="card-body">
                    <Link
                      to={`/post-details/${post.id}`}
                      style={{ textDecoration: 'none' }} 
                    >                  
                      <h5 style={{ cursor: 'pointer', color: 'blue' }}>
                        {post.id} -{post.title} 
                      </h5>
                      </Link>
                      <p className="card-text">{post.body}</p>
                      <div className="postControlButtons">
                        <button className="btn btn-primary" onClick={() => handleShowModal(post)} ><FontAwesomeIcon icon={faEdit} /> Update</button>
                        <button className="btn btn-danger"   onClick={() => handleDelete(post.id)}><FontAwesomeIcon icon={faTrash} /> Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-lg-4">
              <div className="add-post-form">
             
                {/* <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) => {
                    setNewPost({ ...newPost, title: e.target.value });
                  }}
                  
                
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Body"
                  rows="4"
                  value={newPost.body}
                  onChange={(e) => {
                    setNewPost({ ...newPost, body: e.target.value });
                  }}
                 
                />
                <button type='submit'  className="btn btn-success" onClick={handleAddPost} disabled={!newPost.title.trim() || !newPost.body.trim()}>
                <FontAwesomeIcon icon={faPlus} />  Add Post
                </button> */}

                <Formik
                initialValues={{ title: "", body: "" }}
                validationSchema={validationSchema}
                onSubmit={handleAddPost}
              >
                {({ isValid, dirty }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <Field
                        name="title"
                        type="text"
                        className="form-control"
                       
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="body">Body</label>
                      <Field
                        name="body"
                        as="textarea"
                        className="form-control"
                        rows="4"
                       
                      />
                      <ErrorMessage
                        name="body"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success mt-2"
                      disabled={!(dirty && isValid)}
                      
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add Post
                    </button>
                  </Form>
                )}
              </Formik>



               
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpdatePostModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        currentPost={currentPost}
        handleChangeData={setCurrentPost}
        handleUpdatePost={handleUpdatePost}
      />
      <ToastContainer />
     
    </>
  );
}
export default PostsList;



