import React from 'react';
import loginbg from '../../assets/images/login.png';
const Login = () => {
    return (
        <div class="hero min-h-screen" style={{background: `url(${loginbg})`, backgroundSize:'cover'}}>
            <div class="hero-overlay bg-opacity-40"></div>

            <div class="card w-full max-w-lg shadow-2xl my-50">
            <div class="text-center">
                        <h1 class="text-white text-5xl font-bold ">Login now!</h1>
                    </div>
                        <div class="card-body">
                            <div class="form-control">
                                <label class="label ">
                                <span class="label-text text-xl ">Email</span>
                                </label>



                                <input type="text" placeholder="email" class="input input-bordered input-secondary text-xl text-blue-400" />
                                </div>
        


                            <div class="form-control">
                                <label class="label">
                                <span class="label-text text-xl ">Password</span>
                                </label>



                                <input type="text" placeholder="password" class="input input-bordered input-secondary text-xl text-blue-400" />




                                <label class="label">
                                    <button href=".." class="label-text-alt link link-hover link-white">Forgot password?</button>
                                </label>
                            </div>



                            <div class="form-control mt-6">
                                <button class="btn btn-primary">Login</button>
                            </div>
                        </div>
                </div>
        </div>

    );
};

export default Login;



















