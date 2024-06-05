"use client";

// app/context/GlobalState.js
import { fetchPosts, fetchAuthenticatedUser, followAUser as followAUserAPI, fetchPostsById, deletePostById, toggleLikePost } from "../../utils/api";
import React, { createContext, useReducer, useContext } from "react";

const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

const initialState = {
    user: null,
    userPosts: [],
    posts: [],
    comments: [],
};

const globalReducer = (state, action) => {
    switch (action.type) {
        case "SET_AUTH_USER":
            return { ...state, user: action.payload };
        case "SET_POSTS":
            return { ...state, posts: action.payload };
        case "SET_USER_POSTS":
            return { ...state, userPosts: action.payload };
        default:
            return state;
    }
};

export const getAuthUser = async (dispatch) => {
    const user = await fetchAuthenticatedUser();
    dispatch({ type: "SET_AUTH_USER", payload: user });
};

export const getAllPost = async (dispatch) => {
    const posts = await fetchPosts();
    dispatch({ type: "SET_POSTS", payload: posts });
};

export const getPostsById = async (dispatch, id) => {
    try {
        const res = await fetchPostsById(id);
        if (res.status === 200) {
            dispatch({ type: "SET_USER_POSTS", payload: res.data });
        }
    } catch (error) {
        console.error("Error fetching posts by ID:", error);
    }
};

export async function likePost(dispatch, postId) {
    console.log(postId);
    try {
        const res = await toggleLikePost(postId);
        // if (res.status === 200) {
        //     getAuthUser(dispatch);
        // }
        return res;
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

export const deletePost = async (dispatch, { id, userId }) => {
    try {
        const res = await deletePostById(id);
        getAllPost(dispatch);
        getPostsById(dispatch, userId);
        return res;
    } catch (error) {
        console.error("Error deleting posts by ID:", error);
    }
};
export const followAUser = async (dispatch, data) => {
    const res = await followAUserAPI(data);
    if (res.status === 200) {
        getAuthUser(dispatch);
    }
    return res;
};

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    return (
        <GlobalStateContext.Provider value={state}>
            <GlobalDispatchContext.Provider value={dispatch}>{children}</GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);
