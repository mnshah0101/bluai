"use client";
import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarPrimaryButton,
  PageNavbarRightContent,
} from "@/components/layout/PageNavbar";
import { Add, Notification, SearchNormal1, Setting4 } from "iconsax-react";
import PageContent from "@/components/layout/PageContent";
import Tabs from "@/components/Cards/ui/tabs";
import Suggestions from "@/components/integrations/IntegrationsList";
import { usePathname } from "next/navigation";
import ChartComponent from "@/components/Charts/Chart";
import { useEffect, useState } from "react";

function Project() {
  const pathname = usePathname();
  const projectId = pathname.split("/").pop();

  const [project, setProject] = useState({} as any);

  //get project async function

  async function getProject() {
    let response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL +
        "/api/projects/getProject/" +
        projectId
    );
    let data = await response.json();
    setProject(data.project);
  }

  useEffect(() => {
    getProject();
  });

  return (
    <div>
      <PageContent>
        <div className="flex items-center justify-between">
          <div></div>
        </div>

        {/* header */}
        <div className="text-sm">
          <h1 className="text-gray-800 font-medium">Your Blu API Key</h1>
          <p className="text-xs text-gray-500">
            {project.key ? project.key : "No API key found"}
          </p>
        </div>

        <ChartComponent />

        {/* apps/integration options */}
        <Suggestions project={project} />
      </PageContent>
    </div>
  );
}

export default Project;
