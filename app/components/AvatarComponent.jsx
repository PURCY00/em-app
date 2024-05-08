import { fn } from "@/utils/utilityFunction";
import Image from "next/image";

const AvatarComponent = () => {
    return (
        <div className={`flex items-center gap-2`}>
            <div style={{ width: `fit-content` }} className={`relative rounded-full overflow-hidden`}>
                <Image
                    width={100}
                    height={100}
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt={`avatar-img`}
                />
            </div>
            <div>
                <p className={`font-semibold text-h5`}>John Doe</p>
                <p>0 Friends</p>
            </div>
        </div>
    );
};
export default AvatarComponent;