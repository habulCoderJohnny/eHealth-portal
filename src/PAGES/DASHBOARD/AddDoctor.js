import React from 'react';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Loading from '../SHARED/Loading/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json()))

    const onSubmit = async data => {
        console.log('form data', data);
    }
    if (isLoading) {
        return <Loading></Loading>
    }

    const doctorIcon = <FontAwesomeIcon className='min-h-full' icon={faUserDoctor} />
    const plusIcon = <FontAwesomeIcon className='min-h-lg' icon={faPlusCircle} />
    return (
        <div>
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
                    <select {...register("specialty")} class="select select-warning ">
                        {
                            services.map(s=><option key={s._id} value={s.name}>{s.name}</option>)
                        }
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xl">Photo</span>
                    </label>

                    <input type="file" className="input input-primary pt-1"  {...register("img", {
                        required: {
                            value: true,
                            message: 'Image is Required'
                        }
                    })} />


                    <label className="label p-1">
                        {errors.img?.type === 'required' && <span className="label-text-alt text-red-500">{errors.img.message}</span>}
                    </label>
                </div>

                <div className="form-control">
                    <button type="submit"
                        className="btn btn-primary text-white">{doctorIcon}{plusIcon}</button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;