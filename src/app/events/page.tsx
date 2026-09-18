import Events from "@/components/Events";
import EventsScrollReset from "@/components/Events/EventsScrollReset";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | HEC Finance Academy",
  description: "Explore HEC Finance Academy events by academic mandate.",
};

export default function EventsPage() {
  return (
    <>
      <EventsScrollReset />
      <Events />
    </>
  );
}
