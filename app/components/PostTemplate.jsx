"use client";

import { usePathname } from "next/navigation";
import PostCard from "./PostCard";
import PostsubmissionTemplate from "./PostsubmissionTemplate";
import { useEffect, useState } from "react";

export const anArrayOfposts = [
    {
        id: 1,
        img1: null,
        name: "Yuji Itadori",
        description: "kingsley",
        img2: null,
    },

    {
        id: 2,
        img1: null,
        name: "Naogami Shinya Itadori",
        description:
            "Lorem ipsum dolor sit amet consectetur. Morbi lacus neque fermentum vivamus orci. Lorem consectetur neque sit sociis turpis quisque. Auctor ullamcorper quam sit mattis posuere pulvinar molestie dignissim. Pulvinar tincidunt convallis sem congue. Tortor ac suscipit cum.",
        img2: null,
    },

    {
        id: 3,
        img1: null,
        name: "Gama Oyabin",
        description:
            "Lorem ipsum dolor sit amet consectetur. Morbi lacus neque fermentum vivamus orci. Lorem consectetur neque sit sociis turpis quisque. Auctor ullamcorper quam sit mattis posuere pulvinar molestie dignissim. Pulvinar tincidunt convallis sem congue. Tortor ac suscipit cum.",
        img2: null,
    },

    {
        id: 4,
        img1: null,
        name: "Senju Hashirama",
        description:
            "Lorem ipsum dolor sit amet consectetur. Morbi lacus neque fermentum vivamus orci. Lorem consectetur neque sit sociis turpis quisque. Auctor ullamcorper quam sit mattis posuere pulvinar molestie dignissim. Pulvinar tincidunt convallis sem congue. Tortor ac suscipit cum.",
        img2: null,
    },
];

const PostCreationTemplate = () => {
    const [isPostCreationTemplateVisble, setPostCreationTemplateVisibility] = useState(false);

    // // next method
    const pathname = usePathname();
    console.log(pathname);

    // if pathname is equals to "profile" hide the post creatino component

    useEffect(() => {
        if (pathname === `/profile`) {
            setPostCreationTemplateVisibility(true);
        } else {
            setPostCreationTemplateVisibility(false);
        }
    }, [pathname]);

    const postCardList = anArrayOfposts.map((post) => {
        return <PostCard post={post} key={post.id} />;
    });

    return (
        <main>
            <section className={`mb-4`} hidden={isPostCreationTemplateVisble}>
                <PostsubmissionTemplate />
            </section>
            <section className={`mb-4 flex flex-col gap-4`}>{postCardList}</section>
        </main>
    );
};
export default PostCreationTemplate;
