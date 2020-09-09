import React from 'react'
import Posts from "./Posts"

const Postings=({posts})=> {
    return (
      <div>
        <h1>Welcome to InstaFood</h1>

        {posts.map(({ id, post }) => (
          <Posts
            username={post.username}
            caption={post.caption}
            imageurl={post.imageurl}
            key={id}
          />
        ))}
      </div>
    );
}

export default Postings
