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
import { useParams } from "next/navigation";

const ResetPassword = () => {
    const { resetToken } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm();

    const handleMyForm = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_BASEURL}/api/auth/reset-password`, {
                token: resetToken, // Send token in the request body
                newPassword: data.newPassword,
            });
            if (response.status === 200) {
                setFeedback({
                    status: "Success",
                    message: response.data.message,
                });
                setShowModal(true);
            }
        } catch (error) {
            setFeedback({
                status: "Error",
                message: error.response?.data?.message || "An error occurred",
            });
            setShowModal(true);
        }
        setLoading(false);
    };

    return (
        <section>
            {/* Feedback Modal */}
            <FeedbackModal show={showModal} onClose={() => setShowModal(false)} feedback={feedback} />

            {/* Header */}
            <div className='text-center flex flex-col items-center mb-5'>
                <Link href='/'>
                    <ImageWrapper src={logo} alt='logo' width={fn.rem(100)} height={fn.rem(50)} objectFit='contain' />
                </Link>
                <h1 className='text-h1 font-semibold'>Reset Password</h1>
                <h6 className='text-h6'>Enter your new password below</h6>
            </div>

            {/* Form */}
            <Form onSubmit={handleSubmit(handleMyForm)}>
                {/* New Password */}
                <div className='my-2 flex items-center border-2 border-emGrey rounded-md overflow-hidden bg-emBgColor'>
                    <div className='text-2xl px-2 text-emBlue'>
                        <Icon icon='tabler:lock' />
                    </div>
                    <input
                        id='newPassword'
                        type='password'
                        placeholder='New Password'
                        className='block w-full bg-transparent p-1'
                        {...register("newPassword", { required: "New Password is required" })}
                    />
                </div>
                {errors.newPassword && <p className='text-red-500 text-xs italic'>{errors.newPassword.message}</p>}

                {/* Confirm Password */}
                <div className='my-2 flex items-center border-2 border-emGrey rounded-md overflow-hidden bg-emBgColor'>
                    <div className='text-2xl px-2 text-emBlue'>
                        <Icon icon='tabler:lock' />
                    </div>
                    <input
                        id='confirmPassword'
                        type='password'
                        placeholder='Confirm Password'
                        className='block w-full bg-transparent p-1'
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) => value === watch("newPassword") || "Passwords do not match",
                        })}
                    />
                </div>
                {errors.confirmPassword && <p className='text-red-500 text-xs italic'>{errors.confirmPassword.message}</p>}

                {/* Submit Button */}
                <div className='my-4'>
                    <Button loading={isLoading} type='submit' className='bg-emBlue text-white w-full rounded-full'>
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </Button>
                </div>
            </Form>

            {/* Sign In Link */}
            <div className='text-xs'>
                <p className='my-3'>
                    Remembered your password?
                    <Link href='/auth/signin' className='ml-1 text-emBlue font-bold'>
                        Sign In
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default ResetPassword;
