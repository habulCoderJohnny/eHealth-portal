import React from 'react';
import loginBg from '../../assets/images/login.png';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Loading from '../SHARED/Loading/Loading';
import HelloUser from '../SHARED/HelloUser';


const SignUp = () => {

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const navigate = useNavigate();
    // console.log(user);

    let signInError;

    if (gLoading || updating) {
        return <Loading></Loading>
    }

    if (error || gError || updateError) {
        signInError = <div class="bg-orange-100 border-l-4 rounded border-orange-500 text-orange-700 p-4" role="alert">
        <p class="font-bold text-red-500">Error</p>
        <p>{error?.message || gError?.message || updateError.message}</p>
      </div>

    }
    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        console.log('user updated');
        navigate('/appointment');
    }

    if (user || gUser) {
        return <HelloUser></HelloUser>;
    }

    return (
        <div class="hero min-h-screen" style={{ background: `url(${loginBg})`, backgroundSize: 'cover' }}>
            <div class="hero-overlay bg-opacity-10"></div>

            <div class="card w-full max-w-lg shadow-2xl">
                <div class="text-center">
                    <h1 class="text-white text-5xl font-bold ">Sign Up now!</h1>
                </div>
                <div class="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-control">
                            <label class="label ">
                                <span class="label-text text-xl">Name</span>
                            </label>

                            <input type="text" placeholder="Name" class="input input-bordered input-secondary border-emerald-500  text-xl text-blue-400
                            "  {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Name is Required'
                                }
                            })} />


                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>



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

                            <input type="password" placeholder="password" class="input input-bordered input-secondary  border-red-500 text-xl text-blue-400" {...register("password", {
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

                        {signInError}
                        {loading && <Loading></Loading>}

                        <div class="form-control">
                            <input type="submit" value="Signup" class="btn btn-primary text-white" />
                        </div>
                    </form>
                    <p><small>New to Doctors Portal? <Link className=' hover:underline font-bold' to="/login">Already Have an Account?</Link></small></p>

                    <div class="divider">OR</div>

                    <button onClick={() => signInWithGoogle()} class="btn btn-outline">continue with google</button>
                </div>

            </div>
        </div>
    );
};

export default SignUp;