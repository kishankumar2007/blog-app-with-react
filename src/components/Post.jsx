import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import storageService from '../appwrite/storage'
function Post() {
  const [image, setImage] = useState(null)
  const { slug } = useParams()
  const posts = useSelector(state => state.post.allPosts)
  const post = posts.filter((post) => post.slug === slug)

  useEffect(() => {
    async function getImage() {
      const dbImg = await storageService.filePreview(post[0].Image)
      setImage(dbImg)
    }
    getImage()
  }, [])

  return (
    <div className='w-full min-h-screen sm:p-10 p-5'>
      <div className='max-w-5xl mx-auto sm:h-xl flex flex-col sm:flex-row sm:gap-30  items-center'> <div className='max-w-96 max-h-96 rounded-md overflow-hidden '> <img className='w-full object-cover ' src={image} alt='post_image' /> </div> <h1 className='titl sm:text-5xl text-xl mt-5 font-semibold uppercase shadow text-white'>{post[0].title}</h1> </div>
      <h1 className=" max-w-5xl mx-auto mt-4 content text-center text-2xl text-white underline"> Content </h1>
      <div className=" max-w-5xl mx-auto mt-4 content text-white sm:text-lg text-sm font-light" dangerouslySetInnerHTML={{ __html: post[0].content }} />
    </div>
  )
}

export default Post
