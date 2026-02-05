"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { APP_NAME } from "@/constants";

import PlaceholderCard from "@/assets/vector/placeholder-card.svg";
import howItWorkData from "@/assets/datas/how-it-work.json";
import HowItWorksCard from "@/components/HowItWorksCard";

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!triggerRef.current) return;

      const totalItems = howItWorkData.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${totalItems * 200}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      ScrollTrigger.refresh();

      howItWorkData.forEach((item, index) => {
        const itemPrefix = `.card-${index}`;
        const startTime = index * 4;

        tl.fromTo(
          itemPrefix,
          { y: -300, opacity: 0, scale: 0.7, rotationY: -10 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.2,
            ease: "back.out(1.2)",
          },
          startTime,
        );

        tl.to(
          `${itemPrefix}-inner`,
          { rotateX: 180, duration: 1.2, ease: "power2.inOut" },
          startTime + 1.2,
        );

        tl.to(
          `${itemPrefix}-inner`,
          { rotateX: 360, duration: 1.2, ease: "power2.inOut" },
          startTime + 2.5,
        );

        const isMobile = window.innerWidth < 1024;
        const fanY = isMobile ? 300 : 350;
        const fanSpacing = isMobile ? 30 : 60;
        const fanOffset = (index - (totalItems - 1) / 2) * fanSpacing;
        const rotationAngle = (index - (totalItems - 1) / 2) * 10;

        tl.to(
          itemPrefix,
          {
            x: fanOffset,
            y: fanY,
            scale: 0.3,
            rotation: rotationAngle,
            duration: 1.5,
            ease: "power3.inOut",
          },
          startTime + 2.5,
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="features"
      ref={triggerRef}
      className="relative h-screen bg-white w-full overflow-hidden"
    >
      <div className="absolute right-0 top-0 w-full lg:w-1/2 aspect-square bg-black/10 [clip-path:polygon(0_0,100%_0,100%_100%)]" />
      <div className="absolute left-0 bottom-0 w-full lg:w-1/2 aspect-square bg-black/10 [clip-path:polygon(0_0,0_100%,100%_100%)]" />

      <div
        ref={containerRef}
        className="relative lg:absolute lg:left-40 lg:right-40 top-[calc(100vh-45rem)] lg:top-1/4 max-lgw-full flex max-lg:flex-col items-center lg:items-start justify-center lg:justify-between gap-8"
      >
        <h1 className="text-graphite-700 text-4xl max-lg:leading-14 lg:text-[4rem] font-extrabold text-center lg:text-left w-56 lg:w-1/4">
          How {APP_NAME} works
        </h1>

        <div className="relative w-full max-w-sm h-[calc(100vh-20rem)] perspective-1000">
          <div className="absolute inset-0 z-0 left-14 lg:left-0 right-14 lg:right-0 flex items-center justify-center bg-sapphire-300 border-8 border-primary rounded-2xl border-dashed">
            <PlaceholderCard className="size-16" />
          </div>

          {howItWorkData.map((item, index) => (
            <HowItWorksCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
