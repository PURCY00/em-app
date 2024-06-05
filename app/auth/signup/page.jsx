"use client";

import ImageWrapper from "../../components/ImageWrapper";
import { Icon } from "@iconify/react";
import axios from "axios";
import logo from "@/public/logo.png";
import { fn } from "@/utils/utilityFunction";
import Link from "next/link";
import { Button } from "rsuite";
import { useForm } from "react-hook-form";
import { useRouter, redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Signup = () => {
    const { data: session } = useSession();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleMyForm = async (data) => {
        setLoading(true);
        setErrorMessage("");
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_BASEURL}/api/auth/userExists`, {
                email: data.email,
            });
            if (res.data.user) {
                setLoading(false);
                setErrorMessage("User already exists");
                return;
            } else {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_BASEURL}/api/auth/register`, data);
                if (response.status === 201) {
                    setLoading(false);
                    router.push(`/auth/signin`);
                }
            }
        } catch (error) {
            setLoading(false);
            setErrorMessage("An error occurred. Please try again.");
            console.error(error);
        }
    };

    useEffect(() => {
        if (session?.user) redirect("/");
    }, [session?.user]);

    return (
        <section>
            <div className='text-center flex flex-col items-center mb-5'>
                <Link href='/'>
                    <ImageWrapper src={logo} alt='logo' width={fn.rem(100)} height={fn.rem(50)} objectFit='contain' />
                </Link>
                <h1 className='text-h1 font-semibold'>Welcome to EM</h1>
                <h6 className='text-h6'>Sign up for free</h6>
            </div>
            <form onSubmit={handleSubmit(handleMyForm)} style={{ maxWidth: fn.rem(500) }}>
                <div className='my-2 flex items-center border-2 border-emGrey rounded-md overflow-hidden bg-emBgColor'>
                    <div className='text-2xl px-2 text-emBlue'>
                        <Icon icon='ic:outline-email' />
                    </div>
                    <input
                        id='email'
                        type='email'
                        placeholder='Email'
                        className='block w-full bg-transparent p-1'
                        {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                    />
                </div>
                {errors.email && <p className='text-red-500 text-xs italic'>{errors.email.message}</p>}

                <div className='my-2 flex items-center border-2 border-emGrey rounded-md overflow-hidden bg-emBgColor'>
                    <div className='text-2xl px-2 text-emBlue'>
                        <Icon icon='lets-icons:user' />
                    </div>
                    <input
                        id='username'
                        placeholder='Username'
                        className='block w-full bg-transparent p-1'
                        {...register("name", { required: "Username is required" })}
                    />
                </div>
                {errors.username && <p className='text-red-500 text-xs italic'>{errors.name.message}</p>}

                <div className='my-2 flex items-center border-2 border-emGrey rounded-md overflow-hidden bg-emBgColor'>
                    <div className='text-2xl px-2 text-emBlue'>
                        <Icon icon='tabler:lock' />
                    </div>
                    <input
                        id='password'
                        placeholder='Password'
                        type='password'
                        className='block w-full bg-transparent p-1'
                        {...register("password", { required: "Password is required" })}
                    />
                </div>
                {errors.password && <p className='text-red-500 text-xs italic'>{errors.password.message}</p>}

                <div className='my-2 flex items-center border-2 border-emGrey rounded-md overflow-hidden bg-emBgColor'>
                    <div className='text-2xl px-2 text-emBlue'>
                        <Icon icon='tabler:lock' />
                    </div>
                    <input
                        id='confirm_password'
                        placeholder='Confirm Password'
                        type='password'
                        className='block w-full bg-transparent p-1'
                        {...register("confirm_password", {
                            required: "Confirm Password is required",
                            validate: (value) => value === document.getElementById("password").value || "Passwords do not match",
                        })}
                    />
                </div>
                {errors.confirm_password && <p className='text-red-500 text-xs italic'>{errors.confirm_password.message}</p>}

                <div className={`my-4`}>
                    <Button loading={isLoading} type='submit' className='bg-emBlue text-white w-full'>
                        Sign up
                    </Button>
                    {errorMessage && (
                        <div className='bg-red-100 border border-red-400 text-red-700 px-4 my-3 rounded relative' role='alert'>
                            <p className='block sm:inline text-xs'>{errorMessage}</p>
                        </div>
                    )}
                </div>
                <div className='w-full text-xs'>
                    <p className='my-3'>
                        Already have an account?
                        <Link href='/auth/signin' className='ml-1 text-emBlue font-bold'>
                            Sign In
                        </Link>
                    </p>
                    <p className='text-emGrey'>
                        By signing up you accept our Privacy Policy, Terms & Licensing Agreement. Protected by reCAPTCHA. Google Privacy Policy & Terms apply.
                    </p>
                </div>
            </form>
        </section>
    );
};

export default Signup;
