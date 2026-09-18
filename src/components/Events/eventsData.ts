export type Mandate = string;

export type EventItem = {
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  mandate: Mandate;
  category?: string;
};

// Replace the placeholder fields with official event details as they become available.
export const events: EventItem[] = [
  {
    title: "HEC FA Event",
    description: "Official event details will be added soon.",
    date: "Date to be announced",
    location: "IHEC Carthage",
    image: "/images/hecfa-achivments/image.webp",
    mandate: "2023/2024",
    category: "Event",
  },
  {
    title: "HEC FA Event",
    description: "Official event details will be added soon.",
    date: "Date to be announced",
    location: "IHEC Carthage",
    image: "/images/hecfa-achivments/image (1).webp",
    mandate: "2023/2024",
    category: "Event",
  },
  {
    title: "HEC FA Event",
    description: "Official event details will be added soon.",
    date: "Date to be announced",
    location: "IHEC Carthage",
    image: "/images/hecfa-achivments/image (2).webp",
    mandate: "2024/2025",
    category: "Event",
  },
  {
    title: "HEC FA Event",
    description: "Official event details will be added soon.",
    date: "Date to be announced",
    location: "IHEC Carthage",
    image: "/images/hecfa-achivments/2.png",
    mandate: "2024/2025",
    category: "Event",
  },
  {
    title: "HEC FA Event",
    description: "Official event details will be added soon.",
    date: "Date to be announced",
    location: "IHEC Carthage",
    image: "/images/hecfa-achivments/7.png",
    mandate: "2025/2026",
    category: "Event",
  },
  {
    title: "HEC FA Event",
    description: "Official event details will be added soon.",
    date: "Date to be announced",
    location: "IHEC Carthage",
    image: "/images/hecfa-achivments/image (4).webp",
    mandate: "2025/2026",
    category: "Event",
  },
];
