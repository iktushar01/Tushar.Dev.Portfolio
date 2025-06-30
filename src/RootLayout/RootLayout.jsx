import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import SmoothFollower from "../Components/SmoothFollower/SmoothFollower";

const RootLayout = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouchDevice();
  }, []);

  return (
    <div className="bg-black">
      {!isTouchDevice && <SmoothFollower />}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
