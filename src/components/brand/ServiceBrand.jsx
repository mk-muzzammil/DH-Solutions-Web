"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Brand1 from "../../../public/assets/imgs/brand/1.svg";
import Brand2 from "../../../public/assets/imgs/brand/2.svg";
import Brand3 from "../../../public/assets/imgs/brand/3.svg";
import Brand4 from "../../../public/assets/imgs/brand/4.svg";
import Brand5 from "../../../public/assets/imgs/brand/5.svg";
import Brand6 from "../../../public/assets/imgs/brand/6.svg";
import Image from "next/image";
import { useTranslations } from "use-intl";

gsap.registerPlugin(ScrollTrigger);

const ServiceBrand = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        gsap.set(".fade_bottom", { y: 30, opacity: 0 });

        if (device_width < 1023) {
          const fadeArray = gsap.utils.toArray(".fade_bottom");
          fadeArray.forEach((item) => {
            let fadeTl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top center+=200",
              },
            });
            fadeTl.to(item, {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              duration: 1.5,
            });
          });
        } else {
          gsap.to(".fade_bottom", {
            scrollTrigger: {
              trigger: ".fade_bottom",
              start: "top center+=300",
              markers: false,
            },
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1,
            stagger: {
              each: 0.2,
            },
          });
        }
      });
      return () => tHero.revert();
    }
  }, []);

  const t = useTranslations();

  return (
    <>
      <section className="brand__area">
        <div className="container line pt-140 pb-100">
          <span className="line-3"></span>
          <div className="row">
            <div className="col-xxl-12">
              <h2 className="brand__title-3 title-anim">
                {t("serviceBrandHeading")}
              </h2>
              <div className="brand__list brand-gap">
                <div className="brand__item-2 fade_bottom">
                  <Image
                    priority
                    width={97}
                    height={67}
                    src={Brand1}
                    alt="Brand Logo"
                  />
                </div>
                <div className="brand__item-2 fade_bottom">
                  <Image
                    priority
                    width={85}
                    height={67}
                    src={Brand2}
                    alt="Brand Logo"
                  />
                </div>
                {/* ...and so on for other logos... */}
                <div className="brand__item-2 fade_bottom">
                  <Image
                    priority
                    width={121}
                    height={63}
                    src={Brand6}
                    alt="Brand Logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceBrand;
