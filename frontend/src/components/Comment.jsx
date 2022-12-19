function Comment({comment}) {
    return (
        <section className="comment">
            <h5 id='userdn'>{comment.user.display_name}</h5>
            <p>{comment.text}</p>
        </section>
    )
}

export default Comment