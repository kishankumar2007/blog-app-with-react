import { useState } from 'react'
import { RTE, Input } from '../../index'
import { useForm } from 'react-hook-form'
import appWriteService from '../appwrite/services'
import storageService from '../appwrite/storage'
import { ID } from 'appwrite'

function CreatePost() {
    const [slug, setSlug] = useState('')
    const { register, handleSubmit, control, reset } = useForm()


    const createPost = async (data) => {
        try {
            const file = await storageService.createFile(ID.unique(), data['Image'][0])
            if (file) {
                await appWriteService.createPost({ title: data.Title, Image: file.$id, content: data.content, userId: ID.unique(), auther: data.Auther, slug: data.Slug, is_Active: data.is_Active })
                alert("Your post is live now")
                reset()
            }
        } catch (error) {
            console.log(error.message)
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
                            required: true,
                            onChange: (e) => { createSlug(e.target.value) }
                        })} />
                        <Input className='max-w-4xl py-2 w-full' value={slug} label='Slug' placeholder='Your slug here..' readOnly {...register('Slug', { required: true })} />
                    </div>
                    <div className='sm:w-1/3 w-full'>
                        <Input className='max-w-70 py-2 w-full' type='file' label='Featured Image'{...register('Image', { required: true })} />
                        <Input className='max-w-40 py-2 w-full' type='text' placeholder="Auther name" label='Auther'{...register('Auther', { required: true })} />
                        <label className='text-white' htmlFor="Status">Status</label>
                        <select className='bg-white/50 m-2 text-black' name="Status" id="Status" {...register('is_Active', { required: true })}>
                            <option value="Active">Active</option>
                            <option value="NotActive">NotActive</option>
                        </select>
                        <Input className="bg-violet-600 h-[40px]" type='submit' value="Submit" />
                    </div>
                    <RTE control={control} />
                </form>
            </div>
        </div>
    )
}

export default CreatePost
