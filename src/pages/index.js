import Carousel from "../components/Carousel";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const OPTIONS = { slidesToScroll: "auto" };

export default function Home() {
  return (
    <div
      className={`${workSans.variable} flex items-center justify-center min-h-screen font-[family-name:var(--font-work-sans)]`}
    >
      <Carousel options={OPTIONS} />
    </div>
  );
}
