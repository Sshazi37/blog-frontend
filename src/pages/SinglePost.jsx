import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function SinglePost({category, title, excerpt, image}) {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const id = useParams(1);
    const navigate = useNavigate();
    useEffect(()=>{
        const getData = async ()=>{
            try {
                setLoading(true);
               const response =  await axios.get(`https://jsonplaceholder.typicode.com/posts/${id.id}`);
               setPost(response.data)
               console.log(response);
               setLoading(false);

            } catch (error) {
                console.log(error);
                    navigate('/login')
            }

        }
        getData()
    }, [id, navigate]);
    return (
        <>
        {!loading ? 
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <span className='text-black font-semibold underline'><Link to={"/category/" + post.userId} >{post.userId}</Link></span>
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{post.title}
                    </h1>
                    <p className="mb-8 leading-relaxed">{post.body}</p>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img className="object-cover object-center rounded" alt="hero" src={image} />
                </div>
            </div>
        </section>
           : "Loading" }   
        </>
    )
}


SinglePost.defaultProps = {
    category: 'Category',
    title: 'Before they sold out readymade gluten',
    excerpt: 'Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.',
    image: 'https://dummyimage.com/720x600'
  }
