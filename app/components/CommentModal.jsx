import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { fn } from "@/utils/utilityFunction";
import { Button, Form, Input, InputGroup } from "rsuite";
import Image from "next/image";

const CommentModal = () => {
    const [open, setOpen] = useState(false);

    const cancelButtonRef = useRef(null);

    return (
        <>
            <Icon onClick={() => setOpen(true)} fontSize={fn.rem(41)} icon='mingcute:comment-2-line' />
            <Transition.Root show={open} as={Fragment}>
                <Dialog className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                    </Transition.Child>

                    <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                                enterTo='opacity-100 translate-y-0 sm:scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            >
                                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full md:max-w-3xl'>
                                    <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                                        {/* modal content */}
                                        <main>
                                            <p className={`text-h5 font-semibold`}>Add Comment</p>
                                            <div className='mt-2'>
                                                <textarea
                                                    id='comment'
                                                    name='comment'
                                                    rows={6}
                                                    className={`border border-emGrey rounded-lg w-full bg-emBgColor p-2`}
                                                    placeholder={`Type Here...`}
                                                />
                                                <div className={`text-end`}>
                                                    <Button className={`bg-emBlue text-white rounded-full  px-12 py-3`}>Post</Button>
                                                </div>
                                            </div>
                                            <section>
                                                <div className={`my-4`}>
                                                    <p className={`text-emGrey font-semibold`}>Previous comments</p>
                                                </div>
                                                <section className={`flex flex-col gap-3`}>
                                                    <div>
                                                        <article className={`flex items-center justify-between`}>
                                                            <div className={`flex items-center gap-2`}>
                                                                <div style={{ width: `fit-content` }} className={`relative rounded-full overflow-hidden`}>
                                                                    <Image
                                                                        width={50}
                                                                        height={50}
                                                                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                                                        alt={`avatar-img`}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className={`font-semibold`}>{`Kingsley Solomon`}</p>
                                                                    <p className={`text-xs`}>8 mins ago</p>
                                                                </div>
                                                            </div>
                                                            <section>
                                                                <Button
                                                                    style={{ border: `1px solid #83979B` }}
                                                                    className={`rounded-full px-8 py-2 bg-transparent hover:text-emBlue hover:border-emBlue`}
                                                                >
                                                                    Following
                                                                </Button>
                                                            </section>
                                                        </article>
                                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum laboriosam assumenda quae, veniam</p>
                                                    </div>
                                                    <div>
                                                        <article className={`flex items-center justify-between`}>
                                                            <div className={`flex items-center gap-2`}>
                                                                <div style={{ width: `fit-content` }} className={`relative rounded-full overflow-hidden`}>
                                                                    <Image
                                                                        width={50}
                                                                        height={50}
                                                                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                                                        alt={`avatar-img`}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className={`font-semibold`}>{`Kingsley Solomon`}</p>
                                                                    <p className={`text-xs`}>8 mins ago</p>
                                                                </div>
                                                            </div>
                                                            <section>
                                                                <Button
                                                                    style={{ border: `1px solid #83979B` }}
                                                                    className={`rounded-full px-8 py-2 bg-transparent hover:text-emBlue hover:border-emBlue`}
                                                                >
                                                                    Following
                                                                </Button>
                                                            </section>
                                                        </article>
                                                        <p>Lorem ipsum, dolor sit amet</p>
                                                    </div>
                                                    <div>
                                                        <article className={`flex items-center justify-between`}>
                                                            <div className={`flex items-center gap-2`}>
                                                                <div style={{ width: `fit-content` }} className={`relative rounded-full overflow-hidden`}>
                                                                    <Image
                                                                        width={50}
                                                                        height={50}
                                                                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                                                        alt={`avatar-img`}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className={`font-semibold`}>{`Kingsley Solomon`}</p>
                                                                    <p className={`text-xs`}>8 mins ago</p>
                                                                </div>
                                                            </div>
                                                            <section>
                                                                <Button
                                                                    style={{ border: `1px solid #83979B` }}
                                                                    className={`rounded-full px-8 py-2 bg-transparent hover:text-emBlue hover:border-emBlue`}
                                                                >
                                                                    Following
                                                                </Button>
                                                            </section>
                                                        </article>
                                                        <p>
                                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum laboriosam assumenda quae, veniam
                                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non vitae aperiam maxime sint incidunt
                                                            excepturi deserunt reprehenderit placeat exercitationem dolore consequuntur voluptatibus blanditiis,
                                                            iusto, accusamus commodi dolor reiciendis architecto beatae!F
                                                        </p>
                                                    </div>
                                                </section>
                                            </section>
                                        </main>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default CommentModal;
