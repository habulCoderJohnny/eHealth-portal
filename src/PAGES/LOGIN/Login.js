import React, { useEffect } from 'react';
import loginBg from '../../assets/images/login.png';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Loading from '../SHARED/Loading/Loading';
import ErrorMassages from '../SHARED/ErrorMassages';
import { toast } from 'react-toastify';
import useToken from '../../HOOKS/useToken';


const Login = () => {

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const { register, formState: { errors }, handleSubmit , getValues} = useForm();

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    console.log(user, gUser);

    const token = useToken(user || gUser);

    let signInError;

    useEffect( () =>{
        if (user || gUser) {
            navigate(from, { replace: true });
        }
    }, [token, from, navigate]);


    if ( gLoading) {
        return <Loading></Loading>
    }

    if (error || gError) {
        signInError = <ErrorMassages>{error?.message || gError?.message }</ErrorMassages>
    
    }

    const onSubmit = data => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password);
        console.log(data.email);
    }
        const handleReset = async ()=> {
            const email = getValues('email')
            console.log(email);
        if (email) {
            await sendPasswordResetEmail(email);
            toast('Sent email Reset your Password!');
        }
        else{
            toast('Please enter your email address!');
        }
    }

    return (
        <div className="hero min-h-screen" style={{ background: `url(${loginBg})`, backgroundSize: 'cover' }}>
            <div className="hero-overlay bg-opacity-10"></div>

            <div className="card w-full max-w-lg shadow-2xl">
                <div className="text-center">
                    <h1 className="text-white text-5xl font-bold ">Login now!</h1>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)} className="text-blue-600">
                        <div className="form-control">
                            <label className="label p-1">
                                <span className="label-text text-xl">Email</span>
                            </label>

                            <input type="email" placeholder="email" className="input input-secondary text-xl"  {...register("email", {
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
                            <label className="label">
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
                        { loading && <Loading></Loading>}

                        <div className="form-control">
                            <input type="submit" value="Login" className="btn btn-primary text-white input-error" />
                        </div>
                    </form>
                    <label className="label">
                            <button onClick={handleReset} className="label-text-alt link link-hover link-white">Forgot password?</button>
                        </label>
                    <p><small>New to Doctors Portal? <Link className=' hover:underline font-bold' to="/signup">Create New Account</Link></small></p>

                    <div className="divider">OR</div>

                    <button onClick={() => signInWithGoogle()} className="btn btn-outline">continue with google</button>
                </div>

            </div>
            
        </div>

    );
};

export default Login;