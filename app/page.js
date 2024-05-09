import GridLayout from "./components/GridLayout";
import Navbar from "./components/Navbar";
import PostCreationTemplate from "./components/PostTemplate";
import SideBar from "./components/SideBar";

const page = () => {
    return (
        <main>
            <nav>
                <Navbar />
            </nav>
            <GridLayout sideBar={<SideBar />} postView={<PostCreationTemplate />} />
        </main>
    );
};
export default page;
