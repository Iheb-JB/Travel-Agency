import About1 from "@/components/about/About1";
import Home3Accordion from "@/components/accordion/Home3Accordion";
import Home2Banner from "@/components/banner/Home2Banner";
import Destination1 from "@/components/destination/Destination1";
import Home1Fecilities2 from "@/components/facilitySlide/Home1Fecilities2";
import Footer from "@/components/footer/Footer";
import Header2 from "@/components/header/Header2";

export const metadata = {
  title: "Tour & Travel Agency",
  description:
    " Tour and Travel Agency website work",
  icons: {
    icon: "/assets/img/sm-logo.svg",
  },
};
export default function Home() {
  return (
    <>
      <Header2 />
      <Home2Banner />
      <About1 />
      <Destination1 />
      <Home1Fecilities2 />
      <Home3Accordion/>
      <Footer />
    </>
  );
}
