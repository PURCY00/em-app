import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PostCard from "./PostCard";
import PostsubmissionTemplate from "./PostsubmissionTemplate";
import { getAllPost, getPostsById, useGlobalDispatch, useGlobalState } from "../context/GlobalState";

const PostCreationTemplate = () => {
    const dispatch = useGlobalDispatch();
    const state = useGlobalState();
    const [loading, setLoading] = useState(false);
    const [noPosts, setNoPosts] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setNoPosts(false); // Reset noPosts state before fetching
            try {
                const posts = await getAllPost(dispatch);
                if (posts?.length) {
                    setNoPosts(true);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                setNoPosts(true); // Set noPosts to true if an error occurs
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [dispatch, pathname, state?.user?._id]);

    const postCardList = state?.posts?.map((post) => {
        return <PostCard post={post} key={post._id} />;
    });

    return (
        <main>
            {loading ? (
                <div className='flex justify-center items-center h-full'>
                    <p>Loading...</p> {/* You can replace this with a spinner or any loading indicator */}
                </div>
            ) : noPosts ? (
                <div className='flex justify-center items-center h-full'>
                    <p>No posts found.</p>
                </div>
            ) : (
                <>
                    <section className={`mb-4`}>
                        <PostsubmissionTemplate />
                    </section>
                    <section className={`mb-4 flex flex-col gap-4`}>{postCardList}</section>
                </>
            )}
        </main>
    );
};

export default PostCreationTemplate;
