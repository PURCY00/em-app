import Image from "next/image";
import authimg from "@/public/authimg.png";
import ImageWrapper from "@/app/components/ImageWrapper";

const layout = ({ children }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 h-screen`}>
            {/* column 1 */}
            <section className={`bg-slate-400 md:flex items-center justify-center p-10 hidden`}>
                <ImageWrapper alt={`auth-img`} src={authimg} width={`100%`} height={`100%`} objectFit={`contain`} />
            </section>
            {/* column 2 */}
            <section className={`flex items-center justify-center p-5`}>
                {/* insert children  here */}
                {children}
            </section>
        </div>
    );
};
export default layout;

// 581 x 822
