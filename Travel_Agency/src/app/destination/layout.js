import Newslatter from "@/components/common/Newslatter";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Header2 from "@/components/header/Header2";
import Topbar from "@/components/topbar/Topbar";
import React from "react";
export const metadata = {
  title: "TripRex - Tour & Travel Agency  NextJs Template",
  description:
    "TripRex is a NextJs Template for Tour and Travel Agency purpose",
  icons: {
    icon: "/assets/img/sm-logo.svg",
  },
};
const layout = ({children}) => {
  return (
    <>
      <Header2 />
      {children}
      <Newslatter/>
      <Footer/>
    </>
  );
};

export default layout;