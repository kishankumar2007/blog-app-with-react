import React from 'react'
import { useSelector } from 'react-redux'
import PostCard from './PostCard'

function MyPost() {
    const userData = useSelector(state => state.auth.userData)
    const userPost = useSelector(state => state.post.allPosts).filter(post => post.userId === userData.$id)

    return (
        <div className="w-full max-w-7xl mx-auto px-2 pt-5 pb-5 min-h-screen">
            <h1 className='text-xl font-bold mb-6 text-gray-100 ml-10'>Your Blog's</h1>
            {userPost.length === 0 ? (
                <p className="text-white flex justify-center mt-54 h-screen text-xl sm:text-2xl">
                    Ohh no! 😔 No Post Found
                </p>
            ) : (
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4">
                    {userPost.map((post) => (
                        <PostCard key={post.$id} post={post} status={post.is_Active} />
                    ))}
                </div>
            )}
        </div>
    );
}


export default MyPost
