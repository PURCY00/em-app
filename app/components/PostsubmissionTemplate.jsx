"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Button, Form, InputGroup } from "rsuite";
import PostModal from "./PostModal";
import { useSession } from "next-auth/react";
import { useGlobalState } from "../context/GlobalState";

const PostsubmissionTemplate = () => {
    const state = useGlobalState();
    const [showModal, setShowModal] = useState(false);

    const handlePostClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <section className={`bg-white rounded-lg p-5`}>
            <section className={`flex items-center gap-10`}>
                <div style={{ width: `7rem`, height: `6rem` }} className={`relative rounded-full overflow-hidden`}>
                    <Image className={`w-full h-full object-cover`} width={500} height={500} src={state?.user?.profilePhoto} alt={`avatar-img`} />
                </div>
                <Form className={`w-full`}>
                    <div className='flex items-center gap-10'>
                        <div className='w-full'>
                            <div className='rounded-full overflow-hidden border border-gray-500 bg-opacity-50 bg-gray-300 w-full'>
                                <input
                                    onClick={handlePostClick}
                                    type='text'
                                    className='bg-transparent w-full py-2 px-4'
                                    name='email'
                                    placeholder='What do you want to ask or share?'
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </Form>
            </section>
            <section className={`mt-5 flex items-center justify-between`}>
                <div className={`flex items-center gap-4`}>
                    <Icon fontSize={41} icon='mage:image' />
                    <p>Image</p>
                </div>
                <Button onClick={handlePostClick} className={`bg-emBlue text-white rounded-full px-12 py-3`}>
                    Post
                </Button>
            </section>
            <PostModal show={showModal} onClose={handleCloseModal} />
        </section>
    );
};

export default PostsubmissionTemplate;
