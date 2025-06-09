import { useSelector, useDispatch } from 'react-redux';
import { setallPosts } from '../store/postSlice';
import appWriteService from '../appwrite/services';
import PostCard from '../components/PostCard';
import { useEffect, useState } from 'react';
import Logo from '../assets/Login-PNG-Photo.png'
import { Link } from 'react-router-dom';
import authService from '../appwrite/auth';
import { login } from '../store/authSlice';
function Home() {

    const posts = useSelector(state => state.post.allPosts)
    const authStates = useSelector(state => state.auth.status)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        dispatch(login(userData));
      }

      const allPosts = await appWriteService.getAllPost("is_Active", "Active", "NotActive");
      dispatch(setallPosts(allPosts.documents));
    } catch (err) {
      console.log("Error fetching data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [authStates, dispatch]);

    if (!authStates) return <div className='max-w-2xl flex flex-col mx-auto gap-5 items-center sm:pt-10 pt-2'><img src={Logo} width={300} /><p className='text-white text-center text-sm sm:text-xl'><Link className='border border-white/15 p-1 rounded' to='/login'>login </Link> or <Link className='border border-white/15 p-1 rounded' to='/signup'>signup</Link> to create and read post</p> </div>
    return (
        loading ? <p className='text-white text-center text-xl mt-40'>Hold on blog's are loading...</p> : (posts.length === 0 ? <p className='text-white justify-center min-h-screen sm:text-2xl flex items-center text-xl'>Ohh no!😔, No Post Found</p> :
            <main className="container mx-auto px-4 py-5">
                <h1 className="text-xl font-bold mb-6 text-gray-100 ml-10">Explore the latest blog's</h1>
                <div className="sm:grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 flex flex-wrap gap-4 lg:px-2 w-full max-w-7xl mx-auto pt-5 pb-5 min-h-screen items-start">
                    {authStates && posts.map((post) => post.is_Active === "Active" && <PostCard key={post.$id} post={post} status={post.is_Active} />)}
                </div>
            </main>)
    )
}

export default Home
