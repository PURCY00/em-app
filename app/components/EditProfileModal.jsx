import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { useSession } from "next-auth/react";
import FeedbackModal from "./FeedbackModal";
import { getAuthUser, useGlobalDispatch, useGlobalState } from "../context/GlobalState";

const EditProfileModal = () => {
    const state = useGlobalState();
    const dispatch = useGlobalDispatch();
    const [open, setOpen] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(state?.user?.image || null);
    const cancelButtonRef = useRef(null);
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            let profilePhotoUrl = state?.user?.profilePhoto;

            if (profilePhoto) {
                const uploadResult = await uploadToCloudinary(profilePhoto);
                profilePhotoUrl = uploadResult.data.secure_url;
            }

            const postData = {
                ...data,
                profilePhoto: profilePhotoUrl,
            };

            const response = await axios.patch("/api/user/update-profile", postData);

            if (response.status === 200) {
                getAuthUser(dispatch);
                setOpen(false);
                setShowModal(true);
                setFeedback({ status: "Success", message: "Profile updated successfully" });
                reset();
            } else {
                setShowModal(true);
                setFeedback({ status: "Error", message: "Error updating profile" });
            }
        } catch (error) {
            setShowModal(true);
            setFeedback({ status: "Error", message: "Error updating profile" });
        }
        setLoading(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePhoto(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    return (
        <>
            <FeedbackModal show={showModal} onClose={() => setShowModal(false)} feedback={feedback} />
            <Icon onClick={() => setOpen(true)} className='text-emBlue' fontSize={28} icon='line-md:edit' />
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
                                        <header className='text-center md:text-start mb-5'>
                                            <p className='text-lg font-semibold'>
                                                Hi, <span className='text-emBlue'>{state?.user?.name}</span>
                                            </p>
                                            <h2 className='text-h3 font-semibold'>Complete Your Profile</h2>
                                        </header>
                                        <main className='grid md:grid-cols-2 gap-5'>
                                            <section className='flex flex-col items-center justify-around'>
                                                <div className='relative rounded-full overflow-hidden'>
                                                    <Image
                                                        width={300}
                                                        height={300}
                                                        src={
                                                            previewUrl ||
                                                            "https://res.cloudinary.com/ceenobi/image/upload/v1709243852/icons/unnamed_fuwmdn.webp"
                                                        }
                                                        alt='avatar-img'
                                                    />
                                                    <input type='file' className='hidden' id='fileInput' onChange={handleFileChange} />
                                                    <Icon
                                                        onClick={() => document.getElementById("fileInput").click()}
                                                        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer'
                                                        icon='mdi:camera-plus'
                                                    />
                                                </div>
                                            </section>
                                            <section>
                                                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                                                    <div className=''>
                                                        <div className='flex items-center border border-gray-300 bg-gray-100 rounded'>
                                                            {/* <Icon className='text-emBlue mx-2' fontSize={24} icon='ant-design:field-number-outlined' /> */}
                                                            <textarea
                                                                className='bg-transparent py-3 px-2 w-full h-36'
                                                                id='bio'
                                                                {...register("bio")}
                                                                placeholder='bio'
                                                            />
                                                        </div>
                                                    </div>
                                                    <section>
                                                        <p className='font-semibold text-xl mb-2'>Basic Information</p>
                                                        <div className='grid grid-cols-2 gap-1'>
                                                            <div className=''>
                                                                <div className='flex items-center border border-gray-300 bg-gray-100 rounded'>
                                                                    <Icon className='text-emBlue mx-2' fontSize={24} icon='ant-design:field-number-outlined' />
                                                                    <input
                                                                        className='bg-transparent py-3 px-2 w-full'
                                                                        type='number'
                                                                        id='age'
                                                                        {...register("age")}
                                                                        placeholder='Age'
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className=''>
                                                                <div className='flex items-center border border-gray-300 bg-gray-100 rounded'>
                                                                    <Icon className='text-emBlue mx-2' fontSize={24} icon='fa:transgender' />
                                                                    <input
                                                                        className='bg-transparent py-3 px-2 w-full'
                                                                        type='text'
                                                                        id='gender'
                                                                        {...register("gender")}
                                                                        placeholder='Gender'
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className=' col-span-2'>
                                                                <div className='flex items-center border border-gray-300 bg-gray-100 rounded'>
                                                                    <Icon className='text-emBlue mx-2' fontSize={24} icon='teenyicons:pin-outline' />
                                                                    <input
                                                                        className='bg-transparent py-3 px-2 w-full'
                                                                        type='text'
                                                                        id='location'
                                                                        {...register("location")}
                                                                        placeholder='Location'
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className='col-span-2'>
                                                                <div className='flex items-center border border-gray-300 bg-gray-100 rounded'>
                                                                    <Icon className='text-emBlue mx-2' fontSize={24} icon='ph:briefcase' />
                                                                    <input
                                                                        className='bg-transparent py-3 px-2 w-full'
                                                                        type='text'
                                                                        id='occupation'
                                                                        {...register("occupation")}
                                                                        placeholder='Occupation'
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                    <section className='my-5'>
                                                        <p className='font-semibold text-xl mb-2'>Socials</p>
                                                        <div className='grid grid-cols-2 gap-1'>
                                                            <div className=' col-span-2'>
                                                                <div className='flex items-center border border-gray-300 bg-gray-100 rounded'>
                                                                    <Icon className='text-emBlue mx-2' fontSize={24} icon='prime:twitter' />
                                                                    <input
                                                                        className='bg-transparent py-3 px-2 w-full'
                                                                        type='text'
                                                                        id='twitter'
                                                                        {...register("twitter")}
                                                                        placeholder='X App'
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className='col-span-2'>
                                                                <div className='flex items-center border border-gray-300 bg-gray-100 rounded'>
                                                                    <Icon className='text-emBlue mx-2' fontSize={24} icon='devicon:linkedin' />
                                                                    <input
                                                                        className='bg-transparent py-3 px-2 w-full'
                                                                        type='text'
                                                                        id='linkedIn'
                                                                        {...register("linkedIn")}
                                                                        placeholder='Linkedin'
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                    <div className='mt-5 sm:mt-6 sm:flex sm:flex-row-reverse'>
                                                        <button
                                                            type='submit'
                                                            disabled={loading}
                                                            className='inline-flex w-full justify-center rounded-md border border-transparent bg-emBlue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emBlue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                                                        >
                                                            {loading ? "Updating..." : "Save Changes"}
                                                        </button>
                                                        <button
                                                            type='button'
                                                            className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm'
                                                            onClick={() => setOpen(false)}
                                                            ref={cancelButtonRef}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
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
