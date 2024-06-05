/* eslint-disable @next/next/no-img-element */
"use client";

import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import ImageWrapper from "./ImageWrapper";
import Link from "next/link";
import { fn } from "@/utils/utilityFunction";
import logo from "@/public/logo.png";
import SearchInput from "./SearchInput";
import { signOut, useSession } from "next-auth/react";
import { getAuthUser, useGlobalDispatch, useGlobalState } from "../context/GlobalState";

const navigation = [
    { name: "Home", href: "/", icon: `mage:home-3-fill`, current: true },
    { name: "Community", href: "/community", icon: `mdi:users-group`, current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
    const state = useGlobalState();
    const dispatch = useGlobalDispatch();

    useEffect(() => {
        const getUser = async () => {
            getAuthUser(dispatch);
        };
        getUser();
    }, [dispatch]);

    return (
        <Disclosure as='nav' className='bg-white'>
            {({ open }) => (
                <>
                    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                        <div style={{ height: fn.rem(102) }} className='relative flex h-16 items-center justify-between'>
                            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                                {/* Mobile menu button*/}
                                <Disclosure.Button className='relative inline-flex text-2xl items-center justify-center rounded-md p-2 text-emBlue hover:bg-emBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                    <Icon icon='ant-design:menu-outlined' />
                                </Disclosure.Button>
                            </div>
                            <div className='flex flex-1 items-center justify-center md:justify-between sm:items-stretch sm:justify-start'>
                                <div className='flex flex-shrink-0 items-center gap-5'>
                                    <Link href={`/`}>
                                        <ImageWrapper src={logo} alt={`logo`} width={fn.rem(100)} height={fn.rem(38)} objectFit={`contain`} />
                                    </Link>
                                    <div className={`hidden md:block`}>
                                        <SearchInput />
                                    </div>
                                </div>
                                <div className='hidden sm:ml-6 sm:block'>
                                    <div className='flex space-x-4'>
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? "text-emBlue" : "text-emGrey hover:text-emBlue",
                                                    "rounded-md px-3 py-2 font-medium"
                                                )}
                                                aria-current={item.current ? "page" : undefined}
                                            >
                                                <Icon className={`mx-auto`} fontSize={fn.rem(40)} icon={item.icon} />
                                                <p> {item.name}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                                {/* Profile dropdown */}
                                <Menu as='div' className='relative ml-3'>
                                    <div>
                                        <Menu.Button className='relative flex rounded-full bg-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                            <img className='h-16 w-16 rounded-full' src={state?.user?.profilePhoto} alt='' />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter='transition ease-out duration-100'
                                        enterFrom='transform opacity-0 scale-95'
                                        enterTo='transform opacity-100 scale-100'
                                        leave='transition ease-in duration-75'
                                        leaveFrom='transform opacity-100 scale-100'
                                        leaveTo='transform opacity-0 scale-95'
                                    >
                                        <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link href='#' className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                                                        <div className={`flex items-center gap-4`}>
                                                            <Icon className={`text-emBlue`} fontSize={fn.rem(20)} icon='line-md:edit' />
                                                            <p>Edit Profile</p>
                                                        </div>
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link href='#' className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                                                        <div className={`flex items-center gap-4`}>
                                                            <Icon className={`text-emBlue`} fontSize={fn.rem(20)} icon='mi:notification' />
                                                            <p>Notification</p>
                                                        </div>
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        onClick={() => signOut()}
                                                        href={``}
                                                        className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}
                                                    >
                                                        <div className={`flex items-center gap-4`}>
                                                            <Icon className={`text-emRed`} fontSize={fn.rem(20)} icon='tabler:logout-2' />
                                                            <p>Sign out</p>
                                                        </div>
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className='sm:hidden'>
                        <div className='space-y-1 px-2 pb-3 pt-2 flex flex-col justify-center'>
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? " text-emBlue" : "text-gray-300 hover:text-emBlue",
                                        "flex items-center gap-1 rounded-md px-3 py-2 text-base font-medium"
                                    )}
                                    aria-current={item.current ? "page" : undefined}
                                >
                                    <Icon icon={item.icon} />
                                    <p> {item.name}</p>
                                </Link>
                            ))}
                            <div className={`flex items-center justify-center`}>
                                <SearchInput />
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};
export default Navbar;
