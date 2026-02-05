"use client";

import { useState, useRef } from "react";
import ExpandIcon from "@/assets/icons/expand.svg";
import CollapseIcon from "@/assets/icons/collapse.svg";
import MonitorLogo from "@/assets/vector/monitor-logo.svg";
import faqData from "@/assets/datas/faq.json";
import DecorationLeft from "@/assets/images/img-decoration-faq-left.svg";
import DecorationRight from "@/assets/images/img-decoration-faq-right.svg";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
  const [isExpanded, setIsExpanded] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const monitorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  const handleExpand = (id: number) => {
    setIsExpanded(isExpanded === id ? null : id);
  };

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !monitorRef.current ||
        !contentRef.current ||
        !itemsContainerRef.current
      )
        return;

      const content = contentRef.current;
      const itemsContainer = itemsContainerRef.current;

      const calculateScrollDistance = () => {
        const lastItem = itemsContainer.lastElementChild as HTMLElement;
        if (!lastItem) return 0;

        // Offset of itemsContainer relative to contentRef
        const itemsOffsetInContent = itemsContainer.offsetTop;
        // Offset of lastItem relative to itemsContainer
        const lastItemOffsetInItems = lastItem.offsetTop;

        // The distance we need to move the content so that the last item's top reaches the monitor's top.
        // mt-10 is roughly 40px offset from monitor top.
        return itemsOffsetInContent + lastItemOffsetInItems + 40;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${calculateScrollDistance() + 200}`, // Dynamic pin duration
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(content, {
        y: () => -calculateScrollDistance(),
        ease: "none",
      });
    },
    { scope: sectionRef },
  );

  // Trigger refresh when accordion state changes
  useGSAP(
    () => {
      ScrollTrigger.refresh();
    },
    { dependencies: [isExpanded], scope: sectionRef },
  );

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative w-full h-screen bg-white overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 z-50 flex flex-col">
        <div
          ref={monitorRef}
          className="relative w-[500px] lg:w-[900px] h-[360px] lg:h-[460px] bg-gold-800 rounded-t-3xl flex flex-col items-center justify-items-start overflow-hidden"
        >
          <div className="absolute top-0 bg-gold-800 rounded-t-3xl w-full h-10 z-100" />
          <div className="absolute inset-x-0 left-30 right-30 top-0 bottom-0 bg-white/30 [clip-path:polygon(40%_0,100%_0,60%_100%,0_100%)] z-10" />

          {/* Static Background */}
          <div className="absolute inset-x-[2.5%] top-10 bottom-10 bg-gold-100 rounded-xl z-0" />

          {/* FAQ Content */}
          <div
            ref={contentRef}
            className="relative w-[95%] inset-0 inline-flex justify-center items-center pt-12 pb-12 mt-10 z-20"
          >
            <div className="flex flex-col justify-center items-center gap-4 w-[76%] px-4">
              <h1 className="text-2xl lg:text-5xl font-extrabold text-graphite-700">
                FAQs
              </h1>

              <div ref={itemsContainerRef} className="w-full space-y-4">
                {faqData.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex p-4 lg:px-7 lg:py-6 items-start justify-between gap-2.5 bg-graphite-700 rounded-xl w-full"
                  >
                    <div className="flex flex-col justify-center items-start gap-3 lg:gap-2.5">
                      <h2 className="lg:text-2xl font-extrabold text-white">
                        {item.question}
                      </h2>
                      {item.answer && (
                        <p
                          className={`text-sm lg:text-xl font-inter font-medium text-graphite-200 ${isExpanded === item.id ? "block" : "hidden"}`}
                        >
                          {item.answer}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleExpand(item.id)}
                      className="relative size-5 z-100"
                    >
                      {isExpanded === item.id ? (
                        <CollapseIcon />
                      ) : (
                        <ExpandIcon />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 bg-gold-800 rounded-t-3xl w-full h-10 z-100" />
        </div>
        <div className="relative h-12 bg-gold-400 rounded-b-3xl flex justify-center items-center">
          <MonitorLogo className="size-8" />
        </div>
        <div className="relative w-28 h-16 bg-gold-800 left-1/2 -translate-x-1/2" />
        <div className="relative w-40 h-5 bg-gold-900 left-1/2 -translate-x-1/2" />
      </div>

      <Image
        loading="lazy"
        src={DecorationLeft}
        width={300}
        height={300}
        className="absolute bottom-0 left-20 max-lg:hidden z-50 h-72"
        alt="Decoration Left"
      />
      <Image
        loading="lazy"
        src={DecorationRight}
        width={300}
        height={300}
        className="absolute bottom-0 right-20 z-50 max-lg:-right-16 h-72"
        alt="Decoration Right"
      />
      <div className="absolute bottom-0 h-80 lg:h-60 w-full bg-sapphire-100 lg:[clip-path:polygon(20%_0,80%_0,100%_100%,0_100%)]" />
    </section>
  );
};

export default FAQSection;
