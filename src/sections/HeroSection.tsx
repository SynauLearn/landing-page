"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/constants";
import CloudDecorationLeft from "@/assets/images/img-cloud-decoration-left.svg";
import CloudDecorationRight from "@/assets/images/img-cloud-decoration-right.svg";
import CatDecorationLeft from "@/assets/images/img-cat-decoration-hero-left.svg";
import CatDecorationRight from "@/assets/images/img-cat-decoration-hero-right.svg";
import PreviewSection from "./PreviewSection";
import { trackCTAClick } from "@/lib/gtag";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="relative bg-linear-to-b from-gold-300 to-white h-screen">
        <div className="absolute top-50 max-lg:top-1/4 left-0 right-0 lg:left-1/2 lg:-translate-x-1/2 inline-flex flex-col items-center justify-center gap-7 max-lg:gap-4 z-30">
          <div className="flex w-full flex-col items-center">
            <h1 className="text-primary text-[4rem] max-lg:text-5xl font-extrabold">
              {APP_NAME}
            </h1>
            <p className="text-primary text-center text-xl lg:text-base font-medium font-inter">
              Learning blockchain, bits by bits
            </p>
          </div>
          <Button
            onClick={() => {
              trackCTAClick("hero_section");
              window.open("https://app.synaulearn.com", "_blank");
            }}
            size={"lg"}
            className="max-lg:h-12 rounded-full bg-foreground hover:bg-foreground/60 lg:text-2xl font-extrabold"
          >
            Try {APP_NAME}
          </Button>
        </div>

        <Image
          loading="lazy"
          src={CatDecorationRight}
          alt="Cat Decoration Right"
          width={500}
          height={500}
          className="absolute bottom-[calc(100vh-40rem)] max-lg:bottom-[calc(100vh-34rem)] w-[calc(100vw-10rem)] lg:w-80 -right-10 lg:right-50 z-10"
        />
        <Image
          loading="lazy"
          src={CatDecorationLeft}
          alt="Cat Decoration Left"
          width={500}
          height={500}
          className="absolute bottom-0 w-[calc(100vw-10rem)] lg:w-80 -left-10 lg:left-54 z-10 max-lg:z-30"
        />

        <div className="absolute bottom-0 w-full flex justify-between">
          <Image
            loading="lazy"
            src={CloudDecorationLeft}
            alt="Cloud Decoration Left"
            width={500}
            height={500}
            className="absolute bottom-0 max-lg:bottom-[calc(100vh-40rem)] w-52 lg:w-lg left-0"
          />
          <Image
            loading="lazy"
            src={CloudDecorationRight}
            alt="Cloud Decoration Right"
            width={500}
            height={500}
            className="absolute bottom-0 max-lg:bottom-[calc(100vh-38rem)] w-52 lg:w-lg right-0"
          />
        </div>

        <div className="absolute bottom-0 w-full h-60 bg-gold-500 lg:hidden" />

        <div className="z-20 top-[calc(100vh-22rem)] absolute h-[1000px] max-lg:w-72 w-xl left-1/2 -translate-x-1/2 max-lg:rounded-[3rem] rounded-[6rem] border-20 max-lg:border-10 border-[#FAF0C3] bg-white">
          <div className="bg-white z-30 h-10 max-lg:h-6 w-76 max-lg:w-40 max-lg:rounded-b-xl rounded-b-2xl absolute top-4 left-1/2 -translate-x-1/2" />
          <div className="w-full h-full p-4 relative">
            <div className="bg-black w-full h-full max-lg:rounded-[1.5rem] rounded-[5rem]"></div>
          </div>
        </div>
      </div>

      {/* <PreviewSection /> */}
    </section>
  );
};

export default HeroSection;
