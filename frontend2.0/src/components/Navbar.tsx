import React from "react";
import Image from "next/image";
import ProfileImage from "../components/assets/profile.png";
import {
  Add,
  CalendarEdit,
  DirectNotification,
  SearchNormal1,
  SidebarLeft,
} from "iconsax-react";
import { useUser } from "@propelauth/nextjs/client";
import { useState, useEffect } from "react";
import Link from "next/link";

type User = {
  name: string;
  username: string;
  pictureUrl: string;
};

function Navbar({
  isOpen,
  sidebarChange,
}: {
  isOpen: boolean;
  sidebarChange: (value: boolean) => void;
}) {
  const { loading, user } = useUser() as {
    loading: boolean;
    user: User | null;
  };

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setProfile(user.pictureUrl);
    }
  }, [user]);

  return (
    <div>
      <div className="flex p-4 md:p-6 justify-between items-center">
        {/* profile/left section */}
        <div className="flex items-center justify-between gap-2">
          <img
            src={profile}
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="">
            <p className="text-sm font-semibold text-gray-800">{username}</p>
            <p className="text-xs font-medium text-gray-500">Welcome back</p>
          </div>
        </div>

        <button
          onClick={() => sidebarChange(!isOpen)}
          className="all-center text-gray-500 h-8 w-8 md:hidden"
        >
          <SidebarLeft size={16} />
        </button>

        {/* right section */}
        <div className="text-gray-500 hidden md:flex gap-2">
          <button className="h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-white rounded-lg text-xs md:flex items-center justify-center">
            <Add size={16} />
            <Link href="/app/createproject">
              <span className="hidden md:inline">Create Project</span>
            </Link>
          </button>
        </div>
      </div>

      <hr className="bg-gray-400 mx-2" />
    </div>
  );
}

export default Navbar;
