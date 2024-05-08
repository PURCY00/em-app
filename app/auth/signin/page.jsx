"use client";
import ImageWrapper from "@/app/components/ImageWrapper";
import { Icon } from "@iconify/react";
import logo from "@/public/logo.png";
import { Button, Checkbox, Form, Input, InputGroup } from "rsuite";
import { fn } from "@/utils/utilityFunction";
import Link from "next/link";

const page = () => {
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

            <Form style={{ maxWidth: fn.rem(500) }}>
                {/* email */}
                <Form.Group controlId={"email"}>
                    <InputGroup style={{ width: `100%`, border: `1px solid #83979B`, backgroundColor: `#83979B50` }} inside>
                        <InputGroup.Addon className={`text-blue-500`}>
                            <Icon icon='system-uicons:mail' />
                        </InputGroup.Addon>
                        <Form.Control className={`bg-transparent`} type={`email`} name='email' placeholder='Email' />
                        {/* <Input type={`email`} name='email' placeholder='Email' /> */}
                    </InputGroup>
                </Form.Group>

                {/* password */}
                <Form.Group controlId={"password"} style={{ marginBottom: 0 }}>
                    <InputGroup style={{ width: `100%`, border: `1px solid #83979B`, backgroundColor: `#83979B50` }} inside>
                        <InputGroup.Addon className={`text-blue-500`}>
                            <Icon icon='lets-icons:lock' />
                        </InputGroup.Addon>
                        <Form.Control className={`bg-transparent`} type={`password`} name='password' placeholder='Password' />
                    </InputGroup>
                </Form.Group>

                <div className={`flex items-center justify-between text-xs mb-3`}>
                    <Checkbox>Remember me</Checkbox>
                    <Link href={`/auth/forgot-password`}>
                        <p className={`underline`}>Forgot Password?</p>
                    </Link>
                </div>

                {/* submit button */}
                <div>
                    <Button className={`bg-emBlue text-white w-full`}>Sign in</Button>
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
            </Form>
        </section>
    );
};
export default page;
