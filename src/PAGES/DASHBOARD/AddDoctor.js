import React from 'react';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Loading from '../SHARED/Loading/Loading';
import { toast } from 'react-toastify';
import doctorbg from '../../assets/images/add-doctorbg.png';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit,reset } = useForm();
    const { data: services, isLoading } = useQuery('services', () => fetch('https://e-health-server.herokuapp.com/service').then(res => res.json()))

    const imgStorageKey = 'c2bea01b598a44c1d5794b15a892a262';

    const onSubmit = async data => {
        //user inputted img stored to a third party server
        console.log('form:', data);
        const inputImg = data.image[0];
        const formData = new FormData(); 
        formData.append('image', inputImg);
        const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res=>res.json())
        .then(result =>{
            console.log('imgbb', result);
            if (result.success) {
                const image = result.data.url;
                const doctor = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: image
                } 
                //SEND TO DATABASE
                fetch('https://e-health-server.herokuapp.com/doctor',{
                    method: 'POST',
                    headers:{'content-type': 'application/json',    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res=>res.json())
                .then(inserted =>{
                    console.log('doctor image sent',inserted);
                    if (inserted.insertedId) {
                        toast.success('Doctor added successfully')
                        reset();
                    }
                    else{
                        toast.error('Doctor adding failed try later!')
                    }
                })
            }
        })

    }
    if (isLoading) {
        return <Loading></Loading>
    }
    

    const doctorIcon = <FontAwesomeIcon className='min-h-full' icon={faUserDoctor} />
    const plusIcon = <FontAwesomeIcon className='min-h-lg' icon={faPlusCircle} />
    return (
        <div className="hero min-full-screen bg-repeat-none" style={{ background: `url(${doctorbg})`, backgroundSize: 'cover' }}>
        <div className="hero-overlay bg-opacity-70"></div>

        <div className="card w-full max-w-lg shadow-2xl">
            <h1 className='text-center text-5xl'>Add a <small className='text-[#007C92]'>Doctor</small></h1>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto text-blue-600">
                <div className="form-control">
                    <label className="label p-0">
                        <span className="label-text text-xl">Name</span>
                    </label>

                    <input type="text" placeholder="Name" className="input input-primary text-xl"  {...register("name", {
                        required: {
                            value: true,
                            message: 'Name is Required'
                        }
                    })} />


                    <label className="label p-1">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                <div className="form-control">
                    <label className="label p-1">
                        <span className="label-text text-xl">Email</span>
                    </label>

                    <input type="email" placeholder="email" className="input input-primary text-xl" {...register("email", {
                        required: {
                            value: true,
                            message: 'Email is Required'
                        },
                        pattern: {
                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                            message: 'Provide a valid Email'
                        }
                    })} />


                    <label className="label p-1">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    </label>
                </div>


                <div className="form-control">
                    <label className="label p-1">
                        <span className="label-text text-xl">Select Specialty</span>
                    </label>
                    <select {...register("specialty")} className="select select-warning">
                        {
                            services.map(s=><option key={s._id} value={s.name}>{s.name}</option>)
                        }
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xl">Photo</span>
                    </label>

                    <input type="file" className="input input-bordered pt-1" {...register("image", {
                        required: {
                            value: true,
                            message: 'Image is Required'
                        }
                    })} />


                    <label className="label p-1">
                        {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                    </label>
                </div>

                <div className="form-control">
                    <button type="submit"
                        className="btn btn-primary text-white">{doctorIcon}{plusIcon}</button> <br />
                </div>
            </form>
        </div>
        </div>
    );
};

export default AddDoctor;

/**
     * 3 WAY TO STORE IMG
     * 1. Third party storage //Free open public storage is ok for Practice project 
     * 2. Your own storage in your own server (file system)
     * 3. Database: Mongodb 
     * 
     * YUP: to validate file: Search: Yup file validation for react hook form
*/