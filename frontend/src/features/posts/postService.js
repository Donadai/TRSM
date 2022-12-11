import axios from 'axios'

const getAllPosts = async () => {
    const response = await axios.get('api/posts/')

    return response.data
}

const postService = {
    getAllPosts,
}

export default postService