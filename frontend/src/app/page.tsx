import HomeComponent from "@/components/Home/HomeComponent";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";




export const metadata: Metadata = {
  title:
    "Blu AI - Envionmentaly Friendly AI Code",
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
