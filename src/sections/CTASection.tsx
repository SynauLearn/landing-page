"use client";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/constants";
import Image from "next/image";
import CatFoodLeft from "@/assets/images/img-decoration-cta-left.svg";
import CatFoodRight from "@/assets/images/img-decoration-cta-right.svg";
import CloudLeft from "@/assets/images/img-decoration-cta-left-2.svg";
import CloudRight from "@/assets/images/img-decoration-cta-right-2.svg";
import CatCTA from "@/assets/images/img-cat-cta.svg";
import PawLeft from "@/assets/images/img-decoration-cta-left-3.svg";
import PawRight from "@/assets/images/img-decoration-cta-right-3.svg";

const CTASection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-linear-to-b from-white to-gold-300 z-10">
      <div className="absolute top-32 lg:top-40 w-full inline-flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl font-extrabold lg:text-5xl">
          Start first lesson today!
        </h1>
        <h3 className="font-medium font-inter text-center lg:text-2xl">
          Small steps, real progress, <br className="lg:hidden" />
          proof you can keep
        </h3>
        <Button
          onClick={() => window.open("https://app.synaulearn.com", "_blank")}
          size={"lg"}
          className="bg-black hover:bg-black/60 font-extrabold lg:text-2xl z-50"
        >
          Try {APP_NAME}
        </Button>
      </div>

      <div className="hidden lg:flex absolute w-full bottom-1/2 justify-between">
        <Image
          loading="lazy"
          src={CatFoodLeft}
          width={260}
          height={260}
          alt="Cat Food Left"
          className="relative left-6"
        />
        <Image
          loading="lazy"
          src={CatFoodRight}
          width={260}
          height={260}
          alt="Cat Food Right"
          className="relative right-6"
        />
      </div>

      <div className="absolute w-full bottom-20 lg:bottom-0 flex justify-between items-center z-20">
        <Image
          loading="lazy"
          src={CloudLeft}
          width={300}
          height={300}
          alt="Cloud Left"
          className="relative left-0 max-lg:h-48 lg:w-lg"
        />
        <Image
          loading="lazy"
          src={CloudRight}
          width={300}
          height={300}
          alt="Cloud Right"
          className="relative right-0 max-lg:h-48 lg:w-lg"
        />
      </div>

      <div className="absolute w-full bottom-40 lg:bottom-0">
        <Image
          loading="lazy"
          src={CatCTA}
          width={300}
          height={300}
          alt="Cat CTA"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 lg:w-xl"
        />

        <div className="relative left-1/2 -translate-x-1/2 flex justify-center z-20">
          <Image
            loading="lazy"
            src={PawLeft}
            width={200}
            height={200}
            alt="Paw Left"
            className="relative bottom-0 size-32 lg:size-56"
          />
          <div className="mx-10 lg:mx-30" />
          <Image
            loading="lazy"
            src={PawRight}
            width={200}
            height={200}
            alt="Paw Right"
            className="relative bottom-0 size-32 lg:size-56"
          />
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-36 lg:h-16 bg-white" />
    </section>
  );
};

export default CTASection;
