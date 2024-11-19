import Breadcrumb from "@/components/common/Breadcrumb";
import Footer from "@/components/footer/Footer";
import Home2Activities from "@/components/activities/Home2Activities";
import Home2About from "@/components/about/Home2About";
import Header2 from "@/components/header/Header2";
export const metadata = {
  title: "TripRex - Tour & Travel Agency  NextJs Template",
  description:
    "TripRex is a NextJs Template for Tour and Travel Agency purpose",
  icons: {
    icon: "/assets/img/sm-logo.svg",
  },
};
const page = () => {
  return (
    <>
      <Header2 />
      <Breadcrumb pagename="About Us" pagetitle="About Us" />
      <Home2About />
      <Home2Activities />
      <Footer />
    </>
  );
};

export default page;
