function PostView({post}) {
    return (
        <div className='post'>       
            <h2>{post.user.display_name}</h2>
            <p>{post.description}</p>

            <div className='post_image'>
                    <img src={require('../assets/poi_images/houseofperkunas.png')} alt="alternatetext"/>
            </div>  

            <p id="postDate">{new Date(post.createdAt).toLocaleString('en-US')} </p>
        </div>
    )
}

export default PostView