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
                <Form.Group controlId={"email"}>
                    <InputGroup style={{ width: `100%`, border: `1px solid #1565D8`, backgroundColor: `#83979B50` }} inside>
                        <InputGroup.Addon className={`text-blue-500`}>
                            <Icon icon='system-uicons:mail' />
                        </InputGroup.Addon>
                        <Form.Control className={`border-4 bg-transparent`} type={`email`} name='email' placeholder='Email' />
                        {/* <Input type={`email`} name='email' placeholder='Email' /> */}
                    </InputGroup>
                </Form.Group>

                {/* submit button */}
                <div>
                    <Button className={`bg-emBlue text-white w-full rounded-full`}>Recover Password</Button>
                </div>
            </Form>
        </section>
    );
};
export default ForgotPassword;
