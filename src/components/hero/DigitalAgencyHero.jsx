"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "@/plugins";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const DigitalAgencyHero = () => {
  const heroTitle = useRef();
  const heroSubTitle = useRef();
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations();

  const locale = useLocale();

  useEffect(() => {
    setIsClient(true);

    // *** Disable text splitting for Arabic ***
    if (locale === "ar") {
      // Return early → No GSAP / SplitText for Arabic
      return;
    }

    // Otherwise, run the text splitting animations for non-AR languages
    let ctx = gsap.context(() => {
      gsap.set(".custom-experience", {
        y: 50,
        opacity: 0,
      });

      // Split the hero title and subtitle
      let splitHeroTitle = new SplitText(heroTitle.current, { type: "chars" });
      let splitHeroSubtitle = new SplitText(heroSubTitle.current, {
        type: "chars words",
      });

      // Animate them in
      gsap.from(splitHeroTitle.chars, {
        duration: 1,
        x: 70,
        autoAlpha: 0,
        stagger: 0.1,
      });
      gsap.from(
        splitHeroSubtitle.words,
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

    // Cleanup
    return () => ctx.revert();
  }, [locale]);

  return (
    <>
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
                    {t("primaryHeadingfirst")}
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

      {/* Style block with backticks */}
      <style jsx>{`
        .custom-background-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1; /* Send the video to the background */
        }

        .background-video {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          object-fit: cover; /* Ensures the video covers the entire area without distortion */
        }

        .custom-hero__area {
          position: relative;
          overflow: hidden;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .custom-hero__content {
          position: relative;
          z-index: 1;
        }

        .custom-hero__title-wrapper {
          margin-bottom: 20px;
        }

        .custom-hero__title {
          font-size: 7rem;
          font-weight: bold;
          color: #ffffff;
        }

        .custom-hero__sub-title {
          font-weight: 400;
          font-size: 25px;
          line-height: 1.4;
          color: #ffffff;
          max-width: 620px;
        }

        .custom-experience {
          position: absolute;
          bottom: 0;
          right: 3%;
          color: #fff;
          font-size: 2rem;
        }

        .title {
          font-size: 3rem;
          font-weight: semibold;
          margin-bottom: 10px;
          color: #fff;
        }

        .custom-exp-para {
          color: #fff;
          font-size: 1.5rem;
        }

        /* Responsive styles omitted for brevity */
      `}</style>
    </>
  );
};

export default DigitalAgencyHero;
