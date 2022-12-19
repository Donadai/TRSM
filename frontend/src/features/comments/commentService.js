import axios from 'axios'

const getPostComments = async (post) => {
    const response = await axios.get('/api/users/' + post.user._id + '/posts/' + post._id + '/comments')
    return response.data
}

const postComment = async (user, commentData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }

    const userId = commentData.post.user._id
    const postId = commentData.post._id
    const response = await axios.post('/api/users/' + userId + '/posts/' + postId + '/comments', commentData, config)

    console.log(response);

    return response.data
}

const commentService = {
    getPostComments,
    postComment
}

export default commentService