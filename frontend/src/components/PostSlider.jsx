import Post from "./Post"
import { useState } from "react"
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'

function PostSlider({ posts }) {

    const [current, setCurrent] = useState(0)
    var length

    if (!Array.isArray(posts) || posts.length <= 0) { return null }
    else { length = posts.length }

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    return (
        <section className="slider">
            <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
            <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
            {posts.map((post, index) => {
                return (
                    <div 
                        className={index === current ? 'slide active' : 'slide'} 
                        key={index}
                        >
                        {index === current && (
                        <Post key={post._id} post={post} />
                        )}
                    </div>               
                )
            })}
        </section>
    )
}

export default PostSlider