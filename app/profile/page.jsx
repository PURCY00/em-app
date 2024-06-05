"use client";

import GridLayout from "../components/GridLayout";
import Navbar from "../components/Navbar";
import PostProfileTemplate from "../components/PostProfileTemplate";
import PostCreationTemplate from "../components/PostTemplate";
import SideBar from "../components/SideBar";

const ProfilePage = () => {
    return (
        <main>
            <nav>
                <Navbar />
            </nav>
            <GridLayout sideBar={<SideBar />} postView={<PostProfileTemplate />} />
        </main>
    );
};
export default ProfilePage;
