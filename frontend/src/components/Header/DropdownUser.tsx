'use client';
import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@propelauth/nextjs/client";

type UserType = {
  firstName: string;
  username: string;
  pictureUrl: string;
};

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const { loading, user } = useUser() as { loading: boolean, user: UserType | null };

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    if (user) {
      setName(user.firstName);
      setUsername(user.username);
      setProfilePicture(user.pictureUrl);
    }
  }
  , [user]);


  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {name || ''}
          </span>
          <span className="block text-xs">{username || ''}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img src={profilePicture} alt="" />
        </span>

       
      </Link>

     
    </div>
  );
};

export default DropdownUser;
