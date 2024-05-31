import React, { useEffect, useState } from 'react'
import NewCard from '../components/NewCard'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Category() {
  const [posts, setPosts] = useState([]);
  const { id } = useParams([]);

  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then(response => setPosts(response.data))
      .catch(console.error())
  }, [id]);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {
            posts.slice(0, 6).map(post => (
              <NewCard key={post.id} category={post.userId} title={post.title} excerpt={post.body} slug={'/' + post.id} />
            ))
          }

        </div>
      </div>
      </section>
  )
}
