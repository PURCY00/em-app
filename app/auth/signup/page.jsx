"use client";

import ImageWrapper from "../../components/ImageWrapper";
import { Icon } from "@iconify/react";
import logo from "@/public/logo.png";
import { fn } from "@/utils/utilityFunction";
import Link from "next/link";
import { Button } from "rsuite";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Signup = () => {
    const router = useRouter();
    // using react hook form "useForm()" method
    const { register, handleSubmit } = useForm(); /** destructuring */

    // this is the function that would handle the onSubmit action set in our <form></form> tag.
    const handleMyForm = async (data) => {
        console.log(data);
        const response = await fetch(`api/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log(response);
    };

    return (
        <section>
            {/* header */}
            <div className={`text-center flex flex-col items-center mb-5`}>
                <Link href={`/`}>
                    <ImageWrapper src={logo} alt={`logo`} width={fn.rem(100)} height={fn.rem(50)} objectFit={`contain`} />
                </Link>
                <h1 className={`text-h1 font-semibold`}>Welcome to EM</h1>
                <h6 className={`text-h6`}>Sign up for free</h6>
            </div>
            {/* form */}

            <form onSubmit={handleSubmit(handleMyForm)} style={{ maxWidth: fn.rem(500) }}>
                {/* email */}
                <div className='my-2 flex items-center border-2 border-emGrey rounded-md overflow-hidden bg-emBgColor'>
                    <div className={`text-2xl px-2 text-emBlue`}>
                        <Icon icon='ic:outline-email' />
                    </div>
                    <input id='email' type='email' placeholder={`Email`} className='block w-full bg-transparent p-1' {...register("email")} />
                </div>

                {/* user name */}
                <div className='my-2 flex items-center border-2 border-emGrey rounded-md overflow-hidden bg-emBgColor'>
                    <div className={`text-2xl px-2 text-emBlue`}>
                        <Icon icon='lets-icons:user' />
                    </div>
                    <input id='username' placeholder={`username`} className='block w-full bg-transparent p-1' {...register("username")} />
                </div>
                {/* password */}
                <div className='my-2 flex items-center border-2 border-emGrey rounded-md overflow-hidden bg-emBgColor'>
                    <div className={`text-2xl px-2 text-emBlue`}>
                        <Icon icon='tabler:lock' />
                    </div>
                    <input id='password' placeholder={`Password`} type='password' className='block w-full bg-transparent p-1' {...register("password")} />
                </div>

                {/* confirm password */}
                <div className='my-2 flex items-center border-2 border-emGrey rounded-md overflow-hidden bg-emBgColor'>
                    <div className={`text-2xl px-2 text-emBlue`}>
                        <Icon icon='tabler:lock' />
                    </div>
                    <input
                        id='confirm_password'
                        placeholder={`Confirm Password`}
                        type='password'
                        className='block w-full bg-transparent p-1'
                        {...register("confirm_password")}
                    />
                </div>
                {/* submit button */}
                <div>
                    <Button type={`submit`} className={`bg-emBlue text-white w-full`}>
                        Sign up
                    </Button>
                </div>
                <div className={`w-full text-xs`}>
                    <p className={`my-3`}>
                        Alreaday have an account?
                        <Link href={`/auth/signin`} className={`ml-1 text-emBlue font-bold`}>
                            Sign In
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
export default Signup;
