import animationCharCome from "@/lib/utils/animationCharCome";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const CareerHero = () => {
  const charAnim = useRef();
  useEffect(() => {
    animationCharCome(charAnim.current);
  }, []);
  const t = useTranslations();
  return (
    <>
      <section className="career__top">
        <div className="career__top-title">
          <div className="container pt-120">
            <div className="row pb-120">
              <div className="col-xxl-10 col-xl-9 col-lg-9 col-md-9">
                <div className="sec-title-wrapper">
                  <h2
                    className="sec-title-2 animation__char_come"
                    ref={charAnim}
                  >
                    {t("joinOurTeamHeading")}
                  </h2>
                </div>
              </div>
              <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-3">
                <div className="btn_wrapper">
                  <Link
                    href="/contact"
                    className="wc-btn-secondary btn-hover btn-item"
                  >
                    <span></span> {t("letsTalkBtn")}
                    <br />
                    {t("letsTalkBtnPart")}{" "}
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="career__thumb">
          <div className="container g-0">
            <div className="row inherit">
              <div className="col-xxl-12">
                <div className="career__top-img">
                  <video autoPlay muted loop>
                    <source src="assets/video/video.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerHero;
