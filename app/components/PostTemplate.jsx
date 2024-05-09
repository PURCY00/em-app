import PostCard from "./PostCard";
import PostsubmissionTemplate from "./PostsubmissionTemplate";

const PostCreationTemplate = () => {

    const postCardList = [1, 2, 3, 4, 5].map((post) => {
        return <PostCard number={post} key={post} />;
    });

    return (
        <main>
            <section>
                <PostsubmissionTemplate />
            </section>
            <section className={`my-4 flex flex-col gap-4`}>{postCardList}</section>
        </main>
    );
};
export default PostCreationTemplate;
