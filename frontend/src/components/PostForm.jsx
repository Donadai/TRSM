import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import SearchBar from './SearchBar'
import { getPois , reset } from '../features/pois/poiSlice'
import { createPost } from '../features/posts/postSlice'

function PostForm() {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        description: '',
        poi: '',
        image: ''
      })
    
    const {poi, description, image} = formData

    const {pois} = useSelector((state) => state.pois)

    useEffect(() => {
    dispatch(getPois())

    return () => {
        dispatch(reset())
    }
    }, [dispatch])

    const handlePoi = poiName => {
        const foundPoi = pois.find(p => {
          return p.name === poiName
        });
        if (foundPoi) {
        setFormData((prevState) => ({
            ...prevState,
            poi: foundPoi,
            }))
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = e => {
        e.preventDefault()

        const postData = {
            poi, description, image,
          }

        dispatch(createPost(postData))
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <h1>New post</h1>                  
                    <SearchBar placeholder='Enter point of interest...' data={pois} selectData={handlePoi}/>               
                </div>
                <div className="form-group">
                    <textarea type='text' name='description' id='description' placeholder='Description' value={description} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="file" id='image' name='image' placeholder='Upload image' value={image} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type='submit' onClick={onSubmit}>
                        Post
                    </button>
                </div>
            </form>
        </section>
    )
}

export default PostForm