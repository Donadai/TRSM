import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { getPois } from '../features/pois/poiSlice'
import { getRecentPosts } from '../features/posts/postSlice'
import SearchBar from '../components/SearchBar'
import Poi from '../components/Poi'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {pois} = useSelector((state) => state.pois)
  const {posts} = useSelector((state) => state.posts)

  const [poi, setPoi] = useState({})

  const handlePoi = poiName => {
    const poi = pois.find(poi => {
      return poi.name === poiName
    });
    setPoi(poi)
    dispatch(getRecentPosts(poi._id))
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    dispatch(getPois())
  }, [user, navigate, dispatch])

  return (
    <>
      <section className='heading'>
        <h1>Welcome, {user && user.user.username}!</h1>
      </section>

      <section className="content">
        <div className="form-group">
          <h1>Find a point of interest</h1>
          <SearchBar placeholder='Enter point of interest...' data={pois} selectData={handlePoi}/>
        </div>
        <div>
          {poi && (
            <Poi poi = {poi}/>
          )} 
        </div>
        <div>
          <h1>Some recent posts..</h1>
        </div>

      </section>
    </>
  )
}

export default Dashboard