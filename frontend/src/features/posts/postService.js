import axios from 'axios'

const getAllPosts = async () => {
    const response = await axios.get('/api/posts/')

    return response.data
}

const getPostById = async (postId) => {
    const response = await axios.get('/api/posts/' + postId)

    return response.data
}

const getMyPosts = async (userid) => {
    const response = await axios.get('api/users/' + userid + '/posts')
    return response.data
}

const createPost = async (postData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }

    const response = await axios.post('api/users/' + user.user._id.toString() + '/posts', postData, config)

    return response.data
}

const deletePost = async (id, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }

    const response = await axios.delete('api/users/' + user.user._id.toString() + '/posts/' + id.toString(), config)

    return response.data
}

const updatePost = async(id, postData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }

    const response = await axios.put('api/users/' + user.user._id.toString() + '/posts/' + id.toString(), postData, config)

    return response.data
}

const postService = {
    getAllPosts,
    createPost,
    getMyPosts,
    deletePost,
    updatePost,
    getPostById
}

export default postService