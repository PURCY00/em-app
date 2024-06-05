import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button } from "rsuite";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import { followAUser, useGlobalDispatch } from "../context/GlobalState";

const CommentModal = ({ postId }) => {
    const dispatch = useGlobalDispatch();
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const cancelButtonRef = useRef(null);
    const { data: session } = useSession();

    useEffect(() => {
        if (open) {
            axios
                .get(`/api/comment?id=${postId}`)
                .then((response) => setComments(response.data))
                .catch((error) => console.error(error));
        }
    }, [open, postId]);

    const handlePost = () => {
        axios
            .post(`/api/comment`, {
                postId,
                text: newComment,
            })
            .then((response) => {
                setComments([...comments, response.data]);
                setNewComment("");
            })
            .catch((error) => console.error(error));
    };

    const handleFollowAction = async (authorId) => {
        try {
            const response = await followAUser(dispatch, authorId);
            if (response.status === 200) {
                setComments((prevComments) =>
                    prevComments.map((comment) => (comment.authorId === authorId ? { ...comment, isFollowing: !comment.isFollowing } : comment))
                );
            }
        } catch (error) {
            console.error("Failed to follow/unfollow the user", error);
        }
    };

    return (
        <>
            <Icon onClick={() => setOpen(true)} fontSize={41} icon='mingcute:comment-2-line' />
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
                                        <main>
                                            <p className={`text-h5 font-semibold`}>Add Comment</p>
                                            <div className='mt-2'>
                                                <textarea
                                                    id='comment'
                                                    name='comment'
                                                    rows={6}
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    className={`border border-emGrey rounded-lg w-full bg-emBgColor p-2`}
                                                    placeholder={`Type Here...`}
                                                />
                                                <div className={`text-end`}>
                                                    <Button onClick={handlePost} className={`bg-emBlue text-white rounded-full  px-12 py-3`}>
                                                        Post
                                                    </Button>
                                                </div>
                                            </div>
                                            <section>
                                                <div className={`my-4`}>
                                                    <p className={`text-emGrey font-semibold`}>Previous comments</p>
                                                </div>

                                                <section className={`flex flex-col gap-3`}>
                                                    {comments?.map((comment) => (
                                                        <div key={comment?._id}>
                                                            <article className={`flex items-center justify-between`}>
                                                                <div className={`flex items-center gap-2`}>
                                                                    <div
                                                                        style={{ width: `4rem`, height: `4rem` }}
                                                                        className={`relative rounded-full overflow-hidden`}
                                                                    >
                                                                        <Image
                                                                            className={`w-full h-full object-cover`}
                                                                            width={50}
                                                                            height={50}
                                                                            src={comment?.author.profilePhoto}
                                                                            alt={`avatar-img`}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <p className={`font-semibold`}>{comment.author.name}</p>
                                                                        <p className={`text-xs`}>{new Date(comment.timestamp).toLocaleTimeString()}</p>
                                                                    </div>
                                                                </div>

                                                                {session?.user?.id === comment?.authorId ? null : (
                                                                    <section>
                                                                        {comment.isFollowing ? (
                                                                            <Button
                                                                                onClick={() => handleFollowAction(comment.authorId)}
                                                                                style={{ border: `1px solid #83979B` }}
                                                                                className={`rounded-full px-8 py-2 bg-transparent hover:text-emBlue hover:border-emBlue`}
                                                                            >
                                                                                Following
                                                                            </Button>
                                                                        ) : (
                                                                            <Button
                                                                                onClick={() => handleFollowAction(comment.authorId)}
                                                                                style={{ border: `1px solid #83979B` }}
                                                                                className={`rounded-full px-6 py-2 bg-transparent hover:text-emBlue hover:border-emBlue gap-4`}
                                                                            >
                                                                                Follow
                                                                                <Icon fontSize={20} icon='ic:baseline-plus' />
                                                                            </Button>
                                                                        )}
                                                                    </section>
                                                                )}
                                                            </article>
                                                            <p>{comment.text}</p>
                                                        </div>
                                                    ))}
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
