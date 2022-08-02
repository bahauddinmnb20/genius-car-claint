import React from 'react';
import { useForm } from 'react-hook-form';

const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {

        const url = `https://shielded-crag-04533.herokuapp.com/service`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
            })
        data.reset()
    };
    return (
        <div className='w-50 mx-auto mt-5'>
            <h2 className='text-center'>please add service</h2>
            <form className='mt-3 d-flex flex-column gap-2  accordion-body' onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name", { required: true, maxLength: 20 })} placeholder='name' />
                <textarea {...register("description")} placeholder='description' />
                <input type="number" {...register("price")} placeholder='price' />
                <input type="text" {...register("img")} placeholder='photo URL' />
                <input type="submit" value={'Add-Service'} />
            </form>
        </div>
    );
};

export default AddService;