import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/featuers/auth/authSlice';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../redux/api/usersSlice';
import Loader from '../../components/Loader';
import background from '../../img/pexels-mia-stein-3894157.jpg';

const Register = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const [ register , {isLoding}] = useRegisterMutation();
    const {userInfo} = useSelector(state => state.auth);

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const submitHandeler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords Do Not Match !..')
        } else {
            try {
                const res = await register({username, password, email}).unwrap();
                dispatch(setCredentials({...res}));
                navigate(redirect);
                toast.success("User Successfully Registered")
            } catch (error) {
                console.log(error);
                toast.error(error.data.message)
            }
        }
    }

    return (
        <div className="pl-[10rem] flex">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4">Register</h1>
                <form
        onSubmit={submitHandeler}
        className='container w-[40rem] '>
        <div className="my-[2rem]">
            <label 
            htmlFor="name" 
            className='block text-sm font-medium'>
                Name
            </label>
            <input 
            type="text"
            id='name'
            className='mt-1 p-2 border rounded w-full  bg-black'
            placeholder='Enter Name'
            value={username}
            onChange={(e)=>setUserName(e.target.value)}
            
            />
        </div>
        <div className="my-[2rem]">
            <label htmlFor="email" 
            className='block text-sm font-medium'>
                Email
            </label>
            <input 
            type="email"
            id='email'
            className='mt-1 p-2 border rounded w-full  bg-black'
            placeholder='Enter Your Email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
        </div>
        <div className="my-[2rem]">
            <label 
            htmlFor="password" 
            className='block text-sm font-medium'>
                Password
            </label>
            <input 
            type="password"
            id='password'
            className='mt-1 p-2 border rounded w-full  bg-black'
            placeholder='Enter Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
        </div>
        <div className="my-[2rem]">
            <label 
            htmlFor="confirmPassword" 
            className='block text-sm font-medium'>
                Confirm Password
            </label>
            <input 
                type="password"
                id='confirmPassword'
                className='mt-1 p-2 border rounded w-full  bg-black'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
        </div>

        {isLoding && <Loader/>}
        <button 
            disabled={isLoding}
            type='submit'
            className='bg-pink-500 px-4 py-2 rounded cursor-pointer my-[1rem]'>
            {isLoding ? "Registering...." : "Register"}
        </button>

        </form>
                <div className="mt-4">
                    <p>
                        Already Have Account?{" "}
                        <Link
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}
                            className='text-pink-500 hover:underline'
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
            <img
                src={background}
                alt=""
                className="h-[44rem] w-[100%] overflow-x-hidden xl:block md:hidden sm:hidden rounded-lg"
            />
        </div>
    )
}

export default Register;
