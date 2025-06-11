import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import storageService from '../appwrite/storage'
import appWriteService from '../appwrite/services'
import { deletePost as delpost } from '../store/postSlice'
import { toast } from 'react-toastify'
import { FaHeart } from "react-icons/fa";

function Post() {
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState(null)
  const [postId, setpostId] = useState('')
  const [likedPosts, setLikedPosts] = useState([])
  const [isClicked, setisClicked] = useState(false)
  const [likes, setLikes] = useState(Math.floor(Math.random() * 30 + 1))

  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const posts = useSelector(state => state.post.allPosts)
  const userData = useSelector(state => state.auth.userData)
  const post = posts.find((post) => post.slug === slug)



  useEffect(() => {
    setpostId('');
    setLoading(true)
    if (!post) {
      setTimeout(() => { navigate('/') }, 500);
      return;
    }

    const postOwnerId = post.$permissions[1]
      .replace('update("user:', '')
      .replace('")', '');
    setpostId(postOwnerId);

    async function getImageAndLikes() {
      try {
        const dbImg = await storageService.filePreview(post.Image);
        setImage(dbImg);

        const likesData = await appWriteService.getPostLikes(post.$id);
        setLikedPosts(likesData.documents);
        setLikes(likes + likesData.documents.length);

        const isLiked = likesData.documents.find(
          (user) => user.userId === userData.$id
        );
        if (isLiked) setisClicked(true);
      } catch (error) {
        console.log(error.message);
      } finally { setLoading(false) }
    }

    getImageAndLikes();
  }, [post, navigate]);


  const likePost = async () => {

    if (isClicked) {
      try {
        setLikes(likes - 1)
        setisClicked((pre) => !pre)
        const unLikePost = likedPosts.find(likedPost => likedPost.postId === post.$id)
        await appWriteService.disLikePost(unLikePost.$id)
      } catch (error) {
        console.log(error.message)
      }
    } else {
      try {
        setLikes(likes + 1)
        setisClicked((pre) => !pre)
        const dbLikedPost = await appWriteService.LikePost(userData.$id, post.$id)
        setLikedPosts(Array(dbLikedPost))
      } catch (error) {
        console.log(error.message)
      }
    }
  }
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
    navigate(`/post/${slug}/${post.$id}/edit`)
  }
  return (
    loading ? <p className='text-white text-center text-xl pt-40'>Please wait...</p> : <div className='w-full min-h-screen sm:p-10 p-5'>
      {(postId === userData?.userId || postId === userData?.$id) && (
        <div className='flex gap-3 top-18 sm:text-sm text-xs lg:right-50 right-2 absolute sm:right-15'>
          <button onClick={editPost} className='rounded bg-emerald-500 text-white p-1 sm:p-2'>📝Edit</button>
          <button onClick={deletePost} className='rounded bg-red-600 text-white p-1 sm:p-2'>🗑️ Delete</button>
        </div>
      )}
      <div className='w-full max-w-7xl sm:border rounded sm:border-white/5 min-h-screen mx-auto'>
        <div className='max-w-5xl mx-auto sm:h-xl flex mt-4 flex-col sm:flex-row sm:gap-30  items-center'>
        <div className='max-w-96 max-h-96 rounded-md overflow-hidden '>
          <img className='w-full object-cover ' src={image} alt='post_image' />
        </div>
        <h1 className='titl sm:text-5xl text-xl mt-5 font-semibold uppercase shadow text-white'>{post?.title}</h1>
      </div>
      <div className="reaction flex gap-2 w-full text-white text-2xl mt-10 justify-center items-center">
        <h1 className=" underline"> Content </h1>
        <div className='flex items-center gap-5 relative sm:text-xl text-[16px] left-[20%]'>
          <div onClick={likePost} className={`text-center ${isClicked ? 'text-red-500' : 'text-white'}`}><FaHeart />
            <h1 className='text-xs text-white'>{likes}</h1>
          </div>
        </div>
      </div>
      <div className=" max-w-5xl mx-auto mt-4 content text-white sm:text-lg text-sm font-light" dangerouslySetInnerHTML={{ __html: post?.content }} />
      </div>
    </div>
  )
}

export default Post
