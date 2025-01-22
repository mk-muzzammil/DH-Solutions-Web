// File: components/blog/BlogRelated.jsx

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const BlogRelated = ({ relatedPosts = [] }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        gsap.set(".blog__animation .blog__item", { x: 50, opacity: 0 });

        if (device_width < 1023) {
          const blogList = gsap.utils.toArray(".blog__animation .blog__item");
          blogList.forEach((item, i) => {
            let blogTl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top center+=200",
              },
            });
            blogTl.to(item, {
              x: 0,
              opacity: 1,
              ease: "power2.out",
              duration: 1.5,
            });
          });
        } else {
          gsap.to(".blog__animation .blog__item", {
            scrollTrigger: {
              trigger: ".blog__animation .blog__item",
              start: "top center+=300",
              markers: false,
            },
            x: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 2,
            stagger: { each: 0.3 },
          });
        }
      });
      return () => tHero.revert();
    }
  }, []);

  if (!relatedPosts.length) return null;

  return (
    <section className="blog__related blog__animation">
      <div className="container g-0 line pt-130 pb-140">
        <span className="line-3"></span>
        <div className="row">
          <div className="col-xxl-12">
            <div className="sec-title-wrapper">
              <h2 className="sec-title title-anim">Related Articles</h2>
            </div>
          </div>
        </div>

        <div className="row reset-grid">
          {relatedPosts.map((blog) => (
            <div
              className="col-xxl-4 col-xl-4 col-lg-4 col-md-4"
              key={blog.slug}
            >
              <article className="blog__item">
                <div className="blog__img-wrapper">
                  <Link href={`/blog/${blog.slug}`}>
                    <div className="img-box">
                      <Image
                        priority
                        style={{ width: "auto", height: "auto" }}
                        className="image-box__item"
                        src={blog.mainImage}
                        alt={`Blog Thumbnail ${blog.title}`}
                      />
                      <Image
                        priority
                        style={{ width: "auto", height: "auto" }}
                        className="image-box__item"
                        src={blog.mainImage}
                        alt={`Blog Thumbnail ${blog.title}`}
                      />
                    </div>
                  </Link>
                </div>
                <h4 className="blog__meta sub-title-anim">
                  <Link href={`/blog/${blog.slug}`}>{blog.category}</Link> .{" "}
                  {blog.date}
                </h4>
                <h5>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="blog__title sub-title-anim"
                  >
                    {blog.title}
                  </Link>
                </h5>
                <Link href={`/blog/${blog.slug}`} className="blog__btn">
                  Read More{" "}
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogRelated;
