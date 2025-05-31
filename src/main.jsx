import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import Home from './pages/Home.jsx';
import AuthLayout from './components/Layout/AuthLayout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import AddPost from './pages/AddPost.jsx';
import Post from './pages/PostPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<AuthLayout authantication="false"><LoginPage /></AuthLayout>} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/addpost' element={<AddPost />} />
      <Route path={`/post/:slug`} element={<Post />} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>

  </Provider>

)
