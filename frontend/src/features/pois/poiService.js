import axios from 'axios'

const API_URL = '/api/pois'

// Get pois
const getPois = async () => {
    const response = await axios.get(API_URL)

    return response.data
}

const poiService = {
    getPois,
}

export default poiService