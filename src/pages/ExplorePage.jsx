import React from 'react'
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ExplorePage() {
    const posts = useSelector(state => state.post.allPosts)
    const authStates = useSelector(state => state.auth.status)
    const navigate = useNavigate()
    return (
        !authStates ? navigate('/') : (posts.length === 0 ? <p className='text-white justify-center min-h-screen sm:text-2xl flex items-center text-xl'>Ohh no!😔, No Post Found</p> :
            <main className="container mx-auto px-4 py-5">
                <h1 className="text-xl font-bold mb-6 text-gray-100 ml-10">Explore the latest blog's</h1>
                <div className="sm:grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 flex flex-wrap gap-4 lg:px-2 w-full max-w-7xl mx-auto pt-5 pb-5 min-h-screen items-start">
                    {authStates && posts.map((post) => post.is_Active === "Active" && <PostCard key={post.$id} post={post} status={post.is_Active} />)}
                </div>
            </main>)
    )
}

export default ExplorePage
