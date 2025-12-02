
"use client";

import Stories from "./components/Stories/Stories";
import Slider from "./components/MainSlider/MainSlider";
import Services from "./components/Services/Services";
import AmazingOffers from "./components/AmazingOffers/AmazingOffers";
import Footer from "./components/Footer/Footer";
import Header from "@/app/components/Header"
import VPNCheck from "./components/VPNCheck/VPNCheck";

export default function Home() {
  return (
    <div>
      <VPNCheck/>
      <Header />
      <Stories />
      <Slider />
      <Services />
      <AmazingOffers />
      <Footer />
    </div>
  );
}
