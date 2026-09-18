import Events from "@/components/Events";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | HEC Finance Academy",
  description: "Explore HEC Finance Academy events by academic mandate.",
};

export default function EventsPage() {
  return <Events />;
}
