import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { Home, AuthLayout, SignupPage, AddPost, MyPost, Post, UpdatePost ,LoginPage} from './pages/page.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<AuthLayout authantication="false"><LoginPage /></AuthLayout>} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/addpost' element={<AddPost />} />
      <Route path='/mypost' element={<MyPost />} />
      <Route path='/post/:slug' element={<Post />} />
      <Route path='/post/:slug/:postId/edit' element={<UpdatePost />} />
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
