"use client";

import { fn } from "@/utils/utilityFunction";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Button, Form, InputGroup } from "rsuite";

const PostsubmissionTemplate = () => {
    return (
        <section className={`bg-white rounded-lg p-5`}>
            <section className={`flex items-center gap-10`}>
                <div style={{ width: `fit-content` }} className={`relative rounded-full overflow-hidden`}>
                    <Image
                        width={90}
                        height={90}
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt={`avatar-img`}
                    />
                </div>
                <Form className={`w-full`}>
                    <Form.Group controlId={"email"}>
                        <InputGroup
                            className={`rounded-full overflow-hidden border border-emGrey`}
                            style={{ width: `100%`, backgroundColor: `#83979B50` }}
                            inside
                        >
                            <Form.Control className={`bg-transparent`} name='email' placeholder='What do you want to ask or share?' />
                        </InputGroup>
                    </Form.Group>
                </Form>
            </section>
            <section className={`mt-5 flex items-center justify-between`}>
                <div className={`flex items-center gap-4`}>
                    <Icon fontSize={fn.rem(41)} icon='mage:image' />
                    <p>Image</p>
                </div>
                <Button className={`bg-emBlue text-white rounded-full  px-12 py-3`}>Post</Button>
            </section>
        </section>
    );
};
export default PostsubmissionTemplate;
