import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import appWriteService from '../appwrite/services'
import storageService from '../appwrite/storage'
import { useParams } from 'react-router-dom'
import Updatepost  from './CreatePost'

function UpdatePost() {

const { postId } = useParams()
const post = useSelector(state => state.post.allPosts.find(post => post.$id === postId ))


  return (
    <div className='w-full min-h-screen px-2 md:px-10'>
       <Updatepost post={post}/>
    </div>
  )
}

export default UpdatePost
