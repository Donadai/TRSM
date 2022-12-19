import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { getPois, reset } from '../features/pois/poiSlice'
import { getAllPosts, resetposts } from '../features/posts/postSlice'
import SearchBar from '../components/SearchBar'
import Poi from '../components/Poi'
import PostSlider from '../components/PostSlider'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {pois} = useSelector((state) => state.pois)
  const {posts} = useSelector((state) => state.posts)

  const [poi, setPoi] = useState({poi : null})
  const [isPoiFound, setFoundPoi] = useState(Boolean)
  const [foundPosts, setFoundPosts] = useState([])
  const [arePostsFound, setAreFoundPosts] = useState(Boolean)

  const handlePoi = poiName => {
    const foundPoi = pois.find(p => {
      return p.name === poiName
    });
    if (foundPoi) {
      setPoi(foundPoi)
      setFoundPoi(true)
      setFoundPosts([])
      
      const foundP = posts.filter(post => {
        return (post.poi._id === foundPoi._id);
      })
      if (foundP.length > 0) {  
        setFoundPosts(foundP)
        setAreFoundPosts(true)      
      }    
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    dispatch(getPois())
    dispatch(getAllPosts())

    return () => {
      dispatch(resetposts())
      dispatch(reset())
    }

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
        <div className='poi'>
          {isPoiFound ? <Poi poi={poi}/> : null}               
        </div>
        <h1>Some recent posts..</h1>
        <div className='posts'>       
          {arePostsFound && (<PostSlider posts={foundPosts}/>)}
        </div>
      </section>
    </>
  )
}

export default Dashboard