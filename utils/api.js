import axios from "axios";

// utils/api.js
export const fetchAuthenticatedUser = async () => {
    const res = await axios.get("/api/user");
    return res.data;
};

export const fetchPosts = async () => {
    const res = await axios.get("/api/post");
    return res.data;
};

export const fetchPostsById = async (id) => {
    try {
        const res = await axios.get(`/api/post/postsById?id=${id}`);
        return res;
    } catch (error) {
        console.error("Error fetching posts by ID:", error); // Log the error for debugging
        throw error;
    }
};

export const deletePostById = async (id) => {
    try {
        const res = await axios.delete(`/api/post/delete-post?id=${id}`);
        return res;
    } catch (error) {
        console.error("Error deleting post by ID:", error);
        throw error;
    }
};

export const toggleLikePost = async (data) => {
    try {
        const res = await axios.post("/api/post/like-toggle", {
            postId: data,
        });
        return res;
    } catch (error) {
        console.error("Error toggling like on post:", error);
        throw error;
    }
};

export const followAUser = async (data) => {
    const res = await axios.post("/api/user/follow", {
        followId: data,
    });
    return res;
};
