"use client";
import ImageWrapper from "@/app/components/ImageWrapper";
import { Icon } from "@iconify/react";
import logo from "@/public/logo.png";
import { Button, Form } from "rsuite";
import { fn } from "@/utils/utilityFunction";
import Link from "next/link";
import { useForm } from "react-hook-form";
import FeedbackModal from "@/app/components/FeedbackModal";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [showModal, setShowModal] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const handleMyForm = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_BASEURL}/api/auth/forgot-password`, {
                email: data.email,
            });
            console.log(response);
            if (response.status === 200) {
                setFeedback({
                    status: `Success`,
                    message: response.data.message,
                });
                setShowModal(true);
            }
        } catch (error) {
            console.log(error);
            setFeedback({
                status: `Error`,
                message: error.response.data.message,
            });
            setShowModal(true);
        }
        setLoading(false);
    };

    return (
        <section>
            {/* header */}
            <FeedbackModal show={showModal} onClose={() => setShowModal(false)} feedback={feedback} />;
            <div className={`text-center flex flex-col items-center mb-5`}>
                <Link href={`/`}>
                    <ImageWrapper src={logo} alt={`logo`} width={fn.rem(100)} height={fn.rem(50)} objectFit={`contain`} />
                </Link>
                <h1 className={`text-h1 font-semibold`}>Forgot Password</h1>
                <h6 className={`text-h6`}>Enter email address to recover password</h6>
            </div>
            {/* form */}
            <Form onSubmit={handleSubmit(handleMyForm)}>
                {/* email */}
                <div className='my-2 flex items-center border-2 border-emGrey rounded-md overflow-hidden bg-emBgColor'>
                    <div className={`text-2xl px-2 text-emBlue`}>
                        <Icon icon='ic:outline-email' />
                    </div>
                    <input
                        id='email'
                        type='email'
                        placeholder={`Email`}
                        className='block w-full bg-transparent p-1'
                        {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                    />
                </div>
                {errors.email && <p className='text-red-500 text-xs italic'>{errors.email.message}</p>}

                {/* submit button */}
                <div>
                    <Button loading={isLoading} type={`submit`} className={`bg-emBlue text-white w-full rounded-full`}>
                        {isLoading ? "Recovering..." : "Recover Password"}
                    </Button>
                </div>
            </Form>
            <div className='text-xs'>
                <p className='my-3'>
                    Already have an account?
                    <Link href='/auth/signin' className='ml-1 text-emBlue font-bold'>
                        Sign In
                    </Link>
                </p>

            </div>
        </section>
    );
};

export default ForgotPassword;
