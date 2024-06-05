"use client";

import ImageWrapper from "@/app/components/ImageWrapper";
import { Icon } from "@iconify/react";
import logo from "@/public/logo.png";
import { Button, Checkbox } from "rsuite";
import { fn } from "@/utils/utilityFunction";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";

const SignIn = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        criteriaMode: "all",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMessage("");
        try {
            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            if (res.ok) {
                router.push("/");
            } else {
                setErrorMessage("Invalid email or password");
            }
        } catch (err) {
            setErrorMessage("An error occurred. Please try again.");
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <section>
            {/* header */}
            <div className='text-center flex flex-col items-center mb-5'>
                <Link href='/'>
                    <ImageWrapper src={logo} alt='logo' width={fn.rem(100)} height={fn.rem(50)} objectFit='contain' />
                </Link>
                <h1 className='text-h1 font-semibold'>Welcome back to EM</h1>
                <h6 className='text-h6'>Sign in to your account</h6>
            </div>
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: fn.rem(500) }}>
                {/* email */}
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

                {/* password */}
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

                <div className='flex items-center justify-between text-xs mb-3'>
                    <Checkbox>Remember me</Checkbox>
                    <Link href='/auth/forgot-password'>
                        <p className='underline'>Forgot Password?</p>
                    </Link>
                </div>

                {/* submit button */}
                <div>
                    <Button loading={isLoading} type='submit' className='bg-emBlue text-white w-full'>
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                    {errorMessage && (
                        <div className='bg-red-100 border border-red-400 text-red-700 px-4 my-3 rounded relative' role='alert'>
                            <p className='block sm:inline text-xs'>{errorMessage}</p>
                        </div>
                    )}
                </div>

                <div className='w-full text-xs'>
                    <p className='my-3'>
                        Don&apos;t have an account yet?
                        <Link href='/auth/signup' className='ml-1 text-emBlue font-bold'>
                            Sign up
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

export default SignIn;
