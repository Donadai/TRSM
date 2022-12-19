import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getPostComments } from "../features/comments/commentSlice"
import { getAllPosts } from "../features/posts/postSlice";
import Comment from "../components/Comment";
import PostView from "../components/PostView";
import { useParams } from "react-router-dom";
import CommentBox from "../components/CommentBox";

export default function Comments () {
    const dispatch = useDispatch()
    const postId = useParams().postid

    const {posts} = useSelector((state) => state.posts)
    const {comments} = useSelector((state) => state.comments)
    const [post, setPost] = useState([])

    useEffect(() => {
        if (post.length === 0)
        {
            dispatch(getAllPosts())
            const filteredPost = posts.filter((post) => {return post._id === postId })
            setPost(filteredPost)
        }
    }, [dispatch, postId, posts, post.length])

 
    useEffect(() => {
        if (post.length > 0) {
            dispatch(getPostComments(post[0]))
        }     
    }, [dispatch, post, comments])
   
    return (      
        <>
        <div className="postcomments">
            {post.length > 0 ? (
                <>
                    <PostView post={post[0]}/>  
                    <div className='commentSection'>
                        <div className="comments">
                            {comments.length > 0 && (comments.map((comment) => (
                                <Comment key={comment._id} comment={comment} />
                            )))} 
                        </div>
                        <CommentBox post={post[0]} />
                    </div>
                </>
            ):(<></>)}       
        </div>
        </>
    ); 
}