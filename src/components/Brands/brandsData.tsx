import { Brand } from "@/types/brand";

const brandsData: Brand[] = [
  "1.jpeg",
  "2.png",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
  "7.jpeg",
  "8.png",
  "9.jpeg",
  "a.png",
  "b.png",
  "g.jpeg",
].map((filename, index) => ({
  id: index + 1,
  name: `Partner ${String(index + 1).padStart(2, "0")}`,
  href: "#",
  image: `/images/sponso/${filename}`,
}));

export default brandsData;
