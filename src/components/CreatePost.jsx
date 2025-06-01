import { useState } from 'react'
import { RTE, Input } from '../../index'
import { useForm } from 'react-hook-form'
import appWriteService from '../appwrite/services'
import storageService from '../appwrite/storage'
import { ID } from 'appwrite'

function CreatePost() {
    const [slug, setSlug] = useState('')
    const [error,setError] = useState('')
    const { register, handleSubmit, control,formState:{errors}, reset } = useForm()


    const createPost = async (data) => {
        try {
                  setError('')
            const file = await storageService.createFile(ID.unique(), data['Image'][0])
            if (file) {
                await appWriteService.createPost({ title: data.Title, Image: file.$id, content: data.content, userId: ID.unique(), auther: data.Auther, slug: data.Slug, is_Active: data.is_Active })
                alert("Your post is live now")
                reset()
            }
        } catch (err) {
            setError(err.message)
        }
    }
    const createSlug = (data) => {
        const updatedSlug = String(data).replace(/\s+/g, '-')
        setSlug(updatedSlug.toLowerCase())
    }
    return (
        <div className='w-full bg-slate-950 min-h-screen'>
            <div className="main max-w-7xl w-full mx-auto min-h-screen ">
                <form className='flex flex-wrap gap-3 pt-5 px-4 justify-center' onSubmit={handleSubmit(createPost)}>

                    <div className='sm:w-1/2 space-y-5 w-full'>
                        <Input className='max-w-4xl py-2 w-full text-white placeholder:text-gray-400' label="Title" placeholder='Enter your title' {...register('Title', {
                            required: {value: true, message:"Title is required"},
                            minLength: {value: 5, message:"Title must be min of 5 letter"},
                            onChange: (e) => { createSlug(e.target.value) }
                            })} />
                                      {errors?.Title && <p className='text-red-600 text-sm mb-1'>{errors.Title?.message}</p>}

                        <Input className='max-w-4xl py-2 w-full' value={slug} label='Slug' placeholder='Your slug here..' readOnly {...register('Slug', { required: true })} />
                    </div>
                    <div className='sm:w-1/3 w-full'>
                        <Input className='max-w-70 py-2 w-full' type='file' label='Featured Image'{...register('Image', { required: {value:true,message:"image field can't be empty"} })} />
                                  {errors?.Image && <p className='text-red-600 text-sm mb-1'>{errors.Image?.message}</p>}

                        <Input className='max-w-40 py-2 w-full' type='text' placeholder="Auther name" label='Auther'{...register('Auther', { required: {value: true, message:"Auther name is required"} })} />
                                  {errors?.Auther && <p className='text-red-600 text-sm mb-1'>{errors.Auther?.message}</p>}

                        <label className='text-white' htmlFor="Status">Status</label>
                        <select className='bg-white/50 m-2 text-black' name="Status" id="Status" {...register('is_Active', { required: true })}>
                            <option value="Active">Active</option>
                            <option value="NotActive">NotActive</option>
                        </select>
                        <Input className="bg-violet-600 h-[40px]" type='submit' value="Submit" />
                    </div>
                      {error && <p className='text-red-600 text-sm mb-1'>{error}</p>}
                    <RTE control={control} />
                </form>
            </div>
        </div>
    )
}

export default CreatePost
