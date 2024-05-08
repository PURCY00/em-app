import GridLayout from "./components/GridLayout";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";

const page = () => {
    return (
        <main>
            <nav>
                <Navbar />
            </nav>
            <GridLayout sideBar={<SideBar />} postView={<p>my post</p>} />
        </main>
    );
};
export default page;
