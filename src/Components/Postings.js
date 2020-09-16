import React from 'react'
import Posts from "./Posts"

const Postings=({posts})=> {
    return (
      <div className="app__posts">
        <center>
          {posts.map(({ id, post }) => (
            <Posts
              username={post.username}
              caption={post.caption}
              imageurl={post.imageurl}
              key={id}
              postid={id}
            />
          ))}
        </center>
      </div>
    );
}

export default Postings
 