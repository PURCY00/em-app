"use client";

import { Button, Form, InputGroup } from "rsuite";
import ImageWrapper from "../../components/ImageWrapper";
import { Icon } from "@iconify/react";
import logo from "@/public/logo.png";
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
                <h1 className={`text-h1 font-semibold`}>Welcome to EM</h1>
                <h6 className={`text-h6`}>Sign up for free</h6>
            </div>
            {/* form */}

            <Form style={{ maxWidth: fn.rem(500) }}>
                {/* email */}
                <Form.Group controlId={"email"}>
                    <InputGroup style={{ width: `100%`, border: `1px solid #83979B`, backgroundColor: `#83979B50` }} inside>
                        <InputGroup.Addon className={`text-emBlue`}>
                            <Icon icon='system-uicons:mail' />
                        </InputGroup.Addon>
                        <Form.Control className={`bg-transparent`} type={`email`} name='email' placeholder='Email' />
                    </InputGroup>
                </Form.Group>
                {/* user name */}
                <Form.Group controlId={"username"}>
                    <InputGroup style={{ width: `100%`, border: `1px solid #83979B`, backgroundColor: `#83979B50` }} inside>
                        <InputGroup.Addon className={`text-emBlue`}>
                            <Icon icon='ri:user-line' />
                        </InputGroup.Addon>
                        <Form.Control className={`bg-transparent`} name='username' placeholder='Username' />
                    </InputGroup>
                </Form.Group>
                {/* password */}
                <Form.Group controlId={"password"}>
                    <InputGroup style={{ width: `100%`, border: `1px solid #83979B`, backgroundColor: `#83979B50` }} inside>
                        <InputGroup.Addon className={`text-emBlue`}>
                            <Icon icon='lets-icons:lock' />
                        </InputGroup.Addon>
                        <Form.Control className={`bg-transparent`} type={`password`} name='password' placeholder='Password' />
                    </InputGroup>
                </Form.Group>

                {/* confirm password */}
                <Form.Group controlId={"confirm-password"}>
                    <InputGroup style={{ width: `100%`, border: `1px solid #83979B`, backgroundColor: `#83979B50` }} inside>
                        <InputGroup.Addon className={`text-emBlue`}>
                            <Icon icon='lets-icons:lock' />
                        </InputGroup.Addon>
                        <Form.Control className={`bg-transparent`} type={`password`} name='confirm-password' placeholder='Confirm Password' />
                    </InputGroup>
                </Form.Group>
                {/* submit button */}
                <div>
                    <Button className={`bg-emBlue text-white w-full`}>Sign up</Button>
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
            </Form>
        </section>
    );
};
export default page;
