import React from 'react'
import { posts } from '../data'
import Card from './Card'
const Home = () => {
    return (
        <div className='home'>
            {posts.map(posts => (
                <Card key={posts.id} posts ={posts} />
            ))}
        </div>
    )
}

export default Home