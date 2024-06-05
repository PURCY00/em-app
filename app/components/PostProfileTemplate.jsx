import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PostCard from "./PostCard";
import { getPostsById, useGlobalDispatch, useGlobalState } from "../context/GlobalState";
import { useSession } from "next-auth/react";

const PostProfileTemplate = () => {
    const dispatch = useGlobalDispatch();
    const state = useGlobalState();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [noPosts, setNoPosts] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setNoPosts(false); // Reset noPosts state before fetching
            try {
                const posts = await getPostsById(dispatch, session?.user?.id);
                if (posts) {
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
    }, [dispatch, pathname, session?.user?.id]);

    const postCardList = state?.userPosts?.map((post) => {
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
                <section className={`mb-4 flex flex-col gap-4`}>{postCardList}</section>
            )}
        </main>
    );
};

export default PostProfileTemplate;
