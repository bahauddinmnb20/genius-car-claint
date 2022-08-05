import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddService = () => {
    const [user, userData] = useState(null)
    const { register, handleSubmit,reset } = useForm();
    console.log(handleSubmit)
    const onSubmit = data => {
        // console.log(data.name);
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
                userData(result);
                console.log(result)
                if (result.insertedId) {
                    toast('Your order is success!!!');
                    
                }
            });


    };
    useEffect(() => {
        reset(user)
      }, [user]);
    
    return (
        <div className='w-50 mx-auto mt-5'>
            <h2 className='text-center'>please add service</h2>
            <form className='mt-3 d-flex flex-column gap-2  accordion-body' onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name", { required: true, maxLength: 20 })} placeholder='name' required />
                <textarea {...register("description")} placeholder='description' required />
                <input type="number" {...register("price")} placeholder='price' required />
                <input type="text" {...register("img")} placeholder='photo URL' required />
                <input type="submit" value={'Add-Service'} />
            </form>
        </div>
    );
};

export default AddService;