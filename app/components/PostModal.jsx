import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "rsuite";
import { Icon } from "@iconify/react";
import axios from "axios";
import Image from "next/image";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { getAllPost, useGlobalDispatch } from "../context/GlobalState";

const PostModal = ({ show, onClose }) => {
    const dispatch = useGlobalDispatch();
    const { register, handleSubmit, reset } = useForm();
    const [images, setImages] = useState([]);
    const [uploadedUrls, setUploadedUrls] = useState([]);
    const [feedback, setFeedback] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const handleImageUpload = (event) => {
        const files = event.target.files;
        const newImages = [...images];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                newImages.push(reader.result);
                setImages(newImages);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const newUploadedUrls = [...uploadedUrls];
        newUploadedUrls.splice(index, 1);
        setUploadedUrls(newUploadedUrls);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const urls = await Promise.all(images.map((image) => uploadToCloudinary(image)));
            const validUrls = urls.map((url) => url.data.url);

            const postData = {
                text: data.text,
                images: validUrls,
            };

            const response = await axios.post(`/api/post/create-post`, postData);

            if (response.status === 201) {
                getAllPost(dispatch);
                setImages([]);
                reset();
                setFeedback({ status: "Success", message: "Post created successfully" });
            } else {
                setFeedback({ status: "Error", message: "Error creating post" });
            }
        } catch (error) {
            setFeedback({ status: "Error", message: "Error creating post" });
        }
        setLoading(false);
    };

    if (!show) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-5 w-1/2'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea {...register("text")} className='w-full p-2 border rounded h-52' placeholder='Write post'></textarea>

                    <div className='flex mt-4 flex-wrap gap-4'>
                        {images.map((image, index) => (
                            <div key={index} className='relative'>
                                <Image width={200} height={200} src={image} alt={`uploaded-img-${index}`} className='rounded' />
                                <Icon
                                    onClick={() => handleRemoveImage(index)}
                                    className={`text-2xl text-emRed absolute top-0 right-0 m-1 bg-white`}
                                    icon='material-symbols:cancel'
                                />
                            </div>
                        ))}
                    </div>

                    <div className='flex justify-between items-center mt-4 gap-4'>
                        <div className='flex items-center'>
                            <label className='cursor-pointer'>
                                <div className={`flex items-center gap-4`}>
                                    <Icon fontSize={41} icon='mage:image' />
                                    <p>Image</p>
                                </div>
                                <input type='file' accept='image/*' multiple onChange={handleImageUpload} className='hidden' />
                            </label>
                        </div>
                        <div className='flex justify-end gap-4'>
                            <Button type='button' onClick={onClose} className={`rounded-full px-12 py-3`}>
                                Cancel
                            </Button>
                            <Button loading={isLoading} type='submit' className={`bg-emBlue text-white rounded-full px-12 py-3`}>
                                {isLoading ? "Posting..." : "Post"}
                            </Button>
                        </div>
                    </div>
                </form>
                {feedback && (
                    <div className={`mt-4 p-2 rounded flex items-center justify-center gap-3 ${feedback.status === "Success" ? "bg-green-100" : "bg-red-100"}`}>
                        <Icon icon={feedback.status === "Success" ? "mdi:check-circle" : "mdi:alert-circle"} className='text-2xl' />
                        <p className='text-center'>{feedback.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostModal;
