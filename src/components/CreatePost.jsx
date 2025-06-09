import { useState } from 'react'
import { RTE, Input } from '../../index'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import appWriteService from '../appwrite/services'
import storageService from '../appwrite/storage'
import { ID } from 'appwrite'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function CreatePost({ post = "" }) {
    const [slug, setSlug] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            is_Active: post?.is_Active || "Active",
            Title: post?.title || '',
            Slug: post?.slug || post?.title,
            Auther: post.auther || '',
        }
    })

    const createPost = async (data) => {
        try {
            setLoading(true)
            setError('')
            const file = await storageService.createFile(ID.unique(), data['Image'][0])
            if (file && userData?.$id) {
                await appWriteService.createPost({
                    title: data.Title,
                    Image: file.$id,
                    content: data.content,
                    userId: userData.$id,
                    auther: data.Auther,
                    slug: data.Slug,
                    is_Active: data.is_Active,
                })
                toast.success('Post is live now', {
                    position: "top-left",
                    autoClose: 1000,
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
                });
                navigate('/')
                reset()
                setSlug('')
                setLoading(false)
            }
        } catch (err) {
            setError(err.message)
        } finally { () => setLoading(false) }
    }

    const createSlug = (data) => {
        const updatedSlug = String(data).trim().replace(/\s+/g, '-').toLowerCase()
        setSlug(updatedSlug)
    }

    const updatePost = async (data) => {
        if (post.title === data.Title && post.auther === data.Auther && post.content === data.content && post.is_Active === data.is_Active) {
            toast.info('No change found', {
                position: "top-left",
                autoClose: 1000,
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
            });
            return
        }
        try {
            setLoading(true)
            let imageId = post?.Image;
            if (data['Image'] && data['Image'][0]) {
                await storageService.deleteFile(post?.Image);
                const file = await storageService.createFile(ID.unique(), data.Image[0]);
                if (file) {
                    imageId = file.$id;
                }
            }
            await appWriteService.updatePost(post.$id, {
                title: data.Title,
                Image: imageId,
                content: data.content,
                auther: data.Auther,
                slug: data.Slug,
                is_Active: data.is_Active
            });
            toast.success('updated successfully', {
                position: "top-left",
                autoClose: 1000,
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
            });
            setTimeout(() => navigate('/'), 500)
        } catch (error) {
            console.log("Update failed:", error.message);
        } finally { () => setLoading(false) }
    };



    return (
        <div className='w-full bg-slate-950 min-h-screen'>
            <div className='main max-w-7xl w-full mx-auto min-h-screen'>
                <form className='flex flex-wrap gap-3 pt-5 px-4 justify-center' onSubmit={handleSubmit(post ? updatePost : createPost)}>
                    <div className='sm:w-1/2 space-y-5 w-full'>
                        <Input
                            className='max-w-4xl py-2 w-full text-white placeholder:text-gray-400'
                            label='Title'
                            placeholder='Enter your title'
                            {...register('Title', {
                                required: { value: true, message: 'Title is required' },
                                minLength: { value: 5, message: 'Title must be at least 5 letters' },
                                onChange: (e) => { createSlug(e.target.value) },
                            })}
                        />
                        {errors?.Title && <p className='text-red-600 text-sm mb-1'>{errors.Title.message}</p>}

                        <Input
                            className='max-w-4xl py-2 w-full'
                            label='Slug'
                            value={slug || post?.slug || ''}
                            placeholder='Your slug here..'
                            readOnly
                            {...register('Slug', { required: true })}
                        />
                    </div>

                    <div className='sm:w-1/3 w-full'>
                        <Input
                            className='max-w-70 py-2 w-full'
                            type='file'
                            label='Featured Image'
                            {...register('Image', {
                                required: { value: post ? false : true, message: "Image field can't be empty" }
                            })}
                        />
                        {errors?.Image && <p className='text-red-600 text-sm mb-1'>{errors.Image.message}</p>}

                        <Input
                            className='max-w-40 py-2 w-full'
                            type='text'
                            placeholder='Author name'
                            label='Author'
                            {...register('Auther', {
                                required: { value: true, message: 'Author name is required' },
                            })}
                        />
                        {errors?.Auther && <p className='text-red-600 text-sm mb-1'>{errors.Auther.message}</p>}

                        <label className='text-white' htmlFor='Status'>
                            Status
                        </label>
                        <select
                            className='bg-white/50 m-2 text-black'
                            name='Status'
                            id='Status'
                            {...register('is_Active', { required: true })}
                        >
                            <option value='Active'>Active</option>
                            <option value='NotActive'>NotActive</option>
                        </select>

                        <button className='bg-violet-600 h-[40px] w-full rounded text-white' type='submit'>
                            {loading ? "Please wait..." : (post ? "Update Post" : "Create Post")}
                        </button>
                    </div>

                    {error && <p className='text-red-600 text-sm mb-1'>{error}</p>}

                    <div className='w-full max-w-5xl flex flex-col items-center mt-4 mx-auto'>
                        <label className='text-white text-lg text-center'>Content</label>
                        <RTE control={control} content={post?.content} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
