"use client";

import GridLayout from "../components/GridLayout";
import Navbar from "../components/Navbar";
import PostCreationTemplate from "../components/PostTemplate";
import SideBar from "../components/SideBar";

const ProfilePage = () => {
    // react method
    // const location = useLocation();
    // console.log(location);

    return (
        <main>
            <nav>
                <Navbar />
            </nav>
            <GridLayout sideBar={<SideBar />} postView={<PostCreationTemplate />} />
        </main>
    );
};
export default ProfilePage;
