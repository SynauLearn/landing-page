"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
// import ImageCatPaw from "@/assets/images/img-decoration-footer-up.svg";
import CircleArrowUpRight from "@/assets/icons/circle-arrow-up-right.svg";
import ArrowUpRight from "@/assets/icons/arrow-up-right.svg";
import Instagram from "@/assets/icons/instagram.svg";
import Twitter from "@/assets/icons/twitter.svg";
import Copyright from "@/assets/icons/copyright.svg";
import ImageCat from "@/assets/images/img-cat-decoration-footer.svg";
import ImageMonitor from "@/assets/images/img-decoration-footer.svg";
import { APP_NAME } from "@/constants";
import { trackCTAClick } from "@/lib/gtag";

const FooterSection = () => {
  return (
    <footer className="relative w-full h-screen z-10 overflow-hidden">
      {/* <Image
        loading="lazy"
        src={ImageCatPaw}
        width={100}
        height={100}
        alt="Image Cat Paw"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-88 max-lg:-top-10 z-10"
      /> */}

      <div className="absolute bottom-0 inset-x-2 bg-sapphire-500 rounded-t-[3rem] h-[calc(100vh-8rem)] overflow-hidden">
        <div className="relative w-full flex max-lg:flex-col items-start gap-9 text-white max-lg:p-6 p-20 z-10">
          <div className="w-full flex flex-col justify-center items-start gap-4 lg:gap-8">
            <h1 className="text-[2.5rem] leading-13.5 font-extrabold lg:hidden">
              {APP_NAME}
            </h1>
            <div className="w-full flex lg:flex-col items-start gap-6">
              <p className="font-extrabold max-lg:font-medium w-[20rem] max-lg:w-1/2 lg:text-[2rem]">
                Learning blockchain, bits by bits!
              </p>
              <div className="w-1/2 flex lg:flex-col items-start max-lg:justify-end gap-5">
                <Button
                  onClick={() => {
                    trackCTAClick("footer_section");
                    window.open("https://app.synaulearn.com", "_blank");
                  }}
                  size={"lg"}
                  className="w-full py-1 lg:w-3/4 lg:h-16 flex items-center max-lg:pl-3 gap-2 bg-black hover:bg-black/60 rounded-full font-extrabold text-lg justify-between"
                >
                  <span className="lg:text-2xl">Try App</span>
                  <CircleArrowUpRight className="max-lg:size-9 size-11 text-black" />
                </Button>
                <div className="text-right max-lg:hidden lg:w-full flex items-center gap-1">
                  <Copyright className="size-4" />
                  <p className="text-xs lg:text-base font-medium">
                    {APP_NAME.toLowerCase()} 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative lg:top-28  w-full flex items-start lg:gap-18">
            <div className="w-39 flex flex-col items-start gap-4">
              <h4 className="font-bold lg:text-2xl">Product</h4>
              <div className="flex flex-col items-start gap-3">
                <a
                  href="#courses"
                  className="flex items-center justify-center gap-1"
                >
                  <h5 className="font-medium lg:text-xl">Courses</h5>
                  <ArrowUpRight className="text-white/50 size-4 lg:size-6" />
                </a>
                <a
                  href="#features"
                  className="flex items-center justify-center gap-1"
                >
                  <h5 className="font-medium lg:text-xl">Features</h5>
                  <ArrowUpRight className="text-white/50 size-4 lg:size-6" />
                </a>
                <a
                  href="#testimonials"
                  className="flex items-center justify-center gap-1"
                >
                  <h5 className="font-medium lg:text-xl">Testimonials</h5>
                  <ArrowUpRight className="text-white/50 size-4 lg:size-6" />
                </a>
                <a
                  href="#faq"
                  className="flex items-center justify-center gap-1"
                >
                  <h5 className="font-medium lg:text-xl">FAQ</h5>
                  <ArrowUpRight className="text-white/50 size-4 lg:size-6" />
                </a>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 px-3">
              <h4 className="font-bold lg:text-2xl">Follow us!</h4>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/synaulearn/",
                      "_blank",
                    )
                  }
                >
                  <Instagram className="size-6" />
                </button>
                <button
                  onClick={() =>
                    window.open("https://twitter.com/synaulearn", "_blank")
                  }
                >
                  <Twitter className="size-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="lg:hidden w-full flex items-center gap-1">
            <Copyright className="size-3" />
            <p className="text-xs font-medium">{APP_NAME.toLowerCase()} 2026</p>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-full lg:w-164 h-full bg-white/45 [clip-path:polygon(100%_0,0_100%,100%_100%)] opacity-10" />

        <Image
          loading="lazy"
          src={ImageMonitor}
          width={100}
          height={100}
          alt="Image Monitor"
          className="absolute bottom-0 right-40 w-40 z-10 lg:hidden"
        />

        <Image
          loading="lazy"
          src={ImageCat}
          width={100}
          height={100}
          alt="Image Cat Decoration"
          className="absolute bottom-0 right-0 max-lg:h-88 h-5/6 w-auto"
        />

        <div className="absolute -bottom-24 left-0 right-0 z-10 max-lg:hidden w-full text-center">
          {APP_NAME.split("").map((char, i) => (
            <span
              key={i}
              className={`${i === 0 ? "pl-0" : i === APP_NAME.length - 1 ? "pr-0" : "px-[calc(100%/99)]"} font-extrabold text-sapphire-400 text-[calc(100vw/7)]`}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
