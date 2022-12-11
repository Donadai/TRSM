
import {useEffect, useState} from 'react'
import axios from 'axios'
import Spinner from './Spinner'

function Post({post}) {

    const [postUser, setPostUser] = useState({})

    const getUser = () => {
        axios.get(`/api/users/${post.user}`)
        .then((response) => {
            const user = response.data
            setPostUser(user)
        })
        .catch(error => console.error(`Error: ${error}`))
    }
    
    useEffect(() => {
        getUser()
    }, [])

    if (!postUser) {return <Spinner />}

    return (
        <>
            <div className='goal'>
                <div className='postUser'>
                    <h4>{postUser.display_name}</h4>
                </div>        
                <div className= 'text'>
                {post.description}
                </div>

            </div>
        </>
    )
}

export default Post