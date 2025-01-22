"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "@/plugins";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import { useTranslations } from "next-intl";

const DigitalAgencyHero = () => {
  const heroTitle = useRef();
  const heroSubTitle = useRef();
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    setIsClient(true);

    let tHero = gsap.context(() => {
      gsap.set(".custom-experience", {
        y: 50,
        opacity: 0,
      });
      let split_hero__title = new SplitText(heroTitle.current, {
        type: "chars",
      });
      let split_hero__subtitle = new SplitText(heroSubTitle.current, {
        type: "chars words",
      });

      gsap.from(split_hero__title.chars, {
        duration: 1,
        x: 70,
        autoAlpha: 0,
        stagger: 0.1,
      });
      gsap.from(
        split_hero__subtitle.words,
        { duration: 1, x: 50, autoAlpha: 0, stagger: 0.05 },
        "-=1"
      );

      gsap.to(
        ".custom-experience",
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "power2.out",
        },
        "-=1.5"
      );
    });
    return () => tHero.revert();
  }, []);

  return (
    <section className="custom-hero__area">
      {/* Background Video */}
      <div className="custom-background-video">
        {isClient && (
          <video className="background-video" autoPlay muted loop playsInline>
            <source src="https://vibeatcdn-2.b-cdn.net/high-tech-ai-robot-model-4k-2023-11-27-05-31-23-utc.mp4" />
            {t("vidErrorMsg")}
          </video>
        )}
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="custom-hero__content animation__hero_one">
              <Link href="/service-v5">
                {t("strategyHero")}
                <span>
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </Link>
              <div className="custom-hero__title-wrapper">
                <h1 className="custom-hero__title" ref={heroTitle}>
                  {t("primaryHeadingfirst")} <br />
                  {t("primaryHeadingSecond")}
                </h1>
                <p className="custom-hero__sub-title" ref={heroSubTitle}>
                  {t("primaryPara")}
                </p>
              </div>

              <div className="custom-experience">
                <h2 className="title">{t("digitalAgencyHeroExpNumber")}</h2>
                <p className="custom-exp-para">
                  {t("projectComplete")} <br />
                  {t("Succesfully")}
                </p>
              </div>
              <div className="cursor-btn btn_wrapper">
                <Link
                  className="btn-item wc-btn-primary btn-hover"
                  href="/contact"
                >
                  <span></span> {t("meetingBtn")}
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalAgencyHero;
