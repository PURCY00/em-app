"use client";

import Image from "next/image";
import { Button } from "rsuite";
import { Icon } from "@iconify/react";
import CommentModal from "./CommentModal";
import { useDate, useTime } from "@/utils/useDateTimeConverter";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { deletePost, followAUser, likePost, useGlobalDispatch, useGlobalState } from "../context/GlobalState";
import ImageWrapper from "./ImageWrapper";

const PostCard = ({ post }) => {
    const dispatch = useGlobalDispatch();
    const state = useGlobalState();
    const formatTime = useTime();
    const formatDate = useDate();
    const [isUser, setIsUser] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const { data: session } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        setIsUser(session?.user?.id === post?.user?._id);
        setIsFollowing(state?.user?.following?.includes(post?.user?._id));
        setIsLiked(post?.likes?.includes(session?.user?.id));
    }, [post, session, state, state?.user?.following]);

    const handleFollowAction = async () => {
        try {
            const response = await followAUser(dispatch, post?.user?._id);
            if (response.status === 200) {
                setIsFollowing((prev) => !prev);
            }
        } catch (error) {
            console.error("Failed to follow/unfollow the user", error);
        }
    };

    const handleLikeAction = async () => {
        try {
            const response = await likePost(dispatch, post?._id);
            if (response.status === 200) {
                setIsLiked((prev) => !prev);
            }
        } catch (error) {
            console.error("Failed to toggle like status of the post", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deletePost(dispatch, { id: post?._id, userId: state?.user?._id });
            if (response.status === 200) {
                console.log(response);
            }
        } catch (error) {
            console.error("Failed to delete the post", error);
        }
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const renderImages = () => {
        const { images } = post;

        switch (images.length) {
            case 1:
                return (
                    <div className='w-full h-48 md:h-96 cursor-pointer rounded-lg overflow-hidden'>
                        <ImageWrapper alt='auth-img' src={images?.[0]} width='100%' height='100%' objectFit='cover' />
                    </div>
                );
            case 2:
                return (
                    <div className='grid grid-cols-2 gap-4'>
                        {images.map((image, index) => (
                            <div key={index} className='w-full h-48 md:h-96 cursor-pointer rounded-lg overflow-hidden'>
                                <Image
                                    src={image}
                                    alt={`post-image-${index}`}
                                    width={500}
                                    height={500}
                                    objectFit='cover'
                                    className={`h-full md:h-auto`}
                                    onClick={() => handleImageClick(image)}
                                />
                            </div>
                        ))}
                    </div>
                );
            case 3:
                return (
                    <div className='grid grid-cols-2 grid-rows-2 gap-4'>
                        <div className='col-span-2 row-span-2 w-full h-36 md:h-48 cursor-pointer rounded-lg overflow-hidden'>
                            <Image
                                src={images[0]}
                                alt='post-image-0'
                                width={500}
                                height={500}
                                objectFit='cover'
                                className={`w-full h-full md:h-auto`}
                                onClick={() => handleImageClick(images[0])}
                            />
                        </div>
                        {images.slice(1).map((image, index) => (
                            <div key={index} className='w-full h-36 md:h-48 cursor-pointer rounded-lg overflow-hidden'>
                                <Image
                                    src={image}
                                    alt={`post-image-${index + 1}`}
                                    width={500}
                                    height={500}
                                    objectFit='cover'
                                    className={`h-full md:h-auto`}
                                    onClick={() => handleImageClick(image)}
                                />
                            </div>
                        ))}
                    </div>
                );
            case 4:
                return (
                    <div className='grid grid-cols-2 gap-4'>
                        {images.map((image, index) => (
                            <div key={index} className='w-full h-36 md:h-48 cursor-pointer rounded-lg overflow-hidden'>
                                <Image
                                    src={image}
                                    alt={`post-image-${index}`}
                                    width={500}
                                    height={500}
                                    objectFit='cover'
                                    className={`h-full md:h-auto`}
                                    onClick={() => handleImageClick(image)}
                                />
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <article className='bg-white rounded-lg p-5 shadow-sm'>
            <section className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <div style={{ width: "fit-content" }} className='relative rounded-full overflow-hidden'>
                        <Image width={66} height={66} src={post?.user?.profilePhoto} alt='avatar-img' />
                    </div>
                    <div>
                        <p className='font-semibold text-h5'>{post?.user?.name}</p>
                        <p className='text-xs'>
                            {formatDate(post?.createdAt)} {formatTime(post?.createdAt)}
                        </p>
                    </div>
                </div>
                {isUser ? (
                    <div className='relative'>
                        <Icon icon='uil:ellipsis-v' className='text-3xl cursor-pointer' onClick={() => setDropdownOpen(!dropdownOpen)} />
                        {dropdownOpen && (
                            <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
                                <button onClick={handleDelete} className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Button
                        onClick={handleFollowAction}
                        style={{ border: "1px solid #83979B" }}
                        className={`flex items-center gap-6 rounded-full px-5 py-2 bg-transparent ${
                            isFollowing ? "hover:bg-red-300 hover:border-red-200 hover:text-white" : "hover:text-emBlue hover:border-emBlue"
                        }`}
                    >
                        <p>{isFollowing ? "Following" : "Follow"}</p>
                        {!isFollowing && <Icon fontSize={20} icon='ic:baseline-plus' />}
                    </Button>
                )}
            </section>
            <article className='my-5'>
                <p>{post.text}</p>
            </article>
            <article className=''>{renderImages()}</article>
            <section className='flex justify-between items-center mt-4'>
                <div className='flex gap-5'>
                    <Icon
                        onClick={handleLikeAction}
                        className={`text-emRed cursor-pointer ${isLiked ? "animate-like" : ""}`}
                        fontSize={41}
                        icon={isLiked ? "icon-park-solid:like" : "icon-park-outline:like"}
                    />
                    <CommentModal postId={post._id} />
                </div>
                <div>
                    <Icon fontSize={41} icon='mingcute:send-fill' />
                </div>
            </section>
        </article>
    );
};

export default PostCard;
