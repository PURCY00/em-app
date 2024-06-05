import axios from "axios";
import { Cloudinary } from "cloudinary-core";

    new Cloudinary({ cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, secure: true });

export const uploadToCloudinary = async (base64Image) => {
    const formData = new FormData();
    formData.append("file", base64Image);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    try {
        const data = await axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL, formData);
        return data;
    } catch (error) {
        // toast.error("There was an error uploading your image");
        console.error(error);
        throw error;
    }
};

