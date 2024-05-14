"use client";
import ImageWrapper from "@/app/components/ImageWrapper";
import { Icon } from "@iconify/react";
import logo from "@/public/logo.png";
import { Button, Checkbox, Form, Input, InputGroup } from "rsuite";
import { fn } from "@/utils/utilityFunction";
import Link from "next/link";

const ForgotPassword = () => {
    return (
        <section>
            {/* header */}
            <div className={`text-center flex flex-col items-center mb-5`}>
                <Link href={`/`}>
                    <ImageWrapper src={logo} alt={`logo`} width={fn.rem(100)} height={fn.rem(50)} objectFit={`contain`} />
                </Link>
                <h1 className={`text-h1 font-semibold`}>Forgot Password</h1>
                <h6 className={`text-h6`}>Enter email address to recover password</h6>
            </div>
            {/* form */}

            <Form style={{ maxWidth: fn.rem(500) }}>
                {/* email */}
                {/* email */}
                <div class='my-2 flex items-center border-2 border-emGrey rounded-md overflow-hidden bg-emBgColor'>
                    <div className={`text-2xl px-2 text-emBlue`}>
                        <Icon icon='ic:outline-email' />
                    </div>
                    <input id='email' type='email' placeholder={`Email`} class='block w-full bg-transparent p-1' />
                </div>

                {/* submit button */}
                <div>
                    <Button className={`bg-emBlue text-white w-full rounded-full`}>Recover Password</Button>
                </div>
            </Form>
        </section>
    );
};
export default ForgotPassword;
