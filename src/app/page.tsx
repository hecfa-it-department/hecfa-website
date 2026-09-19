import ExecutiveBoard from "@/components/ExecutiveBoard";
import AboutSectionOne from "@/components/About/AboutSectionOne";
import Brands from "@/components/Brands";
import Contact from "@/components/Contact";
import ScrollUp from "@/components/Common/ScrollUp";
import Events from "@/components/Events";
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Next.js Template for Startup and SaaS",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <AboutSectionOne />
      <Brands />
      <ExecutiveBoard />
      <Events />
      <Contact />
    </>
  );
}
