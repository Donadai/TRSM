import axios from 'axios'

// Get 15 recent posts by poi
const getRecentPoiPosts = async (poiid) => {
    const response = await axios.get('api/pois/' + poiid.toString() + '/posts')

    return response.data
}

const postService = {
    getRecentPoiPosts,
}

export default postService