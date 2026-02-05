"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Button } from "./ui/button";
import logo from "@/assets/images/img-logo.png";
import CircleArrowUpRight from "@/assets/icons/circle-arrow-up-right.svg";
import HamburgerMenu from "@/assets/icons/hamburger-menu.svg";
import { APP_NAME } from "@/constants";
import { track } from "@vercel/analytics";

const Header = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const brandNameRef = useRef<HTMLSpanElement>(null);
  const logoImageRef = useRef<HTMLImageElement>(null);
  const hamburgerRef = useRef<SVGSVGElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileNavItemsRef = useRef<HTMLAnchorElement[]>([]);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Check if desktop on mount and resize
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 0 && currentScrollY > lastScrollY.current) {
        setIsShrunk(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsShrunk(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    if (isDesktop) {
      // DESKTOP ANIMATIONS
      if (isShrunk) {
        // SHRUNK STATE: Centered, compact square
        // Make children disappear quickly in place (no shifting)
        gsap.to([brandNameRef.current, navRef.current, buttonRef.current], {
          opacity: 0,
          scale: 0.8,
          width: 0,
          margin: 0,
          duration: 0.2,
          pointerEvents: "none",
          display: "none",
          ease: "power2.in",
        });

        // Then animate container to center
        gsap.to(headerRef.current, {
          left: "50%",
          right: "auto",
          xPercent: -50,
          width: "fit-content",
          padding: "0.25rem",
          borderRadius: "0.8rem",
          duration: 0.4,
          ease: "power3.inOut",
        });
      } else {
        // EXPANDED STATE: Start centered, expand width outwards
        gsap.set(headerRef.current, { width: "5rem", padding: "0.5rem" });
        gsap.to(headerRef.current, {
          width: "calc(100% - 13rem)",
          left: "50%",
          right: "auto",
          xPercent: -50,
          height: "auto",
          borderRadius: "1.5rem",
          duration: 0.7,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set(headerRef.current, {
              width: "auto",
              left: "5rem",
              right: "5rem",
              xPercent: 0,
              clearProps: "height",
            });
          },
        });

        gsap.set([brandNameRef.current, navRef.current, buttonRef.current], {
          display: (index, target) =>
            target === brandNameRef.current ? "inline" : "flex",
        });
        gsap.fromTo(
          [brandNameRef.current, navRef.current, buttonRef.current],
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            width: "auto",
            duration: 0.6,
            delay: 0.1,
            stagger: 0.08,
            pointerEvents: "auto",
            ease: "power3.out",
            onComplete: () => {
              gsap.set(
                [brandNameRef.current, navRef.current, buttonRef.current],
                { clearProps: "all" },
              );
            },
          },
        );
      }
    } else {
      // MOBILE ANIMATIONS
      if (isShrunk) {
        // Hide hamburger menu on scroll down
        gsap.to(hamburgerRef.current, {
          opacity: 0,
          scale: 0.5,
          width: 0,
          marginRight: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      } else {
        // Show hamburger menu on scroll up
        gsap.to(hamburgerRef.current, {
          opacity: 1,
          scale: 1,
          width: "auto",
          marginRight: "0.5rem",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    }
  }, [isShrunk, isDesktop]);

  // Mobile menu animation
  useGSAP(() => {
    if (isMobileMenuOpen) {
      // Open menu
      gsap.set(mobileMenuRef.current, { display: "flex" });
      gsap.fromTo(
        mobileMenuRef.current,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.4, ease: "power3.out" },
      );
      // Stagger nav items
      gsap.fromTo(
        mobileNavItemsRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.08,
          delay: 0.2,
          ease: "power2.out",
        },
      );
    } else {
      // Close menu
      gsap.to(mobileMenuRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: "none" });
        },
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed max-lg:h-16 z-100 top-9 left-1/2 -translate-x-1/2 p-2 inline-flex items-center justify-between gap-30 rounded-3xl max-lg:rounded-xl border border-primary/10 bg-white backdrop-blur-md shadow-xl overflow-hidden"
        onMouseEnter={() => {
          if (isShrunk) setIsShrunk(false);
        }}
      >
        <div ref={logoRef} className="flex items-center">
          <HamburgerMenu
            ref={hamburgerRef}
            onClick={() => setIsMobileMenuOpen(true)}
            className="size-12 text-primary lg:hidden flex items-center justify-center cursor-pointer"
          />
          <Image
            loading="lazy"
            ref={logoImageRef}
            src={logo}
            alt="Logo"
            width={500}
            height={500}
            className="size-12 rounded-lg"
          />
          <span
            ref={brandNameRef}
            className="max-lg:hidden ml-2 text-primary text-3xl max-lg:text-2xl font-bold"
          >
            {APP_NAME}
          </span>
        </div>

        <nav
          ref={navRef}
          className="max-lg:hidden flex items-center gap-7 font-inter text-center"
        >
          <a
            href="#courses"
            className="text-[#999] w-[95px] hover:text-primary transition-colors"
          >
            Courses
          </a>
          <a
            href="#features"
            className="text-[#999] w-[95px] hover:text-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#testimonials"
            className="text-[#999] w-[95px] hover:text-primary transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#faq"
            className="text-[#999] w-[95px] hover:text-primary transition-colors"
          >
            FAQ
          </a>
        </nav>

        <div ref={buttonRef} className="max-lg:hidden">
          <Button
            onClick={() => {
              track("cta_click", { location: "header_desktop" });
              window.open("https://app.synaulearn.com", "_blank");
            }}
            size={"lg"}
            className="flex items-center gap-3 py-2 pl-6 rounded-full bg-foreground hover:bg-foreground/60 font-extrabold"
          >
            Try App
            <CircleArrowUpRight className="size-6 text-black mr-2" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-2 rounded-4xl z-200 bg-white hidden flex-col lg:hidden"
        style={{ display: "none" }}
      >
        {/* Close Button */}
        <div className="relative top-[5%] left-6 flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="size-16 rounded-2xl border border-primary/10 bg-white flex items-center justify-center text-primary hover:bg-gray-50 transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-primary text-2xl font-bold">
            {APP_NAME}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
          <a
            ref={(el) => {
              if (el) mobileNavItemsRef.current[0] = el;
            }}
            href="#courses"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl font-medium text-graphite-700 hover:text-primary transition-colors"
          >
            Courses
          </a>
          <a
            ref={(el) => {
              if (el) mobileNavItemsRef.current[1] = el;
            }}
            href="#features"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl font-medium text-graphite-700 hover:text-primary transition-colors"
          >
            Features
          </a>
          <a
            ref={(el) => {
              if (el) mobileNavItemsRef.current[2] = el;
            }}
            href="#testimonials"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl font-medium text-graphite-700 hover:text-primary transition-colors"
          >
            Testimonials
          </a>
          <a
            ref={(el) => {
              if (el) mobileNavItemsRef.current[3] = el;
            }}
            href="#faq"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl font-medium text-graphite-700 hover:text-primary transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Try App Button */}
        {/* <div className="pb-12 px-6">
          <Button
            onClick={() => {
              window.open("https://app.synaulearn.com", "_blank");
              setIsMobileMenuOpen(false);
            }}
            size="lg"
            className="w-full flex items-center justify-center gap-3 py-6 rounded-full bg-foreground hover:bg-foreground/60 font-extrabold text-lg"
          >
            Try App
            <CircleArrowUpRight className="size-6 text-black" />
          </Button>
        </div> */}
      </div>
    </>
  );
};

export default Header;
