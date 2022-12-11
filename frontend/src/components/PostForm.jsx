import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import SearchBar from './SearchBar'
import { getPois } from '../features/pois/poiSlice'
import Spinner from './Spinner'
//import {createPost} from '../features/posts/postSlice'

function PostForm() {
    const dispatch = useDispatch()

    const [text, setText] = useState('')
    const {user} = useSelector((state) => state.auth)
    const {pois} = useSelector((state) => state.pois)

    useEffect(() => {
    dispatch(getPois())

    }, [dispatch])

    const onSubmit = e => {
        e.preventDefault()

        // dispatch(createPost({text}))
        // setText('')
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <h1>New post</h1>
                    <SearchBar placeholder='Enter point of interest...' data={pois}/>
                    {/* <input type='text' name='text' id='text' value={text} onChange={(e) => setText(e.target.value)} />          */}
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type='submit'>
                        Create
                    </button>
                </div>
            </form>
        </section>
    )
}

export default PostForm