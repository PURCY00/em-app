const GridLayout = ({ sideBar, postView }) => {
    return (
        <main className={`grid grid-cols-1 md:grid-cols-12 gap-4 max-w-7xl mx-auto my-5 px-4 md:px-8`}>
            {/* side bar */}
            <section className={`hidden md:block col-span-4`}>{sideBar}</section>
            {/* post view */}
            <section className={`col-span-8`}>{postView}</section>
        </main>
    );
};
export default GridLayout;
