import { useDispatch } from "react-redux"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { deletePost } from "../features/posts/postSlice"
import { MdDelete, MdComment } from "react-icons/md"
import PostEditModal from "./PostEditModal"
import { useEffect } from "react"

function Post({post}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isUserPost, setIsUserPost] = useState(Boolean)

    const handleCommentClick = (postId) => {
        navigate('/posts/' + postId + '/comments')
    }
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (post.user._id === user.user._id) {
            setIsUserPost(true)
        } else {setIsUserPost(false)}
    }, [setIsUserPost, post.user._id])

    return (
        <div className='post'>       
            <h2>{post.user.display_name}</h2>
            <p id="description">{post.description}</p>

            <div className='post_image'>
                    <img src={require('../assets/poi_images/houseofperkunas.png')} alt="alternatetext"/>
            </div>  

            <p id="postDate">{new Date(post.createdAt).toLocaleString('en-US')} </p>
            <div className="edit">
                <div className="left">
                    <button className="btn-comments" onClick={() => handleCommentClick(post._id)}> <MdComment /></button> 
                </div>
                {isUserPost === true && (
                    <>
                        <div className="center">
                            <PostEditModal post={post}/>
                        </div>
                        <div className="right">               
                            <button className="btn-edit" onClick={() => dispatch(deletePost(post._id))}> <MdDelete /></button>
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default Post