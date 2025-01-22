"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Solution from "../../../public/assets/imgs/thumb/solution.png";
import Solution2 from "../../../public/assets/imgs/thumb/solution-2.png";
import Solution3 from "../../../public/assets/imgs/thumb/solution-3.png";
import Icon1 from "../../../public/assets/imgs/icon/1.png";
import Icon2 from "../../../public/assets/imgs/icon/2.png";
import Icon3 from "../../../public/assets/imgs/icon/3.png";
import Icon4 from "../../../public/assets/imgs/icon/4.png";
import Icon5 from "../../../public/assets/imgs/icon/5.png";
import Image from "next/image";
import animationCharCome from "@/lib/utils/animationCharCome";
import { useTranslations } from "next-intl";

const ServiceHero = () => {
  const t = useTranslations();
  const charAnim = useRef();
  const solutionArea = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      let image_list = [".solution__wrapper img"];
      imageMoving(image_list);
    }
    animationCharCome(charAnim.current);
  }, []);

  function imageMoving(image_list) {
    let container = solutionArea.current;
    if (!container) return;
    container.addEventListener("mousemove", (e) => {
      var x = e.clientX;
      var y = e.clientY;
      let viewportWidth = window.innerWidth;
      let center = viewportWidth / 2;
      let centerHeight = window.innerHeight / 2;

      gsap.to(image_list, {
        x: x > center ? 15 : -15,
        y: y > centerHeight ? 15 : -15,
        duration: 5,
        ease: "power4.out",
      });
    });
  }

  return (
    <>
      <section className="solution__area" ref={solutionArea}>
        <div className="container hero-line"></div>
        <div className="solution__wrapper">
          <div className="solution__left">
            <div className="solution__img-1">
              <Image
                priority
                width={435}
                style={{ height: "auto" }}
                src={Solution}
                alt="Solution Image"
              />
            </div>
            <div className="solution__img-2">
              <Image
                priority
                width={220}
                style={{ height: "auto" }}
                src={Solution2}
                alt="Solution Image"
              />
            </div>
          </div>

          <div className="solution__mid">
            <h1 className="solution__title animation__char_come" ref={charAnim}>
              {t("serviceHeroTitle")}
            </h1>
            <p>{t("serviceHeroPara")}</p>
          </div>

          <div className="solution__right">
            <div className="solution__img-3">
              <Image
                priority
                width={459}
                style={{ height: "auto" }}
                src={Solution3}
                alt="Solution Image"
              />
            </div>
          </div>
        </div>

        <div className="container pb-130">
          <div className="row">
            <div className="col-xxl-12">
              <div className="solution__btm">
                <ul>
                  <li>{t("serviceHeroApproach1")}</li>
                  <li>{t("serviceHeroApproach2")}</li>
                  <li>{t("serviceHeroApproach3")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="solution__shape">
          <Image
            priority
            width={41}
            style={{ height: "auto" }}
            src={Icon1}
            alt="Shape Image"
            className="shape-1"
          />
          <Image
            priority
            width={22}
            style={{ height: "auto" }}
            src={Icon2}
            alt="Shape Image"
            className="shape-2"
          />
          <Image
            priority
            width={38}
            style={{ height: "auto" }}
            src={Icon3}
            alt="Shape Image"
            className="shape-3"
          />
          <Image
            priority
            width={62}
            style={{ height: "auto" }}
            src={Icon4}
            alt="Shape Image"
            className="shape-4"
          />
          <Image
            priority
            width={94}
            style={{ height: "auto" }}
            src={Icon5}
            alt="Shape Image"
            className="shape-5"
          />
        </div>
      </section>
    </>
  );
};

export default ServiceHero;
