import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import logo from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import useUser from "../../hooks/useUser";

function Header() {
  const [user] = useUser();
  return (
    <header>
      <Popover className="relative bg-white">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link passHref={"/"}>
              <Popover.Button>
                <span className="sr-only">CS Tracker</span>
                <Image src={logo} alt="" height={40} width={43} />
              </Popover.Button>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <div className="text-base font-medium text-gray-500 hover:text-gray-900">
              <Link href={"/"}>Home</Link>
            </div>
            <div className="text-base font-medium text-gray-500 hover:text-gray-900">
              <Link href={"/profile"}>Profile</Link>
            </div>
            <div className="text-base font-medium text-gray-500 hover:text-gray-900">
              <Link href={"/revision"}>Revision</Link>
            </div>
            <div className="text-base font-medium text-gray-500 hover:text-gray-900">
              <Link href={"/about"}>About</Link>
            </div>
          </Popover.Group>
          {user.email.length === 0 && (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <div className="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700">
                <Link href={"/register"}>Sign In</Link>
              </div>
            </div>
          )}
          {user.email.length > 0 && (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0"></div>
          )}
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Image src={logo} alt="Workflow" height={40} width={43} />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="py-6 px-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-base font-medium text-gray-500 hover:text-gray-900">
                    <Link href={"/"}>Home</Link>
                  </div>
                  <div className="text-base font-medium text-gray-500 hover:text-gray-900">
                    <Link href={"/profile"}>Profile</Link>
                  </div>
                  <div className="text-base font-medium text-gray-500 hover:text-gray-900">
                    <Link href={"/revision"}>Revision</Link>
                  </div>
                  <div className="text-base font-medium text-gray-500 hover:text-gray-900">
                    <Link href={"/about"}>About</Link>
                  </div>
                </div>
                {user.email.length === 0 && (
                  <div className="mt-6">
                    <div className="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700">
                      <Link href={"/register"}>Sign In</Link>
                    </div>
                  </div>
                )}
                {user.email.length > 0 && (
                  <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0"></div>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  );
}
export default Header;
