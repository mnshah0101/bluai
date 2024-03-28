import { Metadata } from "next";
import dynamic from 'next/dynamic'
const HomeComponent = dynamic(() => import('@/components/Home/HomeComponent'), { ssr: false })
const DefaultLayout = dynamic(() => import('@/components/Layouts/DefaultLayout'), { ssr: false })




export const metadata: Metadata = {
  title:
    "Blu AI - Environmentally Friendly AI Code",
  description: "Blu AI audits your code for environmental impact and provides suggestions for improvement.",
};

export default function Home() {


  return (
    <>
      <DefaultLayout>
        <HomeComponent/>
      </DefaultLayout>
    </>
  );
}
