'use client'
import Project from "@/components/Dashboard/Project";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { usePathname } from "next/navigation";



function getLastPartOfPath(path: string): string {
  const parts = path.split('/');
  return parts[parts.length - 1];
}







export default function Home() {

 const pathName = usePathname();
 let id = '';

 if(pathName != null){
 id = getLastPartOfPath(pathName)
 }

 

 

 




  return (
    <>
      <DefaultLayout>
        <Project project={id} />
      </DefaultLayout>
    </>
  );
}
