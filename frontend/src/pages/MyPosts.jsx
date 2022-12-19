import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {toast} from 'react-toastify'
import { getMyPosts, resetposts } from "../features/posts/postSlice"
import Post from "../components/Post"
import PostForm from "../components/PostForm"
import Spinner from "../components/Spinner"


function MyPosts(){
    const dispatch = useDispatch()

    const {posts, isLoading, isError, message} = useSelector((state) => state.posts)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getMyPosts())

        return () => {
            dispatch(resetposts())
        }
    }, [isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <PostForm />

            <section className="heading"> 
                <h1>My Posts</h1>
            </section>
            
            {posts.length > 0 ? (
                <div className="posts">
                    {posts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
                </div>
            ) : (<h3>You have not posted anything</h3>)}
        </>
    )
}

export default MyPosts