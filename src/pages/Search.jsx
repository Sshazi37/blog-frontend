import React, { useState } from 'react';
import axios from 'axios';
import NewCard from '../components/NewCard';

const Search = () => {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    setLoading(true)
    let url = `https://jsonplaceholder.typicode.com/posts?title_like=${query}`;
    if (category) url += `&userId=${category}`;
    axios.get(url)
      .then(response => {
        let posts = response.data;
        setLoading(false)
        if (sort === 'new') {
          posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sort === 'old') {
          posts = posts.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        setResults(posts);
      })
      .catch(error => console.error('Error searching posts:', error));
  };

  return (
    <div>
      <h1 className='text-center'>Search Page</h1>
      <div className='flex bg-slate-400 p-10 items-center justify-center gap-5 m-auto w-2/4'>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search by title"
        className='w-1/2 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
      />
      <input
        type="text"
        value={category}
        onChange={e => setCategory(e.target.value)}
        placeholder="Filter by category (user ID)"
        className='w-1/2 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'

      />
      <select value={sort} onChange={e => setSort(e.target.value)} 
              className='bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'

      >
        <option value="">Sort by</option>
        <option value="new">Newest</option>
        <option value="old">Oldest</option>
      </select>
      <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? "Loading" :
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {results.map(post => (
                        <NewCard key={post.id} category={post.userId} title={post.title} excerpt={post.body} slug={'/' + post.id} />
                    ))}
                </div>
            </div>
        </section>
        }
    </div>
  );
};

export default Search;
