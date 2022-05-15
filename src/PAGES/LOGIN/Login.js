import React from 'react';
import loginBg from '../../assets/images/login.png';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Loading from '../SHARED/Loading/Loading';



const Login = () => {

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const navigate = useNavigate();
    // console.log(user);

    let signInError;

    // if (loading || gLoading) {
    //     return <p>Loading.....</p>
    // }

    if (error || gError) {
        signInError = <p className='text-red-500'>{error?.message || gError?.message}</p>
    }

    if (  user || gUser ) {
        navigate('/home');
    }

    const onSubmit = data => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password);
    }

    return (
        <div class="hero min-h-screen" style={{ background: `url(${loginBg})`, backgroundSize: 'cover' }}>
            <div class="hero-overlay bg-opacity-10"></div>

            <div class="card w-full max-w-lg shadow-2xl my-50">
                <div class="text-center">
                    <h1 class="text-white text-5xl font-bold ">Login now!</h1>
                </div>
                <div class="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-control">
                            <label class="label ">
                                <span class="label-text text-xl">Email</span>
                            </label>

                            <input type="email" placeholder="email" class="input input-bordered input-secondary text-xl text-blue-400"  {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is Required'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid Email'
                                }
                            })} />


                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>


                        <div class="form-control">
                            <label class="label">
                                <span class="label-text text-xl">Password</span>
                            </label>

                            <input type="password" placeholder="password" class="input input-bordered input-secondary text-xl text-blue-400" {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is Required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Must be 6 characters or longer'
                                }
                            })} />


                            <label class="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>


                        <label class="label">
                            <button href=".." class="label-text-alt link link-hover link-white">Forgot password?</button>
                        </label>

                        {signInError}
                        { gLoading &&  <Loading></Loading>}

                        <div class="form-control">
                            <input type="submit" value="Login" class="btn btn-primary text-white" />
                        </div>
                    </form>

                    <div class="divider">OR</div>

                    <button onClick={() => signInWithGoogle()} class="btn btn-outline">continue with google</button>
                </div>

            </div>
        </div>

    );
};

export default Login;




















