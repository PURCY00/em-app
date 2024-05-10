import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { fn } from "@/utils/utilityFunction";
import { Button, Form, Input, InputGroup } from "rsuite";
import Image from "next/image";

const EditProfileModal = () => {
    const [open, setOpen] = useState(false);

    const cancelButtonRef = useRef(null);

    return (
        <>
            <Icon onClick={() => setOpen(true)} className={`text-emBlue`} fontSize={fn.rem(28)} icon='line-md:edit' />
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
                                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl'>
                                    <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                                        <header className={`text-center md:text-start mb-5`}>
                                            <p className={`text-lg font-semibold`}>
                                                Hi, <span className={`text-emBlue`}>John Doe</span>
                                            </p>
                                            <h2 className={`text-h3 font-semibold`}>Complete Your Profile</h2>
                                        </header>
                                        <main className={`grid md:grid-cols-2 gap-5`}>
                                            {/* avatar image */}
                                            <section className={`flex flex-col items-center justify-around`}>
                                                <div style={{ width: `fit-content` }} className={`relative rounded-full overflow-hidden`}>
                                                    <Image
                                                        width={300}
                                                        height={300}
                                                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                                        alt={`avatar-img`}
                                                    />
                                                </div>
                                                <div>
                                                    <input type={`file`} />
                                                </div>
                                            </section>
                                            {/* form edit */}
                                            <section>
                                                <Form className={`w-full`}>
                                                    <section>
                                                        <p className={`font-semibold text-xl mb-2`}>Basic Information</p>
                                                        <section className={`grid grid-cols-2 gap-1`}>
                                                            <Form.Group style={{ marginBottom: 0 }} controlId={""}>
                                                                <InputGroup
                                                                    style={{ width: `100%`, border: `1px solid #83979B`, backgroundColor: `#83979B50` }}
                                                                    inside
                                                                >
                                                                    <InputGroup.Addon className={`text-emBlue`}>
                                                                        <Icon fontSize={fn.rem(24)} icon='ant-design:field-number-outlined' />
                                                                    </InputGroup.Addon>
                                                                    <Form.Control className={`bg-transparent py-3`} name='age' placeholder='Age' />
                                                                </InputGroup>
                                                            </Form.Group>
                                                            <Form.Group style={{ marginBottom: 0 }} controlId={""}>
                                                                <InputGroup
                                                                    style={{ width: `100%`, border: `1px solid #83979B`, backgroundColor: `#83979B50` }}
                                                                    inside
                                                                >
                                                                    <InputGroup.Addon className={`text-emBlue`}>
                                                                        <Icon fontSize={fn.rem(24)} icon='fa:transgender' />
                                                                    </InputGroup.Addon>
                                                                    <Form.Control className={`bg-transparent py-3`} name='gender' placeholder='Gender' />
                                                                </InputGroup>
                                                            </Form.Group>
                                                            <Form.Group className={`col-span-2`} style={{ marginBottom: 0 }} controlId={""}>
                                                                <InputGroup
                                                                    style={{ width: `100%`, border: `1px solid #83979B`, backgroundColor: `#83979B50` }}
                                                                    inside
                                                                >
                                                                    <InputGroup.Addon className={`text-emBlue`}>
                                                                        <Icon fontSize={fn.rem(24)} icon='teenyicons:pin-outline' />
                                                                    </InputGroup.Addon>
                                                                    <Form.Control className={`bg-transparent py-3`} name='location' placeholder='Location' />
                                                                </InputGroup>
                                                            </Form.Group>
                                                            <Form.Group className={`col-span-2`} style={{ marginBottom: 0 }} controlId={""}>
                                                                <InputGroup
                                                                    style={{ width: `100%`, border: `1px solid #83979B`, backgroundColor: `#83979B50` }}
                                                                    inside
                                                                >
                                                                    <InputGroup.Addon className={`text-emBlue`}>
                                                                        <Icon fontSize={fn.rem(24)} icon='ph:briefcase' />
                                                                    </InputGroup.Addon>
                                                                    <Form.Control
                                                                        className={`bg-transparent py-3`}
                                                                        name='occupation'
                                                                        placeholder='Occupation'
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                        </section>
                                                    </section>
                                                    <section className={`my-5`}>
                                                        <p className={`font-semibold text-xl mb-2`}>Socials</p>
                                                        <section className={`grid grid-cols-2 gap-1`}>
                                                            <Form.Group className={`col-span-2`} style={{ marginBottom: 0 }} controlId={""}>
                                                                <InputGroup
                                                                    style={{ width: `100%`, border: `1px solid #83979B`, backgroundColor: `#83979B50` }}
                                                                    inside
                                                                >
                                                                    <InputGroup.Addon className={`text-emBlue`}>
                                                                        <Icon fontSize={fn.rem(24)} icon='prime:twitter' />
                                                                    </InputGroup.Addon>
                                                                    <Form.Control className={`bg-transparent py-3`} name='location' placeholder='X App' />
                                                                </InputGroup>
                                                            </Form.Group>
                                                            <Form.Group className={`col-span-2`} style={{ marginBottom: 0 }} controlId={""}>
                                                                <InputGroup
                                                                    style={{ width: `100%`, border: `1px solid #83979B`, backgroundColor: `#83979B50` }}
                                                                    inside
                                                                >
                                                                    <InputGroup.Addon className={`text-emBlue`}>
                                                                        <Icon fontSize={fn.rem(24)} icon='devicon:linkedin' />
                                                                    </InputGroup.Addon>
                                                                    <Form.Control className={`bg-transparent py-3`} name='occupation' placeholder='Linkedin' />
                                                                </InputGroup>
                                                            </Form.Group>
                                                        </section>
                                                    </section>
                                                    <div>
                                                        <Button className={`bg-emBlue text-white py-3 rounded-full w-full text-xl`}>Continue</Button>
                                                    </div>
                                                </Form>
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

export default EditProfileModal;
