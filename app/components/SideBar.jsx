"use client";

import { Icon } from "@iconify/react";
import AvatarComponent from "./AvatarComponent";
import { fn } from "@/utils/utilityFunction";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SideBar = () => {
    const [isLocationProfile, setLocationProfile] = useState(false);

    // // next method
    const pathname = usePathname();
    console.log(pathname);

    // if pathname is equals to "profile" hide the post creatino component

    useEffect(() => {
        if (pathname === `/profile`) {
            setLocationProfile(true);
        } else {
            setLocationProfile(false);
        }
    }, [pathname]);
    return (
        <section className={`bg-white rounded-lg p-4`}>
            <AvatarComponent />
            <hr className={`my-5`} />
            <section>
                <p className={`text-h6 font-semibold`}>Bio</p>
                <p className={`text-sm`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, voluptatem beatae consectetur, recusandae cupiditate fugit dolore
                    expedita tempore est quae ipsam minima quo nisi animi esse distinctio velit temporibus. Omnis.
                </p>
            </section>
            <section hidden={!isLocationProfile}>
                <hr className={`my-5`} />
                <p className={`text-h6 font-semibold`}>Activity</p>
                <div className={`flex flex-col gap-4`}>
                    <div className={`flex items-center justify-between`}>
                        <div className={`flex items-center gap-4`}>
                            <Icon className={`text-emBlue`} fontSize={fn.rem(41)} icon='mingcute:group-3-line' />
                            <p>Followers</p>
                        </div>
                        <p>1000</p>
                    </div>
                    <div className={`flex items-center justify-between`}>
                        <div className={`flex items-center gap-4`}>
                            <Icon className={`text-emBlue`} fontSize={fn.rem(41)} icon='mingcute:group-2-line' />
                            <p>Following</p>
                        </div>
                        <p>1000</p>
                    </div>
                    <div className={`flex items-center justify-between`}>
                        <div className={`flex items-center gap-4`}>
                            <Icon className={`text-emBlue`} fontSize={fn.rem(41)} icon='solar:chat-square-like-linear' />
                            <p>Likes</p>
                        </div>
                        <p>1000</p>
                    </div>
                </div>
            </section>
            <hr className={`my-5`} />
            <section>
                <p className={`text-h6 font-semibold`}>Info</p>
                <div className={`flex flex-col gap-4`}>
                    <div className={`flex items-center gap-4`}>
                        <Icon className={`text-emBlue`} fontSize={fn.rem(41)} icon='bx:map' />
                        <p>Lagos, Nigeria</p>
                    </div>
                    <div className={`flex items-center gap-4`}>
                        <Icon className={`text-emBlue`} fontSize={fn.rem(41)} icon='ph:briefcase-light' />
                        <p>Realtor</p>
                    </div>
                </div>
            </section>
            <hr className={`my-5`} />
            <section>
                <p className={`text-h6 font-semibold`}>Socials</p>
                <div className={`flex flex-col gap-4`}>
                    <div className={`flex items-center gap-4`}>
                        <Icon className={`text-emBlue`} fontSize={fn.rem(41)} icon='prime:twitter' />
                        <p>Twitter</p>
                    </div>
                    <div className={`flex items-center gap-4`}>
                        <Icon className={`text-emBlue`} fontSize={fn.rem(41)} icon='mingcute:linkedin-line' />
                        <p>Linkedin</p>
                    </div>
                </div>
            </section>
        </section>
    );
};
export default SideBar;
