import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import storageService from '../appwrite/storage'
import appWriteService from '../appwrite/services'
import { deletePost as delpost } from '../store/postSlice'
import { toast } from 'react-toastify'

function Post() {
  const [image, setImage] = useState(null)
  const [postId, setpostId] = useState('')
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const posts = useSelector(state => state.post.allPosts)
  const userData = useSelector(state => state.auth.userData)
  const post = posts.find((post) => post.slug === slug)


  useEffect(() => {
    setpostId('')
    if (!post) {
      setTimeout(() => { navigate('/') }, 500)
      return
    }
    const postOwnerId = post.$permissions[1].replace('update(\"user:', '').replace('")', '')
    setpostId(postOwnerId)
    async function getImage() {
      const dbImg = await storageService.filePreview(post.Image)
      setImage(dbImg)

    }
    getImage()
  }, [post, navigate])


  const deletePost = async () => {
    try {
      await storageService.deleteFile(post?.Image)
      const dbPost = await appWriteService.deletePost(post.$id)
      if (dbPost) {
        dispatch(delpost(post.$id))
        toast.warn('Post deleted ', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          style: {
            width: "200px",
            height: " 40px"
          }
        });
        setTimeout(() => { navigate('/') }, 1000)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const editPost = async () => {
    toast.info('under development', {
      position: "top-left",
      autoClose: 2000,
      width: 100,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      style: {
        width: "200px",
        height: " 40px"
      }
    })
  }

  return (
    <div className='w-full min-h-screen sm:p-10 p-5'>
      {(postId === userData?.userId || postId === userData?.$id) && (
        <div className='flex gap-3 top-18 sm:text-sm text-xs lg:right-50 right-2 absolute sm:right-15'>
          <button onClick={editPost} className='rounded bg-emerald-500 text-white p-1 sm:p-2'>📝Edit</button>
          <button onClick={deletePost} className='rounded bg-red-600 text-white p-1 sm:p-2'>🗑️ Delete</button>
        </div>
      )}
      <div className='max-w-5xl mx-auto sm:h-xl flex mt-4 flex-col sm:flex-row sm:gap-30  items-center'> <div className='max-w-96 max-h-96 rounded-md overflow-hidden '> <img className='w-full object-cover ' src={image} alt='post_image' /> </div> <h1 className='titl sm:text-5xl text-xl mt-5 font-semibold uppercase shadow text-white'>{post?.title}</h1> </div>
      <h1 className=" max-w-5xl mx-auto mt-4 content text-center text-2xl text-white underline"> Content </h1>
      <div className=" max-w-5xl mx-auto mt-4 content text-white sm:text-lg text-sm font-light" dangerouslySetInnerHTML={{ __html: post?.content }} />
    </div>
  )
}

export default Post
