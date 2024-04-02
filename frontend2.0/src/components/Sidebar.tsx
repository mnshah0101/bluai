"use client";

import Image from "next/image";
import {
  ArrowRight2,
  Calendar,
  Document,
  Element3,
  Folder2,
  Headphone,
  Profile2User,
  Setting2,
  Setting4,
  Star,
  Timer1,
  Triangle,
} from "iconsax-react";
import ProfileImage from "../components/assets/profile.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCentralStore } from "@/Store";
import { useUser } from "@propelauth/nextjs/client";
import { useEffect, useState } from "react";

type User = {
  name: string;
  username: string;
  pictureUrl: string;
  userId: string;
};

function Sidebar() {
  const pathname = usePathname();
  const { setIsSidebarOpen, isSidebarOpen } = useCentralStore();
  const { loading, user } = useUser() as { loading: boolean; user: User };
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, [user]);

  async function getProjects() {
    if (loading == false && user) {
      let response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL +
          "/api/projects/projects/" +
          user.userId
      );
      let data = await response.json();
      console.log(data.projects);
      setProjects(data.projects);
    }
  }

  return (
    <div className="w-60 shrink-0 md:block h-screen sticky top-0 overflow-hidden">
      <div className="w-full h-full bg-white border-r">
        {/* logo */}
        <div className="p-4 md:p-6 flex cursor-pointer group items-center gap-2">
          <img src="/logos/blu_color.png" alt="" />
          <div></div>
        </div>

        {/* section divider */}
        <hr className="bg-gray-400 mx-2" />

        {/* other section */}
        <div className="flex flex-col h-full justify-between">
          {/* top */}
          <div className="pt-6 text-gray-500 font-medium space-y-2 md:px-2 text-xs">
            <Link
              href={"/app/dashboard"}
              className={`flex ${
                pathname === "/app/dashboard" ? "text-primary" : ""
              } hover:px-8 duration-200 rounded-md w-full py-2 px-6 items-center gap-2`}
            >
              <Element3 variant="Outline" size={16} />
              Home
            </Link>

            <Link
              href={"/app/createproject"}
              className={`flex ${
                pathname === "/app/createproject" ? "text-primary" : ""
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
            >
              <Calendar size={16} />
              Create Project
            </Link>

            {projects.map((project: any) => (
              <Link
                href={"/app/project/" + project._id}
                key={project._id}
                className={`flex ${
                  pathname === "/app/project/" + project._id
                    ? "text-primary"
                    : ""
                } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
              >
                <Folder2 size={16} />
                {project.title}
              </Link>
            ))}
          </div>

          <div>
            <hr className="bg-gray-400 mx-2 my-4" />

            {/* bottom */}
            <div className="flex pb-28 justify-between px-4 md:px-6 items-center cursor-pointer hover:pr-5 duration-200">
              <div className="flex items-center gap-2">
                <Image
                  src={ProfileImage}
                  alt="User"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <div className="">
                  <p className="text-sm font-semibold text-gray-800">
                    Steve Jobs
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    steve@apple.com
                  </p>
                </div>
              </div>

              <button className="text-gray-500">
                <ArrowRight2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
