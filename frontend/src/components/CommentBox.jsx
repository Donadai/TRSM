import { useState } from "react"
import { useDispatch } from "react-redux"
import { postComment } from "../features/comments/commentSlice"

function CommentBox({post}) {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        text: ''
      })

    const {text} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault() 

        const commentData = {post, text}
        console.log(commentData)
        dispatch(postComment(commentData))
    }
  return (
    <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <input type="text" className="form-control" id="text" name="text" value={text} placeholder='Enter comment..' onChange={onChange}/>
            <button type="submit" className='btn btn-block'>Comment</button>
            </div>
        </form>
    </div>
  )
}

export default CommentBox