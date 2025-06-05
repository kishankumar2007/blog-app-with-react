import React, { useEffect, useState } from 'react';
import storageService from '../appwrite/storage';
import { useNavigate} from 'react-router-dom';

const PostCard = ({ post }) => {
  const [image, setImage] = useState(null)
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
    <div onClick={() =>  navigate(`/post/${post.slug}`)} className="bg-[#212121]/50 w-70 h-80 border border-white/10 p-2 mx-auto rounded shadow-md hover:shadow-lg transition">
      <img src={image} alt="Post" className="w-full h-48 object-cover rounded mb-4" />
      <h2 className="text-xl text-white/80 whitespace-nowrap text-nowrap truncate font-semibold mb-2">{post.title}</h2>
      <div className="truncate text-xs w-full overflow-hidden max-h-5 h-full flex font-semibold text-white/60 tracking-wider mt-4 mb-2" dangerouslySetInnerHTML={{ __html: post.content }} />
      <h2 className="text-white/40 text-xs">Auther: {post.auther}</h2>
    </div>
  );
};

export default PostCard;
