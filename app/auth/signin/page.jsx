"use client";

import ImageWrapper from "@/app/components/ImageWrapper";
import { Icon } from "@iconify/react";
import logo from "@/public/logo.png";
import { Button, Checkbox } from "rsuite";
import { fn } from "@/utils/utilityFunction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const SignIn = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm({
        criteriaMode: "all",
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const res = await signIn(`credentials`, {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            console.log(res);
            if (res.ok) {
                router.replace(`/`);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <section>
            {/* header */}
            <div className={`text-center flex flex-col items-center mb-5`}>
                <Link href={`/`}>
                    <ImageWrapper src={logo} alt={`logo`} width={fn.rem(100)} height={fn.rem(50)} objectFit={`contain`} />
                </Link>
                <h1 className={`text-h1 font-semibold`}>Welcome back to EM</h1>
                <h6 className={`text-h6`}>Sign in to your account</h6>
            </div>
            {/* form */}

            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: fn.rem(500) }}>
                {/* email */}
                <div className='my-2 flex items-center border-2 border-emGrey rounded-md overflow-hidden bg-emBgColor'>
                    <div className={`text-2xl px-2 text-emBlue`}>
                        <Icon icon='ic:outline-email' />
                    </div>
                    <input id='email' type='email' placeholder={`Email`} className='block w-full bg-transparent p-1' {...register(`email`)} />
                </div>

                {/* password */}
                <div className='my-2 flex items-center border-2 border-emGrey rounded-md overflow-hidden bg-emBgColor'>
                    <div className={`text-2xl px-2 text-emBlue`}>
                        <Icon icon='tabler:lock' />
                    </div>
                    <input id='password' placeholder={`Password`} type='password' className='block w-full bg-transparent p-1' {...register(`password`)} />
                </div>

                <div className={`flex items-center justify-between text-xs mb-3`}>
                    <Checkbox>Remember me</Checkbox>
                    <Link href={`/auth/forgot-password`}>
                        <p className={`underline`}>Forgot Password?</p>
                    </Link>
                </div>

                {/* submit button */}
                <div>
                    <Button type={`submit`} className={`bg-emBlue text-white w-full`}>
                        Sign in
                    </Button>
                </div>
                <div className={`w-full text-xs`}>
                    <p className={`my-3`}>
                        Dont have an account yet?
                        <Link href={`/auth/signup`} className={`ml-1 text-emBlue font-bold`}>
                            Sign up
                        </Link>
                    </p>
                    <p className={`text-emGrey`}>
                        By signing up you accept our Privacy Policy, Terms & Licensing Agreement. Protected by reCAPTCHA. Google Privacy Policy & Terms apply.
                    </p>
                </div>
            </form>
        </section>
    );
};
export default SignIn;
