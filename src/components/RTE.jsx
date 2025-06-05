import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'

function RTE({ control }) {
    return (
        <div className='max-w-4xl'>
            <Controller
                name='content'
                control={control}
                defaultValue=''
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='35i92ne7ovktt2tcqdvmcepzqk8h7om5h3duyws0kpili4dl'
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />


        </div>
    )
}

export default RTE
