import Project from "@/components/Dashboard/Project";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from 'next/navigation'





export const metadata: Metadata = {
  title:
    "Blu AI - Envionmentaly Friendly AI Code",
  description: "Blu AI audits your code for environmental impact and provides suggestions for improvement.",
};


export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Project />
      </DefaultLayout>
    </>
  );
}
