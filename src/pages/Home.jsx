import { useSelector, useDispatch } from 'react-redux';
import { setallPosts } from '../store/postSlice';
import appWriteService from '../appwrite/services';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../appwrite/auth';
import { login } from '../store/authSlice';
import LandingPage from './LandingPage';

function Home() {

  const posts = useSelector(state => state.post.allPosts)
  const authStates = useSelector(state => state.auth.status)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParmas] = useSearchParams()


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const allPosts = await appWriteService.getAllPost("is_Active", "Active", "NotActive");
        dispatch(setallPosts(allPosts.documents));
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate('/')
        }
        const post = searchParmas.get('post')
        if (post) navigate(`/post/${post}`)
      } catch (err) {
        console.log("Error fetching data:", err.message);
      } finally { setLoading(false) }
    }

    fetchData();
  }, []);

  return (
    <div className='w-full max-w-7xl mx-auto min-h-screen'>
      {loading ? <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-teal-400 border-dotted rounded-full animate-[spin_2s_linear_infinite]"></div>
      </div> : <LandingPage posts={posts} authStates={authStates} />}
    </div>
  )
}

export default Home
