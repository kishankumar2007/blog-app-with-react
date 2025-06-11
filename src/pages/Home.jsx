import { useSelector, useDispatch } from 'react-redux';
import { setallPosts } from '../store/postSlice';
import appWriteService from '../appwrite/services';
import { useEffect} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../appwrite/auth';
import { login } from '../store/authSlice';
import LandingPage from './LandingPage';

function Home() {

  const posts = useSelector(state => state.post.allPosts)
  const authStates = useSelector(state => state.auth.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParmas] = useSearchParams()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPosts = await appWriteService.getAllPost("is_Active", "Active", "NotActive");
        dispatch(setallPosts(allPosts.documents));
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        }
        const post = searchParmas.get('post')
        if (post) navigate(`/post/${post}`)
      } catch (err) {
        console.log("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, [authStates, dispatch]);

  return (
  <div className='w-full max-w-7xl mx-auto min-h-screen'>
    <LandingPage posts={posts} authStates={authStates} />
  </div>
  )
}

export default Home
