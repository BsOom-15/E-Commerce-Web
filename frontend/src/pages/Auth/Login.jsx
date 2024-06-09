import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/featuers/auth/authSlice';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../redux/api/usersSlice';
import Loader from '../../components/Loader';
import background from '../../img/pexels-anniroenkae-2318068.jpg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector(state => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const submitHandeler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap();
            console.log(res);
            dispatch(setCredentials({...res}));
        } catch (error) {
            toast.error(error?.data?.message||error.message)
        }
    }
    

    return (
        <div>
            <section className="pl-[10rem] flex">
                <div className="mr-[4rem] mt-[5rem]">
                    <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
                    <form onSubmit={submitHandeler} className="container w-[40rem]">
                        <div className="my-[2rem]">
                            <label htmlFor="email" className='block text-sm font-medium' >Email Address</label>
                            <input 
                            type="email"
                            id='email'
                            className='mt-1 p-2 border rounded w-full bg-black'
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            />
                        </div>


                        <div className="my-[2rem]">
                            <label htmlFor="password" className='block text-sm font-medium' >password</label>
                            <input 
                            type="password"
                            id='password'
                            className='mt-1 p-2 border rounded w-full bg-black'
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            />
                        </div>

                        <button disabled={isLoading} type='submit' className=' bg-pink-500 px-4 py-2 rounded cursor-pointer my-[1rem]'>
                        {isLoading? 'Signing In ...': 'Sign In'}
                        </button>

                        {isLoading && <Loader />}
                    </form>

                    <div className="mt-4">
                        <p>
                            New Customer ? {" "}
                            <Link to={redirect ? `/register?redirect=${redirect}`: `/register`} className='text-pink-500 hover:underline' >Register</Link>
                        </p>
                    </div>
                </div>

                    <img
                    src={background}
                    alt=""
                    className="h-[44rem] w-[100%] overflow-x-hidden xl:block md:hidden sm:hidden rounded-lg"
                />

            </section>
        </div>
    );
}

export default Login;
