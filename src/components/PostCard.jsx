import React, { useEffect, useState } from 'react';
import storageService from '../appwrite/storage';
import { useNavigate, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostCard = ({ post,className='', ...props}) => {
  const [image, setImage] = useState(null)
  const userData = useSelector(state => state.auth.userData)
  const navigate = useNavigate()
  useEffect(() => {
    const getFilePreview = async () => {
      try {
        setImage(null)
        const file = await storageService.filePreview(post.Image);
        setImage(file);
      } catch (error) {
        console.error(error.message);
      }
    };

    getFilePreview();
  }, [post.Image]);


  return (
    <div onClick={() =>  navigate(`/post/${post.slug}`)} className={`bg-[#1E1E2F]/80 rounded-md max-w-[300px] w-full h-[320px] hover:scale-105 transition-all duration-300 p-2 ease-in-out hover:bg-[#1E1E2F] space-y-2 flex flex-col`}>
      <img src={image} alt="Post" className="w-full h-48 object-cover rounded mb-4" />
      <h2 className="text-xl text-white whitespace-nowrap text-nowrap truncate font-semibold mb-2">{post.title}</h2>
      <div className="truncate text-xs w-full overflow-hidden max-h-5 h-full flex font-semibold text-white/80 tracking-wider mb-2" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className='flex w-full justify-between'>
        <h2 className="text-gray-400 text-xs">Auther: {post.auther}</h2>
        {post.userId === userData.$id && <h2 className={`px-2 py-1 tracking-wider text-xs rounded-lg text-gray-100/70 ${props.status === "Active" ? "bg-emerald-600/20 border border-emerald-700":"bg-red-600/20 border border-red-700"} `}>{props.status}</h2>}
      </div>
    </div>
  );
};

export default PostCard;
