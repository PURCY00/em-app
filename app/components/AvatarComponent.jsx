import Image from "next/image";
import EditProfileModal from "./EditProfileModal";
import { useGlobalState } from "../context/GlobalState";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AvatarComponent = () => {
    const state = useGlobalState();
    const [isLocationProfile, setLocationProfile] = useState(false);
    const pathname = usePathname();

    // if pathname is equals to "profile" hide the post creatino component

    useEffect(() => {
        if (pathname === `/profile`) {
            setLocationProfile(true);
        } else {
            setLocationProfile(false);
        }
    }, [pathname]);

    return (
        <div className={`flex items-center justify-between gap-2`}>
            <Link href={`/profile`} className={`flex items-center gap-2`}>
                <div style={{ width: `7rem`, height: `7rem` }} className={`relative rounded-full overflow-hidden`}>
                    <Image className={`w-full h-full object-cover`} width={500} height={500} src={state?.user?.profilePhoto} alt={`avatar-img`} />
                </div>
                <div>
                    <p className={`font-semibold text-h5`}>{state?.user?.name}</p>
                    <p>{state?.user?.followers?.length + state?.user?.following?.length} Friend(s)</p>
                </div>
            </Link>
            <div hidden={!isLocationProfile}>
                <EditProfileModal />
            </div>
        </div>
    );
};
export default AvatarComponent;
