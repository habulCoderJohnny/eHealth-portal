import React, { useEffect } from 'react';
import loginBg from '../../assets/images/login.png';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Loading from '../SHARED/Loading/Loading';
import WelcomeUser from '../SHARED/WelcomeUser';
import ErrorMassage from '../SHARED/ErrorMassage';
import { toast } from 'react-toastify';
import useToken from '../../HOOKS/useToken';


const SignUp = () => {

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth,  {sendEmailVerification: true});

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [token] = useToken(user || gUser);

    const navigate = useNavigate();
    // console.log(user);

    let signInError;

    useEffect( () =>{
        if (token) {
         navigate('/dashboard');
         return <WelcomeUser></WelcomeUser>;
        }
    }, [token,navigate]);

    if (gLoading || updating) {
        return <Loading></Loading>
    }

    if (error || gError || updateError) {
        signInError = <ErrorMassage>{error?.message || gError?.message || updateError.message}</ErrorMassage>
    }

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        console.log('user updated', user, gUser);
        if ({sendEmailVerification:true}) {
            await toast('Sent email Verification mail check your inbox/spam!');
        }
    }
   
    return (
        <div className="hero min-h-screen" style={{ background: `url(${loginBg})`, backgroundSize: 'cover' }}>
            <div className="hero-overlay bg-opacity-10"></div>

            <div className="card w-full max-w-lg shadow-2xl">
                <div className="text-center">
                    <h1 className="text-white text-5xl font-bold ">Sign Up now!</h1>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)} className="text-blue-600">
                        <div className="form-control">
                            <label className="label p-0">
                                <span className="label-text text-xl">Name</span>
                            </label>

                            <input type="text" placeholder="Name" className="input input-secondary   text-xl"  {...register("name", {
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

                            <input type="email" placeholder="email" className="input input-secondary text-xl" {...register("email", {
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
                            <label className="label p-0">
                                <span className="label-text text-xl">Password</span>
                            </label>

                            <input type="password" placeholder="password" className="input input-error text-xl" {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is Required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Must be 6 characters or longer'
                                }
                            })} />

                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>

                        {signInError}
                        {loading && <Loading></Loading>}

                        <div className="form-control">
                            <input type="submit" value="Signup" className="btn btn-primary text-white" />
                        </div>
                    </form>
                    <p><small>New to Doctors Portal? <Link className=' hover:underline font-bold' to="/login">Already Have an Account?</Link></small></p>

                    <div className="divider">OR</div>

                    <button onClick={() => signInWithGoogle()} className="btn btn-outline">continue with google</button>
                </div>

            </div>
        </div>
    );
};

export default SignUp;